---
name: springboot-patterns
description: "Use when building Java Spring Boot backend services that need architecture patterns for REST APIs, layered services, data access, caching, async processing, and logging."
origin: ECC
---

# Spring Boot Development Patterns

Architecture and API patterns for scalable, production-grade Spring Boot services.

## When to Activate

- Building REST APIs with Spring MVC or WebFlux
- Structuring controller → service → repository layers
- Configuring Spring Data JPA, caching, async processing, or profiles
- Adding validation, exception handling, pagination, or structured logging

## Core Rules

- Prefer constructor injection; avoid field injection
- Keep controllers thin, services focused, repositories simple
- Use records for DTOs with Bean Validation annotations
- Handle errors centrally with `@ControllerAdvice`
- Enable `spring.mvc.problemdetails.enabled=true` for RFC 7807 errors (Boot 3+)
- Use `@Transactional(readOnly = true)` for queries
- Add `@EnableCaching` for caches and `@EnableAsync` for async tasks
- Use SLF4J/Logback with structured JSON logging
- Externalize secrets; never commit credentials

## Quick Examples

See `references/examples.md` for controller, service, repository, DTO, and exception handler examples. See `references/advanced.md` for caching, async, logging, filters, pagination, retry, rate limiting, and observability examples.

## Cross-References

- For security: `springboot-security`
- For testing: `springboot-tdd`
- For verification: `springboot-verification`
