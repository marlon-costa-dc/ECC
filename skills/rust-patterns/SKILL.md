---
name: rust-patterns
description: Use when writing, reviewing, or refactoring Rust code to enforce idiomatic ownership and borrowing, Result-based error handling, exhaustive pattern matching, trait-driven generics, safe concurrency, and minimal crate visibility.
origin: ECC
metadata:
  adrs: []
---

# Rust Patterns

Enforce idiomatic, safe, and performant Rust.

## Triggers

- Writing or reviewing Rust code, crates, modules, or async services.
- Refactoring to reduce clones, unwraps, or unsafe blocks.

## Rules

1. **Borrow, don't clone.** Pass `&T` / `&mut T`; take ownership only to consume or store.
2. **Propagate errors.** Use `Result`/`?`; prefer `thiserror` in libraries and `anyhow` in applications. Avoid `unwrap()` in production.
3. **Make illegal states unrepresentable.** Model states as enums and match exhaustively.
4. **Accept generics, return concrete types.** Use trait bounds for constraints; `dyn Trait` only for heterogeneous collections.
5. **Use newtypes** (`struct UserId(u64)`) to prevent argument swaps.
6. **Prefer iterators** over manual loops; collect with explicit types.
7. **Concurrency:** share state with `Arc<Mutex<T>>` / channels; prefer async/await with Tokio; never block inside async.
8. **`unsafe` only** for FFI or proven hot paths with `# Safety` comments.
9. **Organize modules by domain**, not by type; expose minimal `pub` surface.

## Commands

```bash
cargo check
cargo clippy
cargo fmt
cargo test
cargo audit
```

See [references/rust-patterns-reference.md](references/rust-patterns-reference.md) for extended examples.
