---
name: kotlin-exposed-patterns
description: "Use when setting up database access with JetBrains Exposed, writing DSL or DAO queries, configuring HikariCP connection pooling, Flyway migrations, repository patterns, JSON columns, or tests."
origin: ECC
---

# Kotlin Exposed Patterns

Patterns for database access with JetBrains Exposed ORM, including DSL and DAO styles, transactions, pooling, migrations, and testing.

## When to Use

- Setting up database access with Exposed
- Writing SQL queries using Exposed DSL or DAO
- Configuring HikariCP connection pooling
- Creating Flyway migrations
- Implementing the repository pattern with Exposed
- Handling JSON columns and complex queries

## Core Rules

1. **Two Query Styles**: Use DSL for direct SQL-like expressions; use DAO for entity lifecycle management. Pick one style per bounded context.
2. **Coroutines**: Wrap all database operations in `newSuspendedTransaction` for coroutine safety and atomicity.
3. **Connection Pooling**: Configure HikariCP with `isAutoCommit = false`, explicit `transactionIsolation`, and validated pool sizes.
4. **Migrations**: Run Flyway before connecting Exposed. Keep versioned SQL scripts under `classpath:db/migration`.
5. **Table Design**: Use `UUIDTable` for UUID primary keys. Add indexes for filter columns. Define references with `onDelete` where appropriate.
6. **Queries**: Use `selectAll().where { }`, `insertAndGetId`, `update`, `deleteWhere`, `batchInsert`, `upsert`, joins, and aggregations. Escape user input in `LIKE` patterns.
7. **Pagination**: Count total rows, then `orderBy`, `limit`, and `offset`.
8. **JSONB**: Use a custom `ColumnType` with `kotlinx.serialization` and `PGobject` for PostgreSQL JSONB.
9. **Repository Pattern**: Wrap Exposed queries behind an interface for testability and decoupling.
10. **Testing**: Use H2 in PostgreSQL mode for in-memory repository tests; create schema in `beforeSpec` and clean data in `beforeTest`.

## References

- Detailed query examples, repository implementation, and Gradle dependencies: [references/exposed-reference.md](references/exposed-reference-1.md)
