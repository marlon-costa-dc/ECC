### `$transaction` interactive form times out after 5 seconds

```ts
// BAD: external call inside transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.findUniqueOrThrow({ where: { id } });
  await sendWelcomeEmail(user.email);
  await tx.user.update({ where: { id }, data: { emailSent: true } });
});

// GOOD: external calls outside the transaction
const user = await prisma.user.findUniqueOrThrow({ where: { id } });
await sendWelcomeEmail(user.email);
await prisma.user.update({ where: { id }, data: { emailSent: true } });

// Only raise timeout when bulk processing genuinely needs it
await prisma.$transaction(async (tx) => { ... }, { timeout: 30_000 });
```

### `migrate dev` can reset the database

```bash
# NEVER on shared dev, staging, or production
npx prisma migrate dev --name add_column

# Safe everywhere except local solo dev
npx prisma migrate deploy

# Check drift without applying
npx prisma migrate diff \
  --from-migrations ./prisma/migrations \
  --to-schema-datamodel ./prisma/schema.prisma \
  --shadow-database-url "$SHADOW_DATABASE_URL"
```

### Manually editing a migration file breaks future deploys

Prisma checksums every migration file. Editing after apply causes `P3006 checksum mismatch`. Create a new migration instead.

### Breaking schema changes require multi-step migration

```bash
# Step 1: create migration locally, then deploy
npx prisma migrate dev --name add_new_column
npx prisma migrate deploy
```

```ts
// Step 2: backfill data
await prisma.user.updateMany({ data: { newColumn: derivedValue } });
```

```bash
# Step 3: create the NOT NULL constraint migration
npx prisma migrate dev --name make_new_column_required
npx prisma migrate deploy
```

### `@updatedAt` does not fire on `updateMany`

```ts
// BAD: updatedAt stays at its old value
await prisma.post.updateMany({ where: { authorId }, data: { published: true } });

// GOOD
await prisma.post.updateMany({
  where: { authorId },
  data: { published: true, updatedAt: new Date() },
});
```

### Soft delete + `findUniqueOrThrow` leaks deleted records

```ts
// BAD: returns soft-deleted user
const user = await prisma.user.findUniqueOrThrow({ where: { id } });

// GOOD
const user = await prisma.user.findFirstOrThrow({ where: { id, deletedAt: null } });
```

### `deleteMany` without `where` deletes every row

```ts
// BAD: silently wipes the table
await prisma.post.deleteMany();

// GOOD
await prisma.post.deleteMany({ where: { authorId: userId } });
```
