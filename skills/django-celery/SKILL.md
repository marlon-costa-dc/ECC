---
name: django-celery
description: "Use when adding background jobs, scheduled tasks, or async processing to a Django app with Celery, covering task design, retries, beat scheduling, canvas workflows, monitoring, and testing."
origin: ECC
---

# Django + Celery

## When to Activate

- Background jobs, periodic tasks, or slow operation offloading.
- Designing retryable, idempotent Celery tasks.
- Debugging failures, queue backlogs, or task timeouts.
- Testing Celery tasks in Django.

## Core Rules

1. **Pass primary keys**, never ORM instances.
2. **Make tasks idempotent** with status guards.
3. **Use `autoretry_for`, `retry_backoff`, `retry_jitter`** for transient failures.
4. **Set soft and hard time limits** and handle `SoftTimeLimitExceeded`.
5. **Ack late and prefetch multiplier 1** for fair long-task distribution.
6. **Use `CELERY_TASK_ALWAYS_EAGER = True` only in tests**.

## Minimal Examples

```python
@shared_task(name='notifications.send_welcome_email')
def send_welcome_email(user_id: int) -> None:
    from apps.users.models import User
    from apps.notifications.services import EmailService
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return
    EmailService.send_welcome(user)
```

```python
@shared_task(
    bind=True,
    name='integrations.sync_to_crm',
    max_retries=5,
    default_retry_delay=60,
    autoretry_for=(ConnectionError, TimeoutError),
    retry_backoff=True,
    retry_backoff_max=600,
    retry_jitter=True,
)
def sync_contact_to_crm(self, contact_id: int) -> dict:
    result = CRMClient().sync(contact_id)
    return result
```

See [references/setup-and-tasks.md](references/setup-and-tasks.md) and [references/operations-and-testing.md](references/operations-and-testing.md) for full setup, calling, testing, and operations patterns.

## Related Skills

- `django-patterns` — Django architecture and ORM patterns
- `django-tdd` — Testing Django tasks and integrations
- `python-testing` — pytest configuration and fixtures
