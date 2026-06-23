### Common Errors

- **CrashLoopBackOff:** `kubectl logs --previous`; check exit code/OOM
- **ImagePullBackOff:** check image tag, imagePullSecret, registry auth
- **Pending:** insufficient resources, node selector, taint mismatch
- **OOMKilled:** increase memory limits

## Anti-Patterns

- `:latest` tags
- Running as root
- No resource limits
- Plaintext secrets in ConfigMaps
- `cluster-admin` for app service accounts
- `minAvailable: 0` in PDB
- `restartPolicy: Always` in Jobs

## Checklist

- Security: non-root, readOnlyRootFilesystem, drop ALL, dedicated SA, no auto token unless needed, least-privilege RBAC, external secrets
- Reliability: all 3 probes, requests/limits, minReplicas 2+, PDB, RollingUpdate with maxUnavailable 0, HPA
- Observability: `/health` and `/ready`, structured logs, labels

## Related Skills

- `docker-patterns`
- `deployment-patterns`
- `security-review`
- `git-workflow`
