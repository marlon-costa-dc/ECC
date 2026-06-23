# Prisma Patterns

Production patterns and non-obvious traps for Prisma ORM. For detailed anti-patterns, code examples, and extended guidance, see `references/prisma-patterns-extended.md`.

## When to Activate

- Designing or modifying Prisma schema models and relations
- Writing queries, transactions, or pagination logic
- Using `updateMany`, `deleteMany`, or any bulk operation
- Running or planning database migrations
- Deploying to serverless environments
- Implementing soft delete or multi-tenant row filtering

## Core Concepts

### ID Strategy

- `@default(cuid())` — default choice; URL-safe, sortable.
- `@default(uuid())` — use for interoperability with non-Prisma systems.
- `@default(autoincrement())` — use for internal join tables and audit logs.

### Schema Defaults

[See code example 1 in `code-examples.md`]

Add `@@index` on every foreign key and column used in `WHERE` or `ORDER BY`. Declare `deletedAt` upfront when soft delete is foreseeable. `updatedAt @updatedAt` fires on `update` and `upsert` only.

### Transactions

- Independent operations: array form.
- Later step depends on earlier result: interactive form.
- External calls (email, HTTP): outside transaction entirely.

[See code example 2 in `code-examples.md`]

## Best Practices

- `migrate deploy` in CI/CD; `migrate dev` only locally.
- Map entities to response DTOs.
- Catch `PrismaClientKnownRequestError` and translate to domain errors.
- Prefer `*OrThrow` methods; throws P2025 automatically.
- Use `connection_limit=1` + external pooler in serverless.
- Always provide `where` on `deleteMany`.
- Set `updatedAt: new Date()` manually in `updateMany`.

## Related

- Reference: `references/prisma-patterns-extended.md`
- Skill: `nestjs-patterns`
- Skill: `postgres-patterns`
- Skill: `database-migrations`
