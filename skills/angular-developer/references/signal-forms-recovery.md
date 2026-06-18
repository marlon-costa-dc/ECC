---
name: signal-forms-recovery
description: Use when fixing common Angular Signal Forms build errors related to FieldTree access, setting values on the form tree, or binding array fields to single-value selects.
---

# Signal Forms — Recovering from Build Errors

## `Property 'value' does not exist on type 'FieldTree'`

**Problem**: Accessing `.value()` directly on a field without calling it first.

```ts
// WRONG
const val = this.form.field.value();
// RIGHT
const val = this.form.field().value();
```

## `Property 'set' does not exist on type 'FieldTree'`

**Problem**: Trying to set values on the form tree. Signal Forms are model-driven.

```ts
// WRONG
this.form.address.street.set('Main St');
// RIGHT - update the model signal instead
this.model.update((m) => ({...m, address: {...m.address, street: 'Main St'}}));
```

## `Type 'string[]' is not assignable to type 'string'`

**Problem**: Binding `[formField]` to an array field with a single-value `<select>`.

```html
<!-- WRONG - assignees is string[], select expects string -->
<select [formField]="form.assignees">
  ...
</select>

<!-- RIGHT - use select multiple for array fields -->
<select multiple [formField]="form.assignees">
  <option value="us">US</option>
</select>
```
