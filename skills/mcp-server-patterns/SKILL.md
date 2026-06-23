---
name: mcp-server-patterns
description: Use when the user is building or maintaining a Model Context Protocol (MCP) server with the Node.js/TypeScript SDK, including registering tools, resources, and prompts, validating inputs with Zod, choosing between stdio and Streamable HTTP transports, and upgrading the SDK.
origin: ECC
---

# MCP Server Patterns

The Model Context Protocol (MCP) lets AI assistants call tools, read resources, and use prompts from your server.

## When to Use

Use when implementing a new MCP server, adding tools or resources, choosing stdio vs HTTP, upgrading the SDK, or debugging MCP registration and transport issues.

## Core Concepts

- **Tools**: Actions the model can invoke (e.g. search, run a command).
- **Resources**: Read-only data the model can fetch (e.g. file contents, API responses).
- **Prompts**: Reusable, parameterised prompt templates surfaced by clients.
- **Transport**: stdio for local clients (Claude Desktop); Streamable HTTP for remote (Cursor, cloud).

Keep server logic independent of transport so you can plug in stdio or HTTP in the entrypoint.

## Best Practices

- Define input schemas for every tool; document parameters and return shape.
- Return structured errors the model can interpret; avoid raw stack traces.
- Prefer idempotent tools so retries are safe.
- For external API tools, document rate limits and cost in the description.
- Pin SDK version in package.json; verify signatures against current MCP docs when upgrading.

## References

- SDK installation, server setup, transport details, capability-surface guidance, and official SDK links: [references/mcp-server-reference.md](references/mcp-server-reference.md)
- Capability routing decision guide: [docs/capability-surface-selection.md](../../docs/capability-surface-selection.md)
