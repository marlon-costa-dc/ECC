# Flutter/Dart Code Review — Core

## General Project Health

- Consistent folder structure (feature-first or layer-first)
- Separation of concerns: UI, business logic, data layers
- No business logic in widgets
- `pubspec.yaml` is clean: no unused deps, versions pinned appropriately
- `analysis_options.yaml` uses strict analyzer settings
- No `print()` in production code; use `dart:developer` `log()` or a logging package
- Generated files (`.g.dart`, `.freezed.dart`, `.gr.dart`) are up-to-date or ignored
- Platform-specific code isolated behind abstractions

## Dart Language Pitfalls

- Enable `strict-casts`, `strict-inference`, `strict-raw-types`
- Avoid excessive `!`; use null checks or pattern matching (`if (value case var v?)`)
- Prefer local variable promotion over `this.field` where promotion fails
- Catch specific exception types; do not catch `Error` subtypes
- Remove unused `async` markers that never `await`
- Avoid `late` where nullable or constructor initialization is safer
- Use `StringBuffer` instead of `+` in loops
- Do not mutate fields in `const` classes
- Use `await` or explicit `unawaited()` for Futures
- Prefer `final` for locals and `const` for compile-time constants
- Use `package:` imports instead of relative imports
- Return unmodifiable collections from public APIs
- Prefer Dart 3 switch expressions and `if-case` over verbose casts
- Use records `(String, int)` instead of throwaway DTOs

## Widget Best Practices

### Decomposition

- No single `build()` method exceeding ~80–100 lines
- Split widgets by encapsulation and by how they change
- Extract private `_build*()` helpers to separate widget classes
- Prefer `StatelessWidget` when no mutable local state is needed
- Put reusable extracted widgets in separate files

### Const and Keys

- Use `const` constructors and literals wherever possible
- Declare constructors `const` when all fields are `final`
- Use `ValueKey` in lists/grids to preserve state across reorders
- Use `GlobalKey` sparingly
- Avoid `UniqueKey` in `build()`; use `ObjectKey` when identity is data-based

### Theming and Build Method

- Colors come from `Theme.of(context).colorScheme`; no hardcoded values
- Text styles come from `Theme.of(context).textTheme`
- Verify dark mode compatibility
- Use consistent spacing tokens instead of magic numbers
- No network calls, file I/O, heavy computation, `.listen()`, or `Future.then()` in `build()`
- Localize `setState()` to the smallest subtree

## Performance

- Localize `setState()` and use `const` widgets to stop rebuild propagation
- Use `RepaintBoundary` around complex subtrees that repaint independently
- Use `AnimatedBuilder` child parameter for independent subtrees
- No sorting, filtering, or mapping large collections in `build()`
- No regex compilation in `build()`
- Use specific `MediaQuery` accessors (e.g., `MediaQuery.sizeOf(context)`)
- Cache network images and decode assets at display size (`cacheWidth`/`cacheHeight`)
- Provide placeholder/error widgets for network images
- Use `ListView.builder` / `GridView.builder` for large or dynamic lists
- Implement pagination for large data sets
- Use `deferred as` for heavy web libraries
- Avoid `Opacity` in animations; prefer `AnimatedOpacity` or `FadeTransition`
- Avoid clipping in animations; pre-clip images
- Do not override `operator ==` on widgets; use `const` constructors
- Use `IntrinsicHeight`/`IntrinsicWidth` sparingly
