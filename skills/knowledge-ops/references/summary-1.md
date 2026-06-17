### GitHub / Linear Sync
When the information affects active execution:
- update the relevant GitHub issue, PR, discussion, release notes, or roadmap thread
- attach supporting docs to Linear when the work needs durable planning context
- only mirror a local note afterwards if it still adds value

### Cross-Source Knowledge Sync
Pull knowledge from multiple sources into one place:
- Claude/ChatGPT/Grok conversation exports
- Browser bookmarks
- GitHub activity events
- Write status summary, commit and push

## Memory Patterns

```
# Short-term: current session context
Use TodoWrite for in-session task tracking

# Medium-term: project memory files
Write to ~/.claude/projects/*/memory/ for cross-session recall

# Long-term: GitHub / Linear / KB
Put active execution truth in GitHub + Linear
Put durable synthesized context in the knowledge base repo

# Semantic layer: MCP knowledge graph
Use mcp__memory__create_entities for permanent structured data
Use mcp__memory__create_relations for relationship mapping
Use mcp__memory__add_observations for new facts about known entities
Use mcp__memory__search_nodes to find existing knowledge
```

## Best Practices

- Keep memory files concise. Archive old data rather than letting files grow unbounded.
- Use frontmatter (YAML) for metadata on all knowledge files.
- Deduplicate before storing. Search first, then create or update.
- Prefer one canonical home per fact set. Avoid parallel copies of the same plan across local notes, repo files, and tracker docs.
- Redact sensitive information (API keys, passwords) before committing to Git.
- Use consistent naming conventions for knowledge files (lowercase-kebab-case).
- Tag entries with topics/categories for easier retrieval.

## Quality Gate

Before completing any knowledge operation:
- no duplicate entries created
- sensitive data redacted from any Git-tracked files
- indexes and summaries updated
- appropriate storage layer chosen for the data type
- cross-references added where relevant
