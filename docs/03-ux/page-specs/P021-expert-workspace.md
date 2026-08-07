---
doc_id: WOL-PAGE-021
title: Page Spec — Expert Workspace
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
  - /expert, /expert/guide
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Expert Workspace

## 1. 목적

전문가가 배정·기한·완료 상태와 평가 가이드를 확인하고 review를 시작한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-EX-001` |
| Path | `/expert, /expert/guide` |
| Surface | `expert` |
| Authentication | `required` |
| Roles | expert |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-021` |

## 3. 사용자 목표

- 새 배정을 확인한다.
- 기한과 conflict 상태를 이해한다.
- rubric·보안·공정성 가이드를 읽는다.

## 4. Layout

Expert Header → Assignment Metrics → Assigned List → Due Soon → Completed → Review Guide Link.

## 5. 주요 Components

- `WorkspaceHeader`
- `AssignmentMetrics`
- `ExpertAssignmentList`
- `ConflictStatusBadge`
- `DeadlineBadge`
- `EmptyState`
- `ReviewGuide`

## 6. Data Dependencies

- own assignments
- deadline
- conflict status
- review status
- guide version

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- review 시작
- conflict 신고
- 완료 review 열기
- guide 확인

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `PERMISSION_DENIED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 list 1열, deadline과 primary action 우선.

## 10. Accessibility

- deadline absolute date
- status text
- table을 mobile list로 전환
- conflict action 설명

## 11. Analytics Events

- `expert_workspace_viewed`
- `expert_assignment_opened`
- `expert_guide_viewed`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 본인 배정만 표시된다.
- 작성자 신원·다른 평가 점수를 노출하지 않는다.
- 마감·완료 상태가 정확하다.

## 13. 비포함 범위

- 평가자 간 discussion
- Selection Board
