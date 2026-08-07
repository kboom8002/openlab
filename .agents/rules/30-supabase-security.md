---
doc_id: WOL-RULE-004
title: Supabase Security and Data Rules
status: approved
authority: normative
owner: security-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-003
  - WOL-GOV-006
affects:
  - supabase/**
  - src/lib/supabase/**
  - src/server/**
supersedes: null
---

# Supabase Security and Data Rules

> Recommended activation: Glob for `supabase/**`, `src/lib/supabase/**`, and server data modules.

## Authentication

- Use Supabase Auth with cookie-based SSR.
- Keep separate browser and server client factories.
- Validate the authenticated user on the server before privileged reads or writes.
- Do not trust client-provided role, organization, author, owner, or sponsor identifiers.

## RLS first

- Enable RLS on every user-data table exposed through the public API schema.
- Define both positive and negative authorization tests.
- UI visibility is not authorization.
- `participant`, `expert`, `challenge_manager`, `sponsor_viewer`, and `admin` access must be explicit.
- Private Drafts are owner-only unless an approved support/safety policy grants audited access.
- Sponsor access should use approved aggregate views or consented case views, not broad base-table access.

## Service Role

- Never expose Service Role keys to browser code, generated HTML, logs, screenshots, fixtures, or tests committed to the repo.
- Use Service Role only in narrowly scoped server jobs that cannot be expressed through user RLS.
- Record why RLS bypass is needed and audit the operation.

## Migrations

- Migrations are append-only after sharing or application.
- Do not edit an applied migration to change history.
- Every schema change evaluates RLS, indexes, constraints, seed data, rollback, and existing immutable Idea Versions.
- Dashboard SQL is not canonical until captured in a migration.
- Use transactions where supported and idempotent data backfills.

## Storage

- Use private buckets by default.
- Validate ownership, MIME type, file size, and signed URL lifetime.
- Store object metadata needed for authorization and deletion.
- Do not trust file extension alone.

## Data minimization

- Do not collect unnecessary sensitive data.
- Remove or generalize PII before AI-provider transmission according to the approved policy.
- Never use production data for local development or AI evaluation without explicit approval and de-identification.

## Required verification

For DB or policy changes run local migration reset plus allowed/denied RLS cases. Report every skipped scenario.
