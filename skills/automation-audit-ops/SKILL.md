---
name: automation-audit-ops
description: 'Use this skill to run an evidence-first automation inventory and overlap
  audit. Identify which jobs, hooks, connectors, MCP servers, or wrappers are live,
  broken, redundant, or missing before fixing anything. DO NOT USE FOR: questions
  unrelated to automation-audit-ops creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# Automation Audit Ops

**UTILITY SKILL**

Audit automations before rewriting them. Produce evidence-backed inventory plus keep / merge / cut / fix-next recommendations.

## USE FOR:

- "What automations do I have?", "what is live/broken/overlapping?"
- Auditing cron jobs, Actions, hooks, MCP servers, connectors, wrappers.
- Collapsing duplicate paths into one canonical ECC lane.

## DO NOT USE FOR:

- Rewriting automations before the inventory exists.
- Claiming a tool is live just because a skill references it.

## INVOKES

- `workspace-surface-audit` for connector/MCP/hook/app inventory.
- `github-ops` for CI, workflows, issues, PR automation.
- `verification-loop` to prove post-fix state.

## Workflow

1. **Inventory** hooks, Actions, MCP configs, connectors, and wrapper scripts.
2. **Classify** each item as configured, authenticated, verified, stale, broken, or missing.
3. **Prove** status with file path, workflow run, hook log, config entry, or failure signature.
4. **Recommend** keep, merge, cut, or fix-next for each item.

## Output Format

```text
CURRENT SURFACE
- automation | source | live state | proof

FINDINGS
- breakage | overlap | stale status | missing capability

RECOMMENDATION
- keep | merge | cut | fix-next

NEXT ECC MOVE
- exact skill / hook / workflow / app lane to strengthen
```

## Examples

- "What jobs are running in this repo?" → inventory hooks + Actions → classify live state.
- "Is this connector redundant?" → map overlaps → recommend merge/cut with proof.

## Troubleshooting

- State ambiguous → say so; do not pretend the audit is complete.
- Tool looks configured but fails → treat as broken until verified.
- Fix requested before inventory → complete the inventory first.
