---
name: java-coding-standards
description: "Use when writing or reviewing Java 17+ code in Spring Boot or Quarkus services to enforce naming, immutability, dependency injection, exception handling, reactive patterns, configuration, and testing conventions."
origin: ECC
---

# Java Coding Standards

## When to Use

- Writing or reviewing Java in Spring Boot or Quarkus projects

## Core Rules

1. **Framework detection**: `quarkus` → **[QUARKUS]**; `spring-boot` → **[SPRING]**.
2. **Naming**: `PascalCase` types, `camelCase` members, `UPPER_SNAKE_CASE` constants. **[SPRING]** `*Controller`; **[QUARKUS]** `*Resource`.
3. **Immutability**: Prefer records and `final` fields. **[QUARKUS]** Panache entities use public fields.
4. **Optional & Streams**: Return `Optional` from finders; chain `map`/`orElseThrow`. Keep streams short.
5. **Dependency Injection**: Use constructor injection. **[SPRING]** Avoid field `@Autowired`. **[QUARKUS]** Prefer `@ApplicationScoped` over `@Singleton`.
6. **Reactive [QUARKUS]**: Return `Uni`/`Multi`; compose with `chain`/`transform`; never block inside a pipeline.
7. **Exceptions**: Use unchecked domain exceptions; avoid broad `catch`. Map to HTTP responses with `@RestControllerAdvice` or `ExceptionMapper`/`@ServerExceptionMapper`.
8. **Config & Logging**: **[SPRING]** `@ConfigurationProperties` + SLF4J; **[QUARKUS]** `@ConfigMapping`/`@ConfigProperty` + JBoss Logging.
9. **Testing**: JUnit 5 + AssertJ + Mockito. **[SPRING]** slice with `@WebMvcTest`/`@DataJpaTest` and `@MockBean`. **[QUARKUS]** plain JUnit for units, `@QuarkusTest` + `@InjectMock`, Dev Services.

## References

- Detailed examples, layouts, and smells: [references/java-coding-reference.md](references/java-coding-reference.md)
