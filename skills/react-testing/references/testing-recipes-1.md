# React Testing Recipes

Detailed recipes and examples for the [react-testing](../SKILL.md) skill.

## Library Choice

| Runner | When |
|---|---|
| Vitest | Vite, Remix, modern setups |
| Jest | Next.js, CRA, established repos |
| Playwright Component Testing | Real browser engine needed |
| Cypress Component Testing | Real browser, Cypress already in use |

Pick one lane per repo unless separation is explicit.

## Network Mocking with MSW

Mock Service Worker mocks at the network layer so components, hooks, and `fetch` behave as in production.

```ts
// test/setup.ts
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/users/:id", ({ params }) =>
    HttpResponse.json({ id: params.id, name: "Alice" }),
  ),
  http.post("/api/users", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: "new-id", ...body }, { status: 201 });
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

Use `onUnhandledRequest: "error"` so unmocked requests fail loudly.

Per-test override:

```tsx
test("renders error on 500", async () => {
  server.use(http.get("/api/users/:id", () => new HttpResponse(null, { status: 500 })));
  render(<UserPage id="1" />);
  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});
```

## Provider Wrapping

```tsx
// test-utils.tsx
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
    options,
  );
}

export * from "@testing-library/react";
```

## Custom Hook Testing

```tsx
import { renderHook, act } from "@testing-library/react";

test("useCounter increments and decrements", () => {
  const { result } = renderHook(() => useCounter(0));
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("useUser fetches user data", async () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => useUser("1"), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual({ id: "1", name: "Alice" });
});
```

Instantiate `QueryClient` once per test outside the wrapper so cache survives re-renders.

## Accessibility Assertions

```tsx
import { axe, toHaveNoViolations } from "jest-axe"; // or vitest-axe
expect.extend(toHaveNoViolations);

test("UserCard has no a11y violations", async () => {
  const { container } = render(<UserCard user={mockUser} />);
  expect(await axe(container)).toHaveNoViolations();
});
```

Run `axe` for every interactive component. Visual contrast belongs in Playwright.

## When to Reach for Playwright / Cypress

> Continued in [`testing-recipes-2.md`](testing-recipes-2.md)
