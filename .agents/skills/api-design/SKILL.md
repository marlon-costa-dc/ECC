---
name: api-design
description: 'Use this skill to use when designing, reviewing, or refactoring REST
  APIs and deciding resource naming, HTTP methods, status codes, pagination, filtering,
  error formats, versioning, or rate limiting. DO NOT USE FOR: questions unrelated
  to api-design creating projects or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
---
# api-design

**UTILITY SKILL**

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
## Example
**Input:** a request.
**Output:** a concise response.

## USE FOR

- Requests about api design.
- Workflows described in this skill.
- Operator tasks within this scope.

## DO NOT USE FOR

- questions unrelated to api-design.
- creating projects or architecture from scratch.

## Workflow

1. **Understand** intent and constraints.
2. **Execute** the canonical approach.
3. **Validate** with native checks.

## Troubleshooting

- Unclear scope → ask.
- Missing context → state assumptions.
