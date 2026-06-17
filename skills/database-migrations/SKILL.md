---
name: database-migrations
description: Use when creating or altering database tables, adding or removing columns and indexes, running data migrations or backfills, planning zero-downtime schema changes, or setting up migration tooling for a new project across PostgreSQL, MySQL, and common ORMs.
---

# Database Migration Patterns

Safe, reversible schema changes for production systems. For ORM-specific workflows, see `references/orm-migration-guides.md`.

## When to Activate

- Creating or altering database tables
- Adding/removing columns or indexes
- Running data migrations (backfill, transform)
- Planning zero-downtime schema changes
- Setting up migration tooling for a new project

## Core Principles

1. Every change is a migration — never alter production databases manually.
2. Migrations are forward-only in production; rollbacks use new forward migrations.
3. Schema and data migrations are separate — never mix DDL and DML.
4. Test against production-sized data; a migration that works on 100 rows may lock on 10M.
5. Migrations are immutable once deployed — never edit a migration that has run.

## Safety Checklist

- [ ] Migration has UP and DOWN (or is explicitly irreversible)
- [ ] No full table locks on large tables (use concurrent operations)
- [ ] New columns have defaults or are nullable (never add NOT NULL without default)
- [ ] Indexes created concurrently for existing tables
- [ ] Data backfill is a separate migration from schema change
- [ ] Tested against a copy of production data
- [ ] Rollback plan documented

## PostgreSQL Patterns

```sql
-- Add nullable column safely
ALTER TABLE users ADD COLUMN avatar_url TEXT;

-- Add default column safely (Postgres 11+ is instant)
ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Non-blocking index
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);
```

## Zero-Downtime Rename

Use expand-contract: add new column, backfill, update app to write both, then drop old column in a later migration.

## Anti-Patterns

- Manual SQL in production — no audit trail; always use migration files.
- Editing deployed migrations — causes drift; create a new migration instead.
- NOT NULL without default — locks table; add nullable, backfill, then add constraint.
- Inline index on large table — blocks writes; use `CREATE INDEX CONCURRENTLY`.
- Schema + data in one migration — hard to rollback; separate them.
- Dropping column before removing code — causes errors; remove code first.

## Related

- Reference: `references/orm-migration-guides.md`
- Skill: `postgres-patterns`
- Skill: `mysql-patterns`
- Skill: `backend-patterns`
