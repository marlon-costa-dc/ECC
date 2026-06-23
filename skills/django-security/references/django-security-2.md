        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['Content-Security-Policy'] = "default-src 'self'"
        return response
```

## CSRF Protection

```python
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_TRUSTED_ORIGINS = ['https://example.com']
```

```html
<form method="post">
    {% csrf_token %}
</form>
```

Exempt only when absolutely necessary:

```python
@csrf_exempt
def webhook_view(request):
    pass
```

## File Upload Security

```python
def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.gif', '.pdf']:
        raise ValidationError('Unsupported file extension.')

def validate_file_size(value):
    if value.size > 5 * 1024 * 1024:
        raise ValidationError('File too large. Max size is 5MB.')

class Document(models.Model):
    file = models.FileField(upload_to='documents/', validators=[validate_file_extension, validate_file_size])
```

## API Rate Limiting

```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/day',
        'user': '1000/day',
        'upload': '10/hour',
    }
}
```

## Content Security Policy

```python
CSP_DEFAULT_SRC = "'self'"
CSP_SCRIPT_SRC = "'self' https://cdn.example.com"
CSP_STYLE_SRC = "'self' 'unsafe-inline'"
CSP_IMG_SRC = "'self' data: https:"
CSP_CONNECT_SRC = "'self' https://api.example.com"
```

## Secrets Management

```python
import environ

env = environ.Env(DEBUG=(bool, False))
environ.Env.read_env()

SECRET_KEY = env('DJANGO_SECRET_KEY')
DATABASE_URL = env('DATABASE_URL')
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')
```

## Security Logging

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {'level': 'WARNING', 'class': 'logging.FileHandler', 'filename': '/var/log/django/security.log'},
        'console': {'level': 'INFO', 'class': 'logging.StreamHandler'},
    },
    'loggers': {
        'django.security': {'handlers': ['file', 'console'], 'level': 'WARNING', 'propagate': True},
        'django.request': {'handlers': ['file'], 'level': 'ERROR', 'propagate': False},
    },
}
```
