---
name: redis-patterns
description: Use when adding caching to an application, implementing rate limiting or throttling, building distributed locks or coordination, setting up session or token storage, using Pub/Sub or Redis Streams for messaging, or configuring Redis in production with pooling, eviction, and clustering.
---

# Redis Patterns

Quick reference for Redis best practices. For detailed code examples, see `references/redis-patterns-extended.md`.

## When to Activate

- Adding caching to an application
- Implementing rate limiting or throttling
- Building distributed locks or coordination
- Setting up session or token storage
- Using Pub/Sub or Redis Streams for messaging
- Configuring Redis in production

## Data Structures

- String: simple cache, counters, rate limits
- Hash: user session
- Sorted Set: leaderboard
- Set: unique visitors
- List: activity feed
- Stream: durable event queue

## Core Patterns

### Cache-Aside (Lazy Loading)

```python
cache_key = f"product:{product_id}"
cached = r.get(cache_key)
if cached:
    return json.loads(cached)
product = db.query("SELECT * FROM products WHERE id = %s", product_id)
r.setex(cache_key, 3600, json.dumps(product))
return product
```

### Distributed Lock

```python
token = str(uuid.uuid4())
acquired = r.set(f"lock:{resource}", token, px=ttl_ms, nx=True)
# Release with Lua check to avoid deleting someone else's lock
```

For multi-node setups use a Redlock implementation.

## TTL and Eviction

Always set a TTL. Common TTLs: sessions 24h, API caches 5–15 min, rate-limit windows match window size, short-lived tokens 5–10 min. Eviction policies: `noeviction` for queues/critical data; `allkeys-lru` for general cache; `volatile-lru` for mixed stores; `allkeys-lfu` for skewed access. Set via `redis.conf`: `maxmemory-policy allkeys-lru`.

## Anti-Patterns

- Keys with no TTL — always set TTL.
- `KEYS *` in production — use `SCAN` cursor.
- Storing large blobs (>100KB) — store reference + fetch from object store.
- Single Redis for everything — use separate DBs or instances.
- `FLUSHALL` without thought — scope deletes by key pattern.

## Related

- Reference: `references/redis-patterns-extended.md`
- Skill: `postgres-patterns`
- Skill: `backend-patterns`
- Skill: `database-migrations`
