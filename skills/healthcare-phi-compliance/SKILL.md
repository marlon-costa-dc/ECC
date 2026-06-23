---
name: healthcare-phi-compliance
description: Protected Health Information (PHI) and Personally Identifiable Information
  (PII) compliance patterns for healthcare applications. Covers data classification,
  access control, audit trails, encryption, and common leak vectors.
origin: Health1 Super Speciality Hospitals — contributed by Dr. Keyur Patel
version: 1.0.0
---

# Healthcare PHI/PII Compliance Patterns

Patterns for protecting patient data, clinician data, and financial data in healthcare applications. Applicable to HIPAA (US), DISHA (India), GDPR (EU), and general healthcare data protection.

## When to Use

- Building any feature that touches patient records
- Implementing access control or authentication for clinical systems
- Designing database schemas for healthcare data
- Building APIs that return patient or clinician data
- Implementing audit trails or logging
- Reviewing code for data exposure vulnerabilities

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
