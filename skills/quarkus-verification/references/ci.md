---
name: quarkus-verification-ci
description: "CI/CD reference for quarkus-verification: automated verification script, GitHub Actions workflow, and verification checklist."
origin: ECC
---

# Quarkus Verification — CI/CD

## Automated Verification Script

```bash
#!/bin/bash
set -e

echo "=== Phase 1: Build ==="
mvn clean verify -DskipTests

echo "=== Phase 2: Static Analysis ==="
mvn checkstyle:check pmd:check spotbugs:check

echo "=== Phase 3: Tests + Coverage ==="
mvn test jacoco:report jacoco:check

echo "=== Phase 4: Security Scan ==="
mvn org.owasp:dependency-check-maven:check

echo "=== Phase 5: Native Compilation ==="
mvn package -Dnative -Dquarkus.native.container-build=true

echo "=== All Phases Complete ==="
echo "Review reports:"
echo "  - Coverage: target/site/jacoco/index.html"
echo "  - Security: target/dependency-check-report.html"
echo "  - Native: target/*-runner"
```

## GitHub Actions Example

```yaml
name: Verification

on: [push, pull_request]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}

      - name: Build
        run: mvn clean verify -DskipTests

      - name: Test with Coverage
        run: mvn test jacoco:report jacoco:check

      - name: Security Scan
        run: mvn org.owasp:dependency-check-maven:check

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: target/site/jacoco/jacoco.xml
```

## Verification Checklist

### Code Quality
- [ ] Build passes without warnings
- [ ] Static analysis clean
- [ ] Code follows team conventions
- [ ] No commented-out code or TODOs in PR

### Testing
- [ ] All tests pass
- [ ] Code coverage ≥ 80%
- [ ] Integration tests with real database
- [ ] Security tests pass

### Security
- [ ] No dependency vulnerabilities
- [ ] Authentication/authorization tested
- [ ] Input validation complete
- [ ] Secrets not in source code

### Deployment
- [ ] Native compilation successful
- [ ] Container image builds
- [ ] Health checks respond correctly
- [ ] Configuration valid for target environment

### Native Image
- [ ] Native executable builds
- [ ] Native tests pass
- [ ] Startup time < 100ms
- [ ] Memory footprint acceptable
