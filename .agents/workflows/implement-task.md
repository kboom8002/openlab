---
doc_id: WOL-WF-003
title: Implement Task Workflow
status: approved
authority: normative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-WF-002
affects:
  - src/**
  - supabase/**
  - contracts/**
  - .agents/artifacts/runs/**
supersedes: null
---

# Implement Task

## Description

Implement an approved task plan with minimal, testable, secure changes.

## Steps

1. Confirm task ID, approved implementation plan, allowed paths, and forbidden paths.
2. Confirm current branch/worktree and uncommitted user changes.
3. Implement in small vertical increments.
4. At each trust boundary, add validation, authentication, authorization, safe errors, and audit behavior.
5. When changing data, update migration, RLS, schema, generated types, and tests together.
6. When changing AI, update state/schema/prompt/model registry/evals together and preserve human confirmation.
7. When changing UI, include loading, empty, error, disabled, mobile, keyboard, and focus states.
8. Run targeted tests after each increment.
9. Run the full required quality commands.
10. Call or perform `/review-diff`.
11. Create implementation and test reports using templates.
12. Do not commit, push, deploy, or apply production migrations unless explicitly approved.

## Stop rule

Stop on new scope, P0 policy conflict, data-loss risk, secret requirement, production access, or failed security test. Record the blocker and leave the worktree in a reviewable state.
