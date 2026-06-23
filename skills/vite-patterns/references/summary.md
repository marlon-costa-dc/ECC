# Vite Patterns

Build tool and dev server patterns for Vite 8+ projects. Covers configuration, environment variables, proxy setup, library mode, dependency pre-bundling, and common production pitfalls.

## When to Use

- Configuring `vite.config.ts` or `vite.config.js`
- Setting up environment variables or `.env` files
- Configuring dev server proxy for API backends
- Optimizing build output (chunks, minification, assets)
- Publishing libraries with `build.lib`
- Troubleshooting dependency pre-bundling or CJS/ESM interop
- Debugging HMR, dev server, or build errors
- Choosing or ordering Vite plugins

## How It Works

- **Dev mode** serves source files as native ESM — no bundling. Transforms happen on-demand per module request, which is why cold starts are fast and HMR is precise.
- **Build mode** uses Rolldown (v7+) or Rollup (v5–v6) to bundle the app for production with tree-shaking, code-splitting, and Oxc-based minification.
- **Dependency pre-bundling** converts CJS/UMD deps to ESM once via esbuild and caches the result under `node_modules/.vite`, so subsequent starts skip the work.
- **Plugins** share a unified interface across dev and build — the same plugin object works for both the dev server's on-demand transforms and the production pipeline.
- **Environment variables** are statically inlined at build time. `VITE_`-prefixed vars become public constants in the bundle; everything unprefixed is invisible to client code.

## Examples

### Config Structure

#### Basic Config

[See code example 1 in `code-examples.md`]

#### Conditional Config

[See code example 2 in `code-examples.md`]

#### Key Config Options

| Key | Default | Description |
|-----|---------|-------------|
| `root` | `'.'` | Project root (where `index.html` lives) |
| `base` | `'/'` | Public base path for deployed assets |
| `envPrefix` | `'VITE_'` | Prefix for client-exposed env vars |
| `build.outDir` | `'dist'` | Output directory |
| `build.minify` | `'oxc'` | Minifier (`'oxc'`, `'terser'`, or `false`) |
| `build.sourcemap` | `false` | `true`, `'inline'`, or `'hidden'` |

### Plugins

#### Essential Plugins

Most plugin needs are covered by a handful of well-maintained packages. Reach for these before writing your own.

| Plugin | Purpose | When to use |
|--------|---------|-------------|
| `@vitejs/plugin-react-swc` | React HMR + Fast Refresh via SWC | Default for React apps (faster than Babel variant) |
| `@vitejs/plugin-react` | React HMR + Fast Refresh via Babel | Only if you need Babel plugins (emotion, MobX decorators) |
| `@vitejs/plugin-vue` | Vue 3 SFC support | Vue apps |
| `vite-plugin-checker` | Runs `tsc` + ESLint in worker thread with HMR overlay | **Any TypeScript app** — Vite does NOT type-check during `vite build` |
| `vite-tsconfig-paths` | Honors `tsconfig.json` `paths` aliases | Any time you already have aliases in `tsconfig.json` |
| `vite-plugin-dts` | Emits `.d.ts` files in library mode | Publishing TypeScript libraries |
| `vite-plugin-svgr` | Imports SVGs as React components | React apps using SVGs as components |
| `rollup-plugin-visualizer` | Bundle treemap/sunburst report | Periodic bundle size audits (use `enforce: 'post'`) |
| `vite-plugin-pwa` | Zero-config PWA + Workbox | Offline-capable apps |

**Critical callout:** `vite build` transpiles but does NOT type-check. Type errors silently ship to production unless you add `vite-plugin-checker` or run `tsc --noEmit` in CI.

#### Authoring Custom Plugins

Authoring is rare — most needs are covered by existing plugins. When you do need one, start inline in `vite.config.ts` and only extract if reused.

[See code example 3 in `code-examples.md`]

**Key hooks:** `transform` (modify source), `resolveId` + `load` (virtual modules), `transformIndexHtml` (inject into HTML), `configureServer` (add dev middleware), `hotUpdate` (custom HMR — replaces deprecated `handleHotUpdate` in v7+).

---

For additional details, continue reading `summary-1.md`, `summary-2.md`, `summary-3.md`.
