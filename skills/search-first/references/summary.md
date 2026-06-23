# /search-first — Research Before You Code

Systematizes the "search for existing solutions before implementing" workflow.

## Trigger

Use this skill when:
- Starting a new feature that likely has existing solutions
- Adding a dependency or integration
- The user asks "add X functionality" and you're about to write code
- Before creating a new utility, helper, or abstraction

## Workflow

[See code example 1 in `code-examples.md`]

## Decision Matrix

| Signal | Action |
|--------|--------|
| Exact match, well-maintained, MIT/Apache | **Adopt** — install and use directly |
| Partial match, good foundation | **Extend** — install + write thin wrapper |
| Multiple weak matches | **Compose** — combine 2-3 small packages |
| Nothing suitable found | **Build** — write custom, but informed by research |

## How to Use

### Step 0: Tool Availability Preflight

This is agent guidance, not an executable setup script. Check only the channels
that are relevant to the task and project in front of you.

| Channel | Check | If missing |
|---------|-------|------------|
| Repository search | `rg --files` and targeted `rg` queries | State that only visible files were inspected |
| Package registry | `npm --version`, `python -m pip --version`, or project package manager | Use web/docs search and avoid claiming registry coverage |
| GitHub CLI | `gh auth status` | Use public web or local git history only |
| MCP/docs tools | Available tool list or local MCP config | Fall back to official docs/web search |
| Skills directory | `ls ~/.claude/skills ~/.codex/skills` where applicable | Say no local skill catalog was available |

### Quick Mode (inline)

Before writing a utility or adding functionality, mentally run through:

0. Does this already exist in the repo? → `rg` through relevant modules/tests first
1. Is this a common problem? → Search npm/PyPI
2. Is there an MCP for this? → Check `~/.claude/settings.json` and search
3. Is there a skill for this? → Check `~/.claude/skills/`
4. Is there a GitHub implementation/template? → Run GitHub code search for maintained OSS before writing net-new code

### Full Mode (agent)

For non-trivial functionality, launch the researcher agent:

[See code example 2 in `code-examples.md`]

Older Claude Code docs may call this `Task(...)`; use the current agent/subagent
tool name exposed by the active harness.

## Search Shortcuts by Category

### Development Tooling
- Linting → `eslint`, `ruff`, `textlint`, `markdownlint`
- Formatting → `prettier`, `black`, `gofmt`
- Testing → `jest`, `pytest`, `go test`
- Pre-commit → `husky`, `lint-staged`, `pre-commit`

### AI/LLM Integration
- Claude SDK → Context7 for latest docs
- Prompt management → Check MCP servers
- Document processing → `unstructured`, `pdfplumber`, `mammoth`

### Data & APIs
- HTTP clients → `httpx` (Python), `ky`/`undici` (Node)
- Validation → `zod` (TS), `pydantic` (Python)
- Database → Check for MCP servers first

### Content & Publishing
- Markdown processing → `remark`, `unified`, `markdown-it`
- Image optimization → `sharp`, `imagemin`

## Integration Points

### With planner agent
The planner should invoke researcher before Phase 1 (Architecture Review):
- Researcher identifies available tools
- Planner incorporates them into the implementation plan
- Avoids "reinventing the wheel" in the plan

---

For additional details, continue reading `summary-1.md`.
