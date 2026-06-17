---
name: swift-actor-persistence
description: Use when implementing thread-safe data persistence in Swift with actors, combining in-memory caching with file-backed storage, and eliminating data races by design for offline-first or concurrent access scenarios.
origin: ECC
---

# Swift Actors for Thread-Safe Persistence

Patterns for building thread-safe data persistence layers using Swift actors.

## When to Activate

- Building a persistence layer in Swift 5.5+
- Needing thread-safe access to shared mutable state
- Eliminating manual synchronization with locks or `DispatchQueue`
- Building offline-first apps with local storage

## Rules

- Use an `actor` (not class + lock) for compiler-enforced serialization
- Keep the public API minimal; expose domain operations, not persistence details
- Combine in-memory cache with atomic file writes for fast reads and durability
- Load data synchronously in `init` to avoid async initialization complexity
- Use `Sendable` types for all data crossing actor boundaries
- Combine with `@Observable` ViewModels for reactive UI updates

## Examples

See `references/swift-actor-persistence.md` for the generic actor repository, usage, and ViewModel integration.

## References

See skill: `swiftui-patterns` for SwiftUI state management and view composition.
See skill: `swift-protocol-di-testing` for testable dependency injection with Swift Testing.
