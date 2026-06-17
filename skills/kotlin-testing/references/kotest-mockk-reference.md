# Kotest & MockK Reference

Detailed examples for the `kotlin-testing` skill.

## TDD Walkthrough

```kotlin
// EmailValidator.kt
fun validateEmail(email: String): Result<String> {
    if (email.isBlank()) return Result.failure(IllegalArgumentException("Email cannot be blank"))
    if ('@' !in email) return Result.failure(IllegalArgumentException("Email must contain @"))
    val regex = Regex("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")
    if (!regex.matches(email)) return Result.failure(IllegalArgumentException("Invalid email format"))
    return Result.success(email)
}

// EmailValidatorTest.kt
class EmailValidatorTest : StringSpec({
    "valid email returns success" {
        validateEmail("user@example.com").shouldBeSuccess("user@example.com")
    }
    "empty email returns failure" {
        validateEmail("").shouldBeFailure()
    }
    "email without @ returns failure" {
        validateEmail("userexample.com").shouldBeFailure()
    }
})
```

## Spec Styles

```kotlin
// StringSpec
class CalculatorTest : StringSpec({
    "add two positive numbers" { Calculator.add(2, 3) shouldBe 5 }
})

// FunSpec
class UserServiceTest : FunSpec({
    val repository = mockk<UserRepository>()
    val service = UserService(repository)

    test("getUser returns user when found") {
        coEvery { repository.findById("1") } returns User(id = "1", name = "Alice")
        service.getUser("1") shouldBe User(id = "1", name = "Alice")
    }
})

// BehaviorSpec
class OrderServiceTest : BehaviorSpec({
    val repository = mockk<OrderRepository>()
    val paymentService = mockk<PaymentService>()
    val service = OrderService(repository, paymentService)

    Given("a valid order request") {
        val request = CreateOrderRequest("user-1", listOf(OrderItem("product-1", 2)))
        When("the order is placed") {
            coEvery { paymentService.charge(any()) } returns PaymentResult.Success
            coEvery { repository.save(any()) } answers { firstArg() }
            val result = service.placeOrder(request)
            Then("it should return a confirmed order") {
                result.status shouldBe OrderStatus.CONFIRMED
            }
        }
    }
})
```

## MockK Patterns

```kotlin
class UserServiceTest : FunSpec({
    val repository = mockk<UserRepository>()
    val service = UserService(repository)

    beforeTest { clearMocks(repository) }

    test("findUser delegates to repository") {
        every { repository.findById("1") } returns User(id = "1", name = "Alice")
        service.findUser("1") shouldBe User(id = "1", name = "Alice")
        verify(exactly = 1) { repository.findById("1") }
    }

    test("suspend function") {
        coEvery { repository.findById("1") } returns User(id = "1", name = "Alice")
        service.getUser("1").name shouldBe "Alice"
        coVerify { repository.findById("1") }
    }
})
```

## Argument Capture

```kotlin
test("save captures the user argument") {
    val slot = slot<User>()
    coEvery { repository.save(capture(slot)) } returns Unit
    service.createUser(CreateUserRequest("Alice", "alice@example.com"))
    slot.captured.name shouldBe "Alice"
}
```

## Coroutine Testing

```kotlin
class CoroutineServiceTest : FunSpec({
    test("timeout after delay") {
        runTest {
            shouldThrow<TimeoutCancellationException> {
                withTimeout(100) { SlowService().slowOperation() }
            }
        }
    }

    test("uses test dispatcher") {
        val dispatcher = StandardTestDispatcher()
        runTest(dispatcher) {
            var completed = false
            launch { delay(1000); completed = true }
            completed shouldBe false
            advanceTimeBy(1000)
            completed shouldBe true
        }
    }
})
```

## Flow Testing

```kotlin
test("searchUsers debounces input") {
    runTest {
        val service = SearchService()
        val queries = MutableSharedFlow<String>()
        val results = mutableListOf<List<User>>()
        val job = launch { service.searchUsers(queries).collect { results.add(it) } }

        queries.emit("a")
        queries.emit("ab")
        queries.emit("abc")
        advanceTimeBy(500)

        results shouldHaveSize 1
        job.cancel()
    }
}
```

## Property-Based Testing

```kotlin
test("string reverse is involutory") {
    forAll<String> { s -> s.reversed().reversed() == s }
}

test("serialization roundtrip preserves data") {
    checkAll(Arb.bind(Arb.string(1..50), Arb.string(5..100)) { name, email ->
        User(name = name, email = "$email@test.com")
    }) { user ->
        val json = Json.encodeToString(user)
        Json.decodeFromString<User>(json) shouldBe user
    }
}
```

## Data-Driven Testing

```kotlin
class ParserTest : FunSpec({
    context("parsing valid dates") {
        withData(
            "2026-01-15" to LocalDate(2026, 1, 15),
            "2026-12-31" to LocalDate(2026, 12, 31),
        ) { (input, expected) ->
            parseDate(input) shouldBe expected
        }
    }
})
```

## Kover Configuration

```kotlin
plugins {
    id("org.jetbrains.kotlinx.kover") version "0.9.7"
}

kover {
    reports {
        total {
            html { onCheck = true }
            xml { onCheck = true }
        }
        filters {
            excludes { classes("*.generated.*", "*.config.*") }
        }
        verify { rule { minBound(80) } }
    }
}
```

## Ktor Integration Test

```kotlin
class ApiRoutesTest : FunSpec({
    test("GET /users returns list") {
        testApplication {
            application {
                configureRouting()
                configureSerialization()
            }
            val response = client.get("/users")
            response.status shouldBe HttpStatusCode.OK
            response.body<List<UserResponse>>().shouldNotBeEmpty()
        }
    }
})
```

## Common Commands

```bash
./gradlew test
./gradlew test --tests "com.example.UserServiceTest"
./gradlew koverHtmlReport
./gradlew koverVerify
./gradlew detekt
./gradlew test --continuous
```
