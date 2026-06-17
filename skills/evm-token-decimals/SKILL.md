---
name: evm-token-decimals
description: Use when reading ERC-20 balances, calculating fiat values from on-chain balances, comparing token amounts across EVM chains, handling bridged assets, or building portfolio trackers, bots, and aggregators.
origin: ECC direct-port adaptation
version: "1.0.0"
---

# EVM Token Decimals

Silent decimal mismatches are one of the easiest ways to ship balances or USD values that are off by orders of magnitude without throwing an error.

## When to Use

- Reading ERC-20 balances in Python, TypeScript, or Solidity
- Calculating fiat values from on-chain balances
- Comparing token amounts across multiple EVM chains
- Handling bridged assets
- Building portfolio trackers, bots, or aggregators

## Rules

- Always query `decimals()` at runtime
- Cache by chain plus token address, not symbol
- Use `Decimal`, `BigInt`, or equivalent exact math, not float
- Re-query decimals after bridging or wrapper changes
- Normalize internal accounting consistently before comparison or pricing

## Examples

See [references/examples.md](references/examples.md) for Python, TypeScript/ethers, and Solidity normalization examples, plus a quick `cast` one-liner.

## Quick Check

```bash
cast call <token_address> "decimals()(uint8)" --rpc-url <rpc>
```

## How It Works

Never assume stablecoins use the same decimals everywhere. Query `decimals()` at runtime, cache by `(chain_id, token_address)`, and use decimal-safe math for value calculations.
