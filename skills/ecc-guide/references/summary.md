# ECC Guide

Use this skill when a user needs help understanding, navigating, installing, or choosing parts of Everything Claude Code.

## When To Use

Use this skill when the user:

- asks what ECC includes
- wants help finding a skill, command, agent, hook, rule, or install profile
- is new to the repository and needs a guided path
- asks "how do I do X with ECC?"
- asks which ECC components fit a project
- needs a lightweight explanation of how commands, skills, agents, hooks, and rules relate
- is confused by install paths, duplicate installs, reset/uninstall, or selective install options

## Core Principle

Answer from current files, not memory. ECC changes quickly, so hard-coded catalog counts, feature lists, and install instructions go stale.

When the ECC repository is available, inspect the relevant files before giving a concrete answer:

[See code example 1 in `code-examples.md`]

Use the smallest set of reads needed for the user's question.

## Repository Map

- `README.md`: install paths, uninstall/reset guidance, public positioning, FAQs
- `AGENTS.md`: contributor guidance and project structure
- `agent.yaml`: exported gitagent surface and command list
- `commands/`: maintained slash-command compatibility shims
- `skills/*/SKILL.md`: reusable workflows and domain playbooks
- `agents/*.md`: delegated subagent role prompts
- `rules/`: language and harness rules
- `hooks/README.md`, `hooks/hooks.json`, `scripts/hooks/`: hook behavior and safety gates
- `manifests/install-*.json`: selective install modules, components, profiles, and target support
- `docs/`: harness guides, architecture notes, translated docs, release docs

## Response Style

Lead with the answer, then give the next action. Most users do not need a full catalog dump.

Good first response shape:

1. what to use
2. why it fits
3. exact file or command to inspect
4. one next command or question

Avoid:

- listing every skill or command by default
- repeating large README sections
- recommending retired command shims when a skill-first path exists
- claiming a component exists without checking the filesystem
- replacing install guidance with manual copy commands when the managed installer supports the target

## Common Tasks

### New User Onboarding

Give a short menu:

- install or reset ECC
- pick skills for a project
- understand commands vs skills
- inspect hooks and safety behavior
- run a harness audit
- find a specific workflow

Point to `README.md` for install/reset and `/project-init` for project-specific onboarding.

### Feature Discovery

For "what should I use for X?":

1. Search `skills/`, `commands/`, and `agents/`.
2. Prefer skills as the primary workflow surface.
3. Use commands only when they are a maintained compatibility shim or a user explicitly wants slash-command behavior.
4. Mention agents when delegation is useful.

Useful searches:

[See code example 2 in `code-examples.md`]

### Install Guidance

Use managed install paths:

[See code example 3 in `code-examples.md`]

For specific skill installs:

[See code example 4 in `code-examples.md`]

Warn users not to stack plugin installs and full manual/profile installs unless they intentionally want duplicate surfaces.

### Project Onboarding

Use `/project-init` when the user wants ECC configured for a target repo. The expected sequence is:

1. detect the stack from project files
2. resolve a dry-run install plan
3. inspect existing `CLAUDE.md` and settings files
4. ask before applying changes
5. keep generated guidance minimal and repo-specific

### Troubleshooting

Ask for the target harness and install path first, then inspect:

- plugin install metadata
- `.claude/`, `.cursor/`, `.codex/`, `.gemini/`, `.opencode/`, `.codebuddy/`, `.joycode/`, or `.qwen/`
- `hooks/hooks.json`
- install-state files
- relevant command/skill files

For repo health, suggest:

[See code example 5 in `code-examples.md`]

## Output Templates

### Short Recommendation

[See code example 6 in `code-examples.md`]

### Search Results

```text
Best matches:
- <path>: <why it matters>
- <path>: <why it matters>

---

For additional details, continue reading `summary-1.md`.
