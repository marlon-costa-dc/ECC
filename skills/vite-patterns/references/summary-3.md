- **`vite preview` is NOT a production server** — it is a smoke test for the built bundle. Deploy `dist/` to a real static host (NGINX, Cloudflare Pages, Vercel static) or use a multi-stage Dockerfile.
- **Expecting `vite build` to type-check** — it only transpiles. Type errors silently ship to production. Add `vite-plugin-checker` or run `tsc --noEmit` in CI.
- **Shipping `@vitejs/plugin-legacy` by default** — it bloats bundles ~40%, breaks source-map bundle analyzers, and is unnecessary for the 95%+ of users on modern browsers. Gate it on real analytics, not assumption.
- **Hand-rolling 30+ `resolve.alias` entries that duplicate `tsconfig.json` paths** — use `vite-tsconfig-paths` instead. Observed in Excalidraw and PostHog; avoid in new projects.
- **Leaving stale `node_modules/.vite` after dep changes** — pre-bundle cache causes phantom errors. Clear it when switching branches or after patching deps.

## Quick Reference

| Pattern | When to Use |
|---------|-------------|
| `defineConfig` | Always — provides type inference |
| `loadEnv(mode, root, ['VITE_'])` | Access env vars in config (explicit prefix) |
| `vite-plugin-checker` | Any TypeScript app (fills the type-check gap) |
| `vite-tsconfig-paths` | Instead of hand-rolled `resolve.alias` |
| `optimizeDeps.include` | CJS deps causing interop issues |
| `server.proxy` | Route API requests to backend in dev |
| `server.host: true` | Docker, containers, remote access |
| `server.warmup.clientFiles` | Pre-transform hot-path routes |
| `build.lib` + `external` | Publishing npm packages |
| `manualChunks` (object) | Vendor bundle splitting |
| `vite --profile` | Debug slow dev server |
| `vite build && vite preview` | Smoke-test prod bundle locally (NOT a prod server) |

## Related Skills

- `frontend-patterns` — React component patterns
- `docker-patterns` — containerized dev with Vite
- `nextjs-turbopack` — alternative bundler for Next.js
