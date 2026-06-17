---
name: api-design
description: Use when designing, reviewing, or refactoring REST APIs and deciding resource naming, HTTP methods, status codes, pagination, filtering, error formats, versioning, or rate limiting.
---

# api-design

## What to do
1. **Resources**: plural nouns, kebab-case URLs; sub-resources for relationships; no verbs in URLs.
2. **HTTP methods**: GET (read), POST (create/action), PUT (replace), PATCH (partial update), DELETE (remove).
3. **Status codes**: 200/201/204 success; 400/401/403/404/409/422/429 client errors; 500/502/503 server errors.
4. **Response envelope**: success `{ data, meta?, links? }`; errors `{ error: { code, message, details? } }`.
5. **Pagination**: cursor for large/infinite lists; offset for admin/search with page numbers.
6. **Filtering/sorting**: equality (`status=active`), operators (`price[gte]=10`), multi-value (`category=a,b`), sort (`sort=-created_at`).
7. **Auth & rate limiting**: Bearer/API keys, ownership checks, rate-limit headers.
8. **Versioning**: URL path (`/api/v1/...`), max 2 versions, deprecate with `Sunset`.

## Critical rules
- Never return 200 for every response or put success/failure inside the body.
- Never expose stack traces, SQL errors, or internal details.
- Use plural resource names; no verbs or singular nouns in URLs.
- Use snake_case or camelCase consistently.
- Validate input with schemas; return 400/422 with field-level errors.
- Include `Location` on 201; `Retry-After` on 503/429.
- Non-breaking changes don't need a new version.

## Example
```http
POST /api/v1/users
Authorization: Bearer <token>
Content-Type: application/json

{ "email": "alice@example.com", "name": "Alice" }

HTTP/1.1 201 Created
Location: /api/v1/users/abc-123

{ "data": { "id": "abc-123", "email": "alice@example.com", "name": "Alice" } }
```
