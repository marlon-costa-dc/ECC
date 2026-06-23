// This caught a bug where partner_name was added
    // to production path but not sandbox path
    if (json.data.length > 0) {
      for (const conv of json.data) {
        expect("partner_name" in conv).toBe(true);
      }
    }
  });
});
```

## Integrating Tests into Bug-Check Workflow

### Custom Command Definition

```markdown
<!-- .claude/commands/bug-check.md -->
# Bug Check

## Step 1: Automated Tests (mandatory, cannot skip)

Run these commands FIRST before any code review:

npm run test       # Vitest test suite
    npm run build      # TypeScript type check + build

- If tests fail → report as highest priority bug
- If build fails → report type errors as highest priority
- Only proceed to Step 2 if both pass

## Step 2: Code Review (AI review)

1. Sandbox / production path consistency
2. API response shape matches frontend expectations
3. SELECT clause completeness
4. Error handling with rollback
5. Optimistic update race conditions

## Step 3: For each bug fixed, propose a regression test
```

### The Workflow

```
User: "バグチェックして" (or "/bug-check")
  │
  ├─ Step 1: npm run test
  │   ├─ FAIL → Bug found mechanically (no AI judgment needed)
  │   └─ PASS → Continue
  │
  ├─ Step 2: npm run build
  │   ├─ FAIL → Type error found mechanically
  │   └─ PASS → Continue
  │
  ├─ Step 3: AI code review (with known blind spots in mind)
  │   └─ Findings reported
  │
  └─ Step 4: For each fix, write a regression test
      └─ Next bug-check catches if fix breaks
```

## Common AI Regression Patterns

### Pattern 1: Sandbox/Production Path Mismatch

**Frequency**: Most common (observed in 3 out of 4 regressions)

```typescript
// FAIL: AI adds field to production path only
if (isSandboxMode()) {
  return { data: { id, email, name } };  // Missing new field
}
// Production path
return { data: { id, email, name, notification_settings } };

// PASS: Both paths must return the same shape
if (isSandboxMode()) {
  return { data: { id, email, name, notification_settings: null } };
}
return { data: { id, email, name, notification_settings } };
```

**Test to catch it**:

```typescript
it("sandbox and production return same fields", async () => {
  // In test env, sandbox mode is forced ON
  const res = await GET(createTestRequest("/api/user/profile"));
  const { json } = await parseResponse(res);

for (const field of REQUIRED_FIELDS) {
    expect(json.data).toHaveProperty(field);
  }
});
```

### Pattern 2: SELECT Clause Omission

**Frequency**: Common with Supabase/Prisma when adding new columns

```typescript
// FAIL: New column added to response but not to SELECT
const { data } = await supabase
  .from("users")
  .select("id, email, name")  // notification_settings not here
  .single();

return { data: { ...data, notification_settings: data.notification_settings } };
// → notification_settings is always undefined

// PASS: Use SELECT * or explicitly include new columns
const { data } = await supabase
  .from("users")
  .select("*")
  .single();
```

### Pattern 3: Error State Leakage

**Frequency**: Moderate — when adding error handling to existing components

```typescript
// FAIL: Error state set but old data not cleared
catch (err) {
  setError("Failed to load");
  // reservations still shows data from previous tab!
}

// PASS: Clear related state on error
catch (err) {
  setReservations([]);  // Clear stale data

> Continued in [`summary-2.md`](summary-2.md)
