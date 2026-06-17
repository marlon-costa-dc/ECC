---
name: swift-concurrency-6-2
description: Use when migrating to or adopting Swift 6.2 Approachable Concurrency, resolving data-race safety compiler errors, designing MainActor-based architectures, or explicitly offloading CPU-intensive work with @concurrent.
---

# Swift 6.2 Approachable Concurrency

Patterns for adopting Swift 6.2's concurrency model where code runs single-threaded by default and concurrency is introduced explicitly.

## When to Activate

- Migrating Swift 5.x or 6.0/6.1 projects to Swift 6.2
- Resolving data-race safety compiler errors
- Designing MainActor-based app architecture
- Offloading CPU-intensive work to background threads
- Implementing protocol conformances on MainActor-isolated types
- Enabling Approachable Concurrency build settings in Xcode 26

## Rules

- Write single-threaded code first; concurrency is opt-in with `@concurrent`
- Async functions stay on the calling actor by default in Swift 6.2
- Use isolated conformances (`extension T: @MainActor P`) instead of `nonisolated` workarounds
- Protect global and static mutable state with `@MainActor`
- Enable MainActor default inference mode for app targets
- Use `@concurrent` only for CPU-intensive work such as image processing or compression
- Profile before offloading; use Instruments to find real bottlenecks
- Migrate incrementally by enabling features one at a time in build settings

## Examples

See `references/swift-concurrency-6-2.md` for before/after code samples and migration notes.

## References

See skill: `swift-actor-persistence` for actor-based persistence patterns.
See skill: `swift-protocol-di-testing` for protocol-based DI and testing.
