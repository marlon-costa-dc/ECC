# Node.js Keccak-256

Ethereum uses Keccak-256, not the NIST-standardized SHA3 variant exposed by Node's `crypto.createHash('sha3-256')`.

## When to Use

- Computing Ethereum function selectors or event topics
- Building EIP-712, signature, Merkle, or storage-slot helpers in JS/TS
- Reviewing any code that hashes Ethereum data with Node crypto directly

## How It Works

The two algorithms produce different outputs for the same input, and Node will not warn you.

[See code example 1 in `code-examples.md`]

## Examples

### ethers v6

[See code example 2 in `code-examples.md`]

### viem

[See code example 3 in `code-examples.md`]

### web3.js

[See code example 4 in `code-examples.md`]

### Common patterns

[See code example 5 in `code-examples.md`]

### Address from public key

[See code example 6 in `code-examples.md`]

### Audit your codebase

[See code example 7 in `code-examples.md`]

## Rule

For Ethereum contexts, never use `crypto.createHash('sha3-256')`. Use Keccak-aware helpers from `ethers`, `viem`, `web3`, or another explicit Keccak implementation.
