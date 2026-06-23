# Django Security Reference

Detailed security guidelines for Django applications.

## Production Settings

```python
DEBUG = False
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    raise ImproperlyConfigured('DJANGO_SECRET_KEY environment variable is required')

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 12}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]
```

## Custom User Model

```python
class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

AUTH_USER_MODEL = 'users.User'
```

## Password Hashing

```python
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
]
```

## Session Management

```python
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
SESSION_COOKIE_AGE = 3600 * 24 * 7
```

## Authorization

```python
class Post(models.Model):
    class Meta:
        permissions = [
            ('can_publish', 'Can publish posts'),
            ('can_edit_others', 'Can edit posts of others'),
        ]

class PostUpdateView(LoginRequiredMixin, PermissionRequiredMixin, UpdateView):
    model = Post
    permission_required = 'app.can_edit_others'
    raise_exception = True

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
```

## DRF Permissions

```python
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
```

## SQL Injection Prevention

```python
# GOOD: ORM automatically escapes
User.objects.get(username=username)

# GOOD: Parameterized raw()
User.objects.raw('SELECT * FROM users WHERE username = %s', [query])

# BAD: Never interpolate user input
User.objects.raw(f'SELECT * FROM users WHERE username = {username}')
```

## XSS Prevention

```django
{# Auto-escaped by default #}
{{ user_input }}

{# Explicitly safe only for trusted content #}
{{ trusted_html|safe }}

{# JavaScript escaping #}
<script>var username = {{ username|escapejs }};</script>
```

```python
from django.utils.html import escape, format_html

# BAD
mark_safe(user_input)

# GOOD
mark_safe(escape(user_input))
format_html('<span class="user">{}</span>', escape(username))
```

## Security Headers Middleware

```python
class SecurityHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
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
