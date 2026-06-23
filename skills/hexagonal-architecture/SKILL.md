---
name: hexagonal-architecture
description: Use when designing or refactoring Ports & Adapters systems across TypeScript, Java, Kotlin, or Go services where clear domain boundaries, dependency inversion, and testable use-case orchestration are required.
origin: ECC
metadata:
  adrs: []
---

# Hexagonal Architecture

Keeps business logic independent from frameworks, transport, and persistence details.

## When to Use

- Building features where maintainability and testability matter
- Refactoring framework-heavy code mixed with I/O concerns
- Supporting multiple interfaces for the same use case (HTTP, CLI, queue workers, cron)
- Replacing infrastructure without rewriting business rules

## Core Concepts

- **Domain model**: business rules and entities; no framework imports
- **Use cases**: application-layer orchestration of domain behavior
- **Inbound ports**: contracts for what the application can do
- **Outbound ports**: contracts for dependencies the application needs
- **Adapters**: infrastructure and delivery implementations of ports
- **Composition root**: single wiring location for adapters and use cases

Dependency direction is always inward: adapters -> application -> ports -> domain.

## Workflow

1. Model a use case boundary with clear input/output DTOs
2. Define outbound ports for every side effect (persistence, gateways, logging, clock, UUID)
3. Implement the use case with pure orchestration and domain rules
4. Build inbound and outbound adapters at the edge
5. Wire everything in a centralized composition root
6. Test per boundary: domain, use case with fakes, adapter integration, end-to-end

## Anti-Patterns

- Domain entities importing ORM models or framework types
- Use cases reading directly from HTTP request/response objects
- Adapters calling each other directly instead of through use cases
- Hidden global singletons for dependency wiring

## Migration Playbook

- Pick one vertical slice with frequent change pain
- Extract input/output types and outbound ports
- Move orchestration into the use case; keep old adapters delegating to it
- Add characterization tests; repeat slice-by-slice with rollback toggles

## References

- [Hexagonal Architecture Reference](references/hexagonal-architecture.md) — detailed examples, best practices, and migration tactics

## Related Skills

- `backend-patterns`, `nestjs-patterns`, `fastapi-patterns`, `django-patterns`, `tdd-workflow`
