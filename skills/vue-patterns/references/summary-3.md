export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string().uuid(),
  }).parse);
  // ... fetch and return
});
```

### Runtime Config

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    // server-only
    apiSecret: "",
    // public (exposed to client)
    public: {
      apiBase: "https://api.example.com",
    },
  },
});
```

---

## 10. Vue 3.5+ New APIs

### Reactive Props Destructure

Vue 3.5 stabilized reactive props destructure — destructured variables from `defineProps()` are automatically reactive:

```ts
// Vue 3.5+: destructured props are reactive (no need for toRefs)
const { count = 0, msg = "hello" } = defineProps<{
  count?: number;
  msg?: string;
}>();

// Limitation: cannot watch destructured prop directly
watch(() => count, (newVal) => { ... }); // PASS getter required
```

### `useTemplateRef()`

Replace name-matched plain refs with `useTemplateRef()` for template references:

```ts
import { useTemplateRef } from "vue";
const inputEl = useTemplateRef<HTMLInputElement>("input");
// "input" matches the ref="input" attribute in template, not the variable name
```

Supports dynamic ref IDs: `useTemplateRef(dynamicRefId)`.

### `onWatcherCleanup()`

Globally importable watcher cleanup API (Vue 3.5+). It must be called synchronously inside the watcher callback:

```ts
import { watch, onWatcherCleanup } from "vue";

watch(userId, async (newId) => {
  const controller = new AbortController();
  onWatcherCleanup(() => controller.abort());
  // ... fetch with signal
});
```

### `useId()`

SSR-stable unique ID generation for form elements and accessibility:

```ts
import { useId } from "vue";
const id = useId();
```

### `defer` Teleport

`<Teleport defer>` allows teleporting to targets rendered in the same cycle:

```vue
<Teleport defer to="#container">Content</Teleport>
<div id="container"></div>
```

### Lazy Hydration (SSR)

`defineAsyncComponent()` now supports `hydrate` strategy:

```ts
import { defineAsyncComponent, hydrateOnVisible } from "vue";
const AsyncComp = defineAsyncComponent({
  loader: () => import("./Comp.vue"),
  hydrate: hydrateOnVisible(),
});
```

---

## Anti-Patterns

| Anti-Pattern | Why It's Wrong | The Fix |
|-------------|---------------|---------|
| Destructuring `defineProps()` (Vue < 3.5) | Captures snapshot, loses reactivity | Access via `props.xxx` or use `toRefs()` |
| `watch()` on destructured prop (Vue 3.5+) | Compile-time error — destructured props can't be watched directly | Use getter wrapper: `watch(() => count, ...)` |
| `v-if` + `v-for` on same element | Ambiguous execution order | Use computed filtered array |
| `v-for` key = index | Broken state on reorder | Use stable database IDs |
| Mutating props | Violates one-way data flow | Emit events or use `v-model` |
| `v-html` with user content | XSS vulnerability | Sanitize with DOMPurify |
| Mixins in Vue 3 | Opaque, collision-prone | Replace with composables |
| Module-scope side effects in composable | Shared across instances | Scope in `onMounted` + `onUnmounted` |
| `reactive()` for replaceable state | Replacement breaks reactivity | Use `ref()` instead |
| Watcher without cleanup | Memory leaks, race conditions | Use `onCleanup` or `onWatcherCleanup()` (Vue 3.5+) |

> Continued in [`summary-4.md`](summary-4.md)
