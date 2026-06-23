---
name: ml-adoption-playbook
description: End-to-end methodology for AI agents and software engineers to add machine learning algorithms to existing non-ML codebases. Covers problem framing, data readiness, architectural decoupling, and baseline model integration.
origin: ECC
---

# ML Adoption Playbook

This skill provides an adaptive methodology for implementing machine learning models into existing software engineering projects. It bridges the gap between traditional SWE and MLOps by structuring how ML should be researched, decoupled, trained, and integrated.

## When to Activate

- A user asks to "add ML" or "add an algorithm" to their existing codebase.
- Planning the integration of a new model (e.g., recommendation, classification, forecasting) into a non-ML application.
- Structuring a workflow for an agent to build, train, and deploy an ML component adaptively.

## Phase 1: Problem Framing & Feasibility

Before writing model code, establish the "why" and "how".
- **Heuristic Check:** Ask the user if a simple heuristic (e.g., regex, rule-based sorting) could solve the problem faster. If yes, start there.
- **Metric Definition:** Define what business metric the ML model is trying to improve (e.g., click-through rate, reduced latency).
- **Mistake Budget:** Define what a "bad" prediction looks like and how the system should handle it.

## Phase 2: Data Readiness

ML is useless without clean, accessible data.
- **Audit Data Sources:** Identify where the training data lives. Is it a live database, a static CSV, or an API?
- **Data Contract:** Establish a schema for the input data. What features are required? What happens if a feature is missing?
- **Leakage Prevention:** Ensure the user's proposed data split does not accidentally leak future information into the training set (e.g., chronological splitting for time-series data).

## Phase 3: Architectural Integration & Decoupling

Do not tightly couple model inference to core business logic.
- **API Boundary:** Suggest placing the model behind an API endpoint (e.g., using `fastapi-patterns` or `django-patterns`) or a dedicated service class.
- **Fallback Mechanisms:** Design a default state. If the model takes too long to respond or throws an error, the system must gracefully fall back to a hardcoded rule.
- **Feature Flags:** Wrap the new ML inference call in a feature flag so it can be rolled out (or rolled back) safely.

## Phase 4: Model Implementation & Training

> **Extended guidance**: see [`references/summary-1.md`](references/summary-1.md) for the full content that exceeded the Waza token budget.

