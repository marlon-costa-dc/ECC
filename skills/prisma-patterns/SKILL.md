---
name: prisma-patterns
description: Use when designing or modifying Prisma schema models and relations, writing queries, transactions, or pagination logic, using updateMany or deleteMany, running or planning database migrations, deploying to serverless environments, or implementing soft delete and multi-tenant row filtering in Prisma ORM.
---

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

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  name      String
  role      Role      @default(USER)
  posts     Post[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@index([createdAt])
  @@index([deletedAt, createdAt])
}
```

Add `@@index` on every foreign key and column used in `WHERE` or `ORDER BY`. Declare `deletedAt` upfront when soft delete is foreseeable. `updatedAt @updatedAt` fires on `update` and `upsert` only.

### Transactions

- Independent operations: array form.
- Later step depends on earlier result: interactive form.
- External calls (email, HTTP): outside transaction entirely.

```ts
const [user, post] = await prisma.$transaction([
  prisma.user.update({ where: { id }, data: { name } }),
  prisma.post.create({ data: { title, authorId: id } }),
]);

const post = await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUniqueOrThrow({ where: { id } });
  if (user.role !== 'ADMIN') throw new Error('Forbidden');
  return tx.post.create({ data: { title, authorId: user.id } });
});
```

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
