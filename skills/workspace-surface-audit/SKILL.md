---
name: workspace-surface-audit
description: Use this skill to audit the active repo, MCP servers, plugins, connectors, env surfaces, and harness setup. Recommend the highest-value ECC-native skills, hooks, agents, and workflows to add or enable next.
---

# Workspace Surface Audit

**UTILITY SKILL**

Answer "what can this workspace do right now, and what should we add next?" with evidence.

## USE FOR:

- "Set up Claude Code", "what plugins/MCPs should I use?", "what am I missing?"
- Auditing a machine or repo before installing more skills, hooks, or connectors.
- Deciding whether a capability should be a skill, hook, agent, MCP, or connector.

## DO NOT USE FOR:

- Modifying files unless the user explicitly asks for follow-up implementation.
- Printing secret values.

## INVOKES:

- File reads (`package.json`, `.mcp.json`, `.claude/settings*.json`, `AGENTS.md`, `CLAUDE.md`).
- `automation-audit-ops` when jobs/workflows overlap.
- `knowledge-ops` when reconciling repo truth with context.

## Rules

- Surface only provider names, file paths, and config existence (no secret values).
- Prefer ECC-native workflows; separate available now / unwrapped / missing.

## Workflow

1. Inventory repo, env, connected tools, and ECC surfaces.
2. Benchmark against official/installed plugins.
3. Turn gaps into ECC decisions (skill, hook, agent, MCP, connector).

## Output Format

1. Current surface — what is usable now.
2. Parity — where ECC matches or exceeds benchmarks.
3. Primitive-only gaps — tools exist but lack an operator skill.
4. Missing integrations — not available yet.
5. Top 3-5 next moves — concrete ECC-native additions, ordered by impact.

## Examples:

- "What can this repo do?" → inventory → parity → top moves.
- "Should I add a billing skill?" → check connected apps → recommend skill or connector.

## Troubleshooting:

- Ambiguous state → say so; do not invent capability.
- Secret suspected but unconfirmed → surface key name only and warn.
- Too many gaps → prioritize 1-2 highest-value moves per category.
