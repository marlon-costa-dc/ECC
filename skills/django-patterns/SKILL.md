---
name: django-patterns
description: Use when building or reviewing Django and Django REST Framework applications, covering project layout, models, QuerySets, serializers, ViewSets, services, caching, signals, and performance optimizations.
origin: ECC
metadata:
  adrs: []
---

# Django Development Patterns

Production-grade Django architecture patterns for scalable, maintainable applications.

## When to Activate

- Building Django web applications or REST APIs
- Designing Django models, QuerySets, and managers
- Implementing DRF serializers and ViewSets
- Adding service layers, caching, signals, or middleware
- Optimizing queries and database performance

## Project and Model Patterns

- Split settings by environment: `base.py`, `development.py`, `production.py`, `test.py`
- Place domain apps under `apps/<name>/` with models, serializers, views, services, permissions, filters
- Extend `AbstractUser` for custom user models; use `related_name` on all relations
- Add `db_table`, `ordering`, `indexes`, and `constraints` in `Meta`

## QuerySet, DRF, and Service Patterns

- Build custom `QuerySet.as_manager()` for reusable filters
- Use `select_related` for foreign keys; `prefetch_related` for many-to-many and reverse relations
- Use `bulk_create`, `bulk_update`, and bulk `delete` for large operations
- Use `ModelSerializer` with explicit `fields` and `read_only_fields`; switch serializers via `get_serializer_class`
- Hash passwords in `create()` with `set_password`
- Use ViewSets with `filter_backends`, `search_fields`, and `ordering_fields`
- Move complex business logic into services wrapped with `@transaction.atomic`
- Cache expensive queries and fragments with explicit TTLs; connect signals in `AppConfig.ready()`
- Eliminate N+1 queries, select only needed fields, and index common filters

## Performance Checklist

- [ ] N+1 queries eliminated
- [ ] Only needed fields selected
- [ ] Indexes match query patterns
- [ ] Bulk operations used for large writes
- [ ] Caching has TTL and invalidation
- [ ] Settings split by environment

## References

- [Django Patterns](references/django-patterns.md) — detailed code examples

## Related Skills

- `django-security`, `django-tdd`, `api-design`, `backend-patterns`
