# Python Patterns Reference

Expanded examples and configuration for `python-patterns`.

## Type Hints

```python
from typing import TypeVar, Protocol

# Built-in generics (Python 3.9+)
def count(items: list[str]) -> dict[str, int]: ...

# Type alias + generic
JSON = dict[str, any] | list[any] | str | int | float | bool | None
T = TypeVar('T')
def first(items: list[T]) -> T | None: ...

# Protocol-based duck typing
class Renderable(Protocol):
    def render(self) -> str: ...
```

## Error Handling

```python
class AppError(Exception): ...
class ValidationError(AppError): ...

def load_config(path: str) -> Config:
    try:
        with open(path) as f:
            return Config.from_json(f.read())
    except FileNotFoundError as e:
        raise ConfigError(f"Missing config: {path}") from e
```

## Context Managers

```python
from contextlib import contextmanager

@contextmanager
def timer(name: str):
    start = time.perf_counter()
    yield
    print(f"{name}: {time.perf_counter() - start:.4f}s")

class DatabaseTransaction:
    def __enter__(self):
        self.connection.begin_transaction()
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.commit() if exc_type is None else self.connection.rollback()
        return False
```

## Comprehensions & Generators

```python
# Simple transform
names = [u.name for u in users if u.is_active]

# Lazy evaluation
total = sum(x * x for x in range(1_000_000))

# Generator function
def read_large_file(path: str) -> Iterator[str]:
    with open(path) as f:
        for line in f:
            yield line.strip()
```

## Data Classes & NamedTuples

```python
from dataclasses import dataclass, field
from typing import NamedTuple

@dataclass
class User:
    id: str
    name: str
    email: str
    created_at: datetime = field(default_factory=datetime.now)

    def __post_init__(self):
        if "@" not in self.email:
            raise ValueError("Invalid email")

class Point(NamedTuple):
    x: float
    y: float
```

## Decorators

```python
import functools

def timer(func: Callable) -> Callable:
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__}: {time.perf_counter() - start:.4f}s")
        return result
    return wrapper

def repeat(times: int):
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            return [func(*args, **kwargs) for _ in range(times)]
        return wrapper
    return decorator
```

## Concurrency

```python
import concurrent.futures
import asyncio

# I/O-bound: threads
def fetch_all(urls: list[str]) -> dict[str, str]:
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:
        return {url: ex.submit(fetch_url, url).result() for url in urls}

# CPU-bound: processes
with concurrent.futures.ProcessPoolExecutor() as ex:
    results = list(ex.map(process_data, datasets))

# Async I/O
async def fetch_all_async(urls: list[str]) -> dict[str, str]:
    tasks = [fetch_async(url) for url in urls]
    return dict(zip(urls, await asyncio.gather(*tasks, return_exceptions=True)))
```

## Package Layout

```text
myproject/
├── src/mypackage/
│   ├── __init__.py
│   ├── api/
│   ├── models/
│   └── utils/
├── tests/
│   └── test_*.py
└── pyproject.toml
```

```python
# __init__.py
from mypackage.models import User
__all__ = ["User"]
```

## Anti-Patterns

| Bad | Good |
|-----|------|
| `def f(x, items=[])` | `def f(x, items=None)` |
| `type(obj) == list` | `isinstance(obj, list)` |
| `value == None` | `value is None` |
| bare `except:` | catch specific exceptions |
