# /click-path-audit — Behavioural Flow Audit

Find bugs that static code reading misses: state interaction side effects, race conditions between sequential calls, and handlers that silently undo each other.

## The Problem This Solves

Traditional debugging checks:
- Does the function exist? (missing wiring)
- Does it crash? (runtime errors)
- Does it return the right type? (data flow)

But it does NOT check:
- **Does the final UI state match what the button label promises?**
- **Does function B silently undo what function A just did?**
- **Does shared state (Zustand/Redux/context) have side effects that cancel the intended action?**

Real example: A "New Email" button called `setComposeMode(true)` then `selectThread(null)`. Both worked individually. But `selectThread` had a side effect resetting `composeMode: false`. The button did nothing. 54 bugs were found by systematic debugging — this one was missed.

---

## How It Works

For EVERY interactive touchpoint in the target area:

[See code example 1 in `code-examples.md`]

---

## Execution Steps

### Step 1: Map State Stores

Before auditing any touchpoint, build a side-effect map of every state store action:

[See code example 2 in `code-examples.md`]

This is the critical reference. The "New Email" bug was invisible without knowing that `selectThread` resets `composeMode`.

**Output format:**

[See code example 3 in `code-examples.md`]

### Step 2: Audit Each Touchpoint

For each button/toggle/form submit in the target area:

[See code example 4 in `code-examples.md`]

**Check each of these bug patterns:**

#### Pattern 1: Sequential Undo

[See code example 5 in `code-examples.md`]

#### Pattern 2: Async Race

[See code example 6 in `code-examples.md`]

#### Pattern 3: Stale Closure

[See code example 7 in `code-examples.md`]

#### Pattern 4: Missing State Transition

[See code example 8 in `code-examples.md`]

#### Pattern 5: Conditional Dead Path

[See code example 9 in `code-examples.md`]

#### Pattern 6: useEffect Interference

[See code example 10 in `code-examples.md`]

### Step 3: Report

For each bug found:

---

For additional details, continue reading `summary-1.md`.
