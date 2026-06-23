# Laravel Security: API and File Handling

## Rate Limiting

```php
// App/Providers/RouteServiceProvider
protected function configureRateLimiting(): void
{
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });

    RateLimiter::for('auth', function (Request $request) {
        return Limit::perMinute(5)->by($request->ip())
            ->response(fn () => response()->json(['message' => 'Too many login attempts.'], 429));
    });

    RateLimiter::for('uploads', function (Request $request) {
        return Limit::perHour(10)->by($request->user()?->id ?? $request->ip())
            ->response(fn () => response()->json(['message' => 'Upload limit reached.'], 429));
    });
}
```

Apply to routes:

```php
Route::middleware(['auth:sanctum', 'throttle:api'])->apiResource('posts', PostController::class);
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:auth');
```

## API Authentication

Sanctum for first-party/SPA APIs:

```php
// config/sanctum.php
'expiration' => 60 * 24,
'model' => User::class,

// Scoped token
$token = $user->createToken('client-name', ['posts:read', 'posts:write'])->plainTextToken;

// Route scoping
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->middleware('abilities:posts:read');
    Route::post('/posts', [PostController::class, 'store'])->middleware('abilities:posts:write');
});
```

Passport for OAuth2/third-party clients:

```php
Passport::tokensExpireIn(now()->addDays(15));
Passport::refreshTokensExpireIn(now()->addDays(30));
Passport::personalAccessTokensExpireIn(now()->addMonths(6));
```

## CORS Configuration

```php
// config/cors.php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', '')),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['X-Total-Count', 'X-Pagination-Page'],
    'max_age' => 0,
    'supports_credentials' => true, // Required for Sanctum SPA auth
];
```

Avoid `'allowed_origins' => ['*']` in production unless the API is truly public.

## File Upload Security

Validation:

```php
public function rules(): array
{
    return [
        'document' => [
            'required',
            'file',
            'mimes:pdf,doc,docx,xls,xlsx',
            'max:10240',
            'extensions:pdf,doc,docx,xls,xlsx',
        ],
        'avatar' => [
            'nullable',
            'image',
            'mimes:jpg,jpeg,png,webp',
            'max:2048',
            'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000',
        ],
    ];
}
```

Secure storage:

```php
// Store sensitive files outside the public disk
$path = $request->file('document')->store('documents', 'local');

// Serve via temporary signed URLs
use Illuminate\Support\Facades\Storage;

public function download(Request $request, string $path)
{
    $this->authorize('download', $path);
    return redirect(Storage::temporaryUrl($path, now()->addMinutes(15)));
}
```

Cloud storage with encryption at rest:

```php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'server_side_encryption' => 'AES256',
],
```
