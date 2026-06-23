---
name: compose-multiplatform-patterns
description: Use when building shared UI across Android, iOS, Desktop, and Web with Compose Multiplatform and Jetpack Compose, including state management, navigation, reusable composables, theming, and recomposition performance.
origin: ECC
---

# Compose Multiplatform Patterns

Patterns for building shared UI across Android, iOS, Desktop, and Web using Compose Multiplatform and Jetpack Compose.

## When to Activate

- Building Compose UI (Jetpack Compose or Compose Multiplatform)
- Managing UI state with ViewModels and Compose state
- Implementing navigation in KMP or Android projects
- Designing reusable composables and design systems

## State Management

Expose screen state as `StateFlow` from a ViewModel and collect it with `collectAsStateWithLifecycle()`. Use a single state data class updated with `_state.update { }`. For complex screens, use a sealed event type and a single `onEvent` sink.

## Navigation

Define routes as `@Serializable` objects with Compose Navigation 2.8+. Pass lambda callbacks instead of `NavController`. Use `dialog<Route> { ... }` for dialogs and bottom sheets.

## Composable Design

Design composables with slot parameters (`header`, `content`, `actions`) for flexibility. Apply modifiers in order: layout → shape → drawing → interaction.

## KMP Platform-Specific UI

Use `expect`/`actual` for platform composables. Keep platform implementations minimal and delegate to native APIs or interop.

## Performance

- Mark stable types with `@Stable` or `@Immutable`
- Use stable `key` in lazy lists to enable item reuse and animations
- Defer reads with `derivedStateOf` to avoid recomposing on scroll changes

## Theming

Use Material 3 dynamic theming with `dynamicDarkColorScheme`/`dynamicLightColorScheme` on Android 12+ and fall back to static schemes.

## Anti-Patterns

- `mutableStateOf` in ViewModels instead of `MutableStateFlow`
- Passing `NavController` deep into composables
- Heavy computation inside `@Composable` functions

## References

- Skill: `android-clean-architecture` for module structure and layering.
- Skill: `kotlin-coroutines-flows` for coroutine and Flow patterns.
- Details: `references/compose-multiplatform-patterns-reference.md`
