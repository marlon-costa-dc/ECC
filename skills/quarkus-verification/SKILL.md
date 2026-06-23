---
name: quarkus-verification
description: "Use when verifying Java Quarkus projects before release or pull request through build, static analysis, tests with coverage, security scans, native compilation, and diff review."
origin: ECC
---

# Quarkus Verification Loop

Run before PRs, after major changes, and pre-deploy.

## When to Activate

- Before opening a pull request for a Quarkus service
- After major refactoring or dependency upgrades
- Pre-deployment verification for staging or production
- Running full build → lint → test → security scan → native compilation pipeline
- Validating test coverage meets thresholds (80%+)

## Phases

1. **Build**: `mvn clean verify -DskipTests` or `./gradlew clean assemble -x test`
2. **Static Analysis**: `mvn checkstyle:check pmd:check spotbugs:check`
3. **Tests + Coverage**: `mvn clean test && mvn jacoco:report && mvn jacoco:check`
4. **Security Scan**: `mvn org.owasp:dependency-check-maven:check`
5. **Native Compilation**: `mvn package -Dnative -Dquarkus.native.container-build=true`
6. **Container Build**: `mvn package -Dquarkus.container-image.build=true`
7. **Health Checks**: `curl /q/health/live` and `/q/health/ready`

## Output Template

```
VERIFICATION REPORT
Build:      [PASS/FAIL]
Static:     [PASS/FAIL]
Tests:      [PASS/FAIL] (X/Y passed, Z% coverage)
Security:   [PASS/FAIL] (CVE findings: N)
Native:     [PASS/FAIL]
Container:  [PASS/FAIL]
Health:     [PASS/FAIL]
Overall:    [READY / NOT READY]
```

## Detailed Examples

See `references/examples.md` for unit, integration, and API test examples. See `references/ops.md` for native compilation, load testing, container builds, and health checks. See `references/ci.md` for verification script, GitHub Actions, and checklist.

## Cross-References

- For patterns: `quarkus-patterns`
- For security: `quarkus-security`
- For testing: `quarkus-tdd`
