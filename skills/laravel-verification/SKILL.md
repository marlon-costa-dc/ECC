---
name: laravel-verification
description: "Use when running a pre-release or pre-pull-request verification loop for a Laravel project, covering environment checks, Composer validation, linting, static analysis, tests, security audits, and migrations."
origin: ECC
---

# Laravel Verification Loop

## When to Activate

- Before opening a pull request or deploying a Laravel project.
- After major refactors or dependency upgrades.
- Validating migration safety, test coverage, and deployment readiness.

## Pipeline

Run phases sequentially:

1. **Environment** — `php -v`, `composer --version`, `php artisan --version`; confirm `.env` and `APP_DEBUG=false`.
2. **Composer** — `composer validate`, `composer dump-autoload -o`.
3. **Lint / static analysis** — `vendor/bin/pint --test`, `vendor/bin/phpstan analyse` (or `vendor/bin/psalm`).
4. **Tests + coverage** — `php artisan test`; CI: `XDEBUG_MODE=coverage php artisan test --coverage`.
5. **Security** — `composer audit`.
6. **Migrations** — `php artisan migrate --pretend`, `php artisan migrate:status`; review destructive changes and rollbacks.
7. **Build readiness** — `php artisan optimize:clear`, `config:cache`, `route:cache`, `view:cache`.
8. **Queues / scheduler** — `php artisan schedule:list`, `php artisan queue:failed`, `php artisan horizon:status` if Horizon.

## Critical Checklist

- [ ] All tests passing with coverage ≥ 80%.
- [ ] No Composer audit failures.
- [ ] No unapplied or destructive migrations without backups.
- [ ] Cache warmups succeed in production config.
- [ ] `storage/` and `bootstrap/cache/` writable.

## Minimal Pipeline

```bash
php -v && composer --version && php artisan --version
composer validate
vendor/bin/pint --test
vendor/bin/phpstan analyse
php artisan test
composer audit
php artisan migrate --pretend
php artisan config:cache
php artisan queue:failed
```

## Related Skills

- `laravel-tdd` — Laravel testing with PHPUnit and Pest
- `laravel-security` — Laravel authentication, authorization, and secure coding
- `laravel-patterns` — Laravel architecture, routing, Eloquent, and API patterns
