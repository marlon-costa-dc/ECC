---
name: llm-trading-agent-security
description: Use when building, auditing, or designing autonomous trading agents that sign and send transactions, manage wallets, place orders, execute swaps, or perform treasury operations.
origin: ECC direct-port adaptation
version: "1.0.0"
---

# LLM Trading Agent Security

Autonomous trading agents have a harsher threat model than normal LLM apps: an injection or bad tool path can turn directly into asset loss.

## When to Use

- Building an AI agent that signs and sends transactions
- Auditing a trading bot or on-chain execution assistant
- Designing wallet key management for an agent
- Giving an LLM access to order placement, swaps, or treasury operations

## Rules

- External data is sanitized before entering the LLM context
- Spend limits are enforced independently from model output
- Transactions are simulated before send
- `min_amount_out` is mandatory
- Circuit breakers halt on drawdown or invalid state
- Keys come from env or a secret manager, never code or logs
- Private mempool or protected routing is used when appropriate
- Slippage and deadlines are set per strategy
- All agent decisions are audit-logged, not just successful sends

## Examples

See [references/examples.md](references/examples.md) for prompt-injection filtering, spend-limit guards, pre-send simulation, circuit breakers, wallet isolation, and MEV/deadline protection.

## Architecture Principle

Layer the defenses. No single check is enough. Treat prompt hygiene, spend policy, simulation, execution limits, and wallet isolation as independent controls.
