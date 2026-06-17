---
name: dotnet-patterns
description: Use when writing, reviewing, or refactoring C# and .NET code to apply idiomatic patterns for dependency injection, async/await, options, results, repositories, middleware, minimal APIs, and guard clauses.
---

# .NET Development Patterns

**UTILITY SKILL** — provides idiomatic C# and .NET patterns.

## USE FOR:

- Writing new C# classes, services, or ASP.NET Core endpoints.
- Reviewing .NET code for idiomatic style and correctness.
- Refactoring mutable code toward immutability and explicit abstractions.
- Choosing between exceptions and explicit result types.

## DO NOT USE FOR:

- Low-level runtime internals or IL optimization.
- UI frameworks such as WPF, WinForms, or MAUI (use frontend-patterns).
- Database migration design or SQL tuning (use database-migrations).

## Core Rules

1. **Immutability**: prefer `record` and `init-only` properties.
2. **Explicit intent**: enable nullable reference types, mark access modifiers, throw for null dependencies.
3. **Abstractions**: depend on interfaces; register implementations via DI.
4. **Async all the way**: propagate `CancellationToken`; never block with `.Result` or `.Wait()`.
5. **Options pattern**: bind configuration to strongly-typed `IOptions<T>`.
6. **Result pattern**: return explicit `Result<T>` for expected failures.
7. **Guard clauses**: validate inputs early with `ArgumentNullException.ThrowIfNull`.

## Anti-Patterns

Avoid `async void`, `.Result`/`.Wait()`, empty `catch`, `new Service()` in constructors, `public` fields, `dynamic` in business logic, mutable `static` state, and `string.Format` in hot loops.

## Error Handling

Use explicit result types for expected failures; reserve exceptions for exceptional conditions. Always flow `CancellationToken` and avoid blocking on async work.

## Examples

Full code examples are in [references/dotnet-patterns-reference.md](references/dotnet-patterns-reference.md).
