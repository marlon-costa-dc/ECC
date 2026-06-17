---
name: jpa-patterns
description: "Use when designing JPA entities, defining relationships, optimizing queries, configuring transactions, pagination, indexing, connection pooling, or testing data access in Spring Boot."
origin: ECC
---

# JPA/Hibernate Patterns

Use for data modeling, repositories, and performance tuning in Spring Boot.

## When to Use

- Designing JPA entities and table mappings
- Defining relationships (`@OneToMany`, `@ManyToOne`, `@ManyToMany`)
- Optimizing queries, fetch strategies, and projections
- Configuring transactions, auditing, or soft deletes
- Setting up pagination, sorting, or custom repositories
- Tuning connection pooling or second-level caching

## Core Rules

1. **Entity Design**: Use `@Entity`, `@Table` with indexes, `@EntityListeners(AuditingEntityListener.class)`, and `@EnableJpaAuditing`. Prefer `GenerationType.IDENTITY` and `Instant` timestamps.
2. **Relationships**: Default to lazy loading; `orphanRemoval = true` for owned collections. Avoid `EAGER`; use `JOIN FETCH` or projections for reads.
3. **Repositories**: Extend `JpaRepository`, add `@Query` methods, return `Page<T>` or projections.
4. **Transactions**: Annotate service methods with `@Transactional`; use `readOnly = true` for reads; keep transactions short.
5. **Pagination**: Use `PageRequest.of(page, size, Sort.by(...).descending())`. For cursor pagination, filter on `id > :lastId`.
6. **Performance**: Index common filters and FKs; use composite indexes matching query patterns. Batch writes with `saveAll` and `hibernate.jdbc.batch_size`.
7. **Pooling & Caching**: Configure HikariCP sizes/timeouts. 1st-level cache is per `EntityManager`; use 2nd-level cache cautiously with clear eviction.
8. **Migrations**: Use Flyway or Liquibase; never rely on `ddl-auto` in production. Keep migrations additive and idempotent.
9. **Testing**: Prefer `@DataJpaTest` with Testcontainers; enable SQL/bind logging to debug query efficiency.

## References

- Detailed examples and tuning notes: [references/jpa-reference.md](references/jpa-reference.md)
