# Code Examples

## Example 1

```python
cache_key = f"product:{product_id}"
cached = r.get(cache_key)
if cached:
    return json.loads(cached)
product = db.query("SELECT * FROM products WHERE id = %s", product_id)
r.setex(cache_key, 3600, json.dumps(product))
return product
```

## Example 2

```python
token = str(uuid.uuid4())
acquired = r.set(f"lock:{resource}", token, px=ttl_ms, nx=True)
# Release with Lua check to avoid deleting someone else's lock
```
