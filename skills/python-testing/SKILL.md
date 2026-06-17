---
name: python-testing
description: Use when writing, reviewing, or maintaining Python tests to apply pytest, TDD, fixtures, parametrization, mocking, async testing, and coverage best practices.
origin: ECC
---

# Python Testing

Concise guide to pytest and TDD. For expanded examples and configuration, see [references/python-testing-reference.md](references/python-testing-reference.md). Related: `python-patterns`, `error-handling`.

## When to Use

- Writing Python code (follow TDD)
- Designing or reviewing test suites
- Setting up pytest infrastructure
- Debugging test coverage or flaky tests

## Core Rules

1. **TDD cycle** — red, green, refactor.
2. **Test behavior** — one assertion concept per test; avoid testing internals.
3. **Use fixtures** — share setup via `conftest.py`; prefer function scope.
4. **Parametrize** — run the same test across inputs and backends.
5. **Mock boundaries** — patch external services, I/O, and time.
6. **Mark tests** — use `@pytest.mark.slow`, `@pytest.mark.integration` for selection.
7. **Coverage target** — 80%+ overall, 100% for critical paths.
8. **Keep tests fast** — avoid real networks and databases in unit tests.
9. **Use `pytest.raises`** — assert expected exceptions instead of `try/except`.
10. **Async tests** — use `pytest-asyncio` and async fixtures.

## Minimal Examples

```python
# TDD
@pytest.mark.parametrize("a,b,expected", [(2, 3, 5), (-1, 1, 0)])
def test_add(a, b, expected):
    assert add(a, b) == expected

# Fixture with teardown
@pytest.fixture
def client():
    app = create_app(testing=True)
    with app.test_client() as c:
        yield c

# Async
@pytest.mark.asyncio
async def test_async(async_client):
    response = await async_client.get("/api/data")
    assert response.status_code == 200
```

## Running Tests

```bash
pytest -v
pytest -m "not slow"
pytest --cov=mypackage --cov-report=term-missing
pytest -k "test_user"
```
