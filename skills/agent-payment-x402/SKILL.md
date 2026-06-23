---
name: agent-payment-x402
description: Use when an AI agent must make policy-gated payments for APIs, services, or other agents via the x402 protocol, enforce per-task and per-session spending limits, manage non-custodial wallets, or integrate agentwallet-sdk or OKX Agent Payments Protocol into an agent harness.
origin: community
---

# Agent Payment Execution (x402)

Enable policy-gated, non-custodial agent payments using x402 and MCP tools.

## When to Use

- Paying for a 402-gated API call or service
- Settling with another agent
- Enforcing per-task spending limits
- Managing a non-custodial wallet

## Decision Tree

- Pay on Base / agentwallet-supported chain → `agentwallet-sdk` MCP server
- Pay on X Layer → OKX Agent Payments Protocol
- TypeScript / Go / Rust / Java API charges agents → OKX Payments seller SDK for that runtime
- Python API charges agents → Check current OKX Payments repo first

Details: [references/payment-reference.md](references/payment-reference.md).

## How It Works

**x402 Protocol**: extends HTTP 402 into a machine-negotiable flow. On `402`, the tool negotiates price, checks budget, signs, and retries inside policy bounds.

**Spending Controls**: every call enforces `SpendingPolicy` — per-task budget, per-session budget, allowlisted recipients.

**Non-custodial wallets**: ERC-4337 smart accounts; the orchestrator sets policy before delegation.

## MCP Integration

Expose `agentwallet-sdk` via MCP and pin exact versions — it manages private keys. Tools: `get_balance`, `send_payment`, `check_spending`, `list_transactions`. Set spending policy in the orchestrator before delegation, not as an agent-callable tool. See reference for a full config and budget-enforcement example.

For X Layer, use `okx/onchainos-skills` and `skills/okx-agent-payments-protocol/SKILL.md` as dispatcher; treat `skills/okx-x402-payment/SKILL.md` as deprecated. Require explicit user confirmation before wallet checks or payments.

## Best Practices

- Set budgets before delegating to sub-agents
- Audit with `list_transactions` in post-task hooks
- Fail closed if the payment tool is unreachable
- Pair with `security-review`
