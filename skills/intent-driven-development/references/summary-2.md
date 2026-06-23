The repository reveals technical facts — how the system behaves today, its conventions, and
its contracts. It does not reveal product or business constraints: business rules, compliance
and regulatory obligations, contractual SLAs, pricing, data-retention policy, prioritization,
and target users. Never reconstruct these from code or naming. Capture them only from the user
or an authoritative product artifact, and list them as assumptions to confirm until then.

### 3. Define Scope

State:

- Goal: one sentence describing the intended outcome.
- In scope: behavior this change must deliver.
- Out of scope: tempting adjacent work explicitly excluded.
- Assumptions: claims not yet proven.
- Blocking decisions: unresolved choices that materially affect safety or behavior.

### 4. Write Acceptance Criteria

Use `AC-001`, `AC-002`, and so on. Each criterion must describe observable behavior and an
appropriate verification method; criteria and tests are not required to map one-to-one.

For each applicable criterion include:

- Scenario or starting condition.
- Action or trigger.
- Expected observable behavior.
- Prohibited side effect when meaningful.
- Verification method: automated test, integration check, manual UX review, accessibility
  check, security review, operational check, or stakeholder acceptance.
- Environment/safety constraint when verification could affect data, services, cost, or secrets.
- Priority: required, important, or optional.

Do not use words such as "correctly", "securely", "fast", "intuitive", or "robust" without
defining observable evidence or recording them as a human-review judgment.

### 5. Cover Only Relevant Boundaries

Consider these categories, but include only categories that apply:

| Category | Include when | Typical evidence |
| --- | --- | --- |
| Happy path | New or changed user-visible behavior | Successful workflow or state transition |
| Validation | The change accepts input | Rejected malformed or boundary value without mutation |
| Authorization/privacy | Data or actions have access boundaries | Denied access and no sensitive disclosure |
| Persistence/migration | Stored data or schemas change | Backward read, migration, rollback or backup behavior |
| Compatibility | Public APIs, files, events, or clients may break | Existing contract or fixture remains valid |
| Failure recovery | Network, service, or asynchronous failure exists | No partial state or clear retry/degraded behavior |
| Idempotency/concurrency | Repeats or simultaneous writes are plausible | No duplicate side effect or invalid final state |
| Performance | A user or service threshold matters | Defined measurement conditions and threshold |
| UX/accessibility | A person interacts with the result | Keyboard, feedback, error recovery, visual/manual review |

### 6. Present And Continue

- For a clarification/specification request, present the brief and ask for decisions only on
  listed blockers.
- For an implementation request with no blocker, present a compact criteria summary as part of
  the work and continue with implementation.
- For handoff to another agent or team, include enough context and verification detail for them
  to act without inventing requirements.
- Save the brief to a file only when requested. Use a repository-approved path when one exists;
  otherwise ask for or state the chosen destination before writing.

## Output Template

Use this template for a Full Acceptance Brief. Omit irrelevant sections for Quick Capture.

```markdown
# Acceptance Brief: <Change Name>

**Status:** Draft | Approved | Implemented | Verified
**Revision:** <number>
**Prepared for:** <user/team/agent, when known>
**Approval required before risky work:** Yes | No - <reason>

## Revision Log

| Rev | Date | Changed criteria | Reason |
| --- | --- | --- | --- |
| 1 | <date> | — | Initial draft |

## Goal

<One observable outcome sentence.>

## Scope

**In scope**
- <behavior included>

**Out of scope**
- <adjacent work excluded>

## Context

**Discovered facts** (technical, verified from repository or artifact)
- <how the system behaves today, conventions, contracts>

**Product/business constraints** (supplied by user or product artifact, never inferred from code)
- <business rule, compliance/SLA obligation, retention policy, priority, target user — or "none supplied yet">

**Assumptions**
- <unverified claim to confirm or validate>

**Dependencies and constraints**
- <external service, local convention, compatibility obligation, environment limit>

## Risk Review

---

Continue in `summary-3.md`.
