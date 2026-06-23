# Android Clean Architecture — Reference

## Module Structure

```text
project/
├── app/          # Entry point
├── core/         # Shared utilities, error types
├── domain/       # UseCases, models, repository interfaces
├── data/         # Repository implementations, DataSources
├── presentation/ # Screens, ViewModels, UI models
└── feature/      # Optional feature modules
```

Dependency rules: `app → presentation, domain, data, core`; `presentation → domain, core`; `data → domain, core`; `domain → core`; `core → (nothing)`. `domain` must NEVER depend on `data`, `presentation`, or any framework.

## Domain Layer

```kotlin
class GetItemsByCategoryUseCase(private val repository: ItemRepository) {
    suspend operator fun invoke(category: String): Result<List<Item>> =
        repository.getItemsByCategory(category)
}

class ObserveUserProgressUseCase(private val repository: UserRepository) {
    operator fun invoke(userId: String): Flow<UserProgress> =
        repository.observeProgress(userId)
}
```

Domain models are plain Kotlin data classes. Repository interfaces are defined in domain and implemented in data.

## Data Layer

```kotlin
class ItemRepositoryImpl(
    private val localDataSource: ItemLocalDataSource,
    private val remoteDataSource: ItemRemoteDataSource
) : ItemRepository {
    override suspend fun getItemsByCategory(category: String): Result<List<Item>> = runCatching {
        val remote = remoteDataSource.fetchItems(category)
        localDataSource.insertItems(remote.map { it.toEntity() })
        localDataSource.getItemsByCategory(category).map { it.toDomain() }
    }

    override fun observeItems(): Flow<List<Item>> =
        localDataSource.observeAll().map { entities -> entities.map { it.toDomain() } }
}
```

### Room (Android)

```kotlin
@Entity(tableName = "items")
data class ItemEntity(
    @PrimaryKey val id: String,
    val title: String,
    val description: String,
    val tags: String,
    val status: String,
    val category: String
)

@Dao
interface ItemDao {
    @Query("SELECT * FROM items WHERE category = :category")
    suspend fun getByCategory(category: String): List<ItemEntity>

    @Upsert
    suspend fun upsert(items: List<ItemEntity>)

    @Query("SELECT * FROM items")
    fun observeAll(): Flow<List<ItemEntity>>
}
```

### SQLDelight (KMP)

```sql
CREATE TABLE ItemEntity (
    id TEXT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags TEXT NOT NULL,
    status TEXT NOT NULL,
    category TEXT NOT NULL
);

getByCategory:
SELECT * FROM ItemEntity WHERE category = ?;

upsert:
INSERT OR REPLACE INTO ItemEntity VALUES (?, ?, ?, ?, ?, ?);

observeAll:
SELECT * FROM ItemEntity;
```

### Ktor Network Client (KMP)

```kotlin
class ItemRemoteDataSource(private val client: HttpClient) {
    suspend fun fetchItems(category: String): List<ItemDto> =
        client.get("api/items") { parameter("category", category) }.body()
}

val httpClient = HttpClient {
    install(ContentNegotiation) { json(Json { ignoreUnknownKeys = true }) }
    defaultRequest { url("https://api.example.com/") }
}
```

## Dependency Injection

Koin (KMP-friendly):

```kotlin
val domainModule = module {
    factory { GetItemsByCategoryUseCase(get()) }
    factory { ObserveUserProgressUseCase(get()) }
}
val dataModule = module {
    single<ItemRepository> { ItemRepositoryImpl(get(), get()) }
    single { ItemLocalDataSource(get()) }
    single { ItemRemoteDataSource(get()) }
}
val presentationModule = module {
    viewModelOf(::ItemListViewModel)
}
```

Hilt (Android-only): bind interfaces to implementations in a `@Module` and inject UseCases into `@HiltViewModel`s.

## Error Handling

```kotlin
sealed interface Try<out T> {
    data class Success<T>(val value: T) : Try<T>
    data class Failure(val error: AppError) : Try<Nothing>
}

sealed interface AppError {
    data class Network(val message: String) : AppError
    data class Database(val message: String) : AppError
    data object Unauthorized : AppError
}
```

## Anti-Patterns

- Importing Android framework classes in `domain`
- Exposing database entities or DTOs to the UI layer
- Putting business logic in ViewModels
- Using `GlobalScope` or unstructured coroutines
- Circular module dependencies
