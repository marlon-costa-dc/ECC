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

JSDOM cannot render real layout, run native animations, test scrolling, drag-and-drop, clipboard, iframes, popups, downloads, or cross-origin flows. Use Playwright Component Testing or full E2E for those.

Decision boundary:

- Hook, presentational component, form with logic -> RTL.
- Component whose layout matters or uses browser APIs missing in JSDOM -> Playwright CT.
- Full user flow across pages -> Playwright/Cypress E2E.

## Examples

### Form submission with MSW and userEvent

```tsx
test("submits user form and shows success", async () => {
  server.use(
    http.post("/api/users", () =>
      HttpResponse.json({ id: "1", name: "Alice" }, { status: 201 }),
    ),
  );

  const user = userEvent.setup();
  renderWithProviders(<UserForm />);

  await user.type(screen.getByLabelText("Name"), "Alice");
  await user.type(screen.getByLabelText("Email"), "alice@example.com");
  await user.click(screen.getByRole("button", { name: /save/i }));

  expect(await screen.findByText(/saved successfully/i)).toBeInTheDocument();
});
```

### Testing an error boundary

```tsx
test("error boundary renders fallback", () => {
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Broken />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  } finally {
    errorSpy.mockRestore();
  }
});
```

### Testing a Suspense boundary

```tsx
test("shows loading then content", async () => {
  renderWithProviders(
    <Suspense fallback={<div>Loading...</div>}>
      <UserDetail id="1" />
    </Suspense>,
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Alice")).toBeInTheDocument();
});
```

## Coverage Targets

| Layer | Target |
|---|---|
| Pure utilities | >=90% |
| Custom hooks | >=85% |
| Presentational components | >=80% behavior |
| Container components | >=70% golden paths + error states |
| Pages | E2E covered; smoke test minimum |

## Test Commands

```bash
vitest run                         # one-shot
vitest run --coverage              # with coverage
vitest run path/to/file.test.tsx   # single file
jest --coverage
CI=true vitest run --coverage
```
