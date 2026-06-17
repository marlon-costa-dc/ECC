# Laravel Security: Secrets, Supply Chain, and Logging

## Composer Security

```bash
# Audit dependencies in CI
composer audit

# Pin major versions in composer.json
"laravel/framework": "^11.0",
"spatie/laravel-permission": "^6.0"

# Keep composer.lock in version control; run composer update deliberately
```

## Secret Management

```bash
# .env file — NEVER commit
APP_KEY=base64:abc123...
DB_PASSWORD=secure_password
STRIPE_KEY=sk_live_...
SANCTUM_TOKEN_PREFIX=myapp_
```

Validate secrets at boot:

```php
$secrets = ['services.stripe.key', 'services.stripe.webhook_secret'];
foreach ($secrets as $key) {
    if (empty(config($key))) {
        Log::critical("Missing secret: {$key}");
    }
}
```

For production, inject secrets from a secret manager rather than committing them.

## Queue Security

```php
RateLimiter::for('payments', fn () => Limit::perMinute(5));
```

Encrypt sensitive job data:

```php
final class ProcessPaymentJob implements ShouldQueue, ShouldBeEncrypted
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly string $paymentIntentId,
        private readonly string $cardFingerprint,
    ) {}

    public function handle(): void
    {
        // Process payment
    }

    public function retryUntil(): Carbon
    {
        return now()->addMinutes(5);
    }

    public function middleware(): array
    {
        return [new RateLimited('payments')];
    }
}
```

## Logging Security Events

```php
// config/logging.php
'channels' => [
    'security' => [
        'driver' => 'single',
        'path' => storage_path('logs/security.log'),
        'level' => 'warning',
    ],
],
```

```php
final class SecurityLogger
{
    public static function log(string $event, array $context = []): void
    {
        Log::channel('security')->warning($event, array_merge([
            'user_id' => Auth::id(),
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'url' => request()->fullUrl(),
            'timestamp' => now()->toIso8601String(),
        ], $context));
    }
}

SecurityLogger::log('failed_login_attempt', ['email' => $email]);
SecurityLogger::log('role_change', ['target_user' => $targetId, 'new_role' => 'admin']);
```

## Quick Security Checklist

| Check | Description |
|-------|-------------|
| `APP_DEBUG=false` | Never run with debug enabled in production |
| `APP_KEY` set | Always run `php artisan key:generate` |
| HTTPS enforced | Force HTTPS in production |
| `$fillable` whitelisted | Never use `$guarded = []` |
| CSRF active | `@csrf` on all state-changing forms |
| Sanctum/Passport configured | API authentication with token abilities/scopes |
| Rate limiting applied | Throttle API and auth endpoints |
| Input validation | FormRequest with specific rules, never `$request->all()` |
| File upload restrictions | Validate MIME types, size, dimensions |
| `composer audit` in CI | Check dependencies for known vulnerabilities |
| Password hashing | Use bcrypt/Argon2 |
| Session regeneration on login | Call `$request->session()->regenerate()` |
| Security headers middleware | CSP, X-Frame-Options, X-Content-Type-Options |
| Logged security events | Audit log for auth failures, role changes, suspicious activity |
| `.env` not committed | Verify `.gitignore` includes `.env` |

## Related Skills

- `laravel-patterns` — Laravel architecture, routing, Eloquent, and API patterns
- `laravel-tdd` — Laravel testing with PHPUnit and Pest
- `backend-patterns` — General backend API and database patterns
