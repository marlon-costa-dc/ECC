---
name: kotlin-patterns
description: "Use when writing, reviewing, or refactoring Kotlin code to enforce idiomatic patterns for null safety, immutability, sealed classes, scope functions, extensions, coroutines, delegation, DSLs, and collections."
origin: ECC
---

# Kotlin Development Patterns

Idiomatic Kotlin patterns for robust, efficient, and maintainable code.

## When to Use

- Writing new Kotlin code
- Reviewing or refactoring Kotlin code
- Designing Kotlin modules or libraries
- Configuring Gradle Kotlin DSL builds

## Core Rules

1. **Null Safety**: Prefer non-nullable types. Use `?.`, `?:`, `let`, and `runCatching` instead of `!!`.
2. **Immutability**: Prefer `val`, immutable collections, and `copy()` on data classes. Avoid mutable global state.
3. **Expression Bodies**: Use single-expression functions and `when` as an expression when readability improves.
4. **Data Classes**: Use `data class` for value objects; `@JvmInline value class` for type-safe wrappers.
5. **Sealed Types**: Model restricted hierarchies with `sealed class`/`sealed interface` for exhaustive `when`.
6. **Scope Functions**: Use `let`, `apply`, `also`, `run`, `with` appropriately. Avoid nesting them.
7. **Extensions**: Add domain behavior via extension functions; keep them scoped when possible.
8. **Coroutines**: Use structured concurrency and cold `Flow`. Never use `GlobalScope`.
9. **Delegation**: Reuse implementation with `by` for property and interface delegation.
10. **DSLs**: Build type-safe DSLs with `@DslMarker` and lambda receivers.
11. **Collections**: Chain `filter`, `map`, `groupBy`, `associateBy`, `partition`. Use `sequence` for lazy evaluation.
12. **Error Handling**: Use `Result`, nullable returns, or sealed outcomes instead of exceptions for control flow. Use `require`/`check` for preconditions.

## References

- Detailed idioms, Gradle DSL, anti-patterns, and examples: [references/kotlin-idioms-reference.md](references/kotlin-idioms-reference.md)
