---
doc_id: WOL-FEAT-003
title: VS-03 Idea Draft and Studio
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-PAGE-006, WOL-API-002, WOL-AI-002, WOL-DATA-004]
affects: [src/app/**/studio/**, src/server/**]
supersedes: null
---

# VS-03 Idea Draft and Studio

Entry: participant가 열린 Challenge에서 Draft를 생성한다. Owner만 원문·대화·checkpoint를 읽고 쓴다. AI는 suggestion을 만들며 사용자 결정 전 Passport에 쓰지 않는다.

Happy path: create draft → save with expected revision → start stream → interrupt → accept/edit/reject → provenance 기록 → canonical field update.

거부 경로: 다른 사용자 ID, submitted draft update, stale revision, schema invalid, resume token 재사용. 로그에는 원문과 hidden reasoning을 남기지 않는다.

Acceptance: 360px/keyboard/reduced motion, RLS cross-user deny, stale update test, stream reconnect, interrupt idempotency, rejected suggestion non-write.

