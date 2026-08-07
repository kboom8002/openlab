---
doc_id: WOL-FEAT-004
title: VS-04 Passport and Submission
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-PAGE-007, WOL-PAGE-008, WOL-API-002, WOL-DOM-004]
affects: [src/app/**/passport/**, src/app/**/submit/**]
supersedes: null
---

# VS-04 Passport and Submission

Precondition: owner, Challenge OPEN, required fields, preflight result, rights·visibility consent. 제출은 idempotent transaction으로 immutable Idea Version을 만들고 이후 평가는 그 Version ID를 참조한다.

AI preflight는 차단 권한이 없다. 오류·위험은 사용자와 허용된 reviewer에게 설명하며, 자동 탈락시키지 않는다. 제출 후 원문 수정은 새 Draft/Revision 흐름으로만 가능하다.

Acceptance: double submit same result, changed payload same key conflict, version update denied, consent receipt retained, AI-only rejection impossible.

