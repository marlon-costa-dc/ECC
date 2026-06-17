---
name: django-security
description: Use when configuring or reviewing Django application security, including production settings, authentication, authorization, password hashing, sessions, CSRF and XSS protection, SQL injection prevention, file uploads, rate limiting, and secrets.
origin: ECC
metadata:
  adrs: []
---

# Django Security Best Practices

Security guidelines for Django applications against common vulnerabilities.

## When to Activate

- Setting up Django authentication and authorization
- Configuring production security settings and HTTPS
- Implementing permissions, roles, and object-level access control
- Reviewing Django code for security issues
- Handling file uploads, secrets, or security headers

## Core Security Settings

- Set `DEBUG = False` in production
- Restrict `ALLOWED_HOSTS` to known domains
- Enable HTTPS redirects, secure cookies, and HSTS
- Set `X_FRAME_OPTIONS = 'DENY'` and content-type nosniff
- Load `SECRET_KEY` from environment variables only
- Enable password validators with a minimum length of 12

## Authentication and Authorization

- Use a custom `AbstractUser` model and set `AUTH_USER_MODEL`
- Prefer Argon2 or strong hashers in `PASSWORD_HASHERS`
- Use server-side sessions stored in cache or database
- Use Django permissions and `PermissionRequiredMixin`
- Implement object-level ownership with DRF `BasePermission`

## Injection, XSS, CSRF

- Use the ORM; never concatenate user input into raw SQL
- Use parameterized queries if raw SQL is required
- Rely on Django template auto-escaping and safe helpers
- Keep CSRF middleware enabled and use `{% csrf_token %}`
- Send `X-CSRFToken` in AJAX requests; exempt views only for external webhooks

## Uploads, API, and Secrets

- Validate file extensions and size; store uploads outside the web root
- Enable DRF throttling for anonymous and authenticated users
- Require authentication by default; use token/JWT for API clients
- Manage secrets with `django-environ` or `python-decouple`; never commit `.env` files
- Log security events to a dedicated handler
- Keep Django and dependencies updated

## References

- [Django Security Reference](references/django-security.md) — detailed snippets and checklist

## Related Skills

- `django-patterns`, `django-tdd`, `security-review`, `api-design`
