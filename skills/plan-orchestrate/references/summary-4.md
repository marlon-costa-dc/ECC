/everything-claude-code:orchestrate custom "everything-claude-code:tdd-guide,everything-claude-code:database-reviewer,everything-claude-code:python-reviewer,everything-claude-code:security-reviewer" "[Plan: docs/plan/example-feature.md#step-2] Implement EncryptedString SQLAlchemy type and migrate UserProfile.birth_datetime/location columns; key from ENV APP_DB_KEY; Acceptance: encrypt/decrypt roundtrip tests pass; alembic upgrade/downgrade clean on empty DB; no plaintext in DB after migrate; Out of scope: cross-tenant profile sharing logic"
```
````

### Example 2 — Legacy mode, same step

If `ECC_MODE=legacy` were detected, the same step would be emitted as a single uniform command (no plugin-prefixed forms anywhere in the output):

```bash
/orchestrate custom "tdd-guide,database-reviewer,python-reviewer,security-reviewer" "[Plan: docs/plan/example-feature.md#step-2] ..."
```

The two examples above illustrate **the two possible outputs** for two different environments. A single skill invocation produces only one of them, end to end.

## Notes

- Generative only. Never invoke `/orchestrate` from inside this skill.
- Match the language of the plan document for task descriptions (agent names always remain English).
- Do not insert "Co-Authored-By" lines or emoji in the output unless the user explicitly asks.
