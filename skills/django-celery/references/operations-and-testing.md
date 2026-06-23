# Django + Celery: Operations and Testing

## Error Handling and Dead Letter Queue

```python
from celery.signals import task_failure

@task_failure.connect
def on_task_failure(sender, task_id, exception, args, kwargs, traceback, einfo, **kw):
    import sentry_sdk
    with sentry_sdk.new_scope() as scope:
        scope.set_context('celery', {
            'task': sender.name,
            'task_id': task_id,
            'args': args,
            'kwargs': kwargs,
        })
        sentry_sdk.capture_exception(exception)
```

```python
@shared_task(bind=True, max_retries=3, name='payments.charge_card')
def charge_card(self, order_id: int) -> None:
    try:
        _do_charge(order_id)
    except Exception as exc:
        if self.request.retries >= self.max_retries:
            FailedCharge.objects.create(
                order_id=order_id,
                error=str(exc),
                task_id=self.request.id,
            )
            return
        raise self.retry(exc=exc)
```

## Testing

```python
# config/settings/test.py
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True
```

```python
import pytest
from unittest.mock import patch
from apps.notifications.tasks import send_welcome_email

class TestSendWelcomeEmail:
    @pytest.mark.django_db
    def test_sends_email_to_existing_user(self, user):
        with patch('apps.notifications.services.EmailService') as mock_email:
            send_welcome_email(user.pk)
            mock_email.send_welcome.assert_called_once_with(user)

    @pytest.mark.django_db
    def test_skips_missing_user_gracefully(self):
        send_welcome_email(99999)
```

## Monitoring

```bash
celery -A config inspect active
celery -A config inspect stats
redis-cli llen celery
pip install flower
celery -A config flower --port=5555
```

## Anti-Patterns

```python
# BAD: pass ORM instances
send_welcome_email.delay(user)

# BAD: sync call in production views
result = generate_report.apply()

# GOOD: idempotent with status guard
@shared_task
def charge_and_fulfill(order_id):
    order = Order.objects.select_for_update().get(pk=order_id)
    if order.status != Order.Status.PENDING:
        return
    order.charge()
    order.fulfill()
```

## Production Checklist

| Check | Setting |
|-------|---------|
| Worker restarts | `supervisord` or `systemd` unit |
| Ack late | `CELERY_TASK_ACKS_LATE = True` |
| Prefetch | `CELERY_WORKER_PREFETCH_MULTIPLIER = 1` |
| Priority queues | `-Q default,high_priority,low_priority` |
| Time limits | `CELERY_TASK_SOFT_TIME_LIMIT` set |
| Sentry | Capture `task_failure` signals |
| Monitor | Flower or queue-depth metrics |
| Beat singleton | Run beat on a single node |
