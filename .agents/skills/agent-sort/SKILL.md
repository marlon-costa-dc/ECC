---
name: agent-sort
description: Build an evidence-backed ECC install plan by sorting skills, commands, rules, hooks, and extras into DAILY vs LIBRARY buckets using repo-aware parallel review passes.
---

# agent-sort

## Quando usar
- A project needs a trimmed ECC surface instead of the full bundle
- The repo stack is clear but manual skill curation is unwanted
- A team wants install decisions backed by repo evidence, not opinion
- The repo has drifted into the wrong language, rule, or hook set

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
```text
skills/frontend-patterns | skill | DAILY  | 84 .tsx files, next.config.ts present | core frontend stack
skills/django-patterns   | skill | LIBRARY| no .py files, no pyproject.toml       | not active in this repo
rules/typescript/*       | rules | DAILY  | package.json + tsconfig.json            | active TS repo
rules/python/*           | rules | LIBRARY| zero Python source files                | keep accessible only
```

Hand off to `configure-ecc` for installation, `skill-stocktake` for catalog cleanup, or `strategic-compact` for broader context trimming.
