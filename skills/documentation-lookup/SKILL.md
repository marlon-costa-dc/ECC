---
name: documentation-lookup
description: Use when the user asks setup questions, API references, or code examples for libraries and frameworks, and current documentation via Context7 MCP is preferred over training data.
origin: ECC
---

# Documentation Lookup (Context7)

Fetch current library, framework, and API documentation via the Context7 MCP (`resolve-library-id` and `query-docs`) instead of relying on training data.

## When to use

Activate when the user:
- Asks setup or configuration questions (e.g., "How do I configure Next.js middleware?").
- Requests code that depends on a library ("Write a Prisma query for...").
- Needs API or reference information ("What are the Supabase auth methods?").
- Mentions specific frameworks or libraries (React, Vue, Express, Tailwind, Prisma, Supabase, etc.).

Use this skill whenever accurate, up-to-date behavior of a library, framework, or API matters.

## How it works

1. **Resolve the library ID.** Call `resolve-library-id` with `libraryName` from the user's question and the full question as `query`. Obtain a Context7-compatible ID (`/org/project` or `/org/project/version`) before calling `query-docs`.
2. **Select the best match.** Prefer exact name matches, higher benchmark scores, High/Medium source reputation, and version-specific IDs when the user names a version.
3. **Fetch documentation.** Call `query-docs` with the selected `libraryId` and a specific question. Do not call either tool more than 3 times per question.
4. **Use the documentation.** Answer with the fetched information, include relevant code examples, and cite the library or version when it matters.

## Examples

Resolve `Next.js`, pick `/vercel/next.js`, query "How do I set up Next.js middleware?", and include a minimal `middleware.ts` example from the docs. Apply the same pattern for Prisma, Supabase, or any other library.

## Best Practices

- Be specific: use the user's full question as the query where possible.
- Use version-specific IDs when the user mentions versions.
- Prefer official or primary packages over community forks.
- Redact secrets from any Context7 query.
