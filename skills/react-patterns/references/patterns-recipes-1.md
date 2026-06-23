# React Patterns Recipes

Detailed recipes and examples for the [react-patterns](../SKILL.md) skill.

## Composition Recipes

### Slot via `children`

```tsx
<Layout>
  <Header />
  <Main>{content}</Main>
</Layout>
```

### Named slots

```tsx
<Page header={<Nav />} sidebar={<Filters />}>
  <Results />
</Page>
```

### Compound components

```tsx
<Tabs defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Panel value="profile"><Profile /></Tabs.Panel>
  <Tabs.Panel value="settings"><Settings /></Tabs.Panel>
</Tabs>
```

### Render prop / function-as-child

```tsx
<DataLoader id={id}>
  {({ data, isLoading }) => isLoading ? <Spinner /> : <UserCard user={data} />}
</DataLoader>
```

Modern alternative: a hook (`useData(id)`) returning the same shape.

## Server / Client Components

```tsx
// Server Component - default, async, no client JS
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();
  return <ProductView product={product} />;
}

// Client Component - opt in with "use client"
"use client";
export function AddToCartButton({ productId }: { productId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button disabled={pending} onClick={() => startTransition(() => addToCart(productId))}>
      {pending ? "Adding..." : "Add to cart"}
    </button>
  );
}
```

## Data Fetching Decision Matrix

| Need | Tool |
|---|---|
| Per-request data in Next.js App Router | RSC `await fetch()` |
| Client cache + mutations + invalidation | TanStack Query |
| Lightweight client cache + revalidation | SWR |
| Real-time subscriptions | SSE, WebSockets, or lib subscriptions |
| One-off fire-and-forget | `fetch()` in an event handler |

Avoid `useEffect` + `fetch` for application data.

## Forms

### React 19 form actions

```tsx
"use client";
import { useActionState } from "react";

const initial = { error: null as string | null };

async function updateUserAction(_prev: typeof initial, formData: FormData) {
  "use server";
  const parsed = UserSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid input" };
  await db.user.update({ where: { id: parsed.data.id }, data: parsed.data });
  return { error: null };
}

export function UserForm() {
  const [state, formAction, pending] = useActionState(updateUserAction, initial);
  return (
    <form action={formAction}>
      <input name="name" required />
      <button type="submit" disabled={pending}>Save</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
```

### Controlled inputs

Use controlled when the value drives other UI, formats on every keystroke, or implements real-time validation.

### Complex forms

For multi-step forms, dynamic field arrays, or cross-field validation use React Hook Form or TanStack Form.

## Performance

### When `React.memo` helps

Wrap only when the component re-renders frequently, props are usually stable, and render is measurably expensive. `React.memo` adds an equality check; if props differ often, it is overhead.

### Avoiding render cascades

- Lift state down rather than up where possible.
- Split context by concern so theme changes do not re-render auth consumers.
- Use `useSyncExternalStore` for external state libraries.

### Lists

- Provide stable `key` props (database id, not array index).

> Continued in [`patterns-recipes-2.md`](patterns-recipes-2.md)
