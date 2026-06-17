# Laravel Security: Eloquent and Input Handling

## Mass Assignment Protection

```php
// BAD: never use $guarded = [] in production

// GOOD: whitelist fillable attributes
final class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'phone', 'avatar'];
    // NEVER add 'role', 'is_admin', 'is_verified' here
}
```

Create only validated data:

```php
$user = User::create($request->validated());
```

Never use `$request->all()` directly for model creation.

## SQL Injection Prevention

```php
// GOOD: parameterization via Eloquent/Query Builder
User::where('email', $userInput)->first();
User::whereRaw('email = ?', [$userInput])->first();
DB::table('users')->where('email', $userInput)->first();
DB::select('SELECT * FROM users WHERE email = ?', [$userInput]);

// BAD: raw string interpolation
DB::select("SELECT * FROM users WHERE email = '{$userInput}'");
User::whereRaw("email = '{$userInput}'");
User::orderByRaw($userInput);
DB::statement("INSERT INTO users (email) VALUES ('{$userInput}')");
```

## Attribute Casting

```php
final class User extends Authenticatable
{
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
        'settings' => 'array',
        'metadata' => 'encrypted:array',
        'password' => 'hashed',
    ];
}
```

## Model Security

```php
final class User extends Authenticatable
{
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_secret',
        'two_factor_recovery_codes',
    ];

    protected $appends = ['full_name']; // safe computed attributes only
}
```

## CSRF Protection

Laravel enables CSRF protection by default. Include `@csrf` in all state-changing forms:

```blade
<form method="POST" action="/posts">
    @csrf
    <input type="text" name="title">
    <button type="submit">Create</button>
</form>
```

Exclude only specific verified webhook routes:

```php
class VerifyCsrfToken extends Middleware
{
    protected $except = [
        'stripe/*', // Stripe webhooks verify their own signatures
    ];
}
```

## XSS Prevention

```blade
{{-- Auto-escaped by Blade --}}
{{ $userInput }}

{{-- DANGEROUS: never use with user input --}}
{!! $userInput !!}

{{-- Safe for JavaScript contexts --}}
<script>
    const user = @js($user);
</script>
```

If HTML is required, whitelist with HTMLPurifier:

```php
$config = \HTMLPurifier_Config::createDefault();
$config->set('HTML.Allowed', 'p,b,i,a[href],ul,ol,li,br');
$config->set('URI.AllowedSchemes', ['http', 'https', 'mailto']);
$purifier = new \HTMLPurifier($config);
$clean = $purifier->purify($dirty);
```

Set security headers via middleware:

```php
$response->headers->set('X-Content-Type-Options', 'nosniff');
$response->headers->set('X-Frame-Options', 'DENY');
$response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
$response->headers->set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'"
);
```

## Input Validation

```php
final class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Post::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:10000'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,gif,webp', 'max:2048'],
            'tags' => ['array'],
            'tags.*' => ['integer', 'exists:tags,id'],
        ];
    }

    public function validated($key = null, $default = null): mixed
    {
        $validated = parent::validated();
        $validated['title'] = strip_tags($validated['title']);
        return $key ? ($validated[$key] ?? $default) : $validated;
    }
}
```


