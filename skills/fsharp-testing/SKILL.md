---
name: fsharp-testing
description: Use when writing or reviewing F# tests with xUnit, FsUnit, Unquote, and FsCheck, implementing property-based or async tests, mocking dependencies, or organizing F# test projects.
origin: ECC
---

# F# Testing Patterns

Concise guidance for F# testing with xUnit, FsUnit, Unquote, FsCheck, and .NET integration tests.

## When to Activate

- Writing or reviewing F# unit, integration, or property-based tests.
- Setting up test infrastructure for F# projects.
- Debugging flaky or slow F# tests.

## Test Framework Stack

| Tool | Purpose |
|---|---|
| xUnit | Test framework |
| FsUnit.xUnit | F#-friendly assertions |
| Unquote | Quotation-based assertions with clear failure messages |
| FsCheck.xUnit | Property-based testing |
| NSubstitute | Mocking interfaces |
| Testcontainers / WebApplicationFactory | Integration tests |

## Core Rules

- Test behavior and outcomes, not implementation details.
- Use fresh state per test; avoid mutable shared state.
- Prefer function stubs for dependencies; use NSubstitute for interfaces.
- Use `task { }` for async tests.
- Use `[<Theory>]` for parameterized tests and `[<Property>]` for invariants.
- Pass and verify `CancellationToken` in async code.
- Exclude generated/config classes from coverage.

## References

- Detailed examples and recipes: [references/fsharp-testing-reference.md](references/fsharp-testing-reference-1.md)
- Related skills: `dotnet-patterns`, `csharp-testing`

## Running Tests

```bash
dotnet test
dotnet test --collect:"XPlat Code Coverage"
dotnet test --filter "FullyQualifiedName~OrderService"
dotnet watch test --project tests/MyApp.Tests/
```
