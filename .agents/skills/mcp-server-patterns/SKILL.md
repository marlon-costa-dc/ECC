---
name: mcp-server-patterns
description: Build MCP servers with Node/TypeScript SDK — tools, resources, prompts, Zod validation, stdio vs Streamable HTTP. Use Context7 or official MCP docs for latest API.
---

# mcp-server-patterns

## Quando usar
- Implementing a new MCP server or adding tools/resources/prompts.
- Choosing stdio vs Streamable HTTP transport.
- Upgrading the SDK or debugging registration/transport issues.

## O que fazer
1. Pin the `@modelcontextprotocol/sdk` version and verify current API names in Context7 or official MCP docs.
2. Keep server logic independent of transport; wire stdio or HTTP only in the entrypoint.
3. Define Zod input schemas for every tool; document parameters and return shape.
4. Register tools/resources/prompts using the SDK pattern your version expects (`tool()`/`resource()` or `registerTool()`/`registerResource()`).
5. Return structured, model-friendly errors; avoid leaking raw stack traces.
6. Prefer idempotent tools so retries are safe.
7. For external API calls, note rate limits and cost in tool descriptions.

## Regras críticas
- Use stdio for local clients (e.g. Claude Desktop); use Streamable HTTP for remote/cloud clients.
- Support legacy HTTP/SSE only when backward compatibility is explicitly required.
- Never hardcode API keys or secrets; inject them via environment variables.
- Validate every tool input with Zod or the SDK's equivalent schema layer.
- Re-check SDK signatures after upgrades before copying old examples.

## Exemplo (se necessário)
```bash
npm install @modelcontextprotocol/sdk zod
```

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });

server.tool(
  "search",
  "Search the internal docs",
  { query: z.string().min(1) },
  async ({ query }) => ({ content: [{ type: "text", text: `Results for ${query}` }] })
);
```
