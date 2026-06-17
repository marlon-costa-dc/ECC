---
name: backend-patterns
description: Use when designing, implementing, or reviewing backend architecture for Node.js, Express, or Next.js APIs, including layered code organization, database optimization, caching, async processing, authentication, and structured error handling.
origin: ECC
metadata:
  adrs: []
---

# Backend Development Patterns

Backend architecture patterns for scalable server-side applications.

## When to Activate

- Designing REST or GraphQL API endpoints
- Implementing repository, service, or controller layers
- Optimizing database queries (N+1, indexing, connection pooling)
- Adding caching, background jobs, async processing, middleware, auth, or rate limiting

## Core Patterns

- **Repository pattern**: abstract data access behind an interface
- **Service layer**: keep business logic separate from HTTP and data access
- **Middleware**: compose cross-cutting concerns (auth, logging, rate limiting)
- **Cache-aside**: check cache, fetch on miss, write back with TTL
- **Structured logging**: emit JSON logs with request IDs

## Best Practices

- Select only needed columns; avoid `SELECT *`
- Batch related queries to prevent N+1 problems
- Use transactions for multi-step writes
- Add indexes for common filters and sorts
- Use connection pooling in production
- Define an `ApiError` with status code and operational flag; centralize handling
- Map validation errors to `400`; return generic `500` without stack traces
- Validate tokens in middleware; enforce resource-level authorization in services
- Use Redis or a shared store for caching and rate limiting
- Never rely on in-memory counters in serverless or multi-instance deployments
- Use queues instead of blocking HTTP requests; isolate job consumers from controllers

## Quality Checklist

- [ ] Data access abstracted behind repositories
- [ ] Business logic lives in services, not controllers
- [ ] Input validated before processing
- [ ] Errors use consistent envelopes
- [ ] N+1 queries eliminated
- [ ] Caching has TTL and invalidation
- [ ] Auth and authorization explicit
- [ ] Rate limiting uses a shared store
- [ ] Logs structured with request context

## References

- [Backend Patterns](references/backend-patterns.md) — detailed code examples

## Related Skills

- `api-design`, `fastapi-patterns`, `nestjs-patterns`, `django-patterns`, `security-review`, `redis-patterns`
