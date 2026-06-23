---
name: signal-forms
description: Use when building Angular Signal Forms with @angular/forms/signals, covering form creation, validation, field state access, binding rules, async validation, and common pitfalls.
---

# Signal Forms

Use Signal Forms for new Angular forms when the target version supports them. They are model-driven and type-safe.

## Critical Rules

- Never use `null` or `undefined` as initial field values; use `''`, `0`, or `[]`.
- **FormField** is structural; **FieldState** is callable. Access state by calling the field: `form.field().valid()`, not `form.field.valid()`.
- Do not set `min`, `max`, `value`, `disabled`, or `readonly` attributes on `[formField]` inputs; define them in the schema.
- The `submit()` callback must be `async` and return a Promise.
- `inject()` and `validate()` contexts expose `value`, `state`, `valueOf`, and `stateOf`; paths like `schemaPath.name` are not signals and cannot be called.

## Imports

```ts
import { form, FormField, submit, required, email, min, disabled, hidden, validate, validateAsync } from '@angular/forms/signals';
```

## Creating a Form

```ts
model = signal({ name: '', email: '', age: 0 });
userForm = form(this.model, (s) => {
  required(s.name, { message: 'Name is required' });
  email(s.email, { message: 'Invalid email' });
  min(s.age, 18);
});
```

## Binding

```html
<input [formField]="userForm.name" />
<input type="checkbox" [formField]="userForm.isAdmin" />
<select [formField]="userForm.country">
  <option value="us">US</option>
</select>
```

## State Access

```ts
this.userForm().valid()
this.userForm().invalid()
this.userForm().errors()
this.userForm().touched()
this.userForm().pending()
this.userForm.name().valid()
this.userForm.name().value()
```

For arrays, use the structural length: `form.items.length` (no parentheses).

## Submitting

```ts
onSubmit() {
  submit(this.userForm, async () => {
    await this.apiService.save(this.model());
  });
}
```

## Async Validation

Use `validateAsync()` and provide a `params` function plus a required `onError` handler:

```ts
validateAsync(s.username, {
  params: ({ value }) => value(),
  factory: (username) => resource({ params: username, loader: async ({ params }) => /* check */ false }),
  onSuccess: (isTaken) => isTaken ? { kind: 'taken', message: 'Taken' } : undefined,
  onError: () => ({ kind: 'error', message: 'Validation failed' }),
});
```

`resource()` uses `params`, not `request`.

## Conditional Validation

```ts
form(data, (p) => {
  applyWhen(p.ssn, ({ stateOf }) => stateOf(p.ssn).touched(), (ssn) => {
    required(ssn);
  });
});
```

`applyWhen` takes a path, a condition function, and a schema function. `applyEach(items, (item) => { ... })` takes one argument.

## Arrays and Loops

- Remove array items by updating the model signal.
- In nested `@for` loops, capture the outer index with `let outerIndex = $index`; `$parent` does not exist.

## More Detail

- Complete list of common mistakes: [signal-forms-pitfalls.md](signal-forms-pitfalls.md)
- Full working form example: [signal-forms-example.md](signal-forms-example.md)
- Async validation and resource details: [signal-forms-async.md](signal-forms-async.md)
- Build error fixes: [signal-forms-recovery.md](signal-forms-recovery.md)
