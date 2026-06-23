# Code Examples

## Example 1

```bash
rm -rf /tmp/everything-claude-code
git clone https://github.com/affaan-m/everything-claude-code.git /tmp/everything-claude-code
```

## Example 2

```
Question: "Where should ECC components be installed?"
Options:
  - "User-level (~/.claude/)" — "Applies to all your Claude Code projects"
  - "Project-level (.claude/)" — "Applies only to the current project"
  - "Both" — "Common/shared items user-level, project-specific items project-level"
```

## Example 3

```bash
mkdir -p $TARGET/skills $TARGET/rules
```

## Example 4

```
Question: "Install core skills only, or include niche/framework packs?"
Options:
  - "Core only (recommended)" — "tdd, e2e, evals, verification, research-first, security, frontend patterns, compacting, cross-functional Anthropic skills"
  - "Core + selected niche" — "Add framework/domain-specific skills after core"
  - "Niche only" — "Skip core, install specific framework/domain skills"
Default: Core only
```

## Example 5

```
Question: "Which skill categories do you want to install?"
Options:
  - "Framework & Language" — "Django, Laravel, Spring Boot, Quarkus, Go, Python, Java, Frontend, Backend patterns"
  - "Database" — "PostgreSQL, ClickHouse, JPA/Hibernate patterns"
  - "Workflow & Quality" — "TDD, verification, learning, security review, compaction"
  - "Research & APIs" — "Deep research, Exa search, Claude API patterns"
  - "Social & Content Distribution" — "X/Twitter API, crossposting alongside content-engine"
  - "Media Generation" — "fal.ai image/video/audio alongside VideoDB"
  - "Orchestration" — "dmux multi-agent workflows"
  - "All skills" — "Install every available skill"
```
