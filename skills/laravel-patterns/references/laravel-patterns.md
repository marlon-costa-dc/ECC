# Laravel Patterns Reference

## Project Structure

```text
app/
├── Actions/
├── Http/
│   ├── Controllers/
│   ├── Requests/
│   └── Resources/
├── Jobs/
├── Models/
├── Policies/
├── Providers/
└── Services/
config/
database/
├── factories/
├── migrations/
└── seeders/
routes/
├── api.php
├── web.php
└── console.php
```

## Routing

```php
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('projects', ProjectController::class);

Route::scopeBindings()->group(function () {
    Route::get('/accounts/{account}/projects/{project}', [ProjectController::class, 'show']);
});

Route::model('conversation', AiConversation::class);
```

## Service Container

```php
final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(OrderRepository::class, EloquentOrderRepository::class);
    }
}
```

## Eloquent Patterns

```php
final class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'owner_id', 'status'];
    protected $casts = ['status' => ProjectStatus::class, 'archived_at' => 'datetime'];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('archived_at');
    }
}
```

```php
protected function budgetCents(): Attribute
{
    return Attribute::make(
        get: fn (int $value) => Money::fromCents($value),
        set: fn (Money $money) => $money->toCents(),
    );
}
```

Eager load to avoid N+1:

```php
$orders = Order::query()
    ->with(['customer', 'items.product'])
    ->latest()
    ->paginate(25);
```

## Transactions

```php
use Illuminate\Support\Facades\DB;

DB::transaction(function (): void {
    $order->update(['status' => 'paid']);
    $order->items()->update(['paid_at' => now()]);
});
```

## Migrations

```php
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->string('status', 32)->index();
            $table->unsignedInteger('total_cents');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
```

## Form Requests

```php
final class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Order::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'integer', 'exists:customers,id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.sku' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ];
    }

    public function toDto(): CreateOrderData
    {
        return new CreateOrderData(
            customerId: (int) $this->validated('customer_id'),
            items: $this->validated('items'),
        );
    }
}
```

## API Resources

```php
$projects = Project::query()->active()->paginate(25);

return response()->json([
    'success' => true,
    'data' => ProjectResource::collection($projects->items()),
    'meta' => [
        'page' => $projects->currentPage(),
        'per_page' => $projects->perPage(),
        'total' => $projects->total(),
    ],
]);
```

## Events, Jobs, and Queues

- Emit domain events for side effects (emails, analytics).
- Use queued jobs for slow work (reports, exports, webhooks).
- Prefer idempotent handlers with retries and backoff.

## Caching

- Cache read-heavy endpoints and expensive queries.
- Invalidate caches on model events (`created`/`updated`/`deleted`).

## Configuration

- Keep secrets in `.env` and config in `config/*.php`.
- Use per-environment overrides and `config:cache` in production.
