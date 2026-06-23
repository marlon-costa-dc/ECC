---
name: kotlin-ktor-patterns
description: "Use when building Ktor HTTP servers, configuring plugins, implementing REST APIs, setting up authentication with JWT, dependency injection with Koin, WebSockets, or integration tests."
origin: ECC
---

# Ktor Server Patterns

Patterns for building robust, maintainable HTTP servers with Kotlin coroutines.

## When to Use

- Building Ktor HTTP servers
- Configuring plugins (Auth, CORS, ContentNegotiation, StatusPages)
- Implementing REST APIs with Ktor
- Setting up dependency injection with Koin
- Writing Ktor integration tests with `testApplication`
- Working with WebSockets in Ktor

## Core Rules

1. **Project Layout**: Separate `Application.kt`, `plugins/`, `routes/`, `models/`, `services/`, `repositories/`, and `di/`.
2. **Routing**: Group routes with `route("/path") { }`. Extract route functions on `Route`. Keep routes thin; delegate to services.
3. **Serialization**: Install `ContentNegotiation` with `kotlinx.serialization`. Configure `ignoreUnknownKeys` and `encodeDefaults` explicitly.
4. **Authentication**: Use JWT plugin with `JWT.require(...)` verifier and `validate` block. Extract claims via extension on `ApplicationCall`.
5. **Error Handling**: Install `StatusPages` for domain exceptions and a final `Throwable` handler that logs and returns a generic 500.
6. **CORS**: Restrict `allowHost`, allow only required headers/methods, and set `maxAgeInSeconds`.
7. **Dependency Injection**: Use Koin modules for databases, repositories, and services. Inject in routes with `by inject()`.
8. **Validation**: Validate request bodies with `require` or extension functions; respond `400 Bad Request` on invalid input.
9. **WebSockets**: Configure `pingPeriod`, `timeout`, and `maxFrameSize`. Use `Collections.synchronizedSet` or snapshots for connection management.
10. **Testing**: Use `testApplication { }` with a test Koin module. Create a JSON client for POST/PUT tests.

## References

- Detailed routing, auth, serialization, WebSocket, and testing examples: [references/ktor-reference.md](references/ktor-reference.md)
