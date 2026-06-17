---
name: nextjs-turbopack
description: Use when developing or debugging Next.js 16+ applications, diagnosing slow dev startup or HMR, choosing between Turbopack and webpack, or optimizing production bundles.
---

# Next.js and Turbopack

Next.js 16+ uses Turbopack by default for local development: a Rust-based incremental bundler that speeds up startup and HMR.

## When to Use

- **Turbopack (default dev)**: day-to-day development; faster cold start and HMR in large apps.
- **Webpack (legacy dev)**: only for Turbopack bugs or webpack-only dev plugins. Disable with `--webpack` or `--no-turbopack` depending on version.
- **Production**: `next build` may use Turbopack or webpack depending on version; check official docs.

## How It Works

- **Turbopack**: incremental bundler with file-system caching; restarts reuse work under `.next`.
- **Bundle Analyzer (Next.js 16.1+)**: experimental analyzer to inspect output; enable via config/experimental flag.

## Middleware File Naming

Next.js 16 introduced `proxy.ts` as the middleware filename, replacing `middleware.ts`:

- **Next.js 16+**: use `proxy.ts` at project root.
- **Pre-Next.js 16**: use `middleware.ts` at project root.

The filename is tied to the **Next.js version**, not the bundler. Do not flag `proxy.ts` as misnamed or missing in Next.js 16 projects; renaming to `middleware.ts` breaks middleware execution.

Reference: [Next.js proxy docs](https://nextjs.org/docs/app/getting-started/proxy)

## Examples

```bash
next dev
next build
next start
```

Run `next dev` for Turbopack dev. Use the Bundle Analyzer (see docs) to optimize code-splitting.

## Best Practices

- Stay on a recent Next.js 16.x for stable Turbopack.
- If dev is slow, ensure Turbopack is default and cache isn't cleared unnecessarily.
- Use official Next.js bundle analysis tooling for production size issues.
