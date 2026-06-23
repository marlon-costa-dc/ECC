---
name: swiftui-patterns
description: Use when building SwiftUI views and need guidance on state management with @Observable, view composition, type-safe NavigationStack navigation, performance optimization for lists and complex layouts, and modern iOS or macOS UI architecture patterns.
---

# SwiftUI Patterns

Modern SwiftUI patterns for declarative, performant Apple-platform UIs.

## When to Activate

- Managing state with `@State`, `@Binding`, `@Observable`, or `@Environment`
- Designing `NavigationStack` flows and routing
- Structuring view models and reactive data flow
- Optimizing lists, scroll views, and complex layouts
- Injecting dependencies via the SwiftUI environment

## Rules

- Prefer `@Observable` classes over `ObservableObject` / `@StateObject` / `@EnvironmentObject`
- Choose the simplest property wrapper: `@State` for local values, `@Binding` for parent-owned values, `@Bindable` for observable two-way binding
- Extract subviews to limit invalidation; use `ViewModifier` for reusable styling
- Use `NavigationStack` + `NavigationPath` for type-safe programmatic navigation
- Use `LazyVStack` / `LazyHStack` and stable identifiers in `ForEach`
- Never perform I/O, network calls, or heavy computation inside `body`; use `.task {}`
- Minimize `.shadow()`, `.blur()`, and `.mask()` in scroll views
- Conform expensive views to `Equatable` to skip redundant re-renders
- Use `#Preview` with inline mock data for fast iteration

## Examples

See `references/swiftui-patterns.md` for full code examples.

## References

See skill: `swift-actor-persistence` for actor-based persistence patterns.
See skill: `swift-protocol-di-testing` for protocol-based DI and testing.
