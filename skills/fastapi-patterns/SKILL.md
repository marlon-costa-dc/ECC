---
name: fastapi-patterns
description: Use when building or reviewing FastAPI applications where Pydantic v2 schemas, dependency injection, async SQLAlchemy handlers, authentication, transactional service layers, and httpx/pytest testing are required.
origin: ECC
metadata:
  adrs: []
---

# FastAPI Patterns

Modern, production-grade FastAPI development patterns.

## When to Activate

- Building FastAPI APIs or restructuring projects
- Defining Pydantic v2 request/response schemas
- Implementing dependency injection for DB sessions and auth
- Writing async route handlers and service layers
- Setting up httpx/pytest fixtures with in-memory databases

## Key Patterns

- Use an app factory with `lifespan` for startup/shutdown resources
- Load settings via `pydantic-settings` from `.env`
- Declare typed dependencies and alias them: `DbDep = Annotated[AsyncSession, Depends(get_db)]`
- Keep routes thin; move business logic and transactions to services
- Use `response_model` to prevent data leaks and clean OpenAPI output
- Catch `IntegrityError` inside services and map to domain exceptions

## Authentication and Database

- Use `OAuth2PasswordBearer` for token endpoints
- Decode JWT defensively; handle string/integer cast mismatches
- Separate `get_current_user` and `get_current_active_user` for precise `401`/`403`
- Use async SQLAlchemy with `AsyncSession`
- Yield sessions in dependencies and rollback on exception
- Rely on database constraints to prevent race conditions

## Testing and Anti-Patterns

- Use `httpx.AsyncClient` with `ASGITransport`; override `get_db` with an in-memory fixture
- Avoid business logic in route handlers, synchronous ORM in async routes, missing `response_model`, and application-level unique checks without constraints

## Checklist

- [ ] App factory and lifespan configured
- [ ] Settings loaded from environment
- [ ] Pydantic v2 schemas separate request/response shapes
- [ ] Routes thin; services own transactions
- [ ] Async SQLAlchemy used throughout
- [ ] Auth dependencies return precise status codes

## References

- [FastAPI Patterns](references/fastapi-patterns-1.md) — complete code examples

## Related Skills

- `api-design`, `backend-patterns`, `python-patterns`, `python-testing`, `security-review`
