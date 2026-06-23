---
name: nodejs-keccak256
description: Prevent Ethereum hashing bugs in JavaScript and TypeScript. Node's sha3-256
  is NIST SHA3, not Ethereum Keccak-256, and silently breaks selectors, signatures,
  storage slots, and address derivation.
origin: ECC direct-port adaptation
version: 1.0.0
---

# Node.js Keccak-256

Ethereum uses Keccak-256, not the NIST-standardized SHA3 variant exposed by Node's `crypto.createHash('sha3-256')`.

## When to Use

- Computing Ethereum function selectors or event topics
- Building EIP-712, signature, Merkle, or storage-slot helpers in JS/TS
- Reviewing any code that hashes Ethereum data with Node crypto directly

## Workflow

1. Understand the request and confirm scope
2. Execute the canonical workflow for this skill
3. Report results and next steps

For full details, examples, edge cases, and reference material, read `references/summary.md`.
