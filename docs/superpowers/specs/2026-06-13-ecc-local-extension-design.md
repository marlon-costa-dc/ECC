# ECC + AI-Hub Multi-Harness Integration Design

> **Status:** Design revised after discovering `~/.ai-hub` — pending re-approval  
> **Scope:** Install the ECC clone (`marlon-costa-dc/ECC`) into all supported agent harnesses while reusing `~/.ai-hub` as the Single Source of Truth for MCPs, hooks, and shared memory. Add a thin, namespaced local extension layer inside the ECC repo only for artifacts that are project-specific and not covered by ECC or `~/.ai-hub`.

---

## 1. Goal

Install this ECC clone into **all supported harnesses** (Claude Code, Kimi Code CLI, Codex CLI, Cursor, OpenCode, Gemini, Zed, Trae, Kiro, Aider, etc.) and integrate it with the existing `~/.ai-hub` central configuration hub.

The integration must:
- **Respect `~/.ai-hub` as SSOT** for MCP servers, hook wrappers, and shared memory.
- **Use ECC as SSOT** for agents, skills, commands, rules, and the install system.
- **Avoid duplication** between ECC, `~/.ai-hub`, and harness-native configs.
- Provide a **thin project-local layer** (`local/` in this repo) only for things that are project-specific and not generic enough for `~/.ai-hub`.

---

## 2. Existing assets

### 2.1 `~/.ai-hub`

Central hub already containing:
- `mcp/registry.json` — canonical MCP server definitions.
- `mcp/enabled/<agent>.json` — per-agent MCP enable flags.
- `mcp/generated/<agent>.mcp.json` — generated native configs.
- `sync/generate-<agent>.sh` — generators for each harness.
- `hooks/*-kimi.sh` — Kimi-compatible wrappers around Claude/Codex hooks.
- `memory/` — shared memory exports.
- `skills/` — reserved for future cross-agent skills.

### 2.2 ECC clone (`marlon-costa-dc/ECC`)

Canonical source for:
- 64 agents, 267 skills, 84 commands.
- Cross-harness install targets (`claude`, `claude-project`, `cursor`, `codex`, `opencode`, `kimi`, etc.).
- Platform-specific configs (`.claude/`, `.codex/`, `.kimi/`, `.cursor/`, `.opencode/`, etc.).
- Hooks under `.kimi/install-hooks.mjs`, `.cursor/hooks.json`, etc.

---

## 3. Revised architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Single Sources of Truth                                    │
│  ├── ~/.ai-hub     → MCPs, hook wrappers, shared memory     │
│  └── ECC repo      → agents, skills, commands, rules, hooks │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  ECC    │          │  AI-Hub │          │ Project │
   │ install │          │ sync    │          │ local/  │
   │ system  │          │ scripts │          │ layer   │
   └────┬────┘          └────┬────┘          └────┬────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ▼
              ┌──────────────────────────┐
              │  Harness-native configs  │
              │  ~/.claude/              │
              │  ~/.kimi-code/           │
              │  ~/.codex/               │
              │  ~/.cursor/              │
              │  ...                     │
              └──────────────────────────┘
```

### 3.1 Division of responsibilities

| Concern | SSOT | Notes |
|---------|------|-------|
| Agents | ECC | 64 canonical agents; local only for project-specific agents. |
| Skills | ECC | 267 canonical skills; local only for project-specific skills. |
| Commands | ECC | 84 canonical commands; local only for project-specific commands. |
| Rules | ECC | Common + language rules; local only for project-specific rules. |
| Hooks | ECC + AI-Hub | ECC owns hook definitions; AI-Hub owns cross-harness wrappers and MCP-related hooks. |
| MCP servers | AI-Hub | `registry.json` is canonical; ECC reads generated configs. |
| Shared memory | AI-Hub | `memory/` exports are consumed by all harnesses. |
| Install orchestration | ECC | ECC installers call AI-Hub generators when needed. |
| Project-specific extensions | `local/` | Only for things tied to this repo/workflow. |

---

## 4. Multi-harness installation

For each harness, the install flow is:

1. **Install ECC** using that harness’s native plugin/install path.
2. **Wire AI-Hub MCPs** by running the relevant `~/.ai-hub/sync/generate-<agent>.sh` and symlinking the generated config.
3. **Wire AI-Hub hooks** where wrappers exist (currently Kimi wrappers are present).
4. **Install project-local layer** if this repo has a `local/` directory.

| Harness | ECC install | AI-Hub MCP | AI-Hub hooks | Local layer |
|---------|-------------|------------|--------------|-------------|
| **Claude Code** | `.claude-plugin/plugin.json` / marketplace | symlink `~/.claude/mcp-config.json` → `~/.ai-hub/mcp/generated/.mcp.json` | use `~/.claude/hooks/` directly | `.claude/rules/local-*` |
| **Kimi Code CLI** | `kimi plugin install .` + `node .kimi/install-hooks.mjs` | symlink `~/.kimi-code/mcp.json` → `~/.ai-hub/mcp/generated/kimi.mcp.json` | use `~/.ai-hub/hooks/*-kimi.sh` instead of duplicate Kimi hooks | `local/` via sessionStart or AGENTS.md |
| **Codex CLI** | `.codex/AGENTS.md` + `scripts/sync-ecc-to-codex.sh` | copy/merge `~/.ai-hub/mcp/generated/config.codex.toml` into `~/.codex/config.toml` | use `~/.codex/hooks/` directly | `.codex/agents/local-*` |
| **Cursor** | `.cursor/hooks.json` + `.cursor/rules/` | symlink `~/.cursor/mcp.json` → `~/.ai-hub/mcp/generated/mcp.cursor.json` | merge `.cursor/hooks.json` with AI-Hub wrappers | `.cursor/rules/local-*` |
| **OpenCode** | `.opencode/opencode.json` + compiled plugin | symlink/copy `~/.ai-hub/mcp/generated/opencode.mcp.json` | plugin hook integration | `.opencode/` local additions |
| **Gemini** | `.gemini/GEMINI.md` | symlink/copy `~/.ai-hub/mcp/generated/settings.gemini.json` | limited hook support | `.gemini/` local additions |
| **Zed** | `.zed/settings.json` | symlink/copy generated config | limited hook support | `.zed/` local additions |
| **Trae** | `.trae/install.sh` | add AI-Hub generator call | limited hook support | `.trae/` local additions |
| **Kiro** | `.kiro/install.sh` | add AI-Hub generator call | limited hook support | `.kiro/` local additions |
| **Aider** | Aider config references | symlink/copy `~/.ai-hub/mcp/generated/.aider.mcp.yml` | limited hook support | N/A |

---

## 5. AI-Hub integration tasks

### 5.1 Fix AI-Hub schema

`~/.ai-hub/schema.json` enum for `compatibility` is missing `"kimi"` even though `registry.json` already uses it. Update the schema to include `"kimi"`.

### 5.2 Add ECC-aware generator targets

Create or update generators in `~/.ai-hub/sync/` so they can be invoked from the ECC install flow:
- Ensure each generator supports a `--check` mode (verify symlinks/files are up to date).
- Ensure generators fail loudly if `registry.json` is invalid.

### 5.3 Hook integration

- For **Kimi**: replace or complement `.kimi/install-hooks.mjs` with wrappers that call `~/.ai-hub/hooks/*-kimi.sh`.
- For **Claude/Codex**: ECC hooks remain primary, but they should be aware of AI-Hub shared memory paths.

### 5.4 Memory integration

- ECC session-start hooks may read `~/.ai-hub/memory/claude-mem.db` or `~/.ai-hub/memory/README.md` only when a cross-session memory lookup is explicitly requested by the user.
- Do not duplicate `claude-mem` configuration that already lives in AI-Hub.

---

## 6. Project-local layer (`local/`)

Only create artifacts here that are **specific to this repository/workflow** and **not generic enough for AI-Hub**.

```
local/
├── agents/          # Project-specific agents
├── skills/          # Project-specific skills
├── commands/        # Project-specific slash commands
├── hooks/           # Project-specific hooks
├── rules/           # Project-specific rule snippets
└── README.md        # When to add things here vs AI-Hub vs ECC
```

Naming convention: prefix with `local-` or use a project-specific namespace.

Examples of valid local artifacts:
- `local-ecc-release-check` skill for validating this repo before release.
- `local-sync-ai-hub` command for regenerating AI-Hub configs from this repo.

Examples of what belongs in AI-Hub instead:
- Generic MCP server definitions.
- Cross-project hook wrappers.
- Shared memory configuration.

---

## 7. New meta-skills/commands

Instead of domain-specific content, ship meta-tools:

| Artifact | Purpose |
|----------|---------|
| `local-skill-starter` | Generate a new `local/skills/<name>/SKILL.md`. |
| `local-agent-starter` | Generate a new `local/agents/<name>.md`. |
| `local-command-starter` | Generate a new `local/commands/<name>.md`. |
| `local-deduplicate` | Scan `local/` against ECC + AI-Hub and warn about collisions. |
| `local-sync-ai-hub` | Run all AI-Hub generators and verify symlinks. |
| `local-harness-health` | Check that every harness can load ECC + AI-Hub + local layer. |

---

## 8. Validation

Add a new test suite `tests/local/`:

- `local-collision.test.js` — no local name collides with ECC or AI-Hub artifacts.
- `local-frontmatter.test.js` — local SKILL.md and agent files have valid frontmatter.
- `ai-hub-schema.test.js` — validates that `~/.ai-hub/schema.json` accepts all agents used in `registry.json`.
- `ai-hub-symlinks.test.js` — verifies expected symlinks from harness configs to `~/.ai-hub/mcp/generated/`.

After install, run `npm test` plus harness-specific health checks (`kimi doctor`, `claude config validate`, etc.).

---

## 9. Non-Goals

- Do not move ECC core artifacts into `~/.ai-hub`.
- Do not duplicate AI-Hub MCP registry inside the ECC repo.
- Do not create project-local wrappers for things AI-Hub already handles generically.
- Do not modify upstream ECC files except to fix genuine integration blockers.

---

## 10. Success Criteria

1. `npm test` passes after all changes.
2. `~/.ai-hub/schema.json` accepts `"kimi"` and any other agent used in `registry.json`.
3. Each target harness can load ECC + AI-Hub MCPs + local layer from this clone.
4. Running `local-sync-ai-hub` regenerates and verifies all AI-Hub configs.
5. `local-deduplicate` reports zero collisions between ECC, AI-Hub, and `local/`.
6. No MCP, hook, or memory config is duplicated between ECC and AI-Hub.
