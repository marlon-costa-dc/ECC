---
name: android-clean-architecture
description: Use when structuring Android or Kotlin Multiplatform projects with Clean Architecture, including module boundaries, dependency inversion, UseCase and Repository patterns, and data layer design.
origin: ECC
---

# Android Clean Architecture

Clean Architecture patterns for Android and KMP projects. Covers module boundaries, dependency inversion, UseCase/Repository patterns, and data layer design.

## When to Activate

- Structuring Android or KMP project modules
- Implementing UseCases, Repositories, or DataSources
- Designing data flow between domain, data, and presentation layers
- Setting up DI with Koin or Hilt

## Module Structure

Typical modules: `app` (entry point, DI), `core` (shared utilities), `domain` (UseCases, models, repository interfaces), `data` (repositories, DataSources), `presentation` (screens, ViewModels), and optional `feature/` modules.

Dependency arrows: `app → presentation, domain, data, core`; `presentation → domain, core`; `data → domain, core`; `domain → core`; `core → (nothing)`. `domain` must NEVER depend on `data`, `presentation`, or any framework.

## Domain Layer

UseCases represent single business operations returning `Result<T>`. Domain models are plain Kotlin data classes. Repository interfaces are defined in domain and implemented in data.

## Data Layer

Repositories coordinate local and remote DataSources. Map DTOs and entities to domain models with extension functions kept near the data models.

## Dependency Injection

Use Koin for KMP or Hilt for Android-only. Register UseCases as factories, repositories as singletons, and bind interfaces to implementations.

## Error Handling

Use `Result<T>` or a sealed `Try`/`AppError` type. Map low-level errors to user-friendly messages in the presentation layer.

## Anti-Patterns

- Importing Android framework classes in `domain`
- Exposing database entities or DTOs to the UI layer
- Putting business logic in ViewModels instead of UseCases
- Using `GlobalScope` or unstructured coroutines
- Circular module dependencies

## References

- Skill: `compose-multiplatform-patterns` for UI patterns.
- Skill: `kotlin-coroutines-flows` for async patterns.
- Details: `references/android-clean-architecture-reference.md`
