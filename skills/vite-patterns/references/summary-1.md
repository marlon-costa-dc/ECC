**Virtual modules** use the `\0` prefix convention — `resolveId` returns `'\0virtual:my-id'` so other plugins skip it. User code imports `'virtual:my-id'`.

For full plugin API, see [vite.dev/guide/api-plugin](https://vite.dev/guide/api-plugin). Use `vite-plugin-inspect` during development to debug the transform pipeline.

### HMR API

Framework plugins (`@vitejs/plugin-react`, `@vitejs/plugin-vue`, etc.) handle HMR automatically. Reach for `import.meta.hot` directly only when building custom state stores, dev tools, or framework-agnostic utilities that need to persist state across updates.

```typescript
// src/store.ts — manual HMR for a vanilla module
if (import.meta.hot) {
  // Persist state across updates (must MUTATE, never reassign .data)
  import.meta.hot.data.count = import.meta.hot.data.count ?? 0

// Cleanup side effects before module is replaced
  import.meta.hot.dispose((data) => clearInterval(data.intervalId))

// Accept this module's own updates
  import.meta.hot.accept()
}
```

All `import.meta.hot` code is tree-shaken out of production builds — no guard removal needed.

### Environment Variables

Vite loads `.env`, `.env.local`, `.env.[mode]`, and `.env.[mode].local` in that order (later overrides earlier); `*.local` files are gitignored and meant for local secrets.

#### Client-Side Access

Only `VITE_`-prefixed vars are exposed to client code:

```typescript
import.meta.env.VITE_API_URL   // string
import.meta.env.MODE            // 'development' | 'production' | custom
import.meta.env.BASE_URL        // base config value
import.meta.env.DEV             // boolean
import.meta.env.PROD            // boolean
import.meta.env.SSR             // boolean
```

#### Using Env in Config

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())          // VITE_ prefixed only (safe)
  return {
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },
  }
})
```

### Security

#### `VITE_` Prefix is NOT a Security Boundary

Any variable prefixed with `VITE_` is **statically inlined into the client bundle at build time**. Minification, base64 encoding, and disabling source maps do NOT hide it. A determined attacker can extract any `VITE_` var from the shipped JavaScript.

**Rule:** Only public values (API URLs, feature flags, public keys) go in `VITE_` vars. Secrets (API tokens, database URLs, private keys) MUST live server-side behind an API or serverless function.

#### The `loadEnv('')` Trap

```typescript
// BAD: passing '' as the third arg loads ALL env vars — including server secrets —
// and makes them available to inline into client code via `define`.
const env = loadEnv(mode, process.cwd(), '')

// GOOD: explicit prefix list
const env = loadEnv(mode, process.cwd(), ['VITE_', 'APP_'])
```

#### Source Maps in Production

Production source maps leak your original source code. Disable them unless you upload to an error tracker (Sentry, Bugsnag) and delete locally afterward:

```typescript
build: {
  sourcemap: false,                                  // default — keep it this way
}
```

#### `.gitignore` Checklist

- `.env.local`, `.env.*.local` — local secret overrides
- `dist/` — build output
- `node_modules/.vite` — pre-bundle cache (stale entries cause phantom errors)

### Server Proxy

```typescript
// vite.config.ts — server.proxy
server: {
  proxy: {
    '/foo': 'http://localhost:4567',                    // string shorthand

'/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,                               // needed for virtual-hosted backends
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

For WebSocket proxying, add `ws: true` to the route config.

### Build Optimization

#### Manual Chunks

```typescript
// vite.config.ts — build.rolldownOptions
build: {
  rolldownOptions: {
    output: {
      // Object form: group specific packages
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-popover'],
      },
    },
  },
}
```

```typescript
// Function form: split by heuristic
manualChunks(id) {
  if (id.includes('node_modules/react')) return 'react-vendor'
  if (id.includes('node_modules')) return 'vendor'
}
```

### Performance

#### Avoid Barrel Files

Barrel files (`index.ts` re-exporting everything from a directory) force Vite to load every re-exported file even when you import a single symbol. This is the #1 dev-server slowdown flagged by the official docs.

```typescript
// BAD — importing one util forces Vite to load the whole barrel
import { slash } from '@/utils'

// GOOD — direct import, only the one file is loaded
import { slash } from '@/utils/slash'
```

#### Be Explicit with Import Extensions

Each implicit extension forces up to 6 filesystem checks via `resolve.extensions`. In large codebases, this adds up.

```typescript
// BAD
import Component from './Component'

// GOOD
import Component from './Component.tsx'
```

Narrow `tsconfig.json` `allowImportingTsExtensions` + `resolve.extensions` to only the extensions you actually use.

#### Warm-Up Hot-Path Routes

`server.warmup.clientFiles` pre-transforms known hot entries before the browser requests them — eliminating the cold-load request waterfall on large apps.

```typescript
// vite.config.ts
server: {
  warmup: {
    clientFiles: ['./src/main.tsx', './src/routes/**/*.tsx'],
  },
}
```

---

Continue in `summary-2.md`.
