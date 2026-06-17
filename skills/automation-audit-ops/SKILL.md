---
name: automation-audit-ops
description: Use this skill to run an evidence-first automation inventory and overlap audit. Identify which jobs, hooks, connectors, MCP servers, or wrappers are live, broken, redundant, or missing before fixing anything.
---

# Automation Audit Ops

**UTILITY SKILL**

Audit automations before rewriting them. Produce an evidence-backed inventory and a keep / merge / cut / fix-next recommendation set.

## USE FOR:

- "What automations do I have?", "what is live/broken/overlapping?"
- Auditing cron jobs, Actions, hooks, MCP servers, connectors, wrappers.
- Collapsing duplicate paths into one canonical ECC lane.

## DO NOT USE FOR:

- Rewriting automations before the inventory exists.
- Claiming a tool is live just because a skill references it.

## INVOKES:

- `workspace-surface-audit` for connector/MCP/hook/app inventory.
- `github-ops` for CI, workflows, issues, PR automation.
- `knowledge-ops` to reconcile repo truth with durable context.
- `verification-loop` to prove post-fix state.

## Workflow

1. **Inventory the real surface** — read hooks, GitHub Actions, MCP configs, connectors, wrapper scripts.
2. **Classify live state** — configured / authenticated / recently verified / stale / broken / missing.
3. **Trace the proof path** — cite file path, workflow run, hook log, config entry, or failure signature.
4. **Recommend** — keep / merge / cut / fix-next for each item.

## Output Format

```text
CURRENT SURFACE
- automation | source | live state | proof

FINDINGS
- active breakage | overlap | stale status | missing capability

RECOMMENDATION
- keep | merge | cut | fix-next

NEXT ECC MOVE
- exact skill / hook / workflow / app lane to strengthen
```

## Examples:

- "What jobs are running in this repo?" → inventory hooks + Actions → classify live state.
- "Is this connector redundant?" → map overlaps → recommend merge or cut with proof.

## Troubleshooting:

- State ambiguous → say so; do not pretend the audit is complete.
- Tool looks configured but fails → treat as broken until verified with a recent run.
- User asks to fix before inventory → pause and complete the inventory first.
