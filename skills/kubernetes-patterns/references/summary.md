# Kubernetes Patterns

## When to Activate

- Writing or reviewing K8s YAML (Deployments, Services, Ingress, Jobs, CronJobs)
- Configuring probes, resources, RBAC, HPA, or PDBs
- Debugging CrashLoopBackOff, OOMKilled, Pending, or ImagePullBackOff
- Setting up namespaces, quotas, or external secrets

## Core Rules

- Pin immutable image tags; never use `:latest`.
- Run non-root with `readOnlyRootFilesystem: true` and drop ALL capabilities.
- Set resource requests AND limits on every container.
- Configure startup + liveness + readiness probes together.
- Use `automountServiceAccountToken: false` unless the app calls the K8s API.
- Run production workloads with `minReplicas: 2+`, HPA, and PDB where needed.
- Manage secrets with External Secrets Operator or Sealed Secrets.

## Example Deployment

[See code example 1 in `code-examples.md`]

## References

- Full YAML patterns, probes, Services/Ingress, ConfigMaps/Secrets, RBAC, HPA, PDB, Jobs, kubectl cheatsheet, anti-patterns, and checklist: [references/kubernetes-patterns-reference.md](references/kubernetes-patterns-reference.md)
