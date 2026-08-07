---
doc_id: WOL-WF-005
title: Verify UI Workflow
status: approved
authority: normative
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-RULE-006
affects:
  - .agents/artifacts/runs/**
supersedes: null
---

# Verify UI

## Description

Validate a user-visible flow in a real browser and produce reproducible evidence.

## Steps

1. Confirm the target route, roles, fixture accounts, and expected states.
2. Start the approved local or preview environment.
3. Verify at approximately 1440px, 768px, and 390px widths.
4. Run the happy path from entry to completion.
5. Verify loading, empty, validation error, server error, permission denied, and offline/retry states where relevant.
6. Complete the core flow by keyboard only.
7. Check focus order, focus return, labels, live announcements, zoom, and reduced motion.
8. Confirm no private data, internal errors, or unsupported sponsor claims are exposed.
9. Capture screenshots for the initial, critical interaction, error, mobile, and completion states.
10. Record route, browser, viewport, steps, expected result, actual result, and evidence path in `ui-verification-report.md`.
11. Mark inaccessible or untested behavior as `FAIL` or `NOT_RUN`, not “acceptable”.
