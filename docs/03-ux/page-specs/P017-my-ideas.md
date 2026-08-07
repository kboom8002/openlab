---
doc_id: WOL-PAGE-017
title: Page Spec — My Ideas
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
  - /my/ideas
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — My Ideas

## 1. 목적

참가자가 본인 Idea를 상태·Challenge·최근 수정 기준으로 찾아 이어쓰기, 열람, 철회 요청으로 이동한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-002` |
| Path | `/my/ideas` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | participant |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-017` |

## 3. 사용자 목표

- 작성 중인 Draft를 찾는다.
- 제출·평가·Pilot 상태를 구분한다.
- 같은 Challenge의 복수 Draft를 혼동하지 않는다.

## 4. Layout

Page Header → Status Tabs → Challenge Filter → Search → Idea List/Grid → Pagination.

## 5. 주요 Components

- `PageHeader`
- `IdeaStatusTabs`
- `ChallengeFilter`
- `IdeaCard`
- `IdeaStatusBadge`
- `EmptyState`
- `Pagination`

## 6. Data Dependencies

- own Ideas only
- latest Working/Submitted summary
- Challenge metadata
- allowed actions by status

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Draft 이어쓰기
- Passport 열기
- Submission 상태 보기
- 허용 상태에서 철회 요청

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `EMPTY_FILTERED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일은 list 우선, desktop은 compact grid 또는 table. Action menu는 native accessible menu.

## 10. Accessibility

- Idea title이 primary link
- status와 next action text 제공
- filter result count announce

## 11. Analytics Events

- `my_ideas_viewed`
- `my_ideas_filter_changed`
- `my_idea_opened`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 다른 사용자의 Idea가 노출되지 않는다.
- 복수 Draft가 각각 고유 제목·최근 저장·Challenge로 식별된다.
- 상태별 허용 action만 보인다.

## 13. 비포함 범위

- 다른 사용자 Idea 관리
- team shared draft
