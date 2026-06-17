---
name: postgres-patterns
description: Use when working on PostgreSQL schema design, query optimization, indexing, Row Level Security, connection pooling, or production configuration. Provides canonical patterns and anti-patterns for PostgreSQL backends.
---

# PostgreSQL Patterns

Quick reference for PostgreSQL best practices. For full diagnostics and extended examples, see `references/postgres-patterns.md` and use the `database-reviewer` agent.

## When to Activate

- Writing SQL queries or migrations
- Designing database schemas
- Troubleshooting slow queries
- Implementing Row Level Security
- Setting up connection pooling

## Index Patterns

- Equality: `CREATE INDEX idx ON t (col)`
- Composite equality + range: `CREATE INDEX idx ON t (a, b)`
- JSONB: `CREATE INDEX idx ON t USING gin (col)`
- Time-series: `CREATE INDEX idx ON t USING brin (col)`
- Covering: `CREATE INDEX idx ON users (email) INCLUDE (name, created_at)`
- Partial: `CREATE INDEX idx ON users (email) WHERE deleted_at IS NULL`

## Data Types

Prefer `bigint` for IDs, `text` for strings, `timestamptz` for timestamps, and `numeric` for money. Avoid `int` PKs, `varchar(255)` defaults, `timestamp` without zone, and `float` for exact values.

## Common Patterns

```sql
-- RLS policy (wrap auth call in SELECT)
CREATE POLICY policy ON orders USING ((SELECT auth.uid()) = user_id);

-- UPSERT
INSERT INTO settings (user_id, key, value) VALUES (123, 'theme', 'dark')
ON CONFLICT (user_id, key) DO UPDATE SET value = EXCLUDED.value;

-- Cursor pagination
SELECT * FROM products WHERE id > $last_id ORDER BY id LIMIT 20;

-- Queue processing
UPDATE jobs SET status = 'processing'
WHERE id = (SELECT id FROM jobs WHERE status = 'pending'
            ORDER BY created_at LIMIT 1 FOR UPDATE SKIP LOCKED)
RETURNING *;

-- Configuration
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET work_mem = '8MB';
ALTER SYSTEM SET statement_timeout = '30s';
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
REVOKE ALL ON SCHEMA public FROM public;
SELECT pg_reload_conf();
```

## Related

- Agent: `database-reviewer`
- Skill: `clickhouse-io`
- Skill: `backend-patterns`
- Reference: `references/postgres-patterns.md`
