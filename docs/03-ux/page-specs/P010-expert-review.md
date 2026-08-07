---
doc_id: WOL-PAGE-010
title: Page Spec — Expert Review
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
  - /expert/reviews/[assignmentId]
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Expert Review

## 1. 목적

배정된 Submitted Version을 고정 루브릭과 정성 의견으로 평가한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-EX-002` |
| Path | `/expert/reviews/[assignmentId]` |
| Surface | `expert` |
| Authentication | `required` |
| Roles | assigned_expert |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-010` |

## 3. 사용자 목표

- 이해상충을 먼저 확인한다.
- 각 기준의 의미와 점수 범위를 이해한다.
- 강점·위험·실증 조건을 기록하고 제출한다.

## 4. Layout

Review Header → Conflict Gate → Split: Passport/Artifacts | Sticky Rubric → Summary → Submit.

## 5. 주요 Components

- `ExpertReviewShell`
- `ConflictDeclaration`
- `IdeaPassportReadonly`
- `RubricCriterion`
- `ScoreInput`
- `ReviewSummary`
- `EvaluationProgress`
- `EvaluationLimitNotice`

## 6. Data Dependencies

- assignment
- fixed Submitted Version
- rubric version
- existing draft review
- deadline

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- conflict 선언
- score·comment 자동 저장
- review 제출
- 허용 기간 내 수정

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `PERMISSION_DENIED`
- `NOT_FOUND`
- `SAVE_FAILED`
- `ERROR_BLOCKING`

## 9. Responsive

모바일은 Passport와 Rubric 탭을 제공하되 저장 상태를 유지한다. Desktop은 2열.

## 10. Accessibility

- score는 숫자 input과 범위 설명
- sticky panel이 focus 가리지 않음
- 필수 정성 field error 연결
- 작성자 identity 기본 비노출

## 11. Analytics Events

- `expert_review_started`
- `expert_conflict_declared`
- `expert_review_saved`
- `expert_review_submitted`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- assignment가 없는 사용자는 접근할 수 없다.
- rubric version이 review 시작 후 바뀌지 않는다.
- 최종 제출 전 conflict 확인이 필수다.
- 다른 평가자의 점수가 보이지 않는다.

## 13. 비포함 범위

- Selection decision
- AI prompt log
- 작성자 연락처
