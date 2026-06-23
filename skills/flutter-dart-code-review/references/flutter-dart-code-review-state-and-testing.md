# Flutter/Dart Code Review — State Management and Testing

## State Management Architecture

- Business logic lives outside the widget layer
- State managers receive dependencies via injection, not internal construction
- A repository/service layer abstracts data sources
- State managers have a single responsibility

## Immutability and Value Equality

For immutable-state solutions (BLoC, Riverpod, Redux):

- State objects are immutable; create new instances via `copyWith()` or constructors
- State classes implement `==` and `hashCode` across all fields
- Mechanism is consistent (manual, `Equatable`, `freezed`, records)
- Collections inside state are not exposed as raw mutable `List`/`Map`

For reactive-mutation solutions (MobX, GetX, Signals):

- Mutate only through the reactive API (`@action`, `.value`, `.obs`)
- Use computed/derived values instead of redundant stored values
- Clean up reactions and disposers

## State Shape Design

- Model mutually exclusive states with sealed types, union variants, or built-in async types (e.g., `AsyncValue`)
- Every async operation models loading, success, and error distinctly
- Handle all state variants exhaustively in UI
- Error states carry error info; loading states do not carry stale data

Example:

```dart
sealed class UserState {}
class UserInitial extends UserState {}
class UserLoading extends UserState {}
class UserLoaded extends UserState { final User user; const UserLoaded(this.user); }
class UserError extends UserState { final String message; const UserError(this.message); }
```

## Rebuild Optimization

- Scope consumer widgets (`Builder`, `Consumer`, `Observer`, `Obx`, `Watch`) as narrowly as possible
- Use selectors to rebuild only when specific fields change
- Use `const` widgets to stop rebuild propagation
- Compute derived state reactively, not redundantly

## Subscriptions and Disposal

- Cancel all manual `.listen()` subscriptions in `dispose()`/`close()`
- Close stream controllers when no longer needed
- Cancel timers in disposal lifecycle
- Prefer declarative builders over manual `.listen()`
- Check `mounted` before `setState` in async callbacks
- Check `context.mounted` after `await` before using `BuildContext`
- Do not store `BuildContext` in singletons, state managers, or static fields

## Local vs Global State

- Ephemeral UI state uses local state (`setState`, `ValueNotifier`)
- Shared state is lifted only as high as needed
- Feature-scoped state is disposed when the feature is inactive

## Testing

### Coverage and Types

- Unit tests cover business logic (state managers, repositories, utilities)
- Widget tests cover individual widget behavior and interactions
- Integration tests cover critical user flows end-to-end
- Aim for 80%+ line coverage on business logic
- Test all state transitions (loading → success, loading → error, retry)
- Test edge cases: empty, error, loading, boundary values

### Isolation and Quality

- Mock or fake external dependencies
- One test file per class/unit
- Verify behavior, not implementation details
- Use minimal stubbing
- No shared mutable state between tests
- Use `pumpWidget`/`pump` correctly for async operations
- Avoid flaky timing-dependent tests; use `pumpAndSettle` or explicit `pump(Duration)`
- Tests run in CI and failures block merges

## State Management Quick Reference

| Principle | BLoC/Cubit | Riverpod | Provider | GetX | MobX | Signals | Built-in |
|-----------|-----------|----------|----------|------|------|---------|----------|
| State container | `Bloc`/`Cubit` | `Notifier`/`AsyncNotifier` | `ChangeNotifier` | `GetxController` | `Store` | `signal()` | `StatefulWidget` |
| UI consumer | `BlocBuilder` | `ConsumerWidget` | `Consumer` | `Obx`/`GetBuilder` | `Observer` | `Watch` | `setState` |
| Selector | `BlocSelector`/`buildWhen` | `ref.watch(p.select(...))` | `Selector` | N/A | computed | `computed()` | N/A |
| Side effects | `BlocListener` | `ref.listen` | `Consumer` callback | `ever()`/`once()` | `reaction` | `effect()` | callbacks |
| Disposal | auto via `BlocProvider` | `.autoDispose` | auto via `Provider` | `onClose()` | `ReactionDisposer` | manual | `dispose()` |
| Testing | `blocTest()` | `ProviderContainer` | `ChangeNotifier` directly | `Get.put` in test | store directly | signal directly | widget test |
