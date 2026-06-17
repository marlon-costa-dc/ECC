---
name: swift-protocol-di-testing
description: Use when abstracting file system, network, or external APIs behind focused Swift protocols to enable deterministic testing with mocks and Swift Testing across app, preview, and test targets.
origin: ECC
---

# Swift Protocol-Based Dependency Injection for Testing

Patterns for making Swift code testable by abstracting external dependencies behind small, focused protocols.

## When to Activate

- Writing Swift code that accesses file system, network, or external APIs
- Testing error handling paths without triggering real failures
- Building modules that work across app, test, and SwiftUI preview contexts
- Designing testable architecture with Swift concurrency

## Rules

- Define small, focused protocols — one external concern per protocol
- Provide default production implementations using default initializer parameters
- Create configurable mocks with error-simulation properties
- Conform protocols to `Sendable` when used across actor boundaries
- Inject dependencies via initializer defaults so only tests override them
- Mock only external boundaries, not internal types
- Write tests with Swift Testing (`@Test`, `#expect`)

## Examples

See `references/swift-protocol-di-testing.md` for protocol definitions, production and mock implementations, injection patterns, and Swift Testing examples.

## References

See skill: `swift-actor-persistence` for actor-based persistence patterns.
See skill: `swiftui-patterns` for SwiftUI state management and composition.
