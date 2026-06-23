---
name: python-patterns
description: Use when writing, reviewing, or refactoring Python code to apply idiomatic patterns, type hints, context managers, comprehensions, decorators, concurrency, and package organization.
origin: ECC
---

# Python Patterns

Concise guide to idiomatic Python. For expanded examples and tooling configs, see [references/python-patterns-reference.md](references/python-patterns-reference.md). Related: `python-testing`, `error-handling`.

## When to Use

- Writing or reviewing Python code
- Refactoring for readability and maintainability
- Designing packages or APIs
- Choosing concurrency or performance strategies

## Core Rules

1. **Readability first** — prefer clear names and simple constructs over cleverness.
2. **Explicit over implicit** — avoid magic side effects; state behavior directly.
3. **EAFP** — handle expected failures with exceptions instead of pre-checks.
4. **Type hints** — annotate public functions; use built-in generics on Python 3.9+.
5. **Context managers** — use `with` for resources; prefer `@contextmanager` for custom ones.
6. **Comprehensions & generators** — use for simple transforms; generators for large or lazy data.
7. **Dataclasses / NamedTuple** — for data containers; validate in `__post_init__`.
8. **Decorators** — use `functools.wraps`; keep them focused.
9. **Concurrency** — threads for I/O, processes for CPU, `async` for concurrent I/O.
10. **Anti-patterns** — avoid mutable defaults, `type() ==`, `== None`, `from module import *`, bare `except`.

## Minimal Examples

```python
# EAFP over LBYL
try:
    return config[key]
except KeyError:
    return default

# Type hints
def first(items: list[T]) -> T | None:
    return items[0] if items else None

# Context manager
with open(path) as f:
    data = f.read()

# Generator for lazy I/O
def read_lines(path: str) -> Iterator[str]:
    with open(path) as f:
        for line in f:
            yield line.strip()
```

## Tooling

Format with `black`/`isort`, lint with `ruff`/`mypy`, test with `pytest`, scan with `bandit`.
