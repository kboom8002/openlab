---
doc_id: WOL-WF-008
title: Prepare Release Workflow
status: approved
authority: normative
owner: release-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-WF-004
  - WOL-RULE-007
affects:
  - CHANGELOG.md
  - .agents/artifacts/runs/**
  - docs/10-operations/**
supersedes: null
---

# Prepare Release

## Description

Prepare a reviewable release candidate without deploying it automatically.

## Steps

1. Confirm release scope, target environment, owner, and approved changes.
2. Review implementation, migration, UI, AI, and test reports.
3. Run required full quality gates in a clean environment.
4. Confirm environment variables, secrets, feature flags, migrations, jobs, webhooks, and provider quotas.
5. Confirm RLS, sponsor boundary, rights copy, privacy behavior, and audit logging.
6. Verify rollback for web, migration, prompt/model, and feature flag changes.
7. Update changelog and release notes with user-visible changes and known limitations.
8. Create `release-report.md` including exact commit, migration IDs, prompt versions, test results, monitoring, and rollback.
9. Mark release `BLOCKED` when any mandatory gate is failed or not run.
10. Ask for explicit approval before staging or production deployment.
