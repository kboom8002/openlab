---
doc_id: WOL-WF-004
title: Review Diff Workflow
status: approved
authority: normative
owner: quality-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-RULE-008
affects:
  - .agents/artifacts/runs/**
supersedes: null
---

# Review Diff

## Description

Review the complete change set for scope, security, correctness, and accidental modifications.

## Steps

1. Run `git status` and inspect every changed and untracked file.
2. Review the full diff, not only the files expected by the plan.
3. Verify each file maps to an approved implementation step.
4. Search for:
   - secrets and `.env` values
   - Service Role references in client code
   - debug logs and temporary fixtures
   - disabled RLS or permissive policies
   - hardcoded model names and prompt text
   - private data in snapshots
   - out-of-scope formatting churn
5. Check user-visible copy for JDC status, rights, AI limits, and unsupported claims.
6. Check backward compatibility for migrations, enums, API payloads, and submitted Idea Versions.
7. Confirm tests cover positive and negative authorization paths.
8. Record findings by severity: blocker, high, medium, low.
9. Fix only in-scope findings; report unrelated issues separately.
10. Update the implementation report with final diff summary.
