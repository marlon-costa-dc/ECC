---
name: backend-patterns
description: 'Use this skill to use when designing or reviewing server-side architecture,
  APIs, databases, caching, or backend best practices for Node.js, Express, and Next.js
  API routes. DO NOT USE FOR: questions unrelated to backend-patterns creating projects
  or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# backend-patterns

**UTILITY SKILL**

## When to use
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

## Example
**Input:** a request.
**Output:** a concise response.

## USE FOR

- Requests about backend patterns.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to backend-patterns.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
