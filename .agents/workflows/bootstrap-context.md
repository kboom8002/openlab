---
doc_id: WOL-WF-001
title: Bootstrap Context Workflow
status: approved
authority: normative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
affects:
  - .agents/artifacts/runs/**
supersedes: null
---

# Bootstrap Context

## Description

Establish the correct product, policy, technical, and repository context before planning or editing.

## Steps

1. Read `AGENTS.md` and `docs/INDEX.md`.
2. Read `source-of-truth-map.md`, `stack-lock.md`, and `open-decisions.md`.
3. Inspect `git status`, branch, worktree, and top-level repository structure.
4. Restate the task objective, user-visible outcome, non-goals, and requested artifact.
5. Locate the relevant Feature Contract, ADR, schema, RLS, API, AI, and UX documents.
6. List affected roles, visibility, idea rights, sponsor access, AI evaluation, and data retention concerns.
7. Identify P0/P1 decisions, assumptions, conflicts, and missing inputs.
8. Create a short context report with:
   - canonical files read
   - current implementation state
   - decisions required
   - safe next workflow
9. Do not edit code in this workflow.

## Stop rule

Stop when a P0 decision or canonical conflict affects the task. Recommend the smallest explicit decision needed.
