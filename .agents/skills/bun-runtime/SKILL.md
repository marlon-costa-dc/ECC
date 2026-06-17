---
name: bun-runtime
description: Use when choosing Bun as the JS/TS runtime, package manager, bundler, or test runner, or when migrating a Node.js project to Bun and evaluating trade-offs.
---

# bun-runtime

## When to use
- New JS/TS projects or scripts where speed matters.
- Migrating from Node to a single toolchain (run + install + test + build).
- Deploying to Vercel with the Bun runtime.
- Writing/debugging Bun tests or scripts.

## What to do
1. Install dependencies with `bun install`.
2. Run scripts with `bun run <script>` or `bun <file>.ts`.
3. Run tests with `bun test`.
4. Build/bundle with `bun build`.
5. On Vercel, set the runtime to Bun and use `bun install --frozen-lockfile`.

## Critical rules
- Commit the lockfile (`bun.lock` or `bun.lockb`) for reproducible installs.
- Prefer `bun run` for npm scripts; use `bun x` instead of `npx`.
- Use Bun APIs (e.g., `Bun.file`, `Bun.serve`) when available for better performance.
- Fall back to Node when a dependency has known Bun issues or legacy Node assumptions.

## Example
```bash
bun install
bun run dev
bun test
bun build ./src/index.ts --outdir=dist
```

```typescript
import { expect, test } from "bun:test";
test("add", () => {
  expect(1 + 2).toBe(3);
});
```
