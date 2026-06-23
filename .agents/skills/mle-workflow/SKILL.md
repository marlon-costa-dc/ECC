---
name: mle-workflow
description: 'Use this skill to production machine-learning engineering workflow for
  data contracts, reproducible training, model evaluation, deployment, monitoring,
  and rollback. Use when building, reviewing, or hardening ML systems beyond one-off
  notebooks. DO NOT USE FOR: questions unrelated to mle-workflow creating projects
  or architecture from scratch'
license: MIT
metadata:
  version: 1.0.0
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Machine Learning Engineering Workflow

## When to Activate

- Planning or reviewing a production ML feature, model refresh, ranking system, recommender, classifier, embedding workflow, or forecasting pipeline
- Converting notebook code into reusable training, evaluation, batch inference, or online inference pipelines
- Designing model promotion criteria, offline/online evals, experiment tracking, or rollback paths
- Debugging failures caused by data drift, label leakage, stale features, artifact mismatch, or inconsistent training/serving logic

## Scope Calibration

Use only lanes that fit the system. Do not assume labels, online serving, feature stores, GPUs, or A/B tests exist. Do make assumptions explicit; treat examples as scaffolds to replace with project-native equivalents.
Use only the lanes that fit the system in front of you. Do not assume every model has supervised labels. Do not add heavyweight MLOps machinery before the product risk justifies it. Replace metrics, serving mode, data stores, and rollout mechanics with project-native equivalents.

## Core Workflow

1. **Prediction contract**: target, owner, schema, latency, serving mode, fallback, human override, privacy/retention/audit.
2. **Data contract**: entity grain, label/feature timestamps, point-in-time joins, split policy, columns, PII rules, snapshot/version.
3. **Reproducible pipeline**: typed config, pinned dependencies, seeds, recorded hashes, shared preprocessing, idempotent steps.
4. **Evaluation before promotion**: baseline comparison, primary metric, guardrails, slice metrics, confidence intervals, "do not ship" thresholds.
5. **Package for serving**: versioned artifact, schema validation, timeout/batching, resource limits, fallback, PII-safe logs, equivalence tests.
6. **Operate the model**: system health, feature drift, prediction drift, label arrival, KPI guardrails, rollback plan.

## Task Simulations

> **Extended guidance**: see `references/summary-*.md` for the full content that exceeded the Waza token budget.

