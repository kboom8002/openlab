---
doc_id: WOL-PAGE-009
title: Page Spec — Pairwise Evaluation
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
  - /evaluate/pairwise
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Pairwise Evaluation

## 1. 목적

두 개의 익명 Idea 요약을 같은 구조로 비교해 사용자·현장 관점을 수집한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-007` |
| Path | `/evaluate/pairwise` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | eligible_evaluator |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-009` |

## 3. 사용자 목표

- 기준을 이해한다.
- A, 비슷함, B, 판단하기 어려움 중 선택한다.
- 작성자·현재 점수에 영향받지 않는다.

## 4. Layout

Evaluation Intro → Progress → Idea A / Idea B → Choice → Optional Secondary Question → Confirmation.

## 5. 주요 Components

- `PairwiseComparison`
- `PairwiseIdeaSummary`
- `PairwiseChoice`
- `EvaluationProgress`
- `EvaluationLimitNotice`

## 6. Data Dependencies

- eligible pair
- fixed Submitted Version summaries
- comparison question
- remaining task count if policy allows

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- choice submit
- secondary response
- skip with reason if allowed
- next pair

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `ERROR_RETRYABLE`
- `PERMISSION_DENIED`

## 9. Responsive

모바일에서는 A/B를 세로로 표시하되 choice 전에 두 요약을 모두 읽을 수 있게 한다. Desktop은 동일 폭 2열.

## 10. Accessibility

- visual order와 focus order 일치
- A/B label 외 제목을 반복 제공
- choice native radio group
- 순위·score 숨김

## 11. Analytics Events

- `pairwise_viewed`
- `pairwise_choice_submitted`
- `pairwise_skipped`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 자기 Idea가 pair에 포함되지 않는다.
- 이미 평가한 동일 pair가 중복 노출되지 않는다.
- 작성자 식별정보와 AI 점수가 노출되지 않는다.
- 비슷함과 판단하기 어려움 선택이 가능하다.

## 13. 비포함 범위

- 공개 좋아요
- 댓글
- 인기 순위
