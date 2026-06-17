---
name: source-command-database-migration
description: Use when scaffolding or running the /database-migration source command workflow for the everything-Codex repository, its migration pipeline, and validation gates.
---

# source-command-database-migration

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
