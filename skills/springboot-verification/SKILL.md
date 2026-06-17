---
name: springboot-verification
description: "Use when verifying Java Spring Boot projects before release or pull request through build, static analysis, tests with coverage, security scans, and diff review."
origin: ECC
---

# Spring Boot Verification Loop

Run before PRs, after major changes, and pre-deploy.

## When to Activate

- Before opening a pull request for a Spring Boot service
- After major refactoring or dependency upgrades
- Pre-deployment verification for staging or production
- Running full build → lint → test → security scan pipeline
- Validating test coverage meets thresholds

## Phases

1. **Build**: `mvn -T 4 clean verify -DskipTests` or `./gradlew clean assemble -x test`
2. **Static Analysis**: `mvn -T 4 spotbugs:check pmd:check checkstyle:check`
3. **Tests + Coverage**: `mvn -T 4 test && mvn jacoco:report`
4. **Security Scan**: `mvn org.owasp:dependency-check-maven:check`
5. **Diff Review**: `git diff --stat && git diff`

Also grep for `System.out.print`, `e.getMessage()` in responses, and wildcard CORS origins.

## Output Template

```
VERIFICATION REPORT
Build:     [PASS/FAIL]
Static:    [PASS/FAIL]
Tests:     [PASS/FAIL] (X/Y passed, Z% coverage)
Security:  [PASS/FAIL] (CVE findings: N)
Diff:      [X files changed]
Overall:   [READY / NOT READY]

Issues to Fix:
1. ...
2. ...
```

## Examples

See `references/examples.md` for unit, Testcontainers, and MockMvc examples.

## Cross-References

- For patterns: `springboot-patterns`
- For security: `springboot-security`
- For testing: `springboot-tdd`
