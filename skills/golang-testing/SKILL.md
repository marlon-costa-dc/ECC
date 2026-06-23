---
name: golang-testing
description: Use when writing Go tests, benchmarks, fuzz tests, or test helpers to follow table-driven patterns, subtests, mocking, golden files, coverage, and CI integration.
---

# Go Testing Patterns

Use when writing, reviewing, or refactoring Go tests.

## When to Activate

- Writing new Go functions or methods
- Adding test coverage to existing code
- Creating benchmarks for performance-critical code
- Implementing fuzz tests for input validation
- Following TDD workflow in Go projects

## TDD Workflow

1. **RED:** Write a failing test first.
2. **GREEN:** Write minimal code to pass.
3. **REFACTOR:** Improve while keeping tests green.

## Core Rules

- Use table-driven tests with `t.Run` subtests for comprehensive coverage.
- Test behavior through public APIs, not private functions.
- Use `t.Helper()` in test helpers and `t.Cleanup()` for resource cleanup.
- Use `t.Parallel()` for independent subtests.
- Prefer interface-based mocks for dependencies.
- Benchmark hot paths with `b.ResetTimer()` and memory metrics.
- Use fuzz tests for input validation boundaries.
- Keep coverage targets: critical logic 100%, public APIs 90%, general 80%.

## Common Commands

```bash
go test ./...
go test -race -coverprofile=coverage.out ./...
go test -bench=. -benchmem ./...
go test -fuzz=FuzzParse -fuzztime=30s ./...
```

## References

- [Full testing reference with examples](references/golang-testing-reference.md)
