---
name: laravel-tdd
description: "Use when writing, refactoring, or reviewing Laravel tests with PHPUnit or Pest to enforce test-driven development, factory usage, HTTP/feature tests, Sanctum authentication testing, mocking, and coverage."
origin: ECC
---

# Laravel TDD

## When to Activate

- Writing new Laravel applications or features.
- Implementing API endpoints with Sanctum or Passport authentication.
- Testing Eloquent models, relationships, scopes, and accessors.
- Writing feature tests for HTTP controllers and form requests.
- Mocking external services (queues, mail, notifications, HTTP, storage).

## Core Rules

1. **Red-Green-Refactor**: write a failing test, make it pass, then refactor.
2. **Factories over manual creation**: use `Model::factory()` for test data.
3. **One logical assertion** per test with a descriptive name.
4. **Use `RefreshDatabase`** for clean state between feature tests.
5. **Mock service boundaries** only (HTTP, mail, notifications, queues, storage).
6. **Target coverage**: models/policies 95%+, actions/services/requests 90%+, controllers 85%+, overall 80%+.

## Minimal Example

```php
public function test_a_product_can_be_created(): void
{
    $product = Product::factory()->create(['name' => 'Test Product']);
    $this->assertDatabaseHas('products', ['name' => 'Test Product']);
}
```

See the `references/` folder for setup, factories, model/feature tests, JSON API, Sanctum auth, fakes, and coverage.

## Related Skills

- `laravel-patterns` — Laravel architecture, routing, Eloquent, and API patterns
- `laravel-security` — Laravel authentication, authorization, and secure coding
- `tdd-workflow` — RED -> GREEN -> REFACTOR loop
- `backend-patterns` — General backend API and database patterns
