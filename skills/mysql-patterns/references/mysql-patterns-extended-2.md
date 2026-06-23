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
