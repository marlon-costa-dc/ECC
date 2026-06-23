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
