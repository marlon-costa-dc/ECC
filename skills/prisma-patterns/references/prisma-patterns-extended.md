# Prisma Patterns — Extended Reference

Detailed anti-patterns, code examples, and extended guidance for Prisma ORM. The SKILL.md file contains the essential core concepts and best practices; this file preserves the full examples and non-obvious traps.

## Version Notes

Tested against Prisma 5.x and 6.x. Some behaviors differ from Prisma 4.

```bash
npx prisma --version
```

Prisma 5 introduced `relationJoins`, which can load relations via JOIN rather than separate queries depending on query strategy and configuration. The `omit` field modifier and `prisma.$extends` Client Extensions API were also added. Note: `relationJoins` can cause row explosion on large 1:N relations or deep nested `include` — benchmark both approaches when relations may return many rows per parent.

## `include` vs `select`

| | `include` | `select` |
|---|---|---|
| Returns | All scalar fields + specified relations | Only specified fields |
| Use when | You need most fields plus a relation | Hot paths, large tables, avoiding over-fetch |
| Performance | May over-fetch on wide tables | Minimal payload, faster on large datasets |

```ts
// include — all columns + relation
const user = await prisma.user.findUnique({
  where: { id },
  include: { posts: { select: { id: true, title: true } } },
});

// select — explicit allowlist
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true },
});
```

Never return raw Prisma entities from API responses — map to response DTOs:

```ts
// BAD: leaks passwordHash, deletedAt, internal fields
return await prisma.user.findUniqueOrThrow({ where: { id } });

// GOOD: explicit DTO mapping
const user = await prisma.user.findUniqueOrThrow({ where: { id } });
return { id: user.id, name: user.name, email: user.email };
```

## PrismaClient Singleton

Each `PrismaClient` instance opens its own connection pool. Instantiate once.

```ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

## N+1 Problem

```ts
// BAD: N+1 — one extra query per user
const users = await prisma.user.findMany();
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { authorId: user.id } });
}

// GOOD: single query
const users = await prisma.user.findMany({ include: { posts: true } });
```

## Code Examples

### Cursor Pagination

```ts
async function getPosts(cursor?: string, limit = 20) {
  const items = await prisma.post.findMany({
    where: { published: true },
    orderBy: [
      { createdAt: 'desc' },
      { id: 'desc' },
    ],
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });

const hasNextPage = items.length > limit;
  if (hasNextPage) items.pop();

return { items, nextCursor: hasNextPage ? items[items.length - 1].id : null };
}
```

### Soft Delete

```ts
const activeUsers = await prisma.user.findMany({ where: { deletedAt: null } });
await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
```

### Error Handling

```ts
import { Prisma } from '@prisma/client';

try {
  await prisma.user.create({ data: { email } });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') throw new ConflictError('Email already exists');
    if (e.code === 'P2025') throw new NotFoundError('Record not found');
    if (e.code === 'P2003') throw new BadRequestError('Referenced record does not exist');
  }
  throw e;
}
```

Common codes: `P2002` unique violation · `P2025` not found · `P2003` foreign key violation.

### Connection Pool — Serverless

```bash
# preferred: embed params in the URL
DATABASE_URL="postgresql://user:pass@host/db?connection_limit=1&pool_timeout=20"
# With external pooler
DATABASE_URL="postgresql://user:pass@host/db?pgbouncer=true&connection_limit=1"
```

```ts
const prisma = new PrismaClient();
```

## Anti-Patterns

### `updateMany` returns a count, not records

```ts
// BAD: result is { count: 2 }
const users = await prisma.user.updateMany({ where: { role: 'GUEST' }, data: { role: 'USER' } });

// GOOD: capture IDs first, then update, then fetch affected rows
const targets = await prisma.user.findMany({
  where: { role: 'GUEST' },
  select: { id: true },
});
const ids = targets.map((u) => u.id);
await prisma.user.updateMany({ where: { id: { in: ids } }, data: { role: 'USER' } });
const updated = await prisma.user.findMany({ where: { id: { in: ids } } });
```

---

For additional details, continue reading `prisma-patterns-extended-1.md`.
