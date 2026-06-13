# ECC + AI-Hub Multi-Harness Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the ECC clone into all supported agent harnesses while reusing `~/.ai-hub` as the SSOT for MCPs, hook wrappers, and shared memory, and add a thin, validated `local/` extension layer for project-specific artifacts.

**Architecture:** Keep ECC as the canonical source for agents/skills/commands/rules and its install system. Treat `~/.ai-hub` as the canonical source for MCP registry, hook wrappers, and memory. Add a `local/` subtree inside the ECC repo only for project-specific extensions. Validate everything with new tests and `npm test`.

**Tech Stack:** Node.js, Bash, JSON/YAML/TOML frontmatter, jq, envsubst, existing ECC test harness.

---

## Current state (read-only verification)

- ECC repo is at `main` synced with `affaan-m/ECC:main` and pushed to `marlon-costa-dc/ECC`.
- `~/.ai-hub/` exists with MCP registry, generators, and Kimi hook wrappers.
- `~/.ai-hub/schema.json` enum for `compatibility` is missing `"kimi"` even though `registry.json` uses it.
- `local/` does not exist yet.

---

## Task 1: Fix AI-Hub schema to include Kimi

**Files:**
- Modify: `~/.ai-hub/schema.json`

- [ ] **Step 1: Read the current schema enum**

Run:
```bash
grep -n '"enum"' ~/.ai-hub/schema.json | head -5
```

Expected: shows the enum at the compatibility field.

- [ ] **Step 2: Add `"kimi"` to the compatibility enum**

Run:
```bash
python3 - <<'PY'
import json, pathlib
p = pathlib.Path.home() / '.ai-hub' / 'schema.json'
data = json.loads(p.read_text())
items = data['definitions']['server']['properties']['compatibility']['items']
if 'kimi' not in items['enum']:
    items['enum'].append('kimi')
    items['enum'].sort()
    p.write_text(json.dumps(data, indent=2) + '\n')
    print('Added kimi to schema')
else:
    print('kimi already in schema')
PY
```

Expected: prints "Added kimi to schema" or "kimi already in schema".

- [ ] **Step 3: Validate the schema against the registry**

Run:
```bash
python3 - <<'PY'
import json, pathlib
schema = json.loads((pathlib.Path.home() / '.ai-hub' / 'schema.json').read_text())
registry = json.loads((pathlib.Path.home() / '.ai-hub' / 'mcp' / 'registry.json').read_text())
allowed = set(schema['definitions']['server']['properties']['compatibility']['items']['enum'])
violations = []
for name, server in registry.get('servers', {}).items():
    for agent in server.get('compatibility', []):
        if agent not in allowed:
            violations.append(f'{name}: {agent}')
if violations:
    print('Violations:', violations)
    raise SystemExit(1)
print('All compatibility values are valid')
PY
```

Expected: prints "All compatibility values are valid".

- [ ] **Step 4: Commit the schema fix in the AI-Hub repo**

Run:
```bash
cd ~/.ai-hub && git diff -- schema.json && git add schema.json && git commit -m "fix: add kimi to compatibility enum"
```

Expected: commit succeeds and `git log --oneline -1` shows the fix.

---

## Task 2: Bootstrap the project-local layer

**Files:**
- Create: `local/README.md`
- Create: `local/.gitkeep` (or empty subdirectories)

- [ ] **Step 1: Create the local directory tree**

Run:
```bash
mkdir -p local/agents local/skills local/commands local/hooks local/mcp local/rules local/templates
```

Expected: directories exist.

- [ ] **Step 2: Write the local layer README**

Create `local/README.md`:

```markdown
# Local ECC Extension Layer

This directory holds **project-specific** extensions to ECC.

## What goes here

- Agents, skills, commands, hooks, rules, or MCP configs that are **specific to this repository or workflow**.
- Artifacts that are **not generic enough** for `~/.ai-hub`.

## What does NOT go here

- Generic MCP server definitions → `~/.ai-hub/mcp/registry.json`.
- Cross-project hook wrappers → `~/.ai-hub/hooks/`.
- Shared memory config → `~/.ai-hub/memory/`.
- Canonical ECC agents/skills/commands → `agents/`, `skills/`, `commands/` at repo root.

## Naming convention

Prefix every artifact with `local-` to avoid collisions with ECC core.
```

Expected: file is created with the content above.

- [ ] **Step 3: Verify the tree**

Run:
```bash
find local -maxdepth 2 -type f -o -type d | sort
```

Expected: shows `local/README.md` and the subdirectories.

---

## Task 3: Add a local-deduplicate validation test

**Files:**
- Create: `tests/local/local-deduplicate.test.js`

- [ ] **Step 1: Write the test file**

Create `tests/local/local-deduplicate.test.js`:

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LOCAL = path.join(ROOT, 'local');
const AGENTS = path.join(ROOT, 'agents');
const SKILLS = path.join(ROOT, 'skills');
const COMMANDS = path.join(ROOT, 'commands');
const RULES = path.join(ROOT, 'rules');

function listNames(dir, suffix = '') {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith(suffix))
    .map(e => path.basename(e.name, suffix));
}

function listSkillNames(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && fs.existsSync(path.join(dir, e.name, 'SKILL.md')))
    .map(e => e.name);
}

function assertNoOverlap(localNames, canonicalNames, category) {
  const collisions = localNames.filter(n => canonicalNames.includes(n.replace(/^local-/, '')));
  if (collisions.length) {
    console.error(`FAIL: local ${category} collide with canonical: ${collisions.join(', ')}`);
    process.exit(1);
  }
}

const localAgents = listNames(path.join(LOCAL, 'agents'), '.md');
const localSkills = listSkillNames(path.join(LOCAL, 'skills'));
const localCommands = listNames(path.join(LOCAL, 'commands'), '.md');
const localRules = listNames(path.join(LOCAL, 'rules'), '.md');

assertNoOverlap(localAgents, listNames(AGENTS, '.md'), 'agents');
assertNoOverlap(localSkills, listSkillNames(SKILLS), 'skills');
assertNoOverlap(localCommands, listNames(COMMANDS, '.md'), 'commands');
assertNoOverlap(localRules, listNames(RULES, '.md'), 'rules');

console.log('PASS: no collisions between local/ and canonical ECC surfaces');
```

Expected: file created with content above.

- [ ] **Step 2: Run the test (should pass on empty local layer)**

Run:
```bash
node tests/local/local-deduplicate.test.js
```

Expected: prints "PASS: no collisions between local/ and canonical ECC surfaces".

---

## Task 4: Add AI-Hub schema validation test

**Files:**
- Create: `tests/local/ai-hub-schema.test.js`

- [ ] **Step 1: Write the test file**

Create `tests/local/ai-hub-schema.test.js`:

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HUB = path.join(require('os').homedir(), '.ai-hub');
const SCHEMA_PATH = path.join(HUB, 'schema.json');
const REGISTRY_PATH = path.join(HUB, 'mcp', 'registry.json');

function readJson(p, label) {
  if (!fs.existsSync(p)) {
    console.error(`SKIP: ${label} not found at ${p}`);
    process.exit(0);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const schema = readJson(SCHEMA_PATH, 'AI-Hub schema');
const registry = readJson(REGISTRY_PATH, 'AI-Hub MCP registry');

const allowed = new Set(schema.definitions.server.properties.compatibility.items.enum);
const violations = [];
for (const [name, server] of Object.entries(registry.servers || {})) {
  for (const agent of server.compatibility || []) {
    if (!allowed.has(agent)) {
      violations.push(`${name}: "${agent}"`);
    }
  }
}

if (violations.length) {
  console.error('FAIL: registry compatibility values not in schema enum:');
  for (const v of violations) console.error(`  ${v}`);
  process.exit(1);
}

console.log('PASS: AI-Hub registry compatibility values match schema enum');
```

Expected: file created with content above.

- [ ] **Step 2: Run the test**

Run:
```bash
node tests/local/ai-hub-schema.test.js
```

Expected: prints "PASS: AI-Hub registry compatibility values match schema enum".

---

## Task 5: Add AI-Hub symlink health test

**Files:**
- Create: `tests/local/ai-hub-symlinks.test.js`

- [ ] **Step 1: Write the test file**

Create `tests/local/ai-hub-symlinks.test.js`:

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HOME = require('os').homedir();
const HUB = path.join(HOME, '.ai-hub');

const expected = [
  { link: path.join(HOME, '.kimi-code', 'mcp.json'), target: path.join(HUB, 'mcp', 'generated', 'kimi.mcp.json') },
  { link: path.join(HOME, '.claude', 'mcp-config.json'), target: path.join(HUB, 'mcp', 'generated', '.mcp.json') },
];

let ok = true;
for (const { link, target } of expected) {
  if (!fs.existsSync(link)) {
    console.error(`FAIL: symlink missing: ${link}`);
    ok = false;
    continue;
  }
  const real = fs.realpathSync(link);
  if (real !== target) {
    console.error(`FAIL: ${link} resolves to ${real}, expected ${target}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('PASS: AI-Hub MCP symlinks are healthy');
```

Expected: file created with content above.

- [ ] **Step 2: Run the test**

Run:
```bash
node tests/local/ai-hub-symlinks.test.js
```

Expected: prints "PASS: AI-Hub MCP symlinks are healthy" (if symlinks exist) or lists missing symlinks.

---

## Task 6: Add local-frontmatter validation test

**Files:**
- Create: `tests/local/local-frontmatter.test.js`

- [ ] **Step 1: Write the test file**

Create `tests/local/local-frontmatter.test.js`:

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const LOCAL = path.join(ROOT, 'local');

function extractFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const lines = m[1].split(/\r?\n/);
  const fm = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    fm[key] = value;
  }
  return fm;
}

function walk(dir, suffix, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, suffix, acc);
    } else if (entry.isFile() && entry.name.endsWith(suffix)) {
      acc.push(full);
    }
  }
  return acc;
}

let ok = true;
const skills = walk(path.join(LOCAL, 'skills'), 'SKILL.md');
for (const f of skills) {
  const fm = extractFrontmatter(fs.readFileSync(f, 'utf8'));
  if (!fm || !fm.name || !fm.description) {
    console.error(`FAIL: ${path.relative(ROOT, f)} missing name/description frontmatter`);
    ok = false;
  }
}

const agents = walk(path.join(LOCAL, 'agents'), '.md');
for (const f of agents) {
  const fm = extractFrontmatter(fs.readFileSync(f, 'utf8'));
  if (!fm || !fm.model || !fm.tools) {
    console.error(`FAIL: ${path.relative(ROOT, f)} missing model/tools frontmatter`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('PASS: all local skills/agents have required frontmatter');
```

Expected: file created with content above.

- [ ] **Step 2: Run the test**

Run:
```bash
node tests/local/local-frontmatter.test.js
```

Expected: prints "PASS: all local skills/agents have required frontmatter".

---

## Task 7: Create the local-skill-starter template

**Files:**
- Create: `local/templates/skill-starter.template.md`
- Create: `local/skills/local-skill-starter/SKILL.md`

- [ ] **Step 1: Create the reusable skill template**

Create `local/templates/skill-starter.template.md`:

```markdown
---
name: {{NAME}}
description: {{DESCRIPTION}}
version: 1.0.0
---

# {{NAME}}

## Overview

{{DESCRIPTION}}

## When to Activate

Use this skill when ...

## Steps

1. Step one
2. Step two
3. Step three

## Verification

- [ ] Check one
- [ ] Check two
```

Expected: file created with content above.

- [ ] **Step 2: Create the local-skill-starter skill**

Create `local/skills/local-skill-starter/SKILL.md`:

```markdown
---
name: local-skill-starter
description: Generate a new project-local skill from the canonical template.
---

# local-skill-starter

## When to Activate

Use when you need to add a new skill that is specific to this repository or workflow and is not covered by ECC or `~/.ai-hub`.

## Steps

1. Choose a unique name prefixed with `local-`.
2. Run the generator command or copy `local/templates/skill-starter.template.md` to `local/skills/<name>/SKILL.md`.
3. Fill in `name`, `description`, and the skill body.
4. Run `node tests/local/local-deduplicate.test.js` to ensure no collisions.
5. Run `node tests/local/local-frontmatter.test.js` to validate frontmatter.
6. Run `npm test` before committing.

## Generator command

```bash
name="local-my-skill"
description="My project-specific skill"
mkdir -p "local/skills/${name}"
sed -e "s/{{NAME}}/${name}/g" -e "s/{{DESCRIPTION}}/${description}/g" \
  local/templates/skill-starter.template.md > "local/skills/${name}/SKILL.md"
```
```

Expected: file created with content above.

- [ ] **Step 3: Validate the new skill passes frontmatter tests**

Run:
```bash
node tests/local/local-frontmatter.test.js
```

Expected: prints "PASS: all local skills/agents have required frontmatter".

- [ ] **Step 4: Validate no collisions**

Run:
```bash
node tests/local/local-deduplicate.test.js
```

Expected: prints "PASS: no collisions between local/ and canonical ECC surfaces".

---

## Task 8: Create the local-sync-ai-hub command

**Files:**
- Create: `local/commands/local-sync-ai-hub.md`

- [ ] **Step 1: Write the command doc**

Create `local/commands/local-sync-ai-hub.md`:

```markdown
---
name: local-sync-ai-hub
description: Regenerate all AI-Hub configs and verify harness symlinks.
---

# /local-sync-ai-hub

Regenerate every AI-Hub MCP config and verify the symlinks from harness config paths back to `~/.ai-hub/mcp/generated/`.

## Usage

```
/local-sync-ai-hub
```

## Steps

1. Run `~/.ai-hub/sync/generate-claude.sh`
2. Run `~/.ai-hub/sync/generate-kimi.sh`
3. Run `~/.ai-hub/sync/generate-codex.py`
4. Run `~/.ai-hub/sync/generate-cursor.sh`
5. Run `~/.ai-hub/sync/generate-opencode.sh`
6. Run `~/.ai-hub/sync/generate-gemini.sh`
7. Run `~/.ai-hub/sync/generate-aider.sh`
8. Run `node tests/local/ai-hub-symlinks.test.js`
9. Run `node tests/local/ai-hub-schema.test.js`

## Verification

All generators exit 0 and symlink test reports PASS.
```

Expected: file created with content above.

- [ ] **Step 2: Validate command frontmatter**

Run:
```bash
node tests/commands/command-frontmatter.test.js 2>&1 | grep -i "local-sync-ai-hub" || echo "Command registry may need regeneration"
```

Expected: if the command registry test runs, it validates the file; otherwise the command registry generator will pick it up on next `npm test`.

---

## Task 9: Wire tests into the ECC test runner

**Files:**
- Modify: `tests/run-all.js` is auto-discovering; no change needed if `tests/local/*.test.js` matches the glob.

- [ ] **Step 1: Verify discovery**

Run:
```bash
node -e "const fs=require('fs'),path=require('path'); const dir=path.join(process.cwd(),'tests'); function walk(d,acc=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p,acc);else if(e.isFile()&&e.name.endsWith('.test.js'))acc.push(path.relative(dir,p));}} walk(dir); console.log(acc.filter(x=>x.startsWith('local')).join('\n'));"
```

Expected: lists the four local test files.

- [ ] **Step 2: Run the full suite**

Run:
```bash
npm test
```

Expected: all tests pass (2737+ with new local tests added).

---

## Task 10: Integrate local layer into ECC install targets (optional but recommended)

**Files:**
- Modify: `scripts/lib/install-targets/claude-project.js` (or equivalent project-scoped targets)

- [ ] **Step 1: Inspect an existing project target adapter**

Run:
```bash
head -80 scripts/lib/install-targets/claude-project.js
```

Expected: shows how files are planned for copy/symlink.

- [ ] **Step 2: Add local/ overlay to project-scoped targets**

In `scripts/lib/install-targets/claude-project.js`, add a helper that includes `local/rules/` and `local/commands/` in the install plan when the `local/` directory exists.

Example patch (adapt to actual adapter structure):

```javascript
const fs = require('fs');
const path = require('path');

function planLocalOverlay(projectRoot, operations) {
  const localDir = path.join(projectRoot, 'local');
  if (!fs.existsSync(localDir)) return operations;

  for (const rulesFile of fs.readdirSync(path.join(localDir, 'rules'))) {
    operations.push({
      op: 'copy',
      src: path.join(localDir, 'rules', rulesFile),
      dst: path.join(projectRoot, '.claude', 'rules', rulesFile),
    });
  }
  return operations;
}

module.exports = { planLocalOverlay };
```

Expected: project-scoped installs include local rules.

- [ ] **Step 3: Test the install target**

Run:
```bash
node tests/lib/install-targets.test.js 2>&1 | tail -10
```

Expected: existing tests still pass; new behavior verified manually or via a new test added later.

---

## Spec coverage check

| Spec section | Implementing task |
|--------------|-------------------|
| Fix AI-Hub schema (5.1) | Task 1 |
| Bootstrap `local/` (6) | Task 2 |
| Meta-skills/commands (7) | Tasks 7, 8 |
| Validation tests (8) | Tasks 3, 4, 5, 6, 9 |
| Install integration (4, 5.2) | Task 10 |
| No duplication (3) | local-deduplicate test, AI-Hub reuse |

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-13-ecc-ai-hub-integration.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — execute tasks in this session using `superpowers:executing-plans`, batch execution with checkpoints.

Which approach?
