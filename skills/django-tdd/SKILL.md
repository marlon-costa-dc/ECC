---
name: django-tdd
description: "Use when writing, refactoring, or reviewing Django tests with pytest-django, factory_boy, and Django REST Framework to enforce test-driven development, reliable fixtures, and coverage gates."
origin: ECC
---

# Django TDD

## When to Activate

- Writing or refactoring Django models, views, serializers, or APIs.
- Adding pytest fixtures, factories, or coverage thresholds.
- Mocking external services (email, payments, HTTP) in Django tests.
- Setting up test settings and CI for a Django project.

## Core Rules

1. **Red-Green-Refactor**: write a failing test, make it pass, then refactor.
2. **Factories over manual setup**: use `factory_boy` for test data.
3. **One logical assertion** per test with a descriptive name.
4. **Mock external boundaries only** (HTTP, email, payment gateways).
5. **Run fast**: use `--reuse-db --nomigrations` in `pytest.ini`.
6. **Coverage targets**: models/services 90%+, views/serializers 80%+, overall 80%+.

## Minimal Example

```python
# tests/factories.py
class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    email = factory.Sequence(lambda n: f"user{n}@example.com")
    password = factory.PostGenerationMethodCall('set_password', 'testpass123')

# tests/test_api.py
def test_create_product(authenticated_api_client):
    response = authenticated_api_client.post('/api/products/', {'name': 'X'})
    assert response.status_code == 201
```

See [references/setup-and-factories.md](references/setup-and-factories.md), [references/model-view-tests.md](references/model-view-tests.md), and [references/api-mocking-coverage.md](references/api-mocking-coverage.md) for full patterns.

## Related Skills

- `django-patterns` — Django architecture and ORM patterns
- `django-celery` — Testing Celery tasks in Django
- `python-testing` — pytest configuration and fixtures
- `tdd-workflow` — RED -> GREEN -> REFACTOR loop
