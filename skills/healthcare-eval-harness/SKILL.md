---
name: healthcare-eval-harness
description: Patient safety evaluation harness for healthcare application deployments.
  Automated test suites for CDSS accuracy, PHI exposure, clinical workflow integrity,
  and integration compliance. Blocks deployments on safety failures.
origin: Health1 Super Speciality Hospitals — contributed by Dr. Keyur Patel
version: 1.0.0
---

# Healthcare Eval Harness — Patient Safety Verification

Automated verification system for healthcare application deployments. A single CRITICAL failure blocks deployment. Patient safety is non-negotiable.

## When to Use

- Before any deployment of EMR/EHR applications
- After modifying CDSS logic (drug interactions, dose validation, scoring)
- After changing database schemas that touch patient data
- After modifying authentication or access control
- During CI/CD pipeline configuration for healthcare apps
- After resolving merge conflicts in clinical modules

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
