# Dart/Flutter Patterns — Reference

## Null Safety

Prefer patterns over `!`:

```dart
final name = user?.name ?? 'Unknown';

final display = switch (user) {
  User(:final name, :final email) => '$name <$email>',
  null => 'Guest',
};

String getUserName(User? user) {
  if (user == null) return 'Unknown';
  return user.name; // promoted after null check
}
```

Avoid `late` unless initialization is guaranteed before first access.

## Immutable State

Sealed classes make impossible states unrepresentable:

```dart
sealed class UserState {}
final class UserInitial extends UserState {}
final class UserLoading extends UserState {}
final class UserLoaded extends UserState {
  const UserLoaded(this.user);
  final User user;
}
final class UserError extends UserState {
  const UserError(this.message);
  final String message;
}

Widget buildFrom(UserState state) => switch (state) {
  UserInitial() => const SizedBox.shrink(),
  UserLoading() => const CircularProgressIndicator(),
  UserLoaded(:final user) => UserCard(user: user),
  UserError(:final message) => ErrorText(message),
};
```

Freezed for boilerplate-free immutability:

```dart
@freezed
class User with _$User {
  const factory User({required String id, required String name, required String email}) = _User;
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

## Async Composition

Run futures concurrently with record destructuring:

```dart
final (userList, orderList) = await (users.getAll(), orders.getRecent()).wait;
```

Always check `mounted` after `await` in `StatefulWidget` before using `context`.

## Widget Architecture

- Extract widgets to separate classes, not private methods
- Use `const` constructors wherever possible
- Scope rebuilds by watching only the necessary state

## Navigation with GoRouter

```dart
final router = GoRouter(
  refreshListenable: GoRouterRefreshStream(authCubit.stream),
  redirect: (context, state) {
    final isLoggedIn = context.read<AuthCubit>().state is AuthAuthenticated;
    final isGoingToLogin = state.matchedLocation == '/login';
    if (!isLoggedIn && !isGoingToLogin) return '/login';
    if (isLoggedIn && isGoingToLogin) return '/';
    return null;
  },
  routes: [...],
);
```

## Error Handling Architecture

```dart
void main() {
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    crashlytics.recordFlutterFatalError(details);
  };
  PlatformDispatcher.instance.onError = (error, stack) {
    crashlytics.recordError(error, stack, fatal: true);
    return true;
  };
  runApp(const App());
}
```

## Testing Quick Reference

Prefer fakes over mocks. Override providers in widget tests.

```dart
blocTest<AuthCubit, AuthState>(
  'emits loading then error on failed login',
  build: () => AuthCubit(FakeAuthService(throwsOn: 'login')),
  act: (cubit) => cubit.login('user@test.com', 'wrong'),
  expect: () => [const AuthState.loading(), isA<AuthError>()],
);

testWidgets('CartBadge shows item count', (tester) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [cartNotifierProvider.overrideWith(() => FakeCartNotifier(count: 3))],
      child: const MaterialApp(home: CartBadge()),
    ),
  );
  expect(find.text('3'), findsOneWidget);
});
```

## External References

- [Effective Dart: Design](https://dart.dev/effective-dart/design)
- [Flutter Performance Best Practices](https://docs.flutter.dev/perf/best-practices)
- [GoRouter](https://pub.dev/packages/go_router)
- [Freezed](https://pub.dev/packages/freezed)
