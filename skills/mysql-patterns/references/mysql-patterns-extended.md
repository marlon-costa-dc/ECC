# MySQL Patterns — Extended Reference

Detailed query patterns, transactions, connection pools, diagnostics, replication, security, and configuration examples. The SKILL.md file contains the essential schema defaults and indexing guidance; this file preserves the expanded examples.

## Query Patterns

### Upsert

Cross-engine-compatible form:

```sql
INSERT INTO user_settings (user_id, setting_key, setting_value)
VALUES (?, ?, ?)
ON DUPLICATE KEY UPDATE
    setting_value = VALUES(setting_value),
    updated_at = CURRENT_TIMESTAMP;
```

MySQL row-alias form:

```sql
INSERT INTO user_settings (user_id, setting_key, setting_value)
VALUES (?, ?, ?) AS new
ON DUPLICATE KEY UPDATE
    setting_value = new.setting_value,
    updated_at = CURRENT_TIMESTAMP;
```

Use the row-alias form only after confirming the target is MySQL. Use `VALUES(col)` for MariaDB or mixed fleets.

### Keyset Pagination

```sql
SELECT id, name, created_at
FROM products
WHERE (created_at, id) < (?, ?)
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

Back it with an index that matches the cursor:

```sql
CREATE INDEX idx_products_created_id ON products (created_at, id);
```

### JSON Fields

```sql
CREATE TABLE events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    payload JSON NOT NULL,
    event_type VARCHAR(64)
        GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(payload, '$.type'))) STORED,
    KEY idx_events_type (event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Full-Text Search

```sql
ALTER TABLE articles ADD FULLTEXT KEY ft_articles_title_body (title, body);

SELECT id, title, MATCH(title, body) AGAINST (? IN NATURAL LANGUAGE MODE) AS score
FROM articles
WHERE MATCH(title, body) AGAINST (? IN NATURAL LANGUAGE MODE)
ORDER BY score DESC
LIMIT 20;
```

## Transactions

Keep transactions short and lock rows in a consistent order:

```sql
START TRANSACTION;
SELECT id, balance
FROM accounts
WHERE id IN (?, ?)
ORDER BY id
FOR UPDATE;
UPDATE accounts SET balance = balance - ? WHERE id = ?;
UPDATE accounts SET balance = balance + ? WHERE id = ?;
COMMIT;
```

Queue-style worker claim:

```sql
START TRANSACTION;
SELECT id
FROM jobs
WHERE status = 'pending'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;
UPDATE jobs
SET status = 'processing', started_at = CURRENT_TIMESTAMP
WHERE id = ?;
COMMIT;
```

## Connection Pools

SQLAlchemy example:

```python
from sqlalchemy import create_engine

engine = create_engine(
    "mysql+mysqlconnector://app:secret@db.internal/app",
    pool_size=10,
    max_overflow=5,
    pool_timeout=30,
    pool_recycle=240,
    pool_pre_ping=True,
    connect_args={"connect_timeout": 5},
)
```

Node.js `mysql2` example:

```javascript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,
});
```

## Diagnostics

```sql
SHOW FULL PROCESSLIST;
SHOW ENGINE INNODB STATUS\G;
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL log_queries_not_using_indexes = 'ON';
```

Use `EXPLAIN ANALYZE` only when it is safe to execute the query.

## Replication

Read replicas can lag. Do not route read-your-own-write paths, checkout flows, permission checks, or idempotency-key reads to a replica immediately after a write.

```sql
SHOW SLAVE STATUS\G;
SHOW REPLICA STATUS\G;
```

## Security

```sql
CREATE USER 'app'@'%' IDENTIFIED BY 'use-a-secret-manager';
GRANT SELECT, INSERT, UPDATE, DELETE ON appdb.* TO 'app'@'%';
ALTER USER 'app'@'%' REQUIRE SSL;
DROP USER IF EXISTS ''@'localhost';
DROP USER IF EXISTS ''@'%';
```

- Do not grant `ALL PRIVILEGES` or `*.*` to application users.
- Require TLS for application users when traffic crosses hosts or networks.
- Separate migration/admin users from runtime application users.

## Configuration

Example starting point for a dedicated database host:

```ini
[mysqld]
innodb_buffer_pool_size = 4G
innodb_flush_log_at_trx_commit = 1
sync_binlog = 1
max_connections = 300
thread_cache_size = 50
wait_timeout = 300
interactive_timeout = 300
innodb_lock_wait_timeout = 10
slow_query_log = ON
long_query_time = 1
log_queries_not_using_indexes = ON
log_bin = mysql-bin
binlog_format = ROW
binlog_expire_logs_seconds = 604800
```

## Anti-Patterns

---

For additional details, continue reading `mysql-patterns-extended-1.md`.
