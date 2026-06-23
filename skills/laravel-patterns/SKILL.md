---
name: laravel-patterns
description: "Use when building, refactoring, or reviewing Laravel applications to apply architecture patterns, routing, Eloquent ORM, service layers, form requests, API resources, queues, events, and caching."
origin: ECC
---

# Laravel Patterns

## When to Activate

- Building Laravel web applications or APIs.
- Structuring controllers, services, actions, and domain logic.
- Working with Eloquent models, relationships, scopes, and accessors.
- Designing APIs with resources, pagination, and route bindings.
- Adding queues, events, caching, and background jobs.

## Core Rules

1. **Thin controllers** delegate to actions/services; keep HTTP logic in controllers.
2. **Use typed models** with casts, enums, and named scopes.
3. **Route-model binding** with scoped bindings for nested resources.
4. **Eager load** relationships to avoid N+1 queries.
5. **Form requests** own validation and DTO conversion.
6. **Cache read-heavy** endpoints and invalidate on model events.
7. **Run `config:cache`, `route:cache`, `view:cache`** in production.

## Minimal Example

```php
final class CreateOrderAction
{
    public function __construct(private OrderRepository $orders) {}

    public function handle(CreateOrderData $data): Order
    {
        return $this->orders->create($data);
    }
}

final class OrdersController extends Controller
{
    public function __construct(private CreateOrderAction $createOrder) {}

    public function store(StoreOrderRequest $request): JsonResponse
    {
        $order = $this->createOrder->handle($request->toDto());
        return response()->json([
            'success' => true,
            'data' => OrderResource::make($order),
        ], 201);
    }
}
```

See [references/laravel-patterns.md](references/laravel-patterns.md) for project structure, routing, Eloquent patterns, migrations, form requests, resources, events, jobs, queues, caching, and configuration.

## Related Skills

- `laravel-security` — Laravel authentication, authorization, and secure coding
- `laravel-tdd` — Laravel testing with PHPUnit and Pest
- `laravel-verification` — Pre-release verification loop for Laravel
- `backend-patterns` — General backend API and database patterns
