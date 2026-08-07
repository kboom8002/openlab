---
doc_id: WOL-FEAT-005
title: VS-05 Evaluation and Selection
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-DOM-005, WOL-PAGE-009, WOL-PAGE-010, WOL-API-002]
affects: [src/app/evaluate/**, src/app/expert/**, src/app/admin/evaluations/**]
supersedes: null
---

# VS-05 Evaluation and Selection

Reference score는 AI 25, Pairwise 25, Expert 50이며 Committee는 정성 Gate다. Pairwise 부족분을 자동 재배분하지 않는다. 모든 평가자는 고정 Submitted Version을 보고 conflict를 신고한다.

AI 결과는 rationale·confidence·schema version을 포함하며 최종 판정이 아니다. Sponsor 단독 override, hidden bonus, identity selection을 금지한다.

Acceptance: weight total 100, self-review deny, assignment isolation, submitted evaluation immutable, insufficient pairwise 표시, committee reason audit.

