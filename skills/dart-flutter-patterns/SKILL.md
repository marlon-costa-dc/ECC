---
name: dart-flutter-patterns
description: Use when writing or reviewing Dart and Flutter applications that need production-ready patterns for null safety, immutable state, async composition, widget architecture, state management, navigation, networking, error handling, and testing.
origin: ECC
---

# Dart/Flutter Patterns

Patterns for Dart and Flutter applications. Library-agnostic where possible, with explicit coverage of the most common ecosystem packages.

## When to Activate

- Starting a new Flutter feature and need idiomatic patterns for state, navigation, or data access
- Reviewing Dart code for null safety, sealed types, or async composition
- Choosing between BLoC, Riverpod, or Provider for a project
- Implementing secure HTTP clients or GoRouter auth guards
- Writing tests for widgets, Cubits, or Riverpod providers

## Core Patterns

- **Null safety**: avoid `!`; prefer `?.`/`??`, pattern matching, and early-return promotion
- **Immutable state**: use sealed classes or `freezed` with exhaustive `switch` expressions
- **Async composition**: use `Future.wait`/record destructuring; always guard `context` after `await`
- **Widget architecture**: extract to classes, propagate `const`, and scope rebuilds narrowly
- **State management**: BLoC/Cubit for event-driven flows; Riverpod for reactive derived state
- **Navigation**: GoRouter with `refreshListenable` for reactive auth redirects
- **Networking**: Dio with interceptors for auth and one-time token refresh guards
- **Error handling**: wire `FlutterError.onError`, `PlatformDispatcher.instance.onError`, and crashlytics
- **Testing**: prefer fakes over mocks; override providers in widget tests

## Anti-Patterns

- `!` (bang operator) without a guaranteed non-null path
- Mutable state objects mutated in-place instead of `copyWith`
- Business logic in widgets instead of state managers or UseCases
- `BuildContext` used after `await` without `mounted` checks
- Deep `NavController` passing or mixing imperative and declarative routing
- Raw exception strings shown to users

## References

- Skill: `flutter-dart-code-review` for comprehensive review checklists.
- Details: `references/dart-flutter-patterns-reference.md`
- State/network: `references/dart-flutter-patterns-state-and-network.md`
