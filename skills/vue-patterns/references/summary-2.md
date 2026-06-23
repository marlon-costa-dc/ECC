const routes = [
  {
    path: "/users/:id",
    name: "user-detail",
    component: () => import("@/pages/UserDetail.vue"), // lazy
    props: true, // pass params as props
    meta: { requiresAuth: true },
  },
];
```

### Navigation Guards

```ts
router.beforeEach((to, from) => {
  const { isLoggedIn } = useAuthStore();
  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});
```

### Reactive Route Params

When a component stays mounted but route params change:

```ts
const route = useRoute();
const id = computed(() => route.params.id as string);
watch(id, (newId) => fetchItem(newId));
```

---

## 6. Template Patterns

### Template Syntax

```vue
<!-- v-if/v-else-if/v-else -->
<div v-if="isLoading">Loading...</div>
<div v-else-if="error">Error: {{ error }}</div>
<div v-else>{{ content }}</div>

<!-- v-show for frequent toggles -->
<div v-show="isOpen">Toggled content</div>

<!-- v-for with stable keys -->
<div v-for="item in items" :key="item.id">{{ item.name }}</div>

<!-- Computed filtered list (not v-if + v-for on same element) -->
<div v-for="item in activeItems" :key="item.id">{{ item.name }}</div>

<!-- Event handling -->
<form @submit.prevent="handleSubmit">
  <button type="submit">Save</button>
</form>

<!-- v-model -->
<input v-model="name" />
<CustomInput v-model="value" v-model:title="title" />
```

---

## 7. Performance

| Technique | When to Use |
|-----------|-------------|
| `v-memo` | List items that rarely change |
| `v-once` | Content rendered once and static forever |
| `shallowRef()` | Large data structures replaced wholesale |
| `shallowReactive()` | Only top-level properties are reactive |
| `v-show` over `v-if` | Frequent visibility toggles |
| `<KeepAlive :max="10">` | Cache toggled views |
| Lazy routes | `() => import(...)` for non-critical routes |
| `Suspense` | Async component loading with fallback |

---

## 8. Testing

### Stack

- **Vitest** for unit and component tests
- **Vue Test Utils** for mounting and interaction
- **@pinia/testing** for store mocking
- **Playwright** for E2E

### Component Test Pattern

```ts
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import UserCard from "./UserCard.vue";

beforeEach(() => { setActivePinia(createPinia()); });

it("renders and emits", async () => {
  const wrapper = mount(UserCard, {
    props: { user: { id: "1", name: "Alice" } },
  });
  expect(wrapper.text()).toContain("Alice");
  await wrapper.find("button").trigger("click");
  expect(wrapper.emitted("select")![0]).toEqual(["1"]);
});
```

---

## 9. Nuxt-Specific Patterns

### Auto-Imports

Nuxt auto-imports `ref`, `computed`, `watch`, `useFetch`, `useAsyncData`, etc. Use them directly without importing. For non-Nuxt projects, always import explicitly.

### useAsyncData / useFetch

```ts
const { data: user, pending, error, refresh } = await useAsyncData(
  "user", // unique key for caching
  () => $fetch(`/api/users/${id}`),
);

const { data: posts } = await useFetch("/api/posts", {
  query: { page: 1 },
  key: "posts-page-1", // dedupes requests
});
```

### Server Routes

```ts
// server/api/users/[id].ts

> Continued in [`summary-3.md`](summary-3.md)
