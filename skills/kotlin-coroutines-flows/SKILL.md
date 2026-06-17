---
name: kotlin-coroutines-flows
description: "Use when writing asynchronous Kotlin code with coroutines, Flow, StateFlow, or SharedFlow, or when managing structured concurrency, dispatchers, cancellation, and testing in Android or KMP projects."
origin: ECC
---

# Kotlin Coroutines & Flows

Patterns for structured concurrency and Flow-based reactive streams in Android and Kotlin Multiplatform.

## When to Use

- Writing async code with Kotlin coroutines
- Using `Flow`, `StateFlow`, or `SharedFlow` for reactive data
- Handling concurrent operations, debounce, retry, or parallel loading
- Testing coroutines and Flows
- Managing coroutine scopes and cancellation

## Core Rules

1. **Structured Concurrency**: Never use `GlobalScope`. Prefer `viewModelScope`, `coroutineScope { }`, `LifecycleScope`, or `LaunchedEffect`.
2. **Parallel Work**: Use `coroutineScope` + `async`/`await`; use `supervisorScope` when child failures must not cancel siblings.
3. **StateFlow**: Convert cold Flows with `.stateIn(scope, SharingStarted.WhileSubscribed(5_000), initialValue)`.
4. **Combine Flows**: Use `combine()` for multiple streams, then `stateIn()`.
5. **Operators**: Use `debounce`, `distinctUntilChanged`, `flatMapLatest`/`mapLatest`, `catch`, `retryWhen`.
6. **SharedFlow**: Use `MutableSharedFlow` for one-time effects (snackbar, navigation) and expose as `SharedFlow`.
7. **Dispatchers**: `Dispatchers.Default` for CPU work, `Dispatchers.IO` for IO on JVM/Android, `Dispatchers.Main` for UI. In KMP, `Dispatchers.IO` is JVM-only.
8. **Cancellation**: Check `ensureActive()` in long loops; use `try/finally` or `NonCancellable` for cleanup.
9. **Testing**: Use `runTest`, `StandardTestDispatcher`, and Turbine for Flow assertions.

## Cross-References

- UI consumption of Flows: `compose-multiplatform-patterns`
- Layer placement: `android-clean-architecture`

## References

- Detailed examples, operator recipes, and anti-patterns: [references/coroutines-reference.md](references/coroutines-reference.md)
