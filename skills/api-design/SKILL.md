---
name: api-design
description: Use when designing, reviewing, or versioning REST APIs where consistent resource naming, HTTP semantics, pagination, filtering, authentication, rate limiting, and error shapes are required for production endpoints.
origin: ECC
metadata:
  adrs: []
---

# API Design Patterns

Conventions for consistent, developer-friendly REST APIs.

## When to Activate

- Designing or reviewing API endpoints
- Adding pagination, filtering, sorting, or search
- Implementing error envelopes, versioning, auth, or rate limiting
- Building public or partner-facing APIs

## Core Rules

- Resources are plural, lowercase, kebab-case nouns: `/api/v1/users`, `/api/v1/team-members`
- No verbs in URLs; use HTTP methods: `GET /users` not `/getUsers`
- Use sub-resources for ownership: `/users/:id/orders`
- Return semantic HTTP status codes; never return 200 for errors or 500 for validation failures
- Use a standard error envelope: `{ "error": { "code", "message", "details" } }`
- Validate input with schemas (Zod, Pydantic, Bean Validation)

## Pagination, Filtering, Versioning

- **Offset-based**: simple, supports jump-to-page; best for small datasets and search results
- **Cursor-based**: stable performance; best for infinite scroll, feeds, and public APIs
- Filter with equality (`?status=active`), comparisons (`?price[gte]=10`), multi-value (`?category=a,b`)
- Sort with `?sort=-created_at,price`; sparse fieldsets with `?fields=id,name,email`
- Prefer URL path versioning (`/api/v1/users`, `/api/v2/users`); maintain at most 2 versions

## Quality Checklist

- [ ] URLs are plural, kebab-case, verb-free
- [ ] Correct HTTP methods and status codes used
- [ ] Input validated with a schema
- [ ] Errors follow the standard envelope
- [ ] List endpoints paginated
- [ ] Auth, authorization, and rate limiting explicit
- [ ] OpenAPI/Swagger spec updated

## References

- [REST API Patterns](references/rest-api-patterns.md) — detailed examples and response formats

## Related Skills

- `backend-patterns`, `fastapi-patterns`, `nestjs-patterns`, `django-patterns`, `security-review`
