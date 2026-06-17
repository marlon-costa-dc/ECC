# Django TDD: API, Mocking, and Coverage

## DRF Serializer and API Tests

```python
from rest_framework.exceptions import ValidationError
from apps.products.serializers import ProductSerializer
from tests.factories import ProductFactory

class TestProductSerializer:
    def test_serialize_product(self, db):
        product = ProductFactory()
        data = ProductSerializer(product).data
        assert data['id'] == product.id
        assert data['name'] == product.name

    def test_price_validation(self, db):
        serializer = ProductSerializer(data={'name': 'X', 'price': '-10.00', 'stock': 10})
        assert not serializer.is_valid()
        assert 'price' in serializer.errors

import pytest
from rest_framework import status
from django.urls import reverse

class TestProductAPI:
    def test_list_products(self, api_client, db):
        ProductFactory.create_batch(10)
        response = api_client.get(reverse('api:product-list'))
        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 10

    def test_create_product_unauthorized(self, api_client, db):
        response = api_client.post(reverse('api:product-list'), {})
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_product_authorized(self, authenticated_api_client, db):
        response = authenticated_api_client.post(
            reverse('api:product-list'),
            {'name': 'Test Product', 'price': '99.99', 'stock': 10},
        )
        assert response.status_code == status.HTTP_201_CREATED
```

## Mocking

```python
from unittest.mock import patch

class TestPaymentView:
    @patch('apps.payments.services.stripe')
    def test_successful_payment(self, mock_stripe, client, user, product):
        mock_stripe.Charge.create.return_value = {
            'id': 'ch_123', 'status': 'succeeded', 'amount': 9999,
        }
        client.force_login(user)
        response = client.post(reverse('payments:process'), {
            'product_id': product.id, 'token': 'tok_visa',
        })
        assert response.status_code == 302
        mock_stripe.Charge.create.assert_called_once()

from django.core import mail
from django.test import override_settings

@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
def test_order_confirmation_email(db, order):
    order.send_confirmation_email()
    assert len(mail.outbox) == 1
    assert order.user.email in mail.outbox[0].to
```

## Coverage and Quick Reference

```bash
pytest --cov=apps --cov-report=html --cov-report=term-missing
```

| Component | Target |
|-----------|--------|
| Models | 90%+ |
| Serializers | 85%+ |
| Views | 80%+ |
| Services | 90%+ |
| Utilities | 80%+ |
| Overall | 80%+ |

| Pattern | Usage |
|---------|-------|
| `@pytest.mark.django_db` | Enable database access |
| `client` | Django test client |
| `api_client` | DRF API client |
| `factory.create_batch(n)` | Create multiple objects |
| `patch('module.function')` | Mock external dependencies |
| `override_settings` | Temporarily change settings |
| `force_authenticate()` | Bypass authentication in tests |
| `assertRedirects` | Check redirects |
| `mail.outbox` | Check sent emails |
