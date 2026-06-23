        try {
            send("Connected! Users online: ${connections.size}")
            for (frame in incoming) {
                frame as? Frame.Text ?: continue
                val snapshot = synchronized(connections) { connections.toList() }
                snapshot.forEach { it.session.send(frame.readText()) }
            }
        } finally {
            connections -= thisConnection
        }
    }
}
```

## testApplication Testing

```kotlin
class UserRoutesTest : FunSpec({
    test("GET /users returns list") {
        testApplication {
            application {
                install(Koin) { modules(testModule) }
                configureSerialization()
                configureRouting()
            }
            val response = client.get("/users")
            response.status shouldBe HttpStatusCode.OK
        }
    }

    test("POST /users creates a user") {
        testApplication {
            application {
                install(Koin) { modules(testModule) }
                configureSerialization()
                configureStatusPages()
                configureRouting()
            }
            val client = createClient {
                install(io.ktor.client.plugins.contentnegotiation.ContentNegotiation) { json() }
            }
            val response = client.post("/users") {
                contentType(ContentType.Application.Json)
                setBody(CreateUserRequest("Alice", "alice@example.com"))
            }
            response.status shouldBe HttpStatusCode.Created
        }
    }
})
```

## Configuration

```yaml
ktor:
  application:
    modules:
      - com.example.ApplicationKt.module
  deployment:
    port: 8080
jwt:
  secret: ${JWT_SECRET}
  issuer: "https://example.com"
  audience: "https://example.com/api"
database:
  url: ${DATABASE_URL}
  driver: "org.postgresql.Driver"
  maxPoolSize: 10
```
