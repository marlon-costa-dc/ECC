---
name: backend-patterns
description: Use when designing or reviewing server-side architecture, APIs, databases, caching, or backend best practices for Node.js, Express, and Next.js API routes.
---

# backend-patterns

## When to use
- Designing REST/GraphQL API endpoints or route handlers.
- Structuring repository, service, controller, or middleware layers.
- Optimizing DB queries (N+1, indexing, select columns, connection pooling).
- Adding caching (Redis, in-memory, HTTP cache headers) or background jobs.
- Building middleware for auth, logging, rate limiting, or error handling.

## What to do
1. **Design resource-oriented APIs**: plural nouns (`/api/markets`), query params for filtering/sorting/pagination, consistent status codes.
2. **Layer the code**: Repository for data access, Service for business logic, Controller/Route for HTTP, Middleware for cross-cutting.
3. **Optimize database access**: select needed columns, batch fetches, use transactions, index hot queries.
4. **Cache intentionally**: cache-aside with TTL and explicit invalidation; never cache without eviction.
5. **Centralize errors and validation**: operational `ApiError`s, handle `ZodError`, safe 500 for unknown failures.
6. **Protect endpoints**: validate JWT, enforce RBAC/permissions, rate-limit, log structured context.
7. **Run work asynchronously**: offload heavy/unreliable work to queues/jobs with retries and backoff.

## Critical rules
- Never expose stack traces or internal details in API errors.
- Never use `.select('*')` in hot paths.
- Never perform N+1 queries; batch fetches.
- Keep business logic out of controllers.
- Invalidate cache on writes.
- Use typed DTOs/Zod schemas for input.
- Set timeouts, retry limits, and idempotency keys for external calls.

## Example
```typescript
class MarketService {
  constructor(private repo: MarketRepository) {}
  async list(filters: MarketFilters) { return this.repo.findAll(filters); }
}

export async function GET(request: Request) {
  const user = await requireAuth(request);
  const filters = marketFiltersSchema.parse(Object.fromEntries(new URL(request.url).searchParams));
  const service = new MarketService(new SupabaseMarketRepository());
  return NextResponse.json({ data: await service.list(filters) });
}
```
