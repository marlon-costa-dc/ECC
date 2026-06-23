# MySQL Patterns

MySQL and MariaDB schema, query, indexing, transaction, and configuration patterns. For detailed query patterns, transactions, diagnostics, and configuration examples, see `references/mysql-patterns-extended.md`.

## Activation

- Designing MySQL or MariaDB tables, indexes, and constraints
- Reviewing migrations before they run on large production tables
- Debugging slow queries, lock waits, deadlocks, or connection exhaustion
- Adding keyset pagination, upserts, full-text search, JSON columns, or queues
- Configuring application connection pools, read replicas, TLS, or slow logs

## Version Check

[See code example 1 in `code-examples.md`]

- MySQL: row aliases replace `VALUES(col)` in `ON DUPLICATE KEY UPDATE`; `VALUES(col)` is deprecated.
- MariaDB: `VALUES(col)` remains supported for cross-engine compatibility.
- `SKIP LOCKED` is for queue-like work only; it skips locked rows and can return inconsistent views.

## Schema Defaults

[See code example 2 in `code-examples.md`]

Default choices: `BIGINT UNSIGNED AUTO_INCREMENT` for surrogate PKs, `BINARY(16)` for UUID lookups, `DECIMAL` for money, `utf8mb4` for text, `deleted_at` for soft deletes, and a lookup table or constrained `VARCHAR` instead of `ENUM` when values change often.

## Indexing

Composite index order: equality predicates first, then range or sort columns.

[See code example 3 in `code-examples.md`]

Use `EXPLAIN` before adding or changing an index.

## Related

- Reference: `references/mysql-patterns-extended.md`
- Skill: `postgres-patterns`
- Skill: `database-migrations`
- Skill: `backend-patterns`
