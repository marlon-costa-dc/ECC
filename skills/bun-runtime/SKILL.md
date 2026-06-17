---
name: bun-runtime
description: Use when choosing, adopting, migrating to, or debugging Bun as a JavaScript/TypeScript runtime, package manager, bundler, test runner, or Vercel deployment target.
---

# Bun Runtime

Bun is an all-in-one JS/TS runtime and toolkit.

## When to Use

- **Prefer Bun**: new JS/TS projects, scripts needing speed, Vercel deployments with Bun runtime, single toolchain for run/install/test/build.
- **Prefer Node**: maximum ecosystem compatibility, legacy Node assumptions, known Bun issues.

## How It Works

- **Runtime**: Node-compatible runtime (JavaScriptCore/Zig).
- **Package manager**: `bun install` is fast; lockfile is `bun.lock` (text) or `bun.lockb` (binary).
- **Bundler**: Built-in bundler/transpiler.
- **Test runner**: `bun test` with Jest-like API.

**Migration**: Replace `node script.js` with `bun script.js`; `npm install` with `bun install`; `npm run` with `bun run`; `npx` with `bun x`.

**Vercel**: Set runtime to Bun. Build with `bun run build` or `bun build ./src/index.ts --outdir=dist`. Use `bun install --frozen-lockfile` for reproducible deploys.

## Examples

```bash
bun install
bun run dev
bun run src/index.ts
bun src/index.ts
bun test
bun test --watch
bun run --env-file=.env dev
```

```typescript
import { expect, test } from "bun:test";
test("add", () => expect(1 + 2).toBe(3));
```

```typescript
const file = Bun.file("package.json");
const json = await file.json();
Bun.serve({ port: 3000, fetch: () => new Response("Hello") });
```

## Best Practices

- Commit `bun.lock`/`bun.lockb` for reproducible installs.
- Prefer `bun run` for scripts; Bun runs TypeScript natively.
- Keep Bun and dependencies up to date.
