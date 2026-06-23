GET /api/v1/users?cursor=eyJpZCI6MTIzfQ&limit=20
```

```json
{
  "data": [...],
  "meta": {
    "has_next": true,
    "next_cursor": "eyJpZCI6MTQzfQ"
  }
}
```

**Pros:** Consistent performance, stable with concurrent inserts.
**Cons:** Cannot jump to arbitrary page, cursor is opaque.

| Use Case | Pagination Type |
|----------|----------------|
| Admin dashboards, small datasets (<10K) | Offset |
| Infinite scroll, feeds, large datasets | Cursor |
| Public APIs | Cursor (default) with offset (optional) |
| Search results | Offset (users expect page numbers) |

## Filtering, Sorting, and Search

```text
# Simple equality
GET /api/v1/orders?status=active&customer_id=abc-123

# Comparison operators (bracket notation)
GET /api/v1/products?price[gte]=10&price[lte]=100
GET /api/v1/orders?created_at[after]=2025-01-01

# Multiple values (comma-separated)
GET /api/v1/products?category=electronics,clothing

# Nested fields (dot notation)
GET /api/v1/orders?customer.country=US

# Sorting (prefix - for descending)
GET /api/v1/products?sort=-created_at

# Sparse fieldsets
GET /api/v1/users?fields=id,name,email
```

## Authentication and Authorization

```text
# Bearer token
GET /api/v1/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# API key (server-to-server)
GET /api/v1/data
X-API-Key: sk_live_abc123
```

## Rate Limiting

```text
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

| Tier | Limit | Window | Use Case |
|------|-------|--------|----------|
| Anonymous | 30/min | Per IP | Public endpoints |
| Authenticated | 100/min | Per user | Standard API access |
| Premium | 1000/min | Per API key | Paid API plans |
| Internal | 10000/min | Per service | Service-to-service |

## Versioning

Recommended: URL path versioning.

```text
/api/v1/users
/api/v2/users
```

- Start with `/api/v1/`; don't version until needed.
- Maintain at most 2 active versions.
- Add `Sunset` header before deprecation; return `410 Gone` after sunset.
- Non-breaking changes (new fields, optional params, new endpoints) don't need a new version.
- Breaking changes (removing/renaming fields, changing types, URL/auth changes) require a new version.

## Implementation Examples

See language-specific backend skills for complete examples:

- `backend-patterns` (Node.js/Next.js)
- `fastapi-patterns` (Python)
- `nestjs-patterns` (TypeScript/NestJS)
- `django-patterns` (Python/Django REST Framework)
