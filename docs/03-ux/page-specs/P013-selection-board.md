---
doc_id: WOL-PAGE-013
title: Page Spec — Selection Board
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-001
  - WOL-UX-002
  - WOL-UX-006
  - WOL-UX-007
affects:
  - /admin/selection
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Selection Board

## 1. 목적

평가 결과와 위험·실증 준비 조건을 비교하고 설명 가능한 정성 Selection Gate 결정을 기록한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-MG-006` |
| Path | `/admin/selection` |
| Surface | `manager` |
| Authentication | `required` |
| Roles | challenge_manager, authorized_selection_member, admin |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-013` |

## 3. 사용자 목표

- 최대 4개 Idea를 동일 축으로 비교한다.
- 평가 편차와 정보 부족을 확인한다.
- 결정과 이유를 audit 가능한 형태로 기록한다.

## 4. Layout

Challenge/Stage Selector → Candidate List → Comparison Workspace → Evaluation Summary → Risk/Conditions → Decision Form → Audit History.

## 5. 주요 Components

- `SelectionComparison`
- `EvaluationScoreSummary`
- `EvaluationVariance`
- `RiskSummary`
- `DecisionReasonForm`
- `AuditTimeline`

## 6. Data Dependencies

- candidate Submitted Versions
- AI/Pairwise/Expert normalized references
- evaluation confidence
- safety flags
- existing decisions

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- candidate 비교
- 추가 review 요청
- Promising/Pilot-ready/hold/not selected 결정
- 이유 기록

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `PERMISSION_DENIED`
- `ERROR_BLOCKING`

## 9. Responsive

모바일은 한 Idea씩 비교하고 pinned comparison tray 제공. Dense 4-column은 desktop에서만.

## 10. Accessibility

- score 이외 rationale 제공
- comparison table header 연결
- 결정 label과 결과 설명
- color-only rank 금지

## 11. Analytics Events

- `selection_board_viewed`
- `selection_candidates_compared`
- `selection_decision_recorded`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- AI 점수만으로 자동 결정하지 않는다.
- 운영위원 10% 점수 field가 없다.
- 모든 결정에 이유·주체·시간·snapshot이 기록된다.
- Submitted Version이 고정된다.

## 13. 비포함 범위

- 숨은 가산점
- Sponsor 최종선발권
