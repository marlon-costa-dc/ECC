# Code Examples

## Example 1

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

## Example 2

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
