---
doc_id: WOL-FEAT-006
title: VS-06 Publication and Sponsor Reporting
status: conditional
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-DOM-007, WOL-DOM-008, WOL-PAGE-014, WOL-PAGE-019]
affects: [src/app/ideas/**, src/app/sponsor/**]
supersedes: null
---

# VS-06 Publication and Sponsor Reporting

Public publication은 D-UX09 결정 전 비활성이다. 구현 조건은 participant consent와 manager approval, 철회 경로, snapshot, audit다. Sponsor는 집계·public·consented showcase·approved report만 dedicated read model로 본다.

JDC relationship fixture는 `proposal`; official logo, `Sponsored by`, 공동주최 문구는 false다.

Acceptance: private/evaluators_only draft leakage 0, consent withdrawal removes public projection, sponsor direct base-table access denied, small-cell suppression 적용.

