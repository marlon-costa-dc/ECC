# AI Regression Testing

Testing patterns specifically designed for AI-assisted development, where the same model writes code and reviews it — creating systematic blind spots that only automated tests can catch.

## When to Activate

- AI agent (Claude Code, Cursor, Codex) has modified API routes or backend logic
- A bug was found and fixed — need to prevent re-introduction
- Project has a sandbox/mock mode that can be leveraged for DB-free testing
- Running `/bug-check` or similar review commands after code changes
- Multiple code paths exist (sandbox vs production, feature flags, etc.)

## The Core Problem

When an AI writes code and then reviews its own work, it carries the same assumptions into both steps. This creates a predictable failure pattern:

[See code example 1 in `code-examples.md`]

**Real-world example** (observed in production):

[See code example 2 in `code-examples.md`]

The pattern: **sandbox/production path inconsistency** is the #1 AI-introduced regression.

## Sandbox-Mode API Testing

Most projects with AI-friendly architecture have a sandbox/mock mode. This is the key to fast, DB-free API testing.

### Setup (Vitest + Next.js App Router)

[See code example 3 in `code-examples.md`]

[See code example 4 in `code-examples.md`]

### Test Helper for Next.js API Routes

[See code example 5 in `code-examples.md`]

### Writing Regression Tests

The key principle: **write tests for bugs that were found, not for code that works**.

[See code example 6 in `code-examples.md`]

### Testing Sandbox/Production Parity

The most common AI regression: fixing production path but forgetting sandbox path (or vice versa).

```typescript
// Test that sandbox responses match the expected contract
describe("GET /api/user/messages (conversation list)", () => {
  it("includes partner_name in sandbox mode", async () => {
    const req = createTestRequest("/api/user/messages", {
      sandboxUserId: "user-001",
    });
    const res = await GET(req);
    const { json } = await parseResponse(res);

---

For additional details, continue reading `summary-1.md`, `summary-2.md`.
