---
name: laravel-security
description: "Use when setting up, reviewing, or hardening Laravel authentication, authorization, input validation, CSRF/XSS protection, API security, file uploads, and production configuration."
origin: ECC
---

# Laravel Security

## When to Activate

- Setting up Laravel authentication and authorization.
- Configuring production security settings and environment variables.
- Reviewing Laravel apps for common vulnerabilities.
- Writing secure Eloquent queries, migrations, and form requests.
- Deploying Laravel applications to production.

## Core Rules

1. **Never commit `.env`**; validate required keys at boot.
2. **`APP_DEBUG=false`** and `APP_KEY` set in production.
3. **Force HTTPS** and define trusted proxies explicitly.
4. **Whitelist `$fillable`**; never use `$guarded = []`.
5. **Use parameter binding**; never interpolate user input into raw SQL.
6. **Validate all input** via Form Requests; never use `$request->all()` directly.
7. **Escape output** with `{{ }}`; use `{!! !!}` only with trusted/purified HTML.
8. **Use CSRF tokens** on state-changing forms; exclude only verified webhooks.
9. **Apply rate limiting** to API and auth endpoints.
10. **Hash passwords** with bcrypt/Argon2 and regenerate sessions on login.
11. **Run `composer audit`** in CI and log security events.

## Minimal Examples

```php
// Production guard
if (empty(config('app.key'))) {
    throw new RuntimeException('APP_KEY is not set.');
}

// Safe mass assignment
User::create($request->validated());

// Parameterized query
User::where('email', $userInput)->first();
```

See the `references/` folder for production config, authentication, authorization, Eloquent/input security, API/files, secrets/logging, and the security checklist.

## Related Skills

- `laravel-patterns` — Laravel architecture, routing, Eloquent, and API patterns
- `laravel-tdd` — Laravel testing with PHPUnit and Pest
- `backend-patterns` — General backend API and database patterns
