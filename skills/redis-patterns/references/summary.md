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

[See code example 1 in `code-examples.md`]

### Distributed Lock

[See code example 2 in `code-examples.md`]

For multi-node setups use a Redlock implementation.

## TTL and Eviction

Always set a TTL. Common TTLs: sessions 24h, API caches 5–15 min, rate-limit windows match window size, short-lived tokens 5–10 min. Eviction policies: `noeviction` for queues/critical data; `allkeys-lru` for general cache; `volatile-lru` for mixed stores; `allkeys-lfu` for skewed access. Set via `redis.conf`: `maxmemory-policy allkeys-lru`.

## Anti-Patterns

- Keys with no TTL; use `SCAN` instead of `KEYS *`; storing large blobs (>100KB); single Redis for everything; unscoped `FLUSHALL`.

## Related

- Reference: `references/redis-patterns-extended.md`
- Skill: `postgres-patterns`
- Skill: `backend-patterns`
- Skill: `database-migrations`
