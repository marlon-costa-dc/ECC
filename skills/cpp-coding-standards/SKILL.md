---
name: cpp-coding-standards
description: Use when writing, reviewing, or refactoring C++ code to enforce modern, safe, and idiomatic practices derived from the C++ Core Guidelines. Covers RAII, type safety, immutability, smart pointers, concurrency, and templates.
---

# C++ Coding Standards

Concise standards for modern C++ (C++17/20/23) based on the [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines). Full rule tables, examples, and checklists live in [`references/cpp-core-guidelines-reference.md`](references/cpp-core-guidelines-reference.md).

## When to Use

- Writing or reviewing C++ classes and functions.
- Making architectural decisions in C++ projects.

### When NOT to Use

- Non-C++ projects or legacy C codebases that cannot adopt modern C++.
- Embedded/bare-metal contexts where guidelines conflict with hardware constraints.

## Core Principles

- RAII everywhere (P.8, R.1, CP.20).
- Immutability by default (P.10, Con.1, ES.25).
- Type safety with `enum class`, strong types, and concepts (P.4, I.4, Enum.3).
- Express intent through clear names and single-purpose functions (P.3, F.1).
- Value semantics over pointer semantics (C.10, R.3, F.20).

## Quick Checklist

- [ ] No raw `new`/`delete`; use smart pointers or RAII (R.11).
- [ ] Objects initialized at declaration (ES.20).
- [ ] `const`/`constexpr` by default (Con.1, ES.25).
- [ ] `enum class` instead of plain `enum` (Enum.3).
- [ ] `nullptr` instead of `0`/`NULL` (ES.47).
- [ ] No narrowing conversions or C-style casts (ES.46, ES.48).
- [ ] Single-argument constructors `explicit` (C.46).
- [ ] Rule of Zero or Rule of Five (C.20, C.21).
- [ ] Templates constrained with concepts (T.10).

See [`references/cpp-core-guidelines-reference.md`](references/cpp-core-guidelines-reference.md) for detailed explanations, examples, and anti-patterns.
