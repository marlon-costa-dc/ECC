---
name: kotlin-testing
description: "Use when writing or reviewing Kotlin tests with Kotest and MockK, implementing property-based or data-driven tests, testing coroutines and Flows, configuring Kover coverage, or running Ktor integration tests."
origin: ECC
---

# Kotlin Testing Patterns

## When to Use

- Writing new Kotlin functions or classes
- Adding test coverage to existing Kotlin code
- Implementing property-based or data-driven tests
- Following TDD workflow in Kotlin projects
- Configuring Kover for code coverage

## Core Rules

1. **TDD Cycle**: Write a failing test first, implement minimal code to pass, refactor while green, then repeat.
2. **Spec Styles**: Choose `StringSpec`, `FunSpec`, `BehaviorSpec`, or `DescribeSpec` and use one style consistently per project.
3. **Mocking**: Use MockK; `coEvery`/`coVerify` for suspend functions; clear shared mocks in `beforeTest`.
4. **Argument Capture**: Use `slot<T>()` to inspect captured arguments.
5. **Coroutine Testing**: Use `runTest`; `StandardTestDispatcher` and `advanceTimeBy`/`advanceUntilIdle` for virtual time.
6. **Flow Testing**: Use `kotlinx-coroutines-test` plus Turbine for Flow assertions.
7. **Property-Based Testing**: Use Kotest `forAll`/`checkAll` and custom `Arb` generators for invariants.
8. **Data-Driven Testing**: Use `withData` for parameterized test cases.
9. **Fixtures**: Use `beforeSpec`/`afterSpec` and `beforeTest`/`afterTest`; prefer reusable extensions for shared setup.
10. **Coverage**: Configure Kover with 80% minimum for general code, higher for critical logic and public APIs; exclude generated/config classes.
11. **Integration**: Use `testApplication` for Ktor route tests with test modules.
12. **Quality**: Test behavior, not implementation. Do not mock data classes or use `Thread.sleep()` in coroutine tests. Investigate flakes.

## References

- Detailed spec styles, MockK recipes, and property tests: [references/kotest-mockk-reference.md](references/kotest-mockk-reference-1.md)
