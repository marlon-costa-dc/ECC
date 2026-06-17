---
name: source-command-database-migration
description: 'Use this skill to workflow command scaffold for database-migration in
  everything-Codex. Use this skill when the user asks to run the migrated source command
  `database-migration`. DO NOT USE FOR: questions unrelated to source-command-database-migration
  creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# source-command-database-migration

**UTILITY SKILL**

Use this skill when the user asks to run the migrated source command `database-migration`.

## Command Template

# /database-migration

Use this workflow when working on **database-migration** in `everything-Codex`.

## Goal

Database schema changes with migration files

## Common Files

- `**/schema.*`
- `migrations/*`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create migration file
- Update schema definitions
- Generate/update types

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.

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

## Critical rules

- Prefer canonical sources.
- Require evidence before claiming success.

## Example

**Input:** a request.
**Output:** a concise response.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
