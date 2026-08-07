---
doc_id: WOL-RULE-008
title: Git, Worktree, and Artifact Rules
status: approved
authority: normative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
affects:
  - .git/**
  - .agents/artifacts/**
  - docs/**
supersedes: null
---

# Git, Worktree, and Artifact Rules

> Recommended activation: Always On

## Worktree discipline

- Prefer a new Antigravity worktree for non-trivial features, migrations, or parallel tasks.
- Inspect current branch, worktree, and dirty files before editing.
- Do not overwrite or revert user changes unrelated to the task.
- Keep one task or coherent feature per branch/worktree.

## Git safety

Forbidden without explicit user instruction:

- force push
- `git reset --hard`
- destructive clean commands
- history rewrite
- deleting branches or tags
- committing secrets, local data, generated private content, or `.env*`

Do not commit automatically unless the task explicitly requests it. Never push or open a PR without approval.

## Diff review

Before completion:

1. inspect `git status`
2. inspect full diff and newly created files
3. check for secrets, debug logs, accidental generated files, broad formatting churn, and out-of-scope changes
4. map every changed file to the task plan
5. run required verification

## Artifact contract

Store run artifacts under:

```text
.agents/artifacts/runs/<task-id>/
```

Required reports use templates under `.agents/artifacts/templates/`.

Every implementation report states:

- task ID and objective
- changed and intentionally unchanged files
- decisions and assumptions
- migrations, RLS, prompts, schemas, and UI affected
- commands actually run and exact outcomes
- screenshots or browser evidence when applicable
- residual risks, manual follow-up, and rollback

## Honesty rule

Use `PASS`, `FAIL`, `NOT_RUN`, or `BLOCKED`. Do not use vague wording such as “should work” as verification evidence.
