            logger.info(f'{request.method} {request.path} - {response.status_code} - {duration:.3f}s')
        return response
```

## Performance Optimization

```python
# BAD - N+1 queries
products = Product.objects.all()
for product in products:
    print(product.category.name)

# GOOD - select_related
products = Product.objects.select_related('category').all()

# GOOD - prefetch_related for many-to-many
products = Product.objects.prefetch_related('tags').all()

# Bulk operations
Product.objects.bulk_create([Product(name=f'Product {i}', price=10.00) for i in range(1000)])
Product.objects.bulk_update(products, ['is_active'])
Product.objects.filter(stock=0).delete()
```
