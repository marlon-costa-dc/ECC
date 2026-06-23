| name | description |
|------|-------------|
| cloud-infrastructure-security | Use this skill when deploying to cloud platforms, configuring infrastructure, managing IAM policies, setting up logging/monitoring, or implementing CI/CD pipelines. Provides cloud security checklist aligned with best practices. |

# Cloud & Infrastructure Security Skill

This skill ensures cloud infrastructure, CI/CD pipelines, and deployment configurations follow security best practices and comply with industry standards.

## When to Activate

- Deploying applications to cloud platforms (AWS, Vercel, Railway, Cloudflare)
- Configuring IAM roles and permissions
- Setting up CI/CD pipelines
- Implementing infrastructure as code (Terraform, CloudFormation)
- Configuring logging and monitoring
- Managing secrets in cloud environments
- Setting up CDN and edge security
- Implementing disaster recovery and backup strategies

## Cloud Security Checklist

### 1. IAM & Access Control

#### Principle of Least Privilege

```yaml
# PASS: CORRECT: Minimal permissions
iam_role:
  permissions:
    - s3:GetObject  # Only read access
    - s3:ListBucket
  resources:
    - arn:aws:s3:::my-bucket/*  # Specific bucket only

# FAIL: WRONG: Overly broad permissions
iam_role:
  permissions:
    - s3:*  # All S3 actions
  resources:
    - "*"  # All resources
```

#### Multi-Factor Authentication (MFA)

```bash
# ALWAYS enable MFA for root/admin accounts
aws iam enable-mfa-device \
  --user-name admin \
  --serial-number arn:aws:iam::123456789:mfa/admin \
  --authentication-code1 123456 \
  --authentication-code2 789012
```

#### Verification Steps

- [ ] No root account usage in production
- [ ] MFA enabled for all privileged accounts
- [ ] Service accounts use roles, not long-lived credentials
- [ ] IAM policies follow least privilege
- [ ] Regular access reviews conducted
- [ ] Unused credentials rotated or removed

### 2. Secrets Management

#### Cloud Secrets Managers

```typescript
// PASS: CORRECT: Use cloud secrets manager
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({ region: 'us-east-1' });
const secret = await client.getSecretValue({ SecretId: 'prod/api-key' });
const apiKey = JSON.parse(secret.SecretString).key;

// FAIL: WRONG: Hardcoded or in environment variables only
const apiKey = process.env.API_KEY; // Not rotated, not audited
```

#### Secrets Rotation

```bash
# Set up automatic rotation for database credentials
aws secretsmanager rotate-secret \
  --secret-id prod/db-password \
  --rotation-lambda-arn arn:aws:lambda:region:account:function:rotate \
  --rotation-rules AutomaticallyAfterDays=30
```

#### Verification Steps

- [ ] All secrets stored in cloud secrets manager (AWS Secrets Manager, Vercel Secrets)
- [ ] Automatic rotation enabled for database credentials
- [ ] API keys rotated at least quarterly
- [ ] No secrets in code, logs, or error messages
- [ ] Audit logging enabled for secret access

### 3. Network Security

#### VPC and Firewall Configuration

```terraform
# PASS: CORRECT: Restricted security group
resource "aws_security_group" "app" {
  name = "app-sg"

ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]  # Internal VPC only
  }

egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Only HTTPS outbound
  }
}

# FAIL: WRONG: Open to the internet
resource "aws_security_group" "bad" {
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # All ports, all IPs!
  }
}
```

#### Verification Steps

- [ ] Database not publicly accessible
- [ ] SSH/RDP ports restricted to VPN/bastion only
- [ ] Security groups follow least privilege
- [ ] Network ACLs configured
- [ ] VPC flow logs enabled

### 4. Logging & Monitoring

#### CloudWatch/Logging Configuration

```typescript
// PASS: CORRECT: Comprehensive logging
import { CloudWatchLogsClient, CreateLogStreamCommand } from '@aws-sdk/client-cloudwatch-logs';

const logSecurityEvent = async (event: SecurityEvent) => {
  await cloudwatch.putLogEvents({
    logGroupName: '/aws/security/events',
    logStreamName: 'authentication',
    logEvents: [{
      timestamp: Date.now(),
      message: JSON.stringify({
        type: event.type,
        userId: event.userId,
        ip: event.ip,
        result: event.result,
        // Never log sensitive data
      })
    }]
  });
};
```

#### Verification Steps

- [ ] CloudWatch/logging enabled for all services
- [ ] Failed authentication attempts logged
- [ ] Admin actions audited
- [ ] Log retention configured (90+ days for compliance)
- [ ] Alerts configured for suspicious activity
- [ ] Logs centralized and tamper-proof

### 5. CI/CD Pipeline Security

#### Secure Pipeline Configuration

---

For additional details, continue reading `cloud-infrastructure-security-1.md`, `cloud-infrastructure-security-2.md`.
