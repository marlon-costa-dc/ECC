    round(clicked / viewed * 100, 2) AS view_to_click_rate,
    round(completed / clicked * 100, 2) AS click_to_completion_rate
FROM (
    SELECT
        user_id,
        session_id,
        event_type AS step
    FROM events
    WHERE event_date = today()
)
GROUP BY session_id;
```

### Cohort Analysis

```sql
SELECT
    toStartOfMonth(signup_date) AS cohort,
    toStartOfMonth(activity_date) AS month,
    dateDiff('month', cohort, month) AS months_since_signup,
    count(DISTINCT user_id) AS active_users
FROM (
    SELECT
        user_id,
        min(toDate(timestamp)) OVER (PARTITION BY user_id) AS signup_date,
        toDate(timestamp) AS activity_date
    FROM events
)
GROUP BY cohort, month, months_since_signup
ORDER BY cohort, months_since_signup;
```

## Data Pipeline Patterns

### ETL Pattern

```typescript
async function etlPipeline() {
  const rawData = await extractFromPostgres()
  const transformed = rawData.map(row => ({
    date: new Date(row.created_at).toISOString().split('T')[0],
    market_id: row.market_slug,
    volume: parseFloat(row.total_volume),
    trades: parseInt(row.trade_count)
  }))
  await bulkInsertToClickHouse(transformed)
}
setInterval(etlPipeline, 60 * 60 * 1000)
```

### Change Data Capture (CDC)

```typescript
import { Client } from 'pg'

const pgClient = new Client({ connectionString: process.env.DATABASE_URL })
pgClient.query('LISTEN market_updates')

pgClient.on('notification', async (msg) => {
  const update = JSON.parse(msg.payload)
  await clickhouse.insert('market_updates', [{
    market_id: update.id,
    event_type: update.operation,
    timestamp: new Date(),
    data: JSON.stringify(update.new_data)
  }])
})
```
