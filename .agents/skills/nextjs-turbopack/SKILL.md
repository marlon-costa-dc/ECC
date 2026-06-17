---
name: nextjs-turbopack
description: Use when deciding whether to adopt Next.js 16+ Turbopack, migrating from webpack, or optimizing production bundles, dev-server performance, and caching.
---

# nextjs-turbopack

## Quando usar
- Developing or debugging Next.js 16+ apps with slow dev startup or HMR.
- Deciding between Turbopack and webpack for local development.
- Optimizing production bundles with official analysis tools.

## O que fazer
1. Run `next dev` to use Turbopack (default in Next.js 16+).
2. If you hit a Turbopack bug or need a webpack-only plugin, disable with `--webpack` / `--no-turbopack` per docs.
3. Keep `.next` cache intact; only clear it when debugging cache-related issues.
4. Use the experimental Bundle Analyzer for your version to inspect and trim heavy dependencies.
5. Prefer App Router and Server Components to reduce client bundle size.

## Regras críticas
- Do not force Turbopack in production builds; follow the Next.js version docs for `next build`.
- Do not manually bump Next.js versions outside the project’s pinned range.
- Do not clear `.next` cache as a first troubleshooting step.

## Exemplo (se necessário)

```bash
next dev
next build
next start
```
