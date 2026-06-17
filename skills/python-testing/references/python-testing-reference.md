# Python Testing Reference

Expanded examples and configuration for `python-testing`.

## Fixtures

```python
import pytest

@pytest.fixture
def sample_data():
    return {"name": "Alice", "age": 30}

@pytest.fixture
def database():
    db = Database(":memory:")
    db.create_tables()
    yield db
    db.close()

@pytest.fixture(scope="module")
def module_db():
    db = Database(":memory:")
    yield db
    db.close()

@pytest.fixture(params=[1, 2, 3])
def number(request):
    return request.param

@pytest.fixture(autouse=True)
def reset_config():
    Config.reset()
    yield
    Config.cleanup()
```

## Parametrization

```python
@pytest.mark.parametrize("input,expected", [
    ("hello", "HELLO"),
    ("world", "WORLD"),
], ids=["hello", "world"])
def test_uppercase(input, expected):
    assert input.upper() == expected

@pytest.mark.parametrize("backend", ["sqlite", "postgresql"])
def test_database_operations(backend):
    db = Database(backend)
    assert db.query("SELECT 1") is not None
```

## Markers

```python
@pytest.mark.slow
def test_slow(): ...

@pytest.mark.integration
def test_api(): ...
```

```bash
pytest -m "not slow"
pytest -m integration
pytest -m "unit and not slow"
```

## Mocking

```python
from unittest.mock import patch, Mock, PropertyMock, mock_open

@patch("mypackage.external_api_call")
def test_mock(api_call_mock):
    api_call_mock.return_value = {"status": "success"}
    assert my_function()["status"] == "success"
    api_call_mock.assert_called_once()

@patch("mypackage.api_call")
def test_exception(api_call_mock):
    api_call_mock.side_effect = ConnectionError("fail")
    with pytest.raises(ConnectionError):
        api_call()

@patch("builtins.open", new_callable=mock_open, read_data="data")
def test_file(mock_file):
    assert read_file("x.txt") == "data"

# Property mock
config = Mock()
type(config).debug = PropertyMock(return_value=True)
```

## Async Tests

```python
import pytest

@pytest.fixture
async def async_client():
    app = create_app()
    async with app.test_client() as client:
        yield client

@pytest.mark.asyncio
async def test_api(async_client):
    response = await async_client.get("/api/data")
    assert response.status_code == 200

@pytest.mark.asyncio
@patch("mypackage.async_api_call")
async def test_async_mock(api_call_mock):
    api_call_mock.return_value = {"status": "ok"}
    result = await my_async_function()
    api_call_mock.assert_awaited_once()
    assert result["status"] == "ok"
```

## Exceptions

```python
def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_custom_error():
    with pytest.raises(ValueError, match="invalid"):
        validate_input("bad")

def test_error_attributes():
    with pytest.raises(CustomError) as exc:
        raise CustomError("msg", code=400)
    assert exc.value.code == 400
```

## File & Side-Effect Tests

```python
def test_tmp_path(tmp_path):
    f = tmp_path / "test.txt"
    f.write_text("hello")
    assert process_file(str(f)) == "hello"
```

## Test Organization

```text
tests/
├── conftest.py
├── unit/
├── integration/
└── e2e/
```

```python
class TestUserService:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.service = UserService()

    def test_create_user(self):
        user = self.service.create_user("Alice")
        assert user.name == "Alice"
```

## Configuration

```ini
[pytest]
testpaths = tests
addopts =
    --strict-markers
    --disable-warnings
    --cov=mypackage
    --cov-report=term-missing
markers =
    slow: marks tests as slow
    integration: marks tests as integration tests
    unit: marks tests as unit tests
```

## Quick Reference

| Pattern | Usage |
|---------|-------|
| `pytest.raises()` | Expected exceptions |
| `@pytest.fixture()` | Reusable setup |
| `@pytest.mark.parametrize()` | Multiple inputs |
| `@pytest.mark.slow` | Mark slow tests |
| `@patch()` | Mock functions/classes |
| `tmp_path` | Automatic temp directory |
| `pytest --cov` | Coverage report |
| `pytest -m` | Marker selection |
