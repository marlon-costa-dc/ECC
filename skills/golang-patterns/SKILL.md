---
name: golang-patterns
description: Use when writing, reviewing, or refactoring Go code to apply idiomatic patterns for error handling, concurrency, interfaces, package organization, structs, and performance. Covers zero-value design, interface/struct separation, context propagation, worker pools, functional options, and standard tooling conventions.
---

# Go Development Patterns

Use when writing, reviewing, or refactoring Go code to apply idiomatic patterns.

## When to Activate

- Writing new Go code
- Reviewing Go code
- Refactoring existing Go code
- Designing Go packages or modules

## Core Rules

1. **Simplicity and clarity first.** Avoid clever one-liners; prefer direct error handling.
2. **Make the zero value useful.** Design types that work without explicit initialization.
3. **Accept interfaces, return structs.** Consumers define small interfaces; producers return concrete types.
4. **Errors are values.** Wrap with `fmt.Errorf("...: %w", err)`, check with `errors.Is`/`errors.As`, and never ignore errors with `_`.
5. **Use `context.Context` for cancellation and timeouts.** Pass it as the first function parameter.
6. **Prefer channels and `errgroup` for goroutine coordination.** Avoid goroutine leaks with buffered channels and `select` on `ctx.Done()`.
7. **Keep interfaces small and define them at the consumer.** Compose single-method interfaces when needed.
8. **Avoid package-level mutable state.** Use dependency injection instead of `init()` globals.
9. **Use functional options for configurable constructors.**
10. **Preallocate slices and use `strings.Builder`/`sync.Pool` for hot paths.**

## Anti-Patterns

- Naked returns in long functions
- `panic` for control flow
- Storing `context.Context` in structs
- Mixing value and pointer receivers on the same type
- String concatenation in tight loops

## Tooling

Run `go vet ./...`, `golangci-lint run`, `go test -race -cover ./...`, `go mod tidy`, `gofmt`, and `goimports` regularly.

## References

- [Full patterns reference with examples](references/golang-patterns-reference.md)
