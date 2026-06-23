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
