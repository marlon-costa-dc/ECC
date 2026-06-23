# Coroutines & Flows Reference

Detailed examples for the `kotlin-coroutines-flows` skill.

## Structured Concurrency

```kotlin
// BAD
GlobalScope.launch { fetchData() }

// GOOD — scoped to ViewModel lifecycle
viewModelScope.launch { fetchData() }

// GOOD — scoped to composable lifecycle
LaunchedEffect(key) { fetchData() }
```

## Parallel Decomposition

```kotlin
suspend fun loadDashboard(): Dashboard = coroutineScope {
    val items = async { itemRepository.getRecent() }
    val stats = async { statsRepository.getToday() }
    val profile = async { userRepository.getCurrent() }
    Dashboard(items.await(), stats.await(), profile.await())
}
```

## SupervisorScope

```kotlin
suspend fun syncAll() = supervisorScope {
    launch { syncItems() }
    launch { syncStats() }
    launch { syncSettings() }
}
```

## StateFlow for UI State

```kotlin
class DashboardViewModel(observeProgress: ObserveUserProgressUseCase) : ViewModel() {
    val progress: StateFlow<UserProgress> = observeProgress()
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = UserProgress.EMPTY
        )
}
```

## Combining Flows

```kotlin
val uiState: StateFlow<HomeState> = combine(
    itemRepository.observeItems(),
    settingsRepository.observeTheme(),
    userRepository.observeProfile()
) { items, theme, profile ->
    HomeState(items, theme, profile)
}.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), HomeState())
```

## Flow Operators

```kotlin
searchQuery
    .debounce(300)
    .distinctUntilChanged()
    .flatMapLatest { query -> repository.search(query) }
    .catch { emit(emptyList()) }
    .collect { results -> _state.update { it.copy(results = results) } }
```

## SharedFlow for One-Time Events

```kotlin
class ItemListViewModel : ViewModel() {
    private val _effects = MutableSharedFlow<Effect>()
    val effects: SharedFlow<Effect> = _effects.asSharedFlow()

    sealed interface Effect {
        data class ShowSnackbar(val message: String) : Effect
        data class NavigateTo(val route: String) : Effect
    }

    private fun deleteItem(id: String) {
        viewModelScope.launch {
            repository.delete(id)
            _effects.emit(Effect.ShowSnackbar("Item deleted"))
        }
    }
}
```

## Dispatchers

```kotlin
withContext(Dispatchers.Default) { parseJson(largePayload) }
withContext(Dispatchers.IO) { database.query() }
```

In KMP, `Dispatchers.IO` is JVM/Android only; use `Dispatchers.Default` elsewhere or inject.

## Cancellation

```kotlin
suspend fun processItems(items: List<Item>) = coroutineScope {
    for (item in items) {
        ensureActive()
        process(item)
    }
}

viewModelScope.launch {
    try {
        _state.update { it.copy(isLoading = true) }
        val data = repository.fetch()
        _state.update { it.copy(data = data) }
    } finally {
        _state.update { it.copy(isLoading = false) }
    }
}
```

## Testing with Turbine

```kotlin
@Test
fun `search updates item list`() = runTest {
    val fakeRepository = FakeItemRepository().apply { emit(testItems) }
    val viewModel = ItemListViewModel(GetItemsUseCase(fakeRepository))

    viewModel.state.test {
        assertEquals(ItemListState(), awaitItem())

        viewModel.onSearch("query")
        assertTrue(awaitItem().isLoading)

        val loaded = awaitItem()
        assertFalse(loaded.isLoading)
        assertEquals(1, loaded.items.size)
    }
}
```
