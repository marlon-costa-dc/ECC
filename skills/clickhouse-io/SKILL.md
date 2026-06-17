---
name: clickhouse-io
description: Use when designing ClickHouse table schemas, writing analytical queries, optimizing query performance, ingesting large volumes of data, migrating from PostgreSQL/MySQL to ClickHouse for analytics, or implementing real-time dashboards and time-series analytics.
---

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

```sql
-- MergeTree
CREATE TABLE markets_analytics (
    date Date, market_id String, volume UInt64, trades UInt32
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date) ORDER BY (date, market_id);

-- ReplacingMergeTree (deduplication)
CREATE TABLE user_events (
    event_id String, user_id String, event_type String, timestamp DateTime
) ENGINE = ReplacingMergeTree()
PARTITION BY toYYYYMM(timestamp) ORDER BY (user_id, event_id, timestamp);

-- AggregatingMergeTree (pre-aggregation)
CREATE TABLE market_stats_hourly (
    hour DateTime, market_id String,
    total_volume AggregateFunction(sum, UInt64),
    total_trades AggregateFunction(count, UInt32)
) ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(hour) ORDER BY (hour, market_id);
```

## Query Optimization

Filter on indexed/partitioned columns first. Use ClickHouse-specific aggregations such as `sum`, `count`, `uniq`, and `quantile`. Batch inserts; avoid individual inserts and small frequent writes.

```sql
SELECT
    toStartOfDay(created_at) AS day, market_id,
    sum(volume) AS total_volume,
    count() AS total_trades,
    uniq(trader_id) AS unique_traders
FROM trades
WHERE created_at >= today() - INTERVAL 7 DAY
GROUP BY day, market_id
ORDER BY day DESC, total_volume DESC;
```

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
- Agent: `database-reviewer`
