# Dart/Flutter State Management and Network — Reference

## State Management: BLoC/Cubit

```dart
class AuthCubit extends Cubit<AuthState> {
  AuthCubit(this._authService) : super(const AuthState.initial());

  Future<void> login(String email, String password) async {
    emit(const AuthState.loading());
    try {
      emit(AuthState.authenticated(await _authService.login(email, password)));
    } on AuthException catch (e) {
      emit(AuthState.error(e.message));
    }
  }
}
```

## State Management: Riverpod

Async provider:

```dart
@riverpod
Future<List<Product>> products(Ref ref) async =>
    ref.watch(productRepositoryProvider).getAll();
```

Notifier with complex mutations:

```dart
@riverpod
class CartNotifier extends _$CartNotifier {
  @override
  List<CartItem> build() => [];

  void add(Product product) {
    final existing = state.where((i) => i.productId == product.id).firstOrNull;
    state = existing != null
        ? [
            for (final item in state)
              if (item.productId == product.id)
                item.copyWith(quantity: item.quantity + 1)
              else
                item,
          ]
        : [...state, CartItem(productId: product.id, quantity: 1)];
  }

  void remove(String productId) => state = state.where((i) => i.productId != productId).toList();
}
```

Derived provider:

```dart
@riverpod
double cartTotal(Ref ref) {
  final cart = ref.watch(cartNotifierProvider);
  final products = ref.watch(productsProvider).valueOrNull ?? [];
  return cart.fold(0.0, (total, item) {
    final product = products.firstWhereOrNull((p) => p.id == item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  });
}
```

## HTTP with Dio

```dart
final dio = Dio(BaseOptions(
  baseUrl: const String.fromEnvironment('API_URL'),
  connectTimeout: const Duration(seconds: 10),
  receiveTimeout: const Duration(seconds: 30),
));

dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) async {
    final token = await secureStorage.read(key: 'auth_token');
    if (token != null) options.headers['Authorization'] = 'Bearer $token';
    handler.next(options);
  },
  onError: (error, handler) async {
    final isRetry = error.requestOptions.extra['_isRetry'] == true;
    if (!isRetry && error.response?.statusCode == 401) {
      final refreshed = await attemptTokenRefresh();
      if (refreshed) {
        error.requestOptions.extra['_isRetry'] = true;
        return handler.resolve(await dio.fetch(error.requestOptions));
      }
    }
    handler.next(error);
  },
));
```

## External References

- [Riverpod Documentation](https://riverpod.dev/)
- [BLoC Library](https://bloclibrary.dev/)
