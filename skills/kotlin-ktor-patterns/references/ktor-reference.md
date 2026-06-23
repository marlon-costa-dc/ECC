# Ktor Reference

Detailed examples for the `kotlin-ktor-patterns` skill.

## Application Entry Point

```kotlin
fun main() {
    embeddedServer(Netty, port = 8080, module = Application::module).start(wait = true)
}

fun Application.module() {
    configureSerialization()
    configureAuthentication()
    configureStatusPages()
    configureCORS()
    configureDI()
    configureRouting()
}
```

## Routing

```kotlin
fun Application.configureRouting() {
    routing {
        userRoutes()
        authRoutes()
        healthRoutes()
    }
}

fun Route.userRoutes() {
    val userService by inject<UserService>()

    route("/users") {
        get { call.respond(userService.getAll()) }

        get("/{id}") {
            val id = call.parameters["id"]
                ?: return@get call.respond(HttpStatusCode.BadRequest, "Missing id")
            val user = userService.getById(id)
                ?: return@get call.respond(HttpStatusCode.NotFound)
            call.respond(user)
        }

        post {
            val request = call.receive<CreateUserRequest>()
            val user = userService.create(request)
            call.respond(HttpStatusCode.Created, user)
        }

        authenticate("jwt") {
            put("/{id}") { /* ... */ }
            delete("/{id}") { /* ... */ }
        }
    }
}
```

## Serialization

```kotlin
fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = false
            ignoreUnknownKeys = true
            encodeDefaults = true
            explicitNulls = false
        })
    }
}

@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val error: String? = null,
) {
    companion object {
        fun <T> ok(data: T): ApiResponse<T> = ApiResponse(success = true, data = data)
        fun <T> error(message: String): ApiResponse<T> = ApiResponse(success = false, error = message)
    }
}
```

## JWT Authentication

```kotlin
install(Authentication) {
    jwt("jwt") {
        realm = jwtRealm
        verifier(
            JWT.require(Algorithm.HMAC256(jwtSecret))
                .withAudience(jwtAudience)
                .withIssuer(jwtIssuer)
                .build()
        )
        validate { credential ->
            if (credential.payload.audience.contains(jwtAudience)) JWTPrincipal(credential.payload) else null
        }
        challenge { _, _ ->
            call.respond(HttpStatusCode.Unauthorized, ApiResponse.error<Unit>("Invalid or expired token"))
        }
    }
}

fun ApplicationCall.userId(): String =
    principal<JWTPrincipal>()?.payload?.getClaim("userId")?.asString()
        ?: throw AuthenticationException("No userId in token")
```

## Status Pages

```kotlin
install(StatusPages) {
    exception<IllegalArgumentException> { call, cause ->
        call.respond(HttpStatusCode.BadRequest, ApiResponse.error<Unit>(cause.message ?: "Bad request"))
    }
    exception<AuthenticationException> { call, _ ->
        call.respond(HttpStatusCode.Unauthorized, ApiResponse.error<Unit>("Authentication required"))
    }
    exception<NotFoundException> { call, cause ->
        call.respond(HttpStatusCode.NotFound, ApiResponse.error<Unit>(cause.message ?: "Resource not found"))
    }
    exception<Throwable> { call, cause ->
        call.application.log.error("Unhandled exception", cause)
        call.respond(HttpStatusCode.InternalServerError, ApiResponse.error<Unit>("Internal server error"))
    }
}
```

## Koin DI

```kotlin
val appModule = module {
    single<Database> { DatabaseFactory.create(get()) }
    single<UserRepository> { ExposedUserRepository(get()) }
    single { UserService(get()) }
}

fun Application.configureDI() {
    install(Koin) { modules(appModule) }
}
```

## WebSockets

```kotlin
install(WebSockets) {
    pingPeriod = 15.seconds
    timeout = 15.seconds
    maxFrameSize = 64 * 1024
}

fun Route.chatRoutes() {
    val connections = Collections.synchronizedSet<Connection>(LinkedHashSet())

    webSocket("/chat") {
        val thisConnection = Connection(this)
        connections += thisConnection
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
