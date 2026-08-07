---
doc_id: WOL-RULE-002
title: Product and Domain Rules
status: approved
authority: normative
owner: product
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-001
  - WOL-DOM-001
  - WOL-DOM-004
  - WOL-DOM-005
  - WOL-DOM-008
affects:
  - src/features/**
  - src/app/**
  - contracts/**
supersedes: null
---

# Product and Domain Rules

> Recommended activation: Model Decision for product, feature, copy, state, evaluation, sponsorship, or rights work.

## Required reading

Read the relevant canonical files under:

- `docs/01-product/`
- `docs/02-domain/`
- `contracts/domain/`

Do not use prototype copy or previous planning messages when canonical docs exist.

## Human-origin invariant

- User experience and judgment remain the origin of the Idea.
- AI Suggestions are proposals, never silent edits.
- Users can accept, edit, reject, or revisit every AI Suggestion.
- Provenance distinguishes `user_original`, `user_edited`, `ai_suggested`, `external_source`, and exceptional `admin_edited`.

## Core journey

`Challenge → Idea Studio → Idea Passport → Preflight → Submission → Layered Evaluation → Selection Gate → Pilot`

Do not collapse this into a generic chatbot, content generator, or like-based board.

## Canonical enum rule

Use `contracts/domain/domain-enums.yaml`. Do not create new states, role keys, visibility values, claim types, or sponsor statuses in code without updating the contract and canonical docs.

## Submission invariant

- Multiple Drafts are allowed.
- Default final submission limit is one per participant or team, configurable from one to three.
- Submitted Versions are immutable.
- Revision creates a new Version; it does not overwrite an evaluated snapshot.

## Evaluation invariant

- AI, Pairwise, Expert, and Selection Gate results are stored separately.
- Reference weights are AI 25%, Pairwise 25%, Expert 50%.
- Selection Committee is a qualitative Gate, not a hidden 10% score.
- AI score is supporting evidence and never an automatic final decision.
- Low confidence triggers review, not automatic penalty.

## Rights and visibility

- Idea ownership stays with the submitter by default.
- Visibility is one of `public`, `anonymous`, `evaluators_only`, `private`.
- Pilot, joint development, assignment, exclusive use, and revenue sharing require a separate agreement.
- Sponsor cannot access Drafts or non-public submitted content by default.

## Sponsorship boundary

Until an official agreement exists:

- JDC relationship status is `proposal` or `under_discussion`.
- Do not render `Sponsored by JDC` or use the official logo.
- Do not imply JDC owns, automatically reads, or selects Ideas.

## Stop rule

Stop when a task conflicts with `rights-and-visibility.md`, requires a new enum, changes evaluation weights, or grants Sponsor access beyond `sponsorship-access-policy.yaml`.
