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
