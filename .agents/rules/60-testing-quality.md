---
doc_id: WOL-RULE-007
title: Testing and Quality Rules
status: approved
authority: normative
owner: quality-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-AGENT-001
affects:
  - tests/**
  - supabase/tests/**
  - '**/*.test.*'
  - '**/*.spec.*'
  - contracts/evals/**
supersedes: null
---

# Testing and Quality Rules

> Recommended activation: Glob for test and eval files; Model Decision for feature completion.

## Quality model

Use the smallest test at the lowest reliable layer, then cover critical user journeys end to end.

- Unit: pure domain logic, schema, mapping, scoring helpers
- Integration: Supabase queries, RLS, Server Actions, Route Handlers, graph nodes
- E2E: challenge to Studio to Passport to submission and evaluation
- AI eval: structured output, provenance, one-question behavior, safety, rubric consistency
- Accessibility: keyboard, focus, labels, live regions, contrast, zoom

## Required behaviors

- Add or update tests with behavior changes.
- Test authorization failures, not only success.
- Use deterministic provider fakes for normal automated tests.
- Keep live-model tests separate, rate-limited, and explicitly invoked.
- Never use production secrets or production data in tests.
- Freeze submitted Idea Version and rubric fixtures when evaluating regressions.

## Completion gate

At minimum run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Also run, when relevant:

```bash
pnpm test:rls
pnpm test:e2e
pnpm test:a11y
pnpm eval:ai
```

Do not report a command as passing when it did not run. Record command, environment, result, duration, and failure summary.

## Regression priorities

1. unauthorized private idea access
2. ownership and visibility changes
3. submission immutability
4. AI suggestion provenance
5. AI-only rejection or ranking
6. sponsor data boundary
7. checkpoint authorization and resume
8. data loss during autosave

## Flaky tests

Do not simply retry until green. Capture evidence, identify nondeterminism, and either fix, quarantine with an owner and expiry, or fail the gate.
