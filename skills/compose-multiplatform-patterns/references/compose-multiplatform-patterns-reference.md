# Compose Multiplatform Patterns — Reference

## State Management

ViewModel + single state object:

```kotlin
data class ItemListState(
    val items: List<Item> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
    val searchQuery: String = ""
)

class ItemListViewModel(private val getItems: GetItemsUseCase) : ViewModel() {
    private val _state = MutableStateFlow(ItemListState())
    val state: StateFlow<ItemListState> = _state.asStateFlow()

    fun onSearch(query: String) {
        _state.update { it.copy(searchQuery = query) }
        loadItems(query)
    }

    private fun loadItems(query: String) {
        viewModelScope.launch {
            _state.update { it.copy(isLoading = true) }
            getItems(query).fold(
                onSuccess = { items -> _state.update { it.copy(items = items, isLoading = false) } },
                onFailure = { e -> _state.update { it.copy(error = e.message, isLoading = false) } }
            )
        }
    }
}
```

Collect in Compose:

```kotlin
@Composable
fun ItemListScreen(viewModel: ItemListViewModel = koinViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ItemListContent(state = state, onSearch = viewModel::onSearch)
}
```

## Navigation

Type-safe navigation with Compose Navigation 2.8+:

```kotlin
@Serializable data object HomeRoute
@Serializable data class DetailRoute(val id: String)

@Composable
fun AppNavHost(navController: NavHostController = rememberNavController()) {
    NavHost(navController, startDestination = HomeRoute) {
        composable<HomeRoute> {
            HomeScreen(onNavigateToDetail = { id -> navController.navigate(DetailRoute(id)) })
        }
        composable<DetailRoute> { DetailScreen(id = it.toRoute<DetailRoute>().id) }
    }
}
```

Use `dialog<Route> { ... }` for dialogs and bottom sheets instead of imperative show/hide.

## Composable Design

Design composables with slot parameters (`header`, `content`, `actions`) for flexibility. Apply modifiers in order: layout → shape → drawing → interaction.

## KMP Platform-Specific UI

Use `expect`/`actual` for platform composables such as `PlatformStatusBar`:

```kotlin
// commonMain
@Composable
expect fun PlatformStatusBar(darkIcons: Boolean)

// androidMain
@Composable
actual fun PlatformStatusBar(darkIcons: Boolean) {
    val systemUiController = rememberSystemUiController()
    SideEffect { systemUiController.setStatusBarColor(Color.Transparent, darkIcons) }
}
```

## Performance

- Mark stable types with `@Stable` or `@Immutable`
- Use stable `key` in lazy lists: `items(items, key = { it.id }) { ... }`
- Defer reads with `derivedStateOf { listState.firstVisibleItemIndex > 5 }`
- Avoid allocations in recomposition by using `remember` and `key`

## Theming

Use Material 3 dynamic theming with `dynamicDarkColorScheme`/`dynamicLightColorScheme` on Android 12+ and fall back to static dark/light schemes.

## Anti-Patterns

- Using `mutableStateOf` in ViewModels when `MutableStateFlow` with `collectAsStateWithLifecycle` is safer
- Passing `NavController` deep into composables
- Heavy computation inside `@Composable` functions
- Using `LaunchedEffect(Unit)` as a substitute for ViewModel init
- Creating new object instances in composable parameters
