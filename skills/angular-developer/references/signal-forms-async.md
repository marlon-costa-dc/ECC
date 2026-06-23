---
name: signal-forms-async
description: Use when implementing async validation, conditional validation, or resource-based validation in Angular Signal Forms, including rule context, path handling, and debounce.
---

# Signal Forms — Async & Conditional Validation

## Validation Error Shape

`field().errors()` returns an array of `ValidationError`:

```ts
interface ValidationError {
  readonly kind: string;
  readonly message?: string;
}
```

Do not return `null` from validators; return `undefined` when there are no errors.

## Rule Context

Functions passed to `validate()`, `disabled()`, and `applyWhen` receive a context object:

```ts
validate(schemaPath.username, ({
  value,      // Signal<T>: current value of the field
  fieldTree,  // FieldTree<T>: sub-fields for groups/arrays
  state,      // FieldState<T>: flags like state.valid(), state.dirty()
  valueOf,    // (path) => T: read values of other fields
  stateOf,    // (path) => FieldState: read state of other fields
  pathKeys,   // Signal<string[]>: path from root to this field
}) => {
  // WRONG: if (touched()) ...
  // RIGHT: if (state.touched()) ...
  if (value() === 'admin') {
    return { kind: 'reserved', message: 'Username admin is reserved' };
  }
});
```

## Paths Are Not Signals

Inside the `form()` callback, `schemaPath` and its children are not signals and cannot be called.

```ts
// WRONG
applyWhen(p.ssn, () => p.ssn().touched(), (ssnField) => { ... });

// RIGHT
applyWhen(p.ssn, ({ stateOf }) => stateOf(p.ssn).touched(), (ssnField) => { ... });
applyWhen(p.ssn, ({ valueOf }) => valueOf(p.ssn) !== '', (ssnField) => { ... });
```

## Multiple Items

- Use `applyEach` for per-item rules.
- The callback takes only one argument (the item path):

```ts
// CORRECT
applyEach(s.items, (item) => {
  required(item.name);
});

// WRONG
applyEach(s.items, (item, index) => { ... });
```

- Remove array items by updating the model signal.
- Use `@for` in the template.

## Disabling the Submit Button

```html
<button [disabled]="form().invalid() || form().pending()">
```

Do not use `[disabled]` or `[readonly]` on individual inputs; `[formField]` handles that through schema rules.

## Async Validation

Use `validateAsync()`. `params` must be a function and `onError` is required.

```ts
validateAsync(s.username, {
  params: ({ value }) => value(),
  factory: (username) =>
    resource({
      params: username,
      loader: async ({ params: value }) => value === 'taken',
    }),
  onSuccess: (isTaken) =>
    isTaken ? { kind: 'taken', message: 'Username is already taken' } : undefined,
  onError: () => ({ kind: 'error', message: 'Validation failed' }),
});
```

**WRONG:**

```ts
// params must be a function
validateAsync(s.username, { params: s.username, ... });

// onError is required
validateAsync(s.username, { params: ({ value }) => value(), factory: ..., onSuccess: ..., /* missing onError */ });
```

## Resource API

In `resource()`, use `params` for the input signal, not `request`:

```ts
resource({
  params: mySignal,
  loader: async ({ params: value }) => { ... },
});
```

Use `debounce()` to delay model updates:

```ts
userForm = form(this.userModel, (s) => {
  debounce(s.username, 300);
});
```

## Conditional Validation

```ts
form(data, (p) => {
  applyWhen(
    p.ssn,
    ({ stateOf }) => stateOf(p.ssn).touched(),
    (ssn) => { required(ssn); },
  );
});
```

`applyWhen` passes the path mapped to the first argument. Pass a parent path if you need access to it inside the callback.
