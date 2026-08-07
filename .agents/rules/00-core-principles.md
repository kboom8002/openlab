---
doc_id: WOL-RULE-001
title: Core Agent Principles
status: approved
authority: normative
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
affects:
  - '**'
supersedes: null
---

# Core Agent Principles

> Recommended activation: Always On

## Required behavior

- Read `@../../AGENTS.md` and `@../../docs/INDEX.md` before implementation.
- Treat approved canonical documents as requirements, not suggestions.
- Distinguish verified facts, assumptions, proposals, and prototype data.
- Make the smallest change that satisfies the accepted scope.
- Preserve user rights, privacy, RLS boundaries, and evaluation transparency.
- Record uncertainty instead of fabricating missing decisions.
- Prefer reversible, observable, tested changes.

## Planning rule

Before any non-trivial change, identify:

- objective and non-objectives
- files likely to change
- data, role, visibility, AI, and migration impact
- Acceptance Criteria
- test commands
- unresolved decisions

Do not begin implementation when a P0 decision directly affects the result.

## Evidence rule

Never claim a feature is complete only because code was generated. Completion requires relevant tests, build validation, and an implementation report. If verification cannot run, state `NOT_VERIFIED` and explain why.

## Scope rule

Do not perform opportunistic refactors, package upgrades, visual redesign, schema renames, or new features outside the task. Suggest them separately.

## Safe-default rule

When policy is incomplete:

- default to private rather than public
- default to no sponsor access
- default to no AI auto-decision
- default to non-destructive operations
- default to user confirmation before canonical updates

## Stop conditions

Stop and report when:

- canonical documents conflict
- required access exceeds allowed paths
- secrets or production data are required
- destructive commands or data loss are possible
- sponsor, rights, visibility, or evaluation rules are not decided
