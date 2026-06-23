---
name: error-handling
description: Use when designing typed errors, retry logic, circuit breakers, error boundaries, or user-facing error messages across TypeScript, Python, and Go codebases.
---

# error-handling

## When to use
- Designing error types or exception hierarchies
- Adding retry logic or circuit breakers for unreliable dependencies
- Reviewing API endpoints for missing error handling
- Implementing user-facing error messages and feedback
- Debugging cascading failures or silent error swallowing

## What to do
1. **Model errors as typed values** — base `AppError` with `code`, `statusCode`, optional `details`; extend per domain or use language sentinels (`errors.New`/`%w` in Go, custom exceptions in Python).
2. **Handle errors at boundaries** — map known errors to `{ error: { code, message } }`, log context server-side, return generic message for unknown errors.
3. **Surface failures** — never swallow errors; use `Result<T, E>` where failures are expected.
4. **Retry only retriable errors** — exponential backoff with jitter; no retry on 4xx.
5. **Separate user from developer messages** — map codes to friendly text; keep internals in logs.

## Critical rules
- Fail fast at the boundary where the error occurs.
- Prefer typed errors over plain strings.
- Every `catch`/`except` must handle, re-throw, or log.
- Document every client-facing error code.
- Wrap React rendering errors in an `ErrorBoundary`.
- Circuit breakers open after consecutive failures and recover with a probe.

## Example

```typescript
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

function handleApiError(error: unknown): Response {
  if (error instanceof AppError) {
    return Response.json(
      { error: { code: error.code, message: error.message } },
      { status: error.statusCode },
    )
  }
  console.error('Unexpected error:', error)
  return Response.json(
    { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } },
    { status: 500 },
  )
}
```
