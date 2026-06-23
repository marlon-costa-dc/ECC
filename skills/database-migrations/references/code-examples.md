# Code Examples

## Example 1

```sql
-- Add nullable column safely
ALTER TABLE users ADD COLUMN avatar_url TEXT;

-- Add default column safely (Postgres 11+ is instant)
ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Non-blocking index
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);
```
