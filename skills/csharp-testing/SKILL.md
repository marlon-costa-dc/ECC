---
name: csharp-testing
description: Use when writing, fixing, or reviewing C# and .NET tests, configuring xUnit and FluentAssertions, or debugging flaky and slow tests across unit and integration suites.
origin: ECC
---

# C# Testing Patterns

Testing patterns for .NET with xUnit, FluentAssertions, NSubstitute/Moq, WebApplicationFactory, and Testcontainers.

## When to Activate

- Writing or fixing C# tests
- Reviewing test quality and coverage
- Setting up .NET test infrastructure
- Investigating flaky or slow tests

## Test Stack

| Tool | Purpose |
|---|---|
| xUnit | Test framework |
| FluentAssertions | Readable assertions |
| NSubstitute / Moq | Mocking |
| WebApplicationFactory | ASP.NET Core integration tests |
| Testcontainers | Real infrastructure in tests |
| Bogus | Test data generation |

## Patterns

- **Arrange-Act-Assert** for every test.
- **One logical assertion** per test.
- **Fresh instances** via xUnit constructors; no shared mutable state.
- **Behavior names**: `Method_ExpectedResult_WhenCondition`.
- **CancellationToken**: always pass and verify it.

See [`references/csharp-testing-reference.md`](references/csharp-testing-reference.md) for code examples of unit tests, parameterized `Theory` tests, NSubstitute mocking, WebApplicationFactory, Testcontainers, builders, anti-patterns, and `dotnet test` commands.
