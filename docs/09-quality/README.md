---
doc_id: WOL-QA-001
title: Testing and AI Evaluation Strategy
status: approved
authority: canonical
owner: quality-engineering
last_verified: 2026-08-01
depends_on: [WOL-FEAT-001, WOL-AI-015, WOL-SEC-001]
affects: [tests/**, contracts/evals/**]
supersedes: null
---

# Testing and AI Evaluation

필수 계층: contract/schema, unit/domain transition, DB/RLS, integration/action/API, E2E/accessibility, AI golden set, security negative test. 변경된 경계의 테스트 ID와 report가 없으면 완료가 아니다.

Release block: YAML/JSON parse 실패, broken internal link, enum drift, 평가합계 오류, cross-user RLS access, Submitted Version mutation, Sponsor leakage, AI-only rejection, critical a11y defect, golden-set safety regression.

