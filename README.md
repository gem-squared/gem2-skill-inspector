# gem2-skill-inspector

Audit your Claude Code skills for structural issues before they become silent failures.

## What It Does

gem2-skill-inspector scans your `.claude/skills/` directory and reports:

- **Trigger collision** — overlapping descriptions that cause the wrong skill to fire
- **Token cost** — per-skill and total token budget consumed every session
- **Activation ambiguity** — vague descriptions that reduce activation reliability
- **Duplicate/redundant skills** — multiple skills doing the same thing differently
- **Compaction resistance** — prose skills that lose meaning under context compression

## Why

If you have 10+ Claude Code skills, you likely have trigger collisions you don't know about. The wrong skill fires silently — no error, no warning, no log. gem2-skill-inspector makes these structural issues visible.

## Quick Start

```bash
npx @gem_squared/gem2-skill-inspector
```

Or scan a specific directory:

```bash
npx @gem_squared/gem2-skill-inspector ~/.claude/skills
```

## Output

```
gem2-skill-inspector — scanning .claude/skills

Skills found: 23
Total tokens: 47,280
Trigger collisions: 3
  - "code-review" ↔ "review-code" (similarity: 0.89)
  - "debug" ↔ "fix-bug" (similarity: 0.76)
  - "refactor" ↔ "cleanup" (similarity: 0.72)
Duplicates: 1
  - ["format-code", "prettier-config"] — both format source files

Recommendations:
  1. Merge "code-review" and "review-code" — trigger descriptions overlap 89%
  2. Consider removing "cleanup" — "refactor" covers same scope with higher specificity
  3. Total token cost (47KB) exceeds recommended 20KB — consider archiving low-use skills
```

## How It Works

1. **Scan** — Glob `*/SKILL.md` in target directory
2. **Parse** — Extract description, trigger phrases, full content
3. **Measure** — Token count per skill (tiktoken-compatible)
4. **Compare** — Pairwise description similarity (TF-IDF + cosine)
5. **Classify** — Compaction resistance via symbol density heuristic
6. **Report** — Structured output with actionable recommendations

No LLM required. Pure static analysis.

## Programmatic API

```typescript
import { inspect } from '@gem_squared/gem2-skill-inspector';

const report = await inspect('~/.claude/skills');
console.log(report.collisions);
```

## Part of the GEM² Ecosystem

```
gem2-skill-inspector (audit what you have — free)
        ↓
gem2-skill-distill (extract contracts from code/skills)
        ↓
TPMN-SKILL (write proper contracts, execute with lifecycle)
        ↓
gem2-studio (semantic search, knowledge graph, compound)
```

## License

MIT — David Seo / GEM².AI
