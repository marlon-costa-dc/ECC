# Kotlin Idioms Reference

Detailed examples for the `kotlin-patterns` skill.

## Null Safety

```kotlin
// Good
fun getUser(id: String): User =
    userRepository.findById(id) ?: throw UserNotFoundException("User $id not found")

fun getUserEmail(userId: String): String =
    userRepository.findById(userId)?.email ?: "unknown@example.com"

// Bad
fun getUserEmail(userId: String): String =
    userRepository.findById(userId)!!.email
```

## Immutability

```kotlin
data class User(val id: String, val name: String, val email: String)

fun updateEmail(user: User, newEmail: String): User =
    user.copy(email = newEmail)

val users: List<User> = listOf(user1, user2)
val filtered = users.filter { it.email.isNotBlank() }
```

## Expression Bodies

```kotlin
fun isAdult(age: Int): Boolean = age >= 18

fun statusMessage(code: Int): String = when (code) {
    200 -> "OK"
    404 -> "Not Found"
    500 -> "Internal Server Error"
    else -> "Unknown status: $code"
}
```

## Data Classes and Value Classes

```kotlin
data class CreateUserRequest(
    val name: String,
    val email: String,
    val role: Role = Role.USER,
)

@JvmInline
value class UserId(val value: String) {
    init { require(value.isNotBlank()) { "UserId cannot be blank" } }
}
```

## Sealed Types

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val error: AppError) : Result<Nothing>()
    data object Loading : Result<Nothing>()
}

fun <T> Result<T>.getOrNull(): T? = when (this) {
    is Result.Success -> data
    is Result.Failure -> null
    is Result.Loading -> null
}
```

## Scope Functions

```kotlin
val length: Int? = name?.let { it.trim().length }

val user = User().apply {
    name = "Alice"
    email = "alice@example.com"
}

val user = createUser(request).also {
    logger.info("Created user: ${it.id}")
}
```

## Extension Functions

```kotlin
fun String.toSlug(): String =
    lowercase()
        .replace(Regex("[^a-z0-9\\s-]"), "")
        .replace(Regex("\\s+"), "-")
        .trim('-')

fun <T> List<T>.secondOrNull(): T? = getOrNull(1)
```

## Coroutines

```kotlin
suspend fun fetchUserWithPosts(userId: String): UserProfile =
    coroutineScope {
        val user = async { userService.getUser(userId) }
        val posts = async { postService.getUserPosts(userId) }
        UserProfile(user.await(), posts.await())
    }

fun searchUsers(query: Flow<String>): Flow<List<User>> =
    query
        .debounce(300.milliseconds)
        .distinctUntilChanged()
        .mapLatest { q -> userRepository.search(q) }
        .catch { emit(emptyList()) }
```

## Delegation

```kotlin
val expensiveData: List<User> by lazy { userRepository.findAll() }

class LoggingUserRepository(
    private val delegate: UserRepository,
    private val logger: Logger,
) : UserRepository by delegate {
    override suspend fun findById(id: String): User? {
        logger.info("Finding user by id: $id")
        return delegate.findById(id)
    }
}
```

## DSL Builders

```kotlin
@DslMarker
annotation class HtmlDsl

@HtmlDsl
class HTML {
    private val children = mutableListOf<Element>()
    fun head(init: Head.() -> Unit) { children += Head().apply(init) }
    fun body(init: Body.() -> Unit) { children += Body().apply(init) }
}

fun html(init: HTML.() -> Unit): HTML = HTML().apply(init)
```

## Sequences

```kotlin
val result = users.asSequence()
    .filter { it.isActive }
    .map { it.email }
    .take(10)
    .toList()
```

## Gradle Kotlin DSL

```kotlin
plugins {
    kotlin("jvm") version "2.3.10"
    kotlin("plugin.serialization") version "2.3.10"
    id("io.ktor.plugin") version "3.4.0"
    id("org.jetbrains.kotlinx.kover") version "0.9.7"
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.10.2")
    testImplementation("io.kotest:kotest-runner-junit5:6.1.4")
}
```

## Error Handling

```kotlin
suspend fun createUser(request: CreateUserRequest): Result<User> = runCatching {
    require(request.name.isNotBlank()) { "Name cannot be blank" }
    require('@' in request.email) { "Invalid email format" }
    userRepository.save(User(/* ... */))
}

fun withdraw(account: Account, amount: Money): Account {
    require(amount.value > 0) { "Amount must be positive" }
    check(account.balance >= amount) { "Insufficient balance" }
    return account.copy(balance = account.balance - amount.value)
}
```

## Anti-Patterns

```kotlin
// Bad
val name = user!!.name

data class MutableUser(var name: String, var email: String)

try {
    val user = findUser(id)
} catch (e: NotFoundException) { /* expected case */ }

// Good
val user: User? = findUserOrNull(id)
```
