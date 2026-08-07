---
doc_id: WOL-WF-006
title: Migrate Database Workflow
status: approved
authority: normative
owner: data-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-RULE-004
affects:
  - supabase/migrations/**
  - supabase/tests/**
  - docs/05-data/**
supersedes: null
---

# Migrate Database

## Description

Create and verify an append-only Supabase migration with RLS and compatibility checks.

## Steps

1. Read the data contract, RLS matrix, feature plan, and relevant open decisions.
2. Inspect existing migrations, constraints, policies, functions, triggers, views, and indexes.
3. Design the forward migration and rollback/containment strategy.
4. Create a new timestamped migration. Never edit an applied migration.
5. Add constraints, indexes, RLS enablement, policies, grants, and comments required by the feature.
6. Add allowed and denied RLS tests for every affected role and visibility state.
7. Add data backfill only when idempotent, bounded, and compatible with existing immutable versions.
8. Run local reset/migration and the RLS test suite.
9. Inspect generated database types or schema artifacts.
10. Review query plans for new high-volume access paths when applicable.
11. Write `migration-report.md` with migration ID, objects changed, policy matrix, tests, rollback, and production cautions.
12. Do not apply to staging or production without explicit approval.
