---
name: signal-forms-pitfalls
description: Use when debugging mistakes in Angular Signal Forms, including incorrect field access, binding rules, async validation params, array handling, nested loops, and form submission callbacks.
---

# Signal Forms — Common Pitfalls

| Scenario | WRONG | RIGHT |
|---|---|---|
| Accessing flags | `form.field.valid()` | `form.field().valid()` |
| Accessing value | `form.field.value()` | `form.field().value()` |
| Setting value | `form.field.set(x)` | Update model signal: `this.model.update(...)` |
| Form root flags | `form.invalid()` | `form().invalid()` |
| Double-calling | `form.field()()` | `form.field().value()` |
| Rules context | `({ touched }) => touched()` | `({ state }) => state.touched()` |
| Calling paths | `applyWhen(p.foo, () => p.foo() === 'x')` | `applyWhen(p.foo, ({ valueOf }) => valueOf(p.foo) === 'x')` |
| `applyWhen` args | `applyWhen(condition, () => {...})` | `applyWhen(path, condition, schemaFn)` (3 args) |
| Array length | `form.items().length` | `form.items.length` (structural) |
| Multi-select array | `<select [formField]="form.tags">` (string[]) | Use checkboxes for array fields |
| `readonly` attribute | `<input readonly [formField]>` | Use `readonly()` rule in schema |
| `min`/`max` attributes | `<input min="1" max="10">` | Use `min()` and `max()` rules in schema |
| `value` binding | `<input [value]="val">` | Do not use `[value]` with `[formField]` |
| `when` option | `pattern(p.x, /.../, {when: ...})` | `when` only works with `required()` |
| Submit callback | `submit(form, () => { ... })` | `submit(form, async () => { ... })` |
| Async params | `params: s.field` | `params: ({ value }) => value()` |
| Async `onError` | Omitting `onError` | `onError` is REQUIRED in `validateAsync` |
| `resource()` API | `request: signal` | `params: signal` |
| `applyEach` args | `applyEach(s.items, (item, index) => ...)` | `applyEach(s.items, (item) => ...)` |
| Nested `@for` | `$parent.$index` | Use `let outerIndex = $index` |
| `FormState` import | `import { FormState }` | `FormState` does not exist; use `FieldState` |
| Null in model | `signal({ name: null })` | `signal({ name: '' })` or `signal({ age: 0 })` |
| Validate syntax | `validate(s.field, { value } => ...)` | `validate(s.field, ({ value }) => ...)` |
| Checkbox array | `[formField]="form.tags"` (string[]) | Checkboxes only bind to `boolean` |
