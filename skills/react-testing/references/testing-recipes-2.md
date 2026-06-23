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
