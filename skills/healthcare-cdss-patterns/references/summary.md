# Healthcare CDSS Development Patterns

Patterns for building Clinical Decision Support Systems that integrate into EMR workflows. CDSS modules are patient safety critical — zero tolerance for false negatives.

## When to Use

- Implementing drug interaction checking
- Building dose validation engines
- Implementing clinical scoring systems (NEWS2, qSOFA, APACHE, GCS)
- Designing alert systems for abnormal clinical values
- Building medication order entry with safety checks
- Integrating lab result interpretation with clinical context

## How It Works

The CDSS engine is a **pure function library with zero side effects**. Input clinical data, output alerts. This makes it fully testable.

Three primary modules:

1. **`checkInteractions(newDrug, currentMeds, allergies)`** — Checks a new drug against current medications and known allergies. Returns severity-sorted `InteractionAlert[]`. Uses `DrugInteractionPair` data model.
2. **`validateDose(drug, dose, route, weight, age, renalFunction)`** — Validates a prescribed dose against weight-based, age-adjusted, and renal-adjusted rules. Returns `DoseValidationResult`.
3. **`calculateNEWS2(vitals)`** — National Early Warning Score 2 from `NEWS2Input`. Returns `NEWS2Result` with total score, risk level, and escalation guidance.

[See code example 1 in `code-examples.md`]

### Drug Interaction Checking

[See code example 2 in `code-examples.md`]

Interaction pairs must be **bidirectional**: if Drug A interacts with Drug B, then Drug B interacts with Drug A.

### Dose Validation

[See code example 3 in `code-examples.md`]

### Clinical Scoring: NEWS2

---

For additional details, continue reading `summary-1.md`.
