---
name: flutter-dart-code-review
description: Use when reviewing Flutter or Dart code for project health, language pitfalls, widget quality, state management, performance, testing, accessibility, security, dependencies, routing, error handling, internationalization, and static analysis.
origin: ECC
---

# Flutter/Dart Code Review Best Practices

Library-agnostic checklist for reviewing Flutter/Dart applications. These principles apply regardless of state management, routing, or DI choices.

## When to Activate

- Reviewing a Flutter/Dart pull request
- Auditing project health, lint setup, dependency hygiene, or static analysis
- Checking widget decomposition, const usage, keys, and rebuild boundaries
- Evaluating state management, immutability, reactivity, and disposal
- Validating tests, accessibility, security, navigation, error handling, or l10n

## Review Scope

This skill covers:

- **Core quality**: project structure, Dart pitfalls, widget best practices, performance
- **State and testing**: state management discipline, testing strategy, rebuild optimization
- **Operational concerns**: accessibility, security, platform specifics, packages, routing, error handling, l10n, DI, static analysis

## References

- Skill: `dart-flutter-patterns` for production-ready code examples.
- Core review rules: `references/flutter-dart-code-review-core.md`
- State and testing: `references/flutter-dart-code-review-state-and-testing.md`
- Operational review: `references/flutter-dart-code-review-operations.md`
