#### Profiling Slow Dev Servers

When `vite dev` feels slow, start with `vite --profile`, interact with the app, then press `p+enter` to save a `.cpuprofile`. Load it in [Speedscope](https://www.speedscope.app) to find which plugins are eating time — usually `buildStart`, `config`, or `configResolved` hooks in community plugins.

### Library Mode

When publishing an npm package, use `build.lib`. Two footguns matter more than config detail:

1. **Types are not emitted** — add `vite-plugin-dts` or run `tsc --emitDeclarationOnly` separately.
2. **Peer dependencies MUST be externalized** — unlisted peers get bundled into your library, causing duplicate-runtime errors in consumers.

```typescript
// vite.config.ts
build: {
  lib: {
    entry: 'src/index.ts',
    formats: ['es', 'cjs'],
    fileName: (format) => `my-lib.${format}.js`,
  },
  rolldownOptions: {
    external: ['react', 'react-dom', 'react/jsx-runtime'],  // every peer dep
  },
}
```

### SSR Externals

Bare `createServer({ middlewareMode: true })` setups are framework-author territory. Most apps should use Nuxt, Remix, SvelteKit, Astro, or TanStack Start instead. What you *will* tweak as a framework user is the externals config when deps break in SSR:

```typescript
// vite.config.ts — ssr options
ssr: {
  external: ['node-native-package'],           // keep as require() in SSR bundle
  noExternal: ['esm-only-package'],            // force-bundle into SSR output (fixes most SSR errors)
  target: 'node',                              // 'node' or 'webworker'
}
```

### Dependency Pre-Bundling

Vite pre-bundles dependencies to convert CJS/UMD to ESM and reduce request count.

```typescript
// vite.config.ts — optimizeDeps
optimizeDeps: {
  include: [
    'lodash-es',                              // force pre-bundle known heavy deps
    'cjs-package',                            // CJS deps that cause interop issues
    'deep-lib/components/**',                 // glob for deep imports
  ],
  exclude: ['local-esm-package'],             // must be valid ESM if excluded
  force: true,                                // ignore cache, re-optimize (temporary debugging)
}
```

### Common Pitfalls

#### Dev Does Not Match Build

Dev uses esbuild/Rolldown for transforms; build uses Rolldown for bundling. CJS libraries can behave differently between the two. Always verify with `vite build && vite preview` before deploying.

#### Stale Chunks After Deployment

New builds produce new chunk hashes. Users with active sessions request old filenames that no longer exist. Vite has no built-in solution. Mitigations:

- Keep old `dist/assets/` files live for a deployment window
- Catch dynamic import errors in your router and force a page reload

#### Docker and Containers

Vite binds to `localhost` by default, which is unreachable from outside a container:

```typescript
// vite.config.ts — Docker/container setup
server: {
  host: true,                                  // bind 0.0.0.0
  hmr: { clientPort: 3000 },                   // if behind a reverse proxy
}
```

#### Monorepo File Access

Vite restricts file serving to the project root. Packages outside root are blocked:

```typescript
// vite.config.ts — monorepo file access
server: {
  fs: {
    allow: ['..'],                             // allow parent directory (workspace root)
  },
}
```

### Anti-Patterns

```typescript
// BAD: Setting envPrefix to '' exposes ALL env vars (including secrets) to the client
envPrefix: ''

// BAD: Assuming require() works in application source code — Vite is ESM-first
const lib = require('some-lib')                // use import instead

// BAD: Splitting every node_module into its own chunk — creates hundreds of tiny files
manualChunks(id) {
  if (id.includes('node_modules')) {
    return id.split('node_modules/')[1].split('/')[0]   // one chunk per package
  }
}

// BAD: Not externalizing peer deps in library mode — causes duplicate runtime errors
// build.lib without rolldownOptions.external

// BAD: Using deprecated esbuild minifier
build: { minify: 'esbuild' }                  // use 'oxc' (default) or 'terser'

// BAD: Mutating import.meta.hot.data by reassignment
import.meta.hot.data = { count: 0 }           // WRONG: must mutate properties, not reassign
import.meta.hot.data.count = 0                 // CORRECT
```

**Process anti-patterns:**

---

Continue in `summary-3.md`.
