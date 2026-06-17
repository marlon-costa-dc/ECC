---
name: quarkus-tdd
description: "Use when writing tests for Java Quarkus 3.x LTS services using JUnit 5, Mockito, REST Assured, Camel testing, and JaCoCo to drive features, bug fixes, and refactoring."
origin: ECC
---

# Quarkus TDD Workflow

Test-driven development for Quarkus 3.x services with 80%+ coverage (unit + integration).

## When to Use

- New features or REST endpoints
- Bug fixes or refactors
- Adding data access logic, security rules, or reactive streams
- Testing Apache Camel routes and event handlers
- Testing event-driven services with RabbitMQ
- Testing conditional flow logic or CompletableFuture async operations

## Workflow

1. Write tests first (they should fail)
2. Implement minimal code to pass
3. Refactor with tests green
4. Enforce coverage with JaCoCo (80%+ target)

## Core Rules

- Use `@Nested` classes to group tests by method
- Use `@DisplayName` for readable descriptions
- Follow `givenX_whenY_thenZ` naming convention
- Follow Arrange-Act-Assert with explicit comments
- Use `@BeforeEach` for common test data setup
- Prefer AssertJ (`assertThat`) for readability
- Use `assertDoesNotThrow` for success scenarios
- Use `assertThrows` for exception scenarios
- Mock all external dependencies
- Aim for 80%+ line coverage, 70%+ branch coverage

## Quick Examples

See `references/unit.md` for JUnit 5 + Mockito unit tests. See `references/async-events.md` for event service tests and `references/async.md` for CompletableFuture tests. See `references/camel.md` for Camel route testing. See `references/api.md` for REST Assured and integration tests. See `references/coverage.md` for JaCoCo and test dependencies.

## CI Commands

```bash
mvn clean test
mvn jacoco:report
mvn jacoco:check
```

## Cross-References

- For patterns: `quarkus-patterns`
- For security: `quarkus-security`
- For verification: `quarkus-verification`
