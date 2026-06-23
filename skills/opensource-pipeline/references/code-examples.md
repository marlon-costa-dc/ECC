# Code Examples

## Example 1

```
SOURCE_PATH="<resolved absolute path>"
STAGING_PATH="$HOME/opensource-staging/${PROJECT_NAME}"
```

## Example 2

```bash
mkdir -p $HOME/opensource-staging/
```

## Example 3

```
Agent(
  description="Fork {PROJECT} for open-source",
  subagent_type="opensource-forker",
  prompt="""
Fork project for open-source release.

Source: {SOURCE_PATH}
Target: {STAGING_PATH}
License: {chosen_license}

Follow the full forking protocol:
1. Copy files (exclude .git, node_modules, __pycache__, .venv)
2. Strip all secrets and credentials
3. Replace internal references with placeholders
4. Generate .env.example
5. Clean git history
6. Generate FORK_REPORT.md in {STAGING_PATH}/FORK_REPORT.md
"""
)
```

## Example 4

```
Agent(
  description="Verify {PROJECT} sanitization",
  subagent_type="opensource-sanitizer",
  prompt="""
Verify sanitization of open-source fork.

Project: {STAGING_PATH}
Source (for reference): {SOURCE_PATH}

Run ALL scan categories:
1. Secrets scan (CRITICAL)
2. PII scan (CRITICAL)
3. Internal references scan (CRITICAL)
4. Dangerous files check (CRITICAL)
5. Configuration completeness (WARNING)
6. Git history audit

Generate SANITIZATION_REPORT.md inside {STAGING_PATH}/ with PASS/FAIL verdict.
"""
)
```

## Example 5

```
Agent(
  description="Package {PROJECT} for open-source",
  subagent_type="opensource-packager",
  prompt="""
Generate open-source packaging for project.

Project: {STAGING_PATH}
License: {chosen_license}
Project name: {PROJECT_NAME}
Description: {description}
GitHub repo: {github_repo}

Generate:
1. CLAUDE.md (commands, architecture, key files)
2. setup.sh (one-command bootstrap, make executable)
3. README.md (or enhance existing)
4. LICENSE
5. CONTRIBUTING.md
6. .github/ISSUE_TEMPLATE/ (bug_report.md, feature_request.md)
"""
)
```

## Example 6

```
Open-Source Fork Ready: {PROJECT_NAME}

Location: {STAGING_PATH}
License: {license}
Files generated:
  - CLAUDE.md
  - setup.sh (executable)
  - README.md
  - LICENSE
  - CONTRIBUTING.md
  - .env.example ({N} variables)

Sanitization: {sanitization_verdict}

Next steps:
  1. Review: cd {STAGING_PATH}
  2. Create repo: gh repo create {github_org}/{github_repo} --public
  3. Push: git remote add origin ... && git push -u origin main

Proceed with GitHub creation? (yes/no/review first)
```

## Example 7

```bash
cd "{STAGING_PATH}"
gh repo create "{github_org}/{github_repo}" --public --source=. --push --description "{description}"
```

## Example 8

```
Agent(
  subagent_type="opensource-sanitizer",
  prompt="Verify sanitization of: {resolved_path}. Run all 6 scan categories and generate SANITIZATION_REPORT.md."
)
```

## Example 9

```
Agent(
  subagent_type="opensource-packager",
  prompt="Package: {resolved_path} ..."
)
```

## Example 10

```bash
ls -d $HOME/opensource-staging/*/
```

## Example 11

```bash
cat $HOME/opensource-staging/${PROJECT}/SANITIZATION_REPORT.md
cat $HOME/opensource-staging/${PROJECT}/FORK_REPORT.md
```
