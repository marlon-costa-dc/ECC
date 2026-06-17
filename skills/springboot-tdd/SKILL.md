---
name: springboot-tdd
description: "Use when writing tests for Java Spring Boot services using JUnit 5, Mockito, MockMvc, Testcontainers, and JaCoCo to drive features, bug fixes, and refactoring."
origin: ECC
---

# Spring Boot TDD Workflow

Test-driven development for Spring Boot services with 80%+ coverage (unit + integration).

## When to Use

- New features or endpoints
- Bug fixes or refactors
- Adding data access logic or security rules

## Workflow

1. Write tests first (they should fail)
2. Implement minimal code to pass
3. Refactor with tests green
4. Enforce coverage with JaCoCo

## Core Rules

- Prefer AssertJ (`assertThat`) for readability
- Follow Arrange-Act-Assert
- Use `@ParameterizedTest` for variants
- Avoid partial mocks; prefer explicit stubbing
- Use test data builders to reduce duplication
- Keep tests fast, isolated, and deterministic
- Test behavior, not implementation details

## Quick Examples

See `references/examples.md` for unit tests with JUnit 5 + Mockito, MockMvc tests, integration tests, persistence tests with Testcontainers, and JaCoCo configuration.

## CI Commands

- Maven: `mvn -T 4 test` or `mvn verify`
- Gradle: `./gradlew test jacocoTestReport`

## Cross-References

- For patterns: `springboot-patterns`
- For security: `springboot-security`
- For verification: `springboot-verification`
