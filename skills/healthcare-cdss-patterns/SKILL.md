---
name: healthcare-cdss-patterns
description: Clinical Decision Support System (CDSS) development patterns. Drug interaction
  checking, dose validation, clinical scoring (NEWS2, qSOFA), alert severity classification,
  and integration into EMR workflows.
origin: Health1 Super Speciality Hospitals — contributed by Dr. Keyur Patel
version: 1.0.0
---

# Healthcare CDSS Development Patterns

Patterns for building Clinical Decision Support Systems that integrate into EMR workflows. CDSS modules are patient safety critical — zero tolerance for false negatives.

## When to Use

- Implementing drug interaction checking
- Building dose validation engines
- Implementing clinical scoring systems (NEWS2, qSOFA, APACHE, GCS)
- Designing alert systems for abnormal clinical values
- Building medication order entry with safety checks
- Integrating lab result interpretation with clinical context

## Workflow

1. **checkInteractions(newDrug, currentMeds, allergies)** — Checks a new drug against current medications and known allergies. Returns severity-sorted InteractionAlert[]. Uses DrugInteractionPair data model.
2. **validateDose(drug, dose, route, weight, age, renalFunction)** — Validates a prescribed dose against weight-based, age-adjusted, and renal-adjusted rules. Returns DoseValidationResult.
3. **calculateNEWS2(vitals)** — National Early Warning Score 2 from NEWS2Input. Returns NEWS2Result with total score, risk level, and escalation guidance.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
