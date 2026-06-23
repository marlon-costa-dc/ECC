---
name: rust-testing
description: Use when writing, reviewing, or refactoring Rust tests to enforce TDD, unit and integration test organization, async testing, property-based testing, mocking, benchmarking, and coverage targets.
origin: ECC
metadata:
  adrs: []
---

# Rust Testing

Write reliable Rust tests with TDD.

## Triggers

- Adding or reviewing tests for Rust functions, traits, modules, or async code.
- Setting up benchmarks, property-based tests, mocks, or CI coverage gates.

## Rules

1. **Test first.** Write a failing `#[test]` before implementation; use `todo!()` as placeholder.
2. **Unit tests** live in `#[cfg(test)] mod tests` near source code.
3. **Integration tests** live in `tests/`; each file is a separate binary.
4. **Async tests** use `#[tokio::test]`; never block the executor with `std::thread::sleep`.
5. **Property tests** use `proptest` for invariants and round-trips.
6. **Mock with `mockall`** only when integration tests are impractical.
7. **Doc tests** verify `///` examples.
8. **Coverage** target 80%+ general code, 90%+ public API, 100% critical logic.
9. **Descriptive names** explain the scenario; keep tests independent.

## Commands

```bash
cargo test
cargo test --lib
cargo test --test <name>
cargo test --doc
cargo llvm-cov --fail-under-lines 80
```

See [references/rust-testing-reference.md](references/rust-testing-reference.md) for extended examples.
