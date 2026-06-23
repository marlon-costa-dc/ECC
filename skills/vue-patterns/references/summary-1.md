# Extended guidance


- **Container components**: Own data fetching, state, and side effects. Render presentational components.
- **Presentational components**: Receive props, emit events. No API calls, no store access. Pure rendering.

### Props Best Practices

```ts
// Type-based props with defaults
interface Props {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  items: Item[];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
});
```

- Always provide `type`, and `required`/`default` where appropriate.
- Boolean props: `isXxx`, `hasXxx`, `canXxx`.
- Never mutate props — emit events instead.
- For v-model binding, use `defineModel()` (Vue 3.4+) or `modelValue` + `update:modelValue`.

### Events

```ts
const emit = defineEmits<{
  submit: [];
  "update:modelValue": [value: string];
  select: [id: string, index: number];
}>();
```

- Use kebab-case in templates (`@update:model-value`).
- Use camelCase in script (`emit("update:modelValue", val)`).

---

## 3. Composables (Reusable Logic)

### Structure

```ts
// composables/useDebounce.ts
export function useDebounce<T>(value: MaybeRef<T>, delay: number): Ref<T> {
  const debounced = ref(toValue(value)) as Ref<T>;

  let timer: ReturnType<typeof setTimeout>;
  watch(
    () => toValue(value),
    (newVal) => {
      clearTimeout(timer);
      timer = setTimeout(() => { debounced.value = newVal; }, delay);
    }
  );

  onUnmounted(() => clearTimeout(timer));
  return readonly(debounced);
}
```

### Rules

- Must start with `use` prefix.
- Return reactive values (`ref`, `computed`, `reactive`), never plain primitives.
- Accept reactive inputs via `MaybeRef` / `toRef()` / `toValue()`.
- Clean up side effects in `onUnmounted` or watcher `onCleanup`.
- No module-scope side effects.

### vs Mixins

Composables replace Vue 2 mixins entirely:
- **Mixins**: Opaque data flow, source-of-truth collisions, name conflicts.
- **Composables**: Explicit imports, clear return values, composable and tree-shakable.

---

## 4. State Management

### When to Use What

| Pattern | Use Case |
|---------|----------|
| `ref()` / `reactive()` | Local component state |
| Props + Emits | Parent-child communication |
| Provide / Inject | Theme, config, plugin API |
| Pinia store | Global, shared, complex state |
| Server state composable | API data with caching (wrap `fetch`/TanStack Query) |

### Pinia Setup Store (Preferred)

```ts
// stores/useCartStore.ts
export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const isLoading = ref(false);

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );
  const itemCount = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  );

  async function addItem(productId: string) {
    isLoading.value = true;
    try {
      const item = await fetchProduct(productId);
      const existing = items.value.find(i => i.id === item.id);
      if (existing) existing.quantity++;
      else items.value.push({ ...item, quantity: 1 });
    } finally {
      isLoading.value = false;
    }
  }

  return { items, isLoading, totalPrice, itemCount, addItem };
});
```

- Use Setup Store syntax (not Options Store).
- Prefer actions for business-level mutations and `$patch()` for grouped updates.
- Every async action: handle loading + success + error.

---

## 5. Vue Router

### Route Definitions

```ts

> Continued in [`summary-2.md`](summary-2.md)
