---
name: source-command-database-migration
description: 'Use this skill to use when scaffolding or running the /database-migration
  source command workflow for the everything-Codex repository, its migration pipeline,
  and validation gates. DO NOT USE FOR: questions unrelated to source-command-database-migration
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# source-command-database-migration

**UTILITY SKILL**

## When to use
- The user asks to run the migrated source command `database-migration`.
- You are doing database schema or migration work in `everything-Codex`.

## What to do
1. Inspect the current state: schema definitions, existing migrations, and any failure mode.
2. Make the smallest coherent change — usually a new migration file plus updated schema/types.
3. Run the most relevant verification for the files you touched.
4. Summarize what changed and flag anything still needing review.

## Critical rules
- Understand before editing; do not guess schema changes.
- Keep migrations minimal and reversible where possible.
- Always verify generated types and schema integrity after changes.
- Treat this as a living scaffold; update it if the workflow evolves materially.

## USE FOR

- Requests about source command database migration.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to source-command-database-migration.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
