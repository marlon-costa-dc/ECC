# Django Verification Pipeline Reference

## Phase 1: Environment Check

```bash
python --version
which python
pip list --outdated
python -c "import os; print('DJANGO_SECRET_KEY set' if os.environ.get('DJANGO_SECRET_KEY') else 'MISSING')"
```

Stop if the environment is misconfigured.

## Phase 2: Code Quality

```bash
mypy . --config-file pyproject.toml
ruff check . --fix
black . --check
isort . --check-only
python manage.py check --deploy
```

Common issues: missing type hints, PEP 8 violations, unsorted imports, debug settings in production config.

## Phase 3: Migrations

```bash
python manage.py showmigrations
python manage.py makemigrations --check
python manage.py migrate --plan
python manage.py migrate
python manage.py makemigrations --merge  # only if conflicts exist
```

Report pending migrations, conflicts, and model changes without migrations.

## Phase 4: Tests + Coverage

```bash
pytest --cov=apps --cov-report=html --cov-report=term-missing --reuse-db
pytest apps/users/tests/
pytest -m "not slow"
pytest -m integration
```

| Component | Target |
|-----------|--------|
| Models | 90%+ |
| Serializers | 85%+ |
| Views | 80%+ |
| Services | 90%+ |
| Overall | 80%+ |

## Phase 5: Security Scan

```bash
pip-audit
safety check --full-report
python manage.py check --deploy
bandit -r . -f json -o bandit-report.json
gitleaks detect --source . --verbose
python -c "from django.conf import settings; assert not settings.DEBUG"
```

Report vulnerable dependencies, security misconfigurations, hardcoded secrets, and `DEBUG` status.

## Phase 6: Management Commands

```bash
python manage.py check
python manage.py collectstatic --noinput --clear
python manage.py check --database default
python -c "from django.core.cache import cache; cache.set('test','value',10); print(cache.get('test'))"
```

## Phase 7: Performance

```bash
python manage.py shell << EOF
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("SELECT table_name, index_name FROM information_schema.statistics WHERE table_schema = 'public'")
    print(cursor.fetchall())
EOF
```

Target fewer than 50 queries per typical page; watch for N+1 and missing indexes.

## Phase 8: Static Assets

```bash
npm audit
npm run build
ls -la staticfiles/
python manage.py findstatic css/style.css
```

## Phase 9: Configuration Review

```python
python manage.py shell << EOF
from django.conf import settings
checks = {
    'DEBUG is False': not settings.DEBUG,
    'SECRET_KEY set': bool(settings.SECRET_KEY and len(settings.SECRET_KEY) > 30),
    'ALLOWED_HOSTS set': len(settings.ALLOWED_HOSTS) > 0,
    'HTTPS enabled': getattr(settings, 'SECURE_SSL_REDIRECT', False),
    'HSTS enabled': getattr(settings, 'SECURE_HSTS_SECONDS', 0) > 0,
    'Database configured': settings.DATABASES['default']['ENGINE'] != 'django.db.backends.sqlite3',
}
for check, result in checks.items():
    print(f"{'✓' if result else '✗'} {check}")
EOF
```

## Phase 10: Diff Review

```bash
git diff --stat
git diff
git diff --name-only
git diff | grep -i "todo\|fixme\|hack\|xxx"
git diff | grep "print("
git diff | grep "DEBUG = True"
git diff | grep "import pdb"
```

Checklist: no debug statements, no TODO/FIXME in critical code, no hardcoded secrets, migrations included for model changes, error handling present, transaction management where needed.
