---
name: vite-patterns
description: Vite build tool patterns including config, plugins, HMR, env variables,
  proxy setup, SSR, library mode, dependency pre-bundling, and build optimization.
  Activate when working with vite.config.ts, Vite plugins, or Vite-based projects.
origin: ECC
---

# Vite Patterns

Build tool and dev server patterns for Vite 8+ projects. Covers configuration, environment variables, proxy setup, library mode, dependency pre-bundling, and common production pitfalls.

## When to Use

- Configuring vite.config.ts or vite.config.js
- Setting up environment variables or .env files
- Configuring dev server proxy for API backends
- Optimizing build output (chunks, minification, assets)
- Publishing libraries with build.lib
- Troubleshooting dependency pre-bundling or CJS/ESM interop

## Workflow

1. **Dev mode** serves source files as native ESM — no bundling. Transforms happen on-demand per module request, which is why cold starts are fast and HMR is precise.
2. **Build mode** uses Rolldown (v7+) or Rollup (v5–v6) to bundle the app for production with tree-shaking, code-splitting, and Oxc-based minification.
3. **Dependency pre-bundling** converts CJS/UMD deps to ESM once via esbuild and caches the result under node_modules/.vite, so subsequent starts skip the work.
4. **Plugins** share a unified interface across dev and build — the same plugin object works for both the dev server's on-demand transforms and the production pipeline.
5. **Environment variables** are statically inlined at build time. VITE_-prefixed vars become public constants in the bundle; everything unprefixed is invisible to client code.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
