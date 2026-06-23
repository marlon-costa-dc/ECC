```
$HOME/opensource-staging/
  my-project/
    FORK_REPORT.md           # From forker agent
    SANITIZATION_REPORT.md   # From sanitizer agent
    CLAUDE.md                # From packager agent
    setup.sh                 # From packager agent
    README.md                # From packager agent
    .env.example             # From forker agent
    ...                      # Sanitized project files
```

## Anti-Patterns

- **Never** push to GitHub without user approval
- **Never** skip the sanitizer — it is the safety gate
- **Never** proceed after a sanitizer FAIL without fixing all critical findings
- **Never** leave `.env`, `*.pem`, or `credentials.json` in the staging directory

## Best Practices

- Always run the full pipeline (fork → sanitize → package) for new releases
- The staging directory persists until explicitly cleaned up — use it for review
- Re-run the sanitizer after any manual fixes before publishing
- Parameterize secrets rather than deleting them — preserve project functionality

## Related Skills

See `security-review` for secret detection patterns used by the sanitizer.
