---
name: quarkus-patterns
description: "Use when building Java Quarkus 3.x LTS backend services with REST APIs, CDI services, Hibernate Panache, Apache Camel messaging, caching, async processing, and event-driven architectures."
origin: ECC
---

# Quarkus Development Patterns

Quarkus 3.x architecture and API patterns for cloud-native, event-driven services.

## When to Activate

- Building REST APIs with JAX-RS or RESTEasy Reactive
- Structuring resource → service → repository layers
- Implementing event-driven patterns with Apache Camel and RabbitMQ
- Configuring Hibernate Panache, caching, or reactive streams
- Adding validation, exception mapping, or pagination
- Setting up dev/test/prod profiles or GraalVM native compilation

## Core Rules

- Use `@ApplicationScoped` with constructor injection (Lombok `@RequiredArgsConstructor`)
- Keep service layer thin; delegate complex logic to specialized classes
- Use Camel routes for message routing and integration patterns
- Prefer Panache Repository pattern for data access
- Validate at resource layer with `@Valid`; map exceptions with `@Provider`
- Use `@Transactional` on methods that modify data
- Use YAML configuration (`quarkus-config-yaml`) with profile-aware blocks
- Externalize secrets to env vars or Vault
- Add health checks for production readiness
- Use Logback/Logstash encoder for structured logging

## Quick Examples

See `references/examples.md` for service, event service, repository, REST resource, and DTO examples. See `references/extras.md` for exception mapping, caching, and health checks. See `references/camel.md` for Camel routes and messaging. See `references/config.md` for YAML profiles and logging context. See `references/async-deps.md` for CompletableFuture async and Maven dependencies.

## Cross-References

- For security: `quarkus-security`
- For testing: `quarkus-tdd`
- For verification: `quarkus-verification`
