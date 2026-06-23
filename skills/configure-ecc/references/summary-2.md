| Skill | Description |
|-------|-------------|
| `dmux-workflows` | Multi-agent orchestration using dmux for parallel agent sessions |

**Standalone**

| Skill | Description |
|-------|-------------|
| `docs/examples/project-guidelines-template.md` | Template for creating project-specific skills |

### 2d: Execute Installation

For each selected skill, copy the entire skill directory from the correct source root:

```bash
# Core skills live under .agents/skills/
cp -R "$ECC_ROOT/.agents/skills/<skill-name>" "$TARGET/skills/"

# Niche skills live under skills/
cp -R "$ECC_ROOT/skills/<skill-name>" "$TARGET/skills/"
```

When iterating over globbed source directories, never pass a trailing-slash source directly to `cp`. Use the directory path as the destination name explicitly:

```bash
cp -R "${src%/}" "$TARGET/skills/$(basename "${src%/}")"
```

Note: `continuous-learning` and `continuous-learning-v2` have extra files (config.json, hooks, scripts) — ensure the entire directory is copied, not just SKILL.md.

---

## Step 3: Select & Install Rules

Use `AskUserQuestion` with `multiSelect: true`:

```
Question: "Which rule sets do you want to install?"
Options:
  - "Common rules (Recommended)" — "Language-agnostic principles: coding style, git workflow, testing, security, etc. (8 files)"
  - "TypeScript/JavaScript" — "TS/JS patterns, hooks, testing with Playwright (5 files)"
  - "Python" — "Python patterns, pytest, black/ruff formatting (5 files)"
  - "Go" — "Go patterns, table-driven tests, gofmt/staticcheck (5 files)"
```

Execute installation:
```bash
# Common rules
cp -r $ECC_ROOT/rules/common $TARGET/rules/common

# Language-specific rules (preserve per-language directories)
cp -r $ECC_ROOT/rules/typescript $TARGET/rules/typescript   # if selected
cp -r $ECC_ROOT/rules/python $TARGET/rules/python            # if selected
cp -r $ECC_ROOT/rules/golang $TARGET/rules/golang            # if selected
```

**Important**: If the user selects any language-specific rules but NOT common rules, warn them:
> "Language-specific rules extend the common rules. Installing without common rules may result in incomplete coverage. Install common rules too?"

---

## Step 4: Post-Installation Verification

After installation, perform these automated checks:

### 4a: Verify File Existence

List all installed files and confirm they exist at the target location:
```bash
ls -la $TARGET/skills/
ls -la $TARGET/rules/
```

### 4b: Check Path References

Scan all installed `.md` files for path references:
```bash
grep -rn "~/.claude/" $TARGET/skills/ $TARGET/rules/
grep -rn "../common/" $TARGET/rules/
grep -rn "skills/" $TARGET/skills/
```

**For project-level installs**, flag any references to `~/.claude/` paths:
- If a skill references `~/.claude/settings.json` — this is usually fine (settings are always user-level)
- If a skill references `~/.claude/skills/` or `~/.claude/rules/` — this may be broken if installed only at project level
- If a skill references another skill by name — check that the referenced skill was also installed

### 4c: Check Cross-References Between Skills

Some skills reference others. Verify these dependencies:
- `django-tdd` may reference `django-patterns`
- `laravel-tdd` may reference `laravel-patterns`
- `quarkus-tdd` may reference `quarkus-patterns`
- `springboot-tdd` may reference `springboot-patterns`
- `continuous-learning-v2` references `~/.claude/homunculus/` directory
- `python-testing` may reference `python-patterns`
- `golang-testing` may reference `golang-patterns`
- `crosspost` references `content-engine` and `x-api`
- `deep-research` references `exa-search` (complementary MCP tools)
- `fal-ai-media` references `videodb` (complementary media skill)
- `x-api` references `content-engine` and `crosspost`
- Language-specific rules reference `common/` counterparts

### 4d: Report Issues

For each issue found, report:
1. **File**: The file containing the problematic reference
2. **Line**: The line number
3. **Issue**: What's wrong (e.g., "references ~/.claude/skills/python-patterns but python-patterns was not installed")
4. **Suggested fix**: What to do (e.g., "install python-patterns skill" or "update path to .claude/skills/")

---

## Step 5: Optimize Installed Files (Optional)

Use `AskUserQuestion`:

```
Question: "Would you like to optimize the installed files for your project?"
Options:
  - "Optimize skills" — "Remove irrelevant sections, adjust paths, tailor to your tech stack"
  - "Optimize rules" — "Adjust coverage targets, add project-specific patterns, customize tool configs"
  - "Optimize both" — "Full optimization of all installed files"
  - "Skip" — "Keep everything as-is"
```

### If optimizing skills:
1. Read each installed SKILL.md
2. Ask the user what their project's tech stack is (if not already known)
3. For each skill, suggest removals of irrelevant sections
4. Edit the SKILL.md files in-place at the installation target (NOT the source repo)
5. Fix any path issues found in Step 4

### If optimizing rules:
1. Read each installed rule .md file
2. Ask the user about their preferences:
   - Test coverage target (default 80%)
   - Preferred formatting tools
   - Git workflow conventions
   - Security requirements
3. Edit the rule files in-place at the installation target

---

Continue in `summary-3.md`.
