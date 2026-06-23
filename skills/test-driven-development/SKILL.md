---
name: test-driven-development
description: Use when writing new features, fixing bugs, or refactoring and you want a test-first (RED → GREEN → refactor) cycle. ECC fork that redirects to the canonical tdd-workflow skill.
origin: ECC fork (supersedes external superpowers test-driven-development)
---

# Test-Driven Development (ECC fork)

ECC-canonical entry point for TDD. Defer to the **`tdd-workflow`** skill — the maintained ECC implementation (test-first, validated RED, GREEN before refactor, ≥80% coverage, git checkpoints).

> Sujeito à lei no-bypass (AGENTS.md §0 / ADR-001 resolver-nunca-esconder): corrigir na raiz, verificar verde com evidência fresca, nunca mascarar/pular/adiar-como-pronto.

## When to Use

- Writing a new feature, fixing a bug, or refactoring — any change that should be driven test-first.

## Workflow

Use the `tdd-workflow` skill for the canonical RED/GREEN/refactor cycle and its verification gates. This fork exists only to keep the `test-driven-development` name resolving to the ECC implementation instead of the external plugin copy.
