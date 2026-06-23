---
name: hipaa-compliance
description: HIPAA-specific entrypoint for healthcare privacy and security work. Use
  when a task is explicitly framed around HIPAA, PHI handling, covered entities, BAAs,
  breach posture, or US healthcare compliance requirements.
origin: ECC direct-port adaptation
version: 1.0.0
---

# HIPAA Compliance

Use this as the HIPAA-specific entrypoint when a task is clearly about US healthcare compliance. This skill intentionally stays thin and canonical:

## When to Use

- The request explicitly mentions HIPAA, PHI, covered entities, business associates, or BAAs
- Building or reviewing US healthcare software that stores, processes, exports, or transmits PHI
- Assessing whether logging, analytics, LLM prompts, storage, or support workflows create HIPAA exposure
- Designing patient-facing or clinician-facing systems where minimum necessary access and auditability matter

## Workflow

1. Start with healthcare-phi-compliance for the concrete implementation rules.
2. Apply HIPAA-specific decision gates:
3. Is this data PHI?
4. Is this actor a covered entity or business associate?
5. Does a vendor or model provider require a BAA before touching the data?
6. Is access limited to the minimum necessary scope?

For full details, examples, edge cases, and reference material, read `references/summary.md`.
