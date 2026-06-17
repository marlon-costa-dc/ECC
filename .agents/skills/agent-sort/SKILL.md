---
name: agent-sort
description: 'Build an evidence-backed ECC install plan by sorting skills, commands,
  rules, hooks, and extras into DAILY vs LIBRARY buckets using repo-aware parallel
  review passes. DO NOT USE FOR: questions unrelated to agent-sort creating projects
  or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# agent-sort

**UTILITY SKILL**

## Quando usar
## O que fazer
1. **Read the repo** — identify languages, frameworks, package manager, test/lint/deploy stack, and existing operator surfaces
2. **Build an evidence table** — for each candidate, record path, type, proposed bucket, repo evidence, and short justification
3. **Classify into two buckets only**
   - `DAILY`: load every session; strongly matches the repo's stack
   - `LIBRARY`: keep accessible but do not load by default
4. **Produce the install plan** — DAILY items go to `.claude/skills/`, matching rules, compatible hooks; LIBRARY stays reachable through search or `skill-library`
5. **Verify** — confirm every DAILY file exists, stale rules/hooks are gone, and the result matches the repo stack

## Regras críticas
- Use the current repository as the source of truth, never generic preferences
- Every DAILY decision must cite concrete repo evidence
- LIBRARY does not mean delete; it means keep reachable without default loading
- Do not install hooks, rules, or scripts the repo cannot use
- Prefer ECC-native surfaces; do not introduce a second install system

## Exemplo

Hand off to `configure-ecc` for installation, `skill-stocktake` for catalog cleanup, or `strategic-compact` for broader context trimming.

## USE FOR

- Requests about agent sort.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to agent-sort.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
