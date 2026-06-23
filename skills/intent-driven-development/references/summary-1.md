1. Inspect the available repository, documentation, issue, design, and test context before
   asking for technical facts that can be discovered locally.
2. Do not infer product or business constraints from code. Business rules, compliance and
   regulatory obligations, contractual SLAs, pricing, data-retention policy, prioritization,
   and target users cannot be read from a repository. Treat them as unknown until the user
   supplies them or an authoritative product artifact (PRD, contract, policy document) states
   them. Record them as assumptions flagged for confirmation, never as discovered facts. The
   repository tells you how the system behaves today, not what the business requires it to do.
3. Ask only questions whose answers are required and cannot be safely inferred. Group short,
   related questions when that saves unnecessary turns.
4. Do not block implementation by default. When the user has asked to implement a sufficiently
   clear change, record key assumptions and acceptance criteria briefly, then proceed or hand
   them to the implementation workflow.
5. Require explicit user confirmation before proceeding only when an unresolved decision could
   create material security exposure, data loss, irreversible migration, contractual/API
   breakage, meaningful cost, or destructive external action.
6. Do not write an acceptance document into a repository, alter project files, create a branch,
   commit, or invoke another skill unless the user requests it or the active repository
   workflow explicitly requires it.
7. Treat automated tests as evidence, not truth. Prefer automation when reliable and
   proportionate; allow manual UX, accessibility, security, legal, or operational verification
   where automation cannot establish the outcome.
8. Never include real secrets, credentials, tokens, private keys, personal data, or sensitive
   production payloads in acceptance criteria, fixtures, examples, or saved artifacts. Use
   redacted or synthetic values.
9. Do not run destructive tests, migrations, security probes, load tests, paid external calls,
   or operations against production/live data without explicit authorization and an identified
   safe environment.
10. When an acceptance criterion cannot be satisfied due to an architectural, platform, or
   external constraint discovered during implementation, do not silently drop or workaround it.
   Update the affected criterion (mark it `[revised]`, state the constraint, and adjust scope or
   verification method), increment the revision number, and re-present only the changed criteria
   to the user before continuing. Require explicit confirmation only if the revision changes a
   blocking decision or materially reduces safety or correctness guarantees.

## Choose The Depth

Use the smallest useful output.

### Quick Capture

Use for a clear but non-trivial change with low or moderate risk. Produce:

- Goal
- In scope / out of scope
- Assumptions
- 3-7 acceptance criteria with verification methods
- Blocking questions, if any

Do not delay implementation for approval unless a blocking risk from the operating rules
exists or the user specifically asked for a specification first.

### Full Acceptance Brief

Use for ambiguous, cross-system, security-sensitive, data-changing, migration, compliance,
or high-cost changes, or when the user requests a handoff artifact. Produce the full template
below and request confirmation for unresolved blocking decisions before risky implementation.

### Existing Specification Review

When the user already supplied a PRD, issue, plan, or acceptance criteria:

1. Review it instead of restarting discovery.
2. Identify missing scope boundaries, unsafe assumptions, contradictions, and unverifiable
   requirements.
3. Return corrected or supplemental criteria.

## Workflow

### 1. Establish Goal And Risk

Extract or ask for:

- The observable outcome for the user or system.
- The actors affected.
- The main failure consequence.
- Risk dimensions that actually apply: security/privacy, persistent data, compatibility/API,
  migration, external dependencies, cost, concurrency, performance, usability/accessibility.

Avoid asking generic questions about irrelevant risks.

### 2. Discover Context

When local or connected artifacts are available, inspect only what is needed:

- Existing behavior and directly related files or interfaces.
- Repository conventions, product docs, API contracts, data schemas, or migration history.
- Existing verification infrastructure and realistic commands.
- External dependencies and whether they are testable in isolation.

Record discovered facts separately from user-provided assumptions. If context cannot be
inspected, say what is unknown and ask focused questions.

---

Continue in `summary-2.md`.
