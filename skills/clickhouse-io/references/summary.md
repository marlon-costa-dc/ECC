# ClickHouse Analytics Patterns

ClickHouse-specific patterns for high-performance analytics. For detailed analytics query examples and data pipeline patterns, see `references/clickhouse-analytics-queries.md`.

## When to Activate

- Designing ClickHouse table schemas and engine selection
- Writing analytical queries with aggregations or window functions
- Optimizing query performance via partitioning and materialized views
- Ingesting large volumes of data
- Migrating from PostgreSQL/MySQL to ClickHouse for analytics
- Implementing real-time dashboards or time-series analytics

## Table Design

[See code example 1 in `code-examples.md`]

## Query Optimization

Filter on indexed/partitioned columns first. Use `sum`, `count`, `uniq`, and `quantile`. Batch inserts; avoid individual inserts and small frequent writes.

[See code example 2 in `code-examples.md`]

## Best Practices

1. Partition by time (month or day); avoid too many partitions.
2. Ordering key: most-filtered columns first, high cardinality first.
3. Use smallest appropriate types; `LowCardinality` for repeated strings.
4. Avoid `SELECT *`, `FINAL`, too many JOINs, and small frequent inserts.
5. Monitor query performance, disk usage, merge operations, slow query log.

## Related

- Reference: `references/clickhouse-analytics-queries.md`
- Skill: `postgres-patterns`
- Skill: `mysql-patterns`
