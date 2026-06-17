---
name: django-verification
description: "Use when running a pre-release or pre-pull-request verification loop for a Django project, covering environment checks, linting, migrations, tests, security scans, and deployment readiness."
origin: ECC
---

# Django Verification Loop

## When to Activate

- Before opening a pull request or deploying a Django project.
- After major model changes, migration updates, or dependency upgrades.
- Validating migration safety, test coverage, and security posture.

## Pipeline

Run phases in order and stop on failure:

1. **Environment** — Python/venv versions and required env vars.
2. **Code quality** — `mypy`, `ruff`, `black`, `isort`, `manage.py check --deploy`.
3. **Migrations** — `showmigrations`, `makemigrations --check`, `migrate --plan`.
4. **Tests + coverage** — `pytest --cov=apps --reuse-db`.
5. **Security** — `pip-audit`, `bandit`, `gitleaks`, `check --deploy`.
6. **Static/assets** — `collectstatic`, `npm audit`/`npm run build` if applicable.
7. **Configuration** — `DEBUG=False`, `SECRET_KEY`, `ALLOWED_HOSTS`, HTTPS/HSTS.
8. **Diff review** — no debug statements, TODOs, or hardcoded secrets.

## Critical Checklist

- [ ] All tests passing with coverage ≥ 80%.
- [ ] No unapplied migrations or migration conflicts.
- [ ] No security vulnerabilities or hardcoded secrets.
- [ ] `DEBUG=False` in production settings.
- [ ] Static files collected and logging configured.

See [references/verification-pipeline.md](references/verification-pipeline.md) for commands per phase and [references/ci-and-checklist.md](references/ci-and-checklist.md) for CI example, report template, and quick reference.

## Related Skills

- `django-tdd` — Django testing with pytest and factory_boy
- `django-security` — Django authentication, authorization, and secure coding
- `django-celery` — Verifying Celery workers and beat schedules
