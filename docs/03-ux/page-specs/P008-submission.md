---
doc_id: WOL-PAGE-008
title: Page Spec — Preflight, Rights, and Submission
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
  - /ideas/[ideaId]/submit
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Preflight, Rights, and Submission

## 1. 목적

제출 전 논리·근거·안전 검수, visibility와 권리 동의를 완료하고 immutable Submitted Version을 생성한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-006` |
| Path | `/ideas/[ideaId]/submit` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | idea_owner |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-008` |

## 3. 사용자 목표

- Preflight 결과를 이해하고 보완한다.
- 공개 범위와 권리 조건을 선택한다.
- 제출 후 수정 제한을 이해한다.

## 4. Layout

Submission Stepper: 1 Preflight → 2 Visibility → 3 Rights & Consent → 4 Confirm → Success.

## 5. 주요 Components

- `PreflightSummary`
- `PreflightIssue`
- `VisibilitySelector`
- `RightsNotice`
- `ConsentChecklist`
- `SubmissionConfirmation`
- `SubmissionSuccess`

## 6. Data Dependencies

- own Working Version
- preflight result
- challenge submission policy
- consent versions
- submission quota

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- preflight 실행·재시도
- issue로 이동
- visibility 선택
- consent 저장
- 최종 제출

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `AI_DELAYED`
- `AI_FAILED`
- `AI_SAFETY_REVIEW`
- `ERROR_BLOCKING`
- `SAVE_FAILED`

## 9. Responsive

모바일에서 stepper는 현재 단계와 전체 수를 text로 제공. Summary sidebar는 inline으로 전환.

## 10. Accessibility

- consent checkbox 사전 선택 금지
- visibility option의 실제 노출 범위 설명
- 제출 button에 결과 설명
- error summary에서 issue field 이동

## 11. Analytics Events

- `preflight_started`
- `preflight_completed`
- `visibility_selected`
- `submission_confirmed`
- `idea_submitted`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 필수 consent와 visibility 없이는 제출할 수 없다.
- 제출 시 immutable Version이 생성됨을 명시한다.
- AI preflight 실패 시 직접 검토 후 정책에 따라 진행 가능하다.
- 아이디어 소유권 이전을 암시하지 않는다.

## 13. 비포함 범위

- 실증 계약
- 권리 양도
- 결제
