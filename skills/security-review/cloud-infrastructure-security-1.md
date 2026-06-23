```yaml
# PASS: CORRECT: Secure GitHub Actions workflow
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read  # Minimal permissions

steps:
      - uses: actions/checkout@v4

# Scan for secrets
      - name: Secret scanning
        uses: trufflesecurity/trufflehog@main

# Dependency audit
      - name: Audit dependencies
        run: npm audit --audit-level=high

# Use OIDC, not long-lived tokens
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/GitHubActionsRole
          aws-region: us-east-1
```

#### Supply Chain Security

```json
// package.json - Use lock files and integrity checks
{
  "scripts": {
    "install": "npm ci",  // Use ci for reproducible builds
    "audit": "npm audit --audit-level=moderate",
    "check": "npm outdated"
  }
}
```

#### Verification Steps

- [ ] OIDC used instead of long-lived credentials
- [ ] Secrets scanning in pipeline
- [ ] Dependency vulnerability scanning
- [ ] Container image scanning (if applicable)
- [ ] Branch protection rules enforced
- [ ] Code review required before merge
- [ ] Signed commits enforced

### 6. Cloudflare & CDN Security

#### Cloudflare Security Configuration

```typescript
// PASS: CORRECT: Cloudflare Workers with security headers
export default {
  async fetch(request: Request): Promise<Response> {
    const response = await fetch(request);

// Add security headers
    const headers = new Headers(response.headers);
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'geolocation=(), microphone=()');

return new Response(response.body, {
      status: response.status,
      headers
    });
  }
};
```

#### WAF Rules

```bash
# Enable Cloudflare WAF managed rules
# - OWASP Core Ruleset
# - Cloudflare Managed Ruleset
# - Rate limiting rules
# - Bot protection
```

#### Verification Steps

- [ ] WAF enabled with OWASP rules
- [ ] Rate limiting configured
- [ ] Bot protection active
- [ ] DDoS protection enabled
- [ ] Security headers configured
- [ ] SSL/TLS strict mode enabled

### 7. Backup & Disaster Recovery

#### Automated Backups

```terraform
# PASS: CORRECT: Automated RDS backups
resource "aws_db_instance" "main" {
  allocated_storage     = 20
  engine               = "postgres"

backup_retention_period = 30  # 30 days retention
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"

enabled_cloudwatch_logs_exports = ["postgresql"]

deletion_protection = true  # Prevent accidental deletion
}
```

#### Verification Steps

- [ ] Automated daily backups configured
- [ ] Backup retention meets compliance requirements
- [ ] Point-in-time recovery enabled
- [ ] Backup testing performed quarterly
- [ ] Disaster recovery plan documented
- [ ] RPO and RTO defined and tested

## Pre-Deployment Cloud Security Checklist

Before ANY production cloud deployment:

- [ ] **IAM**: Root account not used, MFA enabled, least privilege policies
- [ ] **Secrets**: All secrets in cloud secrets manager with rotation
- [ ] **Network**: Security groups restricted, no public databases
- [ ] **Logging**: CloudWatch/logging enabled with retention
- [ ] **Monitoring**: Alerts configured for anomalies
- [ ] **CI/CD**: OIDC auth, secrets scanning, dependency audits
- [ ] **CDN/WAF**: Cloudflare WAF enabled with OWASP rules
- [ ] **Encryption**: Data encrypted at rest and in transit
- [ ] **Backups**: Automated backups with tested recovery
- [ ] **Compliance**: GDPR/HIPAA requirements met (if applicable)
- [ ] **Documentation**: Infrastructure documented, runbooks created
- [ ] **Incident Response**: Security incident plan in place

## Common Cloud Security Misconfigurations

### S3 Bucket Exposure

```bash
# FAIL: WRONG: Public bucket
aws s3api put-bucket-acl --bucket my-bucket --acl public-read

# PASS: CORRECT: Private bucket with specific access
aws s3api put-bucket-acl --bucket my-bucket --acl private
aws s3api put-bucket-policy --bucket my-bucket --policy file://policy.json
```

### RDS Public Access

```terraform
# FAIL: WRONG
resource "aws_db_instance" "bad" {
  publicly_accessible = true  # NEVER do this!
}

# PASS: CORRECT
resource "aws_db_instance" "good" {
  publicly_accessible = false
  vpc_security_group_ids = [aws_security_group.db.id]
}
```

## Resources

- [AWS Security Best Practices](https://aws.amazon.com/security/best-practices/)
- [CIS AWS Foundations Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services)
- [Cloudflare Security Documentation](https://developers.cloudflare.com/security/)
- [OWASP Cloud Security](https://owasp.org/www-project-cloud-security/)
- [Terraform Security Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/)

---

Continue in `cloud-infrastructure-security-2.md`.
