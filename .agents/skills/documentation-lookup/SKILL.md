---
name: documentation-lookup
description: Use when answering setup questions, API references, or code examples for a framework and current docs via Context7 MCP are preferable to training data.
---

# documentation-lookup

## Quando usar
- User asks setup, configuration, or API questions about a library/framework.
- User requests code that depends on a specific library or framework.
- User names a framework/library (e.g. React, Next.js, Prisma, Supabase).

## O que fazer
1. **Resolve library ID**: Call `resolve-library-id` with `libraryName` and the user's full question as `query`.
2. **Select best match**: Prefer exact name, highest benchmark score, High/Medium reputation, and a version-specific ID when the user mentioned a version.
3. **Query docs**: Call `query-docs` with the selected `libraryId` and a specific question. Use the returned snippets to answer.
4. **Answer**: Include minimal, current code examples and cite the library/version when it matters.

## Regras críticas
- Always call `resolve-library-id` before `query-docs`; never guess a Context7 library ID.
- Do not call Context7 tools more than 3 times per question.
- Redact secrets (API keys, tokens, passwords) from any query sent to Context7.
- If docs are unclear after 3 calls, state the uncertainty instead of hallucinating.

## Exemplo
**Question:** "How do I configure Next.js middleware?"
1. `resolve-library-id` with `libraryName: "Next.js"`, `query: "How do I configure Next.js middleware?"`.
2. Select `/vercel/next.js` (or version-specific ID if applicable).
3. `query-docs` with `libraryId: "/vercel/next.js"`, `query: "How do I configure Next.js middleware?"`.
4. Answer with a minimal `middleware.ts` example from the fetched docs and cite Next.js version if relevant.
