---
name: cpp-testing
description: Use when writing, updating, fixing, or reviewing C++ tests, configuring GoogleTest and CTest, diagnosing failing or flaky tests, or adding coverage and sanitizers to C++ projects.
---

# C++ Testing

Agent-focused testing workflow for modern C++ (C++17/20) using GoogleTest/GoogleMock with CMake/CTest. Detailed examples, CMake snippets, coverage, and sanitizer configs live in [`references/cpp-testing-reference.md`](references/cpp-testing-reference.md).

## When to Use

- Writing, fixing, or refactoring C++ tests.
- Configuring CMake/CTest or GoogleTest/GoogleMock.
- Investigating test failures, flakiness, or coverage gaps.
- Adding sanitizers (ASan, UBSan, TSan) or CI gating.

### When NOT to Use

- Implementing product features without test changes.
- Non-C++ projects or tasks unrelated to tests.

## Core Concepts

- **TDD loop**: red → green → refactor.
- **Isolation**: prefer dependency injection and fakes over global state.
- **Layout**: `tests/unit`, `tests/integration`, `tests/testdata`.
- **Mocks vs fakes**: mock interactions, fake stateful behavior.
- **CTest discovery**: use `gtest_discover_tests()`.
- **CI signal**: run subset first, then full suite with `--output-on-failure`.

## Quick Practices

- Keep tests deterministic and isolated.
- Use `ASSERT_*` for preconditions, `EXPECT_*` for multiple checks.
- Separate unit and integration tests by directory or CTest labels.
- Never use `sleep` for synchronization; use condition variables or latches.
- Use unique temp directories per test and clean them up.
- Run ASan/UBSan/TSan builds in CI.

See [`references/cpp-testing-reference.md`](references/cpp-testing-reference.md) for code examples, CMake/CTest snippets, coverage commands, sanitizer options, and flaky-test guardrails.
