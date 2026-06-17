---
name: agent-payment-x402-reference
description: Supplementary reference for agent-payment-x402 containing a complete budget-enforcement MCP client example, supported network notes, runtime-specific seller SDK links, and production references.
---

# Agent Payment Execution (x402) — Reference

## Supported Networks

- `agentwallet-sdk`: confirm current coverage in package docs; Base Sepolia for development, Base mainnet for production
- OKX Payments / X Layer: targets X Layer (`eip155:196`) and USDT0 settlement; fetch current SDK docs before generating production code

## MCP Client Example

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const walletKey = process.env.WALLET_PRIVATE_KEY;
  if (!walletKey) {
    throw new Error("WALLET_PRIVATE_KEY is not set — refusing to start payment server");
  }

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["agentwallet-sdk@6.0.0"],
    env: {
      PATH: process.env.PATH ?? "",
      NODE_ENV: process.env.NODE_ENV ?? "production",
      WALLET_PRIVATE_KEY: walletKey,
    },
  });

  const agentpay = new Client({ name: "orchestrator", version: "1.0.0" });
  await agentpay.connect(transport);

  const policyResult = await agentpay.callTool({
    name: "set_policy",
    arguments: {
      per_task_budget: 0.50,
      per_session_budget: 5.00,
      allowlisted_recipients: ["api.example.com"],
    },
  });
  if (policyResult.isError) {
    throw new Error(`Failed to set spending policy: ${JSON.stringify(policyResult.content)}`);
  }

  await preToolCheck(agentpay, 0.01);
}

async function preToolCheck(agentpay: Client, apiCost: number): Promise<void> {
  if (!Number.isFinite(apiCost) || apiCost < 0) {
    throw new Error(`Invalid apiCost: ${apiCost} — action blocked`);
  }

  let result;
  try {
    result = await agentpay.callTool({ name: "check_spending" });
  } catch (err) {
    throw new Error(`Payment service unreachable — action blocked: ${err}`);
  }

  if (result.isError) {
    throw new Error(`check_spending failed: ${JSON.stringify(result.content)}`);
  }

  let remaining: number;
  try {
    const parsed = JSON.parse((result.content as Array<{ text: string }>)[0].text);
    if (!Number.isFinite(parsed?.remaining)) {
      throw new TypeError("missing or non-finite 'remaining' field");
    }
    remaining = parsed.remaining;
  } catch (err) {
    throw new Error(`check_spending returned unexpected format: ${err}`);
  }

  if (remaining < apiCost) {
    throw new Error(`Budget exceeded: need $${apiCost} but only $${remaining} remaining`);
  }
}

main().catch((err) => { console.error(err); process.exitCode = 1; });
```

## Seller SDK Links

Fetch the current language-specific guide before generating code:

| Runtime | Guide |
|---|---|
| TypeScript | `https://raw.githubusercontent.com/okx/payments/main/typescript/SELLER.md` |
| Go | `https://raw.githubusercontent.com/okx/payments/main/go/x402/SELLER.md` |
| Rust | `https://raw.githubusercontent.com/okx/payments/main/rust/x402/SELLER.md` |
| Java | `https://raw.githubusercontent.com/okx/payments/main/java/SELLER.md` |

Do not copy older examples without checking the current OKX repo.

## Production References

- npm: [agentwallet-sdk](https://www.npmjs.com/package/agentwallet-sdk)
- x402 spec: [x402.org](https://x402.org)
- OKX Payments SDKs: [okx/payments](https://github.com/okx/payments)
- OKX Agent Payments Protocol: [okx/onchainos-skills](https://github.com/okx/onchainos-skills/tree/main/skills/okx-agent-payments-protocol)
- OKX Payments overview: [web3.okx.com/onchainos/dev-docs/payments/overview](https://web3.okx.com/onchainos/dev-docs/payments/overview)
