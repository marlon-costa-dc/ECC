```
CLICK-PATH-NNN: [severity: CRITICAL/HIGH/MEDIUM/LOW]
  Touchpoint: [Button label] in [file:line]
  Pattern: [Sequential Undo / Async Race / Stale Closure / Missing Transition / Dead Path / useEffect Interference]
  Handler: [function name or inline]
  Trace:
    1. [call] → sets {field: value}
    2. [call] → RESETS {field: value}  ← CONFLICT
  Expected: [what user expects]
  Actual: [what actually happens]
  Fix: [specific fix]
```

---

## Scope Control

This audit is expensive. Scope it appropriately:

- **Full app audit:** Use when launching or after major refactor. Launch parallel agents per page.
- **Single page audit:** Use after building a new page or after a user reports a broken button.
- **Store-focused audit:** Use after modifying a Zustand store — audit all consumers of the changed actions.

### Recommended agent split for full app:

```
Agent 1: Map ALL state stores (Step 1) — this is shared context for all other agents
Agent 2: Dashboard (Tasks, Notes, Journal, Ideas)
Agent 3: Chat (DanteChatColumn, JustChatPage)
Agent 4: Emails (ThreadList, DraftArea, EmailsPage)
Agent 5: Projects (ProjectsPage, ProjectOverviewTab, NewProjectWizard)
Agent 6: CRM (all sub-tabs)
Agent 7: Profile, Settings, Vault, Notifications
Agent 8: Management Suite (all pages)
```

Agent 1 MUST complete first. Its output is input for all other agents.

---

## When to Use

- After systematic debugging finds "no bugs" but users report broken UI
- After modifying any Zustand store action (check all callers)
- After any refactor that touches shared state
- Before release, on critical user flows
- When a button "does nothing" — this is THE tool for that

## When NOT to Use

- For API-level bugs (wrong response shape, missing endpoint) — use systematic-debugging
- For styling/layout issues — visual inspection
- For performance issues — profiling tools

---

## Integration with Other Skills

- Run AFTER `/superpowers:systematic-debugging` (which finds the other 54 bug types)
- Run BEFORE `/superpowers:verification-before-completion` (which verifies fixes work)
- Feeds into `/superpowers:test-driven-development` — every bug found here should get a test

---

## Example: The Bug That Inspired This Skill

**ThreadList.tsx "New Email" button:**
```
onClick={() => {
  useEmailStore.getState().setComposeMode(true)   // ✓ sets composeMode = true
  useEmailStore.getState().selectThread(null)      // ✗ RESETS composeMode = false
}}
```

Store definition:
```
selectThread: (thread) => set({
  selectedThread: thread,
  selectedThreadId: thread?.id ?? null,
  messages: [],
  drafts: [],
  selectedDraft: null,
  summary: null,
  composeMode: false,     // ← THIS silent reset killed the button
  composeData: null,
  redraftOpen: false,
})
```

**Systematic debugging missed it** because:
- The button has an onClick handler (not dead)
- Both functions exist (no missing wiring)
- Neither function crashes (no runtime error)
- The data types are correct (no type mismatch)

**Click-path audit catches it** because:
- Step 1 maps `selectThread` resets `composeMode`
- Step 2 traces the handler: call 1 sets true, call 2 resets false
- Verdict: Sequential Undo — final state contradicts button intent
