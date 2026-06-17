---
name: security-bounty-hunter
description: Use when scanning a repository for exploitable, bounty-worthy, remotely reachable security issues or preparing responsible disclosure and bounty submissions.
origin: ECC direct-port adaptation
version: "1.0.0"
---

# Security Bounty Hunter

Focus on remotely reachable, user-controlled attack paths that qualify for real bounty reports rather than broad best-practices review.

## When to Use

- Scanning a repository for exploitable vulnerabilities
- Preparing a Huntr, HackerOne, or similar bounty submission
- Triage where the question is "does this actually pay?"

## In-Scope Patterns

| Pattern | CWE | Typical impact |
| --- | --- | --- |
| SSRF through user-controlled URLs | CWE-918 | internal network access, cloud metadata theft |
| Auth bypass in middleware or API guards | CWE-287 | unauthorized account or data access |
| Remote deserialization or upload-to-RCE paths | CWE-502 | code execution |
| SQL injection in reachable endpoints | CWE-89 | data exfiltration, auth bypass, data destruction |
| Command injection in request handlers | CWE-78 | code execution |
| Path traversal in file-serving paths | CWE-22 | arbitrary file read or write |
| Auto-triggered XSS | CWE-79 | session theft, admin compromise |

## Skip These

Local-only deserialization, `eval()` in CLI tools, `shell=True` on hardcoded commands, missing headers alone, generic rate-limit complaints, self-XSS, out-of-scope CI/CD injection, and demo/test code.

## Workflow

1. Check scope: program rules, SECURITY.md, disclosure channel, exclusions.
2. Find entrypoints: HTTP handlers, uploads, background jobs, webhooks, parsers, integrations.
3. Run static tooling as triage input only.
4. Read the code path end to end.
5. Prove user control reaches a meaningful sink.
6. Confirm exploitability with the smallest safe PoC possible.
7. Check for duplicates before drafting a report.

## Quality Gate

Before submitting, confirm the code path is reachable, the input is user-controlled, the sink is exploitable, the PoC works, the issue is not already reported, and the target is in scope.
