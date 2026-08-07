---
doc_id: WOL-WF-007
title: Evaluate AI Change Workflow
status: approved
authority: normative
owner: ai-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-RULE-005
  - WOL-RULE-007
affects:
  - contracts/evals/**
  - .agents/artifacts/runs/**
supersedes: null
---

# Evaluate AI Change

## Description

Evaluate graph, node, prompt, model, schema, or safety changes before release.

## Steps

1. Identify the changed graph, node, prompt version, model key, schema, and expected behavior.
2. Define the baseline and the candidate.
3. Run deterministic schema and node tests first.
4. Run the relevant golden sets:
   - one-question behavior
   - confirmed versus inferred information
   - user-origin preservation
   - structured-output validity
   - safety and PII
   - evaluation rationale and confidence
5. Compare pass rate, regression count, latency, token/cost estimate, and human-review rate.
6. Manually inspect all safety failures and a sample of nominal cases.
7. Confirm EvaluationGraph still uses immutable submitted versions and cannot final-select.
8. Confirm user confirmation and provenance remain intact.
9. Record prompt/schema/model versions and exact datasets.
10. Write `ai-evaluation-report.md` with results, regressions, decision, and rollback.
11. Do not promote a change that has unresolved blocker regressions.
