# Healthcare EMR Development Patterns

Patterns for building Electronic Medical Record (EMR) and Electronic Health Record (EHR) systems. Prioritizes patient safety, clinical accuracy, and practitioner efficiency.

## When to Use

- Building patient encounter workflows (complaint, exam, diagnosis, prescription)
- Implementing clinical note-taking (structured + free text + voice-to-text)
- Designing prescription/medication modules with drug interaction checking
- Integrating Clinical Decision Support Systems (CDSS)
- Building lab result displays with reference range highlighting
- Implementing audit trails for clinical data
- Designing healthcare-accessible UIs for clinical data entry

## How It Works

### Patient Safety First

Every design decision must be evaluated against: "Could this harm a patient?"

- Drug interactions MUST alert, not silently pass
- Abnormal lab values MUST be visually flagged
- Critical vitals MUST trigger escalation workflows
- No clinical data modification without audit trail

### Single-Page Encounter Flow

Clinical encounters should flow vertically on a single page — no tab switching:

[See code example 1 in `code-examples.md`]

### Smart Template System

[See code example 2 in `code-examples.md`]

Red flags in any template must trigger a visible, non-dismissable alert — NOT a toast notification.

### Medication Safety Pattern

[See code example 3 in `code-examples.md`]

Critical interactions **block prescribing by default**. The clinician must explicitly override with a documented reason stored in the audit trail. The system never silently allows a critical interaction.

### Locked Encounter Pattern

Once a clinical encounter is signed:
- No edits allowed — only an addendum (a separate linked record)
- Both original and addendum appear in the patient timeline
- Audit trail captures who signed, when, and any addendum records

### UI Patterns for Clinical Data

**Vitals Display:** Current values with normal range highlighting (green/yellow/red), trend arrows vs previous, clinical scoring auto-calculated (NEWS2, qSOFA), escalation guidance inline.

**Lab Results Display:** Normal range highlighting, previous value comparison, critical values with non-dismissable alert, collection/analysis timestamps, pending orders with expected turnaround.

**Prescription PDF:** One-click generation with patient demographics, allergies, diagnosis, drug details (generic + brand, dose, route, frequency, duration), clinician signature block.

### Accessibility for Healthcare

Healthcare UIs have stricter requirements than typical web apps:
- 4.5:1 minimum contrast (WCAG AA) — clinicians work in varied lighting
- Large touch targets (44x44px minimum) — for gloved/rushed interaction
- Keyboard navigation — for power users entering data rapidly
- No color-only indicators — always pair color with text/icon (colorblind clinicians)
- Screen reader labels on all form fields
- No auto-dismissing toasts for clinical alerts — clinician must actively acknowledge

### Anti-Patterns

- Storing clinical data in browser localStorage
- Silent failures in drug interaction checking
- Dismissable toasts for critical clinical alerts
- Tab-based encounter UIs that fragment the clinical workflow
- Allowing edits to signed/locked encounters
- Displaying clinical data without audit trail
- Using `any` type for clinical data structures

## Examples

### Example 1: Patient Encounter Flow

---

For additional details, continue reading `summary-1.md`.
