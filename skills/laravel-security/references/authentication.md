# Laravel Security: Authentication

## Sanctum (API Token Authentication)

```php
// config/sanctum.php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ',' . parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
'expiration' => 60 * 24, // minutes; null = never
'token_prefix' => env('SANCTUM_TOKEN_PREFIX', ''),
```

Issue scoped tokens:

```php
$token = $user->createToken('api-token', ['read', 'write'])->plainTextToken;
```

Protect routes:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', fn () => /* ... */)->middleware('abilities:read');
    Route::post('/orders', fn () => /* ... */)->middleware('abilities:write');
});
```

## Password Security

```php
// config/hashing.php
'bcrypt' => [
    'rounds' => env('BCRYPT_ROUNDS', 12),
],
'argon' => [
    'memory' => 65536,
    'threads' => 4,
    'time' => 4,
],
```

Validation with uncompromised check:

```php
use Illuminate\Validation\Rules\Password;

public function rules(): array
{
    return [
        'password' => [
            'required',
            'confirmed',
            Password::min(12)
                ->letters()
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised(),
        ],
    ];
}
```

## Session Authentication Best Practices

- Store sessions in `database` or `redis`, not `file`.
- Regenerate session ID on login and invalidate on logout.
- Use `SESSION_SECURE_COOKIE=true`, `http_only=true`, and `same_site='lax'`.
- Rate limit login attempts and notify users of suspicious activity.

## Password Reset and Account Lockout

- Throttle password reset endpoints.
- Enforce token expiry for password resets.
- Log failed login attempts and lock accounts after repeated failures.
