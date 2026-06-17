# PostgreSQL Patterns — Extended Reference

Extended quick reference for PostgreSQL best practices. The SKILL.md file contains the essential quick-reference; this file preserves additional diagnostic queries, anti-pattern detection, and context.

## Anti-Pattern Detection

```sql
-- Find unindexed foreign keys
SELECT conrelid::regclass, a.attname
FROM pg_constraint c
JOIN pg_attribute a ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
WHERE c.contype = 'f'
  AND NOT EXISTS (
    SELECT 1 FROM pg_index i
    WHERE i.indrelid = c.conrelid AND a.attnum = ANY(i.indkey)
  );

-- Find slow queries
SELECT query, mean_exec_time, calls
FROM pg_stat_statements
WHERE mean_exec_time > 100
ORDER BY mean_exec_time DESC;

-- Check table bloat
SELECT relname, n_dead_tup, last_vacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;
```

## Additional Index Patterns

**Full-Text Search:**
```sql
CREATE INDEX idx_fts ON articles USING gin(to_tsvector('english', title || ' ' || body));
SELECT * FROM articles
WHERE to_tsvector('english', title || ' ' || body) @@ to_tsquery('english', 'search');
```

## Credits

*Based on Supabase Agent Skills (credit: Supabase team) (MIT License)*
