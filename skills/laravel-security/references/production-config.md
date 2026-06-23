# Laravel Security: Production Configuration

## Essential Production Settings

```php
// config/app.php
'env' => env('APP_ENV', 'production'),
'debug' => (bool) env('APP_DEBUG', false), // Never true in production
'key' => env('APP_KEY'), // Must be set: php artisan key:generate

// bootstrap/app.php or service provider
if (empty(config('app.key'))) {
    throw new RuntimeException('APP_KEY is not set. Run: php artisan key:generate');
}
```

```php
// config/session.php
'secure' => env('SESSION_SECURE_COOKIE', true),
'http_only' => true,
'same_site' => 'lax',
```

## Environment File Security

```bash
# NEVER commit .env; .gitignore already includes it by default.
# Use .env.example with placeholders:
DB_PASSWORD=
APP_KEY=
SANCTUM_TOKEN_PREFIX=
```

Validate required variables at boot:

```php
// AppServiceProvider::boot()
$requiredKeys = [
    'app.key',
    'database.connections.mysql.database',
    'database.connections.mysql.username',
];
foreach ($requiredKeys as $key) {
    if (empty(config($key))) {
        throw new RuntimeException("Missing required config key: {$key}");
    }
}
```

## HTTPS Enforcement

```php
// AppServiceProvider::boot() or middleware
if (app()->environment('production')) {
    URL::forceScheme('https');
    request()->server->set('HTTPS', 'on');
}

// config/app.php — trusted proxies for load balancers
// Use specific ranges; '*' trusts all and allows X-Forwarded-* spoofing.
'trusted_proxies' => ['10.0.0.0/8', '172.16.0.0/12'],
```

Force HTTPS middleware:

```php
public function handle($request, Closure $next)
{
    if (!$request->secure() && app()->environment('production')) {
        return redirect()->secure($request->getRequestUri());
    }
    return $next($request);
}
```

## Session Management

```php
// config/session.php
'driver' => env('SESSION_DRIVER', 'database'), // database/redis > file
'lifetime' => env('SESSION_LIFETIME', 120),
'expire_on_close' => env('SESSION_EXPIRE_ON_CLOSE', false),
'encrypt' => env('SESSION_ENCRYPT', false),
```

Regenerate session on login to prevent fixation:

```php
public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();
    return redirect()->intended(RouteServiceProvider::HOME);
}
```

Invalidate session on logout:

```php
public function destroy(Request $request): RedirectResponse
{
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
}
```
