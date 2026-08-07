---
doc_id: WOL-RULE-005
title: AI API and LangGraph Rules
status: approved
authority: normative
owner: ai-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-003
  - WOL-GOV-006
  - WOL-AI-000
affects:
  - src/ai/**
  - contracts/prompts/**
  - contracts/json-schema/**
  - contracts/evals/**
supersedes: null
---

# AI API and LangGraph Rules

> Recommended activation: Glob for AI graphs, prompts, schemas, providers, and evals.

## Architecture

- Expose one coherent Idea Studio experience; do not surface many disconnected chatbots.
- Keep `IdeaStudioGraph` separate from `EvaluationGraph`.
- Use a provider interface and a model registry. Do not hardcode model names across nodes.
- Every graph run records `thread_id`, `idea_id`, `user_id`, graph version, prompt version, model key, input snapshot, output snapshot, status, and error classification.

## State and checkpoint

- Treat graph state as a versioned contract.
- Checkpoint at meaningful stage boundaries and before human interrupts.
- Resume by `thread_id` only after authorization against the owning idea or assigned evaluation.
- Never accept a client-supplied checkpoint or idea ownership claim without server verification.
- Use the Batch 6 durable Postgres checkpointer contract; implementation still requires a local spike and migration review.

## Human-in-the-loop

- AI suggestions remain pending until accepted or edited by the user. 사용자 확인 전 AI 제안을 canonical Idea Passport에 확정하지 않는다.
- Inferred information is labeled and requires confirmation.
- The user can reject a suggestion without losing original content.
- Safety review and expert review interruptions are explicit states, not hidden retries.

## Structured output

- Define Zod/JSON Schema before calling the provider.
- Validate every response.
- Allow one bounded repair attempt for invalid structured output.
- After repeated failure, return a typed fallback that supports direct user entry or human review.
- Do not parse critical fields with regular expressions or prose heuristics.

## Prompt management

- Store canonical prompts under `contracts/prompts/` or the approved prompt registry.
- Version prompts and schemas together.
- Evaluation prompt and rubric version are frozen for a submitted evaluation cycle.
- Never include secrets, hidden policy, unrelated user data, or full private records when a minimal field subset is sufficient.

## Evaluation safety

- EvaluationGraph only receives an immutable submitted Idea Version.
- Do not score author identity, education, writing polish, or sponsor preference.
- Missing information should be reported as insufficient evidence rather than invented.
- AI confidence and rationale are required.
- AI cannot make the final selection or automatic rejection.

## AI change gate

Any change to graph routing, prompts, schema, safety, or model registry requires golden-set regression and an AI evaluation report.
