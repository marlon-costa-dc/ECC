# Django TDD: Model and View Tests

## Model Tests

```python
import pytest
from django.core.exceptions import ValidationError
from tests.factories import UserFactory, ProductFactory

class TestUserModel:
    def test_create_user(self, db):
        user = UserFactory(email='test@example.com')
        assert user.email == 'test@example.com'
        assert user.check_password('testpass123')
        assert not user.is_staff

    def test_create_superuser(self, db):
        user = UserFactory(is_staff=True, is_superuser=True)
        assert user.is_staff and user.is_superuser

class TestProductModel:
    def test_product_creation(self, db):
        product = ProductFactory()
        assert product.id is not None and product.is_active

    def test_price_validation(self, db):
        product = ProductFactory(price=-10)
        with pytest.raises(ValidationError):
            product.full_clean()

    def test_active_manager(self, db):
        ProductFactory.create_batch(5, is_active=True)
        ProductFactory.create_batch(3, is_active=False)
        assert Product.objects.active().count() == 5
```

## View Tests

```python
import pytest
from django.urls import reverse
from tests.factories import ProductFactory

class TestProductViews:
    def test_product_list(self, client, db):
        ProductFactory.create_batch(10)
        response = client.get(reverse('products:list'))
        assert response.status_code == 200
        assert len(response.context['products']) == 10

    def test_product_create_requires_login(self, client, db):
        response = client.get(reverse('products:create'))
        assert response.status_code == 302

    def test_product_create_authenticated(self, authenticated_client, db, category):
        data = {
            'name': 'Test Product',
            'description': 'A test product',
            'price': '99.99',
            'stock': 10,
            'category': category.id,
        }
        response = authenticated_client.post(reverse('products:create'), data)
        assert response.status_code == 302
        assert Product.objects.filter(name='Test Product').exists()
```

## Integration Test

```python
import pytest
from django.urls import reverse
from unittest.mock import patch
from tests.factories import ProductFactory

class TestCheckoutFlow:
    def test_guest_to_purchase_flow(self, client, db):
        response = client.post(reverse('users:register'), {
            'email': 'test@example.com',
            'password': 'testpass123',
            'password_confirm': 'testpass123',
        })
        assert response.status_code == 302

        product = ProductFactory(price=100)
        client.post(reverse('cart:add'), {'product_id': product.id, 'quantity': 1})

        with patch('apps.checkout.services.process_payment') as mock_payment:
            mock_payment.return_value = True
            response = client.post(reverse('checkout:complete'))

        assert response.status_code == 302
        assert Order.objects.filter(user__email='test@example.com').exists()
```
