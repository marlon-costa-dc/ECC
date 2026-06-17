# Django + Celery: Setup and Tasks

## Installation

```bash
pip install 'celery[redis]' django-celery-results django-celery-beat
```

## Celery Entrypoint

```python
# config/celery.py
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
app = Celery('myproject')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
```

```python
# config/__init__.py
from .celery import app as celery_app
__all__ = ('celery_app',)
```

## Django Settings

```python
CELERY_BROKER_URL = env('CELERY_BROKER_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = env('CELERY_RESULT_BACKEND', default='django-db')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
CELERY_TASK_SOFT_TIME_LIMIT = 25 * 60
CELERY_WORKER_PREFETCH_MULTIPLIER = 1
CELERY_TASK_ACKS_LATE = True
CELERY_RESULT_EXPIRES = 60 * 60 * 24
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'

INSTALLED_APPS += ['django_celery_results', 'django_celery_beat']
```

## Running Workers

```bash
celery -A config worker --loglevel=info
celery -A config beat --loglevel=info --scheduler django_celery_beat.schedulers:DatabaseScheduler
# production
celery -A config worker --loglevel=warning --concurrency=4 -Q default,high_priority
```

## Task Patterns

```python
from celery import shared_task
from celery.exceptions import SoftTimeLimitExceeded

@shared_task(bind=True, name='reports.generate_pdf', soft_time_limit=120, time_limit=150)
def generate_pdf_report(self, report_id: int) -> str:
    from apps.reports.services import PDFGenerator
    try:
        return PDFGenerator.build(report_id)
    except SoftTimeLimitExceeded:
        PDFGenerator.cleanup(report_id)
        raise

@shared_task(name='orders.mark_shipped')
def mark_order_shipped(order_id: int, tracking_number: str) -> None:
    from apps.orders.models import Order
    updated = Order.objects.filter(
        pk=order_id,
        status=Order.Status.PROCESSING,
    ).update(
        status=Order.Status.SHIPPED,
        tracking_number=tracking_number,
    )
    if not updated:
        return
```

## Calling Tasks

```python
send_welcome_email.delay(user.pk)
send_reminder.apply_async(args=[user.pk], countdown=3600)
sync_contact_to_crm.apply_async(args=[contact.pk], queue='high_priority')
result = generate_pdf_report.apply(args=[report.pk])  # sync, tests only
```

## Beat Scheduling

```python
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'cleanup-expired-sessions': {
        'task': 'users.cleanup_expired_sessions',
        'schedule': crontab(hour=2, minute=0),
    },
    'sync-inventory': {
        'task': 'products.sync_inventory',
        'schedule': 60.0,
    },
}
```

Database-defined schedules via `django_celery_beat.models.PeriodicTask` and `CrontabSchedule`.

## Canvas Workflows

```python
from celery import chain, group, chord

chain(fetch_data.s(source_id), transform_data.s(), load_to_warehouse.s()).delay()
group(send_welcome_email.s(uid) for uid in new_user_ids).delay()
chord(
    group(process_chunk.s(chunk) for chunk in data_chunks),
    aggregate_results.s(),
).delay()
```
