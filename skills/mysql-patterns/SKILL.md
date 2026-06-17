---
name: mysql-patterns
description: Use when designing MySQL or MariaDB tables, indexes, and constraints, reviewing migrations on large production tables, debugging slow queries and deadlocks, adding pagination or queues, or configuring connection pools and production database settings.
---

# MySQL Patterns

MySQL and MariaDB schema, query, indexing, transaction, and configuration patterns. For detailed query patterns, transactions, diagnostics, and configuration examples, see `references/mysql-patterns-extended.md`.

## Activation

- Designing MySQL or MariaDB tables, indexes, and constraints
- Reviewing migrations before they run on large production tables
- Debugging slow queries, lock waits, deadlocks, or connection exhaustion
- Adding keyset pagination, upserts, full-text search, JSON columns, or queues
- Configuring application connection pools, read replicas, TLS, or slow logs

## Version Check

```sql
SELECT VERSION();
SHOW VARIABLES LIKE 'version_comment';
```

- MySQL: row aliases replace `VALUES(col)` in `ON DUPLICATE KEY UPDATE`; `VALUES(col)` is deprecated.
- MariaDB: `VALUES(col)` remains supported for cross-engine compatibility.
- `SKIP LOCKED` is for queue-like work only; it skips locked rows and can return inconsistent views.

## Schema Defaults

```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_id BIGINT UNSIGNED NOT NULL,
    status VARCHAR(32) NOT NULL,
    total DECIMAL(15, 2) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    PRIMARY KEY (id),
    KEY idx_orders_account_status_created (account_id, status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Default choices: `BIGINT UNSIGNED AUTO_INCREMENT` for surrogate PKs, `BINARY(16)` for UUID lookups, `DECIMAL` for money, `utf8mb4` for text, `deleted_at` for soft deletes, and a lookup table or constrained `VARCHAR` instead of `ENUM` when values change often.

## Indexing

Composite index order: equality predicates first, then range or sort columns.

```sql
CREATE INDEX idx_orders_account_status_created
    ON orders (account_id, status, created_at);
```

Use `EXPLAIN` before adding or changing an index.

## Related

- Reference: `references/mysql-patterns-extended.md`
- Skill: `postgres-patterns`
- Skill: `database-migrations`
- Skill: `backend-patterns`
