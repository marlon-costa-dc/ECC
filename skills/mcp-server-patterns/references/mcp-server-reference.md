# MCP Server Patterns — Extended Reference

## SDK Installation

```bash
npm install @modelcontextprotocol/sdk zod
```

## Server Setup

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({ name: "my-server", version: "1.0.0" });
```

## Tools, Resources, Prompts

- **Tools:** Actions the model can invoke. Register with `server.tool()` or `server.registerTool()` depending on SDK version.
- **Resources:** Read-only data the model can fetch. Register with `server.resource()` or `server.registerResource()`. Handlers receive a `uri`.
- **Prompts:** Parameterised prompt templates surfaced by clients. Register with `server.prompt()` or equivalent.

SDK APIs change across versions. Always verify current signatures against [MCP docs](https://modelcontextprotocol.io) or Context7.

## Transports

| Transport | Use |
|-----------|-----|
| stdio | Local clients (Claude Desktop) |
| Streamable HTTP | Remote/cloud clients (Cursor, cloud) |
| Legacy HTTP/SSE | Backward compatibility only |

Keep tool/resource logic independent of transport.

## Capability Surface Selection

For choosing between rule, skill, MCP, or plain CLI/API, see [docs/capability-surface-selection.md](../../docs/capability-surface-selection.md).

## Official SDKs

- **JavaScript/TypeScript:** `@modelcontextprotocol/sdk`
- **Go:** `modelcontextprotocol/go-sdk`
- **C#:** Official .NET SDK
