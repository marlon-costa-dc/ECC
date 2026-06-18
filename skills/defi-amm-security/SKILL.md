---
name: defi-amm-security
description: Use when writing, auditing, or reviewing Solidity AMM contracts, liquidity pools, swap flows, deposit/withdraw functions, or admin-controlled DeFi protocol operations.
origin: ECC direct-port adaptation
version: "1.0.0"
---

# DeFi AMM Security

Critical vulnerability patterns and hardened implementations for Solidity AMM contracts, LP vaults, and swap functions.

## When to Use

- Writing or auditing a Solidity AMM or liquidity-pool contract
- Implementing swap, deposit, withdraw, mint, or burn flows that hold token balances
- Reviewing any contract that uses `token.balanceOf(address(this))` in share or reserve math
- Adding fee setters, pausers, oracle updates, or other admin functions to a DeFi protocol

## Rules

- Reentrancy-exposed entrypoints use `nonReentrant`
- CEI ordering is respected
- Share math does not depend on raw `balanceOf(address(this))`
- ERC-20 transfers use `SafeERC20`
- Deposits measure actual tokens received
- Oracle reads use TWAP or another manipulation-resistant source
- Swaps require `amountOutMin` and `deadline`
- Overflow-sensitive reserve math uses safe primitives like `mulDiv`
- Admin functions are access-controlled
- Emergency pause exists and is tested
- Static analysis and fuzzing are run before production

## Examples

See [references/examples.md](references/examples.md) for vulnerable vs. hardened code for reentrancy, donation/inflation attacks, oracle manipulation, slippage protection, reserve math, and admin controls.

## Audit Tools

```bash
pip install slither-analyzer
slither . --exclude-dependencies

echidna-test . --contract YourAMM --config echidna.yaml

forge test --fuzz-runs 10000
```

## Execution Safety

The shell commands in this skill are local audit examples. Run them only in a trusted checkout or disposable sandbox. Do not splice untrusted contract names, paths, RPC URLs, private keys, or flags into commands. Never include secrets, private keys, seed phrases, API tokens, or mainnet signing credentials in examples, logs, or reports.
