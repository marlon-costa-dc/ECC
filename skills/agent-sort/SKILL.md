---
name: agent-sort
description: Use when a repository needs a project-specific ECC surface instead of the default full install, requiring skills, commands, rules, hooks, and extras to be classified into DAILY and LIBRARY buckets using concrete repo evidence rather than opinion.
origin: ECC
---

# Agent Sort

Classify ECC components into `DAILY` (always loaded) and `LIBRARY` (searchable reference) using repo evidence.

## When to Use

- Project only needs a subset of ECC
- Full installs are too noisy
- Team wants repeatable, grep-backed install decisions
- Repo has drifted into the wrong language/rule/hook set

## Rules

- Use the current repo as source of truth
- Every `DAILY` decision cites concrete evidence
- `LIBRARY` means accessible without loading by default
- Do not install surfaces the repo cannot use
- Prefer ECC-native surfaces

## Classification

- **DAILY**: loads every session; strongly matched to repo language/framework/workflow
- **LIBRARY**: useful to retain but not loaded by default

## Outputs

DAILY inventory, LIBRARY inventory, install plan, verification report, `skill-library` router.

## Evidence Sources

File extensions, package managers/lockfiles, framework/CI/hook configs, build/test scripts, imports, dependency manifests, repo docs.

## Parallel Review Passes

If subagents are available, split into Agents, Skills, Commands, Rules, Hooks/scripts, Extras. Otherwise run sequentially.

## Workflow

1. Read the repo — languages, frameworks, package manager, test/lint/deploy surfaces
2. Build evidence table — component, type, proposed bucket, evidence, justification
3. Decide — promote to DAILY when clearly matched and general; demote to LIBRARY when off-stack
4. Build install plan — DAILY to `.claude/skills/`, matching rules, compatible hooks; LIBRARY to search/router
5. Optional library router — create `.claude/skills/skill-library/SKILL.md`
6. Verify — every DAILY file exists, stale rules/hooks removed, install matches repo stack

## Handoffs

- Interactive install/repair → `configure-ecc`
- Overlap cleanup/catalog review → `skill-stocktake`
- Broader context trimming → `strategic-compact`

## Output Format

Return STACK, DAILY, LIBRARY, INSTALL PLAN, and VERIFICATION sections.
