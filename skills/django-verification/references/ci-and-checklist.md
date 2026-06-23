# Django Verification: CI and Checklist

## Pre-Deployment Checklist

- [ ] All tests passing.
- [ ] Coverage ≥ 80%.
- [ ] No security vulnerabilities.
- [ ] No unapplied migrations or migration conflicts.
- [ ] `DEBUG=False` in production settings.
- [ ] `SECRET_KEY` properly configured.
- [ ] `ALLOWED_HOSTS` set correctly.
- [ ] Database backups enabled.
- [ ] Static files collected and served.
- [ ] Logging configured and working.
- [ ] Error monitoring (Sentry) configured.
- [ ] CDN configured if applicable.
- [ ] Redis/cache backend configured.
- [ ] Celery workers running if applicable.
- [ ] HTTPS/SSL configured.
- [ ] Environment variables documented.

## CI Example

```yaml
# .github/workflows/django-verification.yml
name: Django Verification
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - uses: actions/cache@v3
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
      - run: |
          pip install -r requirements.txt
          pip install ruff black mypy pytest pytest-django pytest-cov bandit safety pip-audit
      - run: |
          ruff check .
          black . --check
          isort . --check-only
          mypy .
      - run: |
          bandit -r . -f json -o bandit-report.json
          safety check --full-report
          pip-audit
      - env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
          DJANGO_SECRET_KEY: test-secret-key
        run: pytest --cov=apps --cov-report=xml --cov-report=term-missing
      - uses: codecov/codecov-action@v3
```

## Report Template

```
DJANGO VERIFICATION REPORT
==========================
Environment:        ✓
Code quality:       ✓
Migrations:         ✓
Tests:              247 passed, 0 failed, 5 skipped
Coverage:           87% overall
Security:           ✓
Static assets:      ✓
Configuration:      ✓
Diff review:        ✓
RECOMMENDATION:     PASS / WARNING / BLOCK
```

## Quick Reference

| Check | Command |
|-------|---------|
| Environment | `python --version` |
| Type check | `mypy .` |
| Lint | `ruff check .` |
| Format | `black . --check` |
| Migrations | `python manage.py makemigrations --check` |
| Tests | `pytest --cov=apps` |
| Security | `pip-audit && bandit -r .` |
| Django check | `python manage.py check --deploy` |
| Collectstatic | `python manage.py collectstatic --noinput` |
| Diff stats | `git diff --stat` |
