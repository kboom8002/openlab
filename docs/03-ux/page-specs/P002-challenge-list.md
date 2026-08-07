---
doc_id: WOL-PAGE-002
title: Page Spec — Challenge List
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
  - /challenges
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Challenge List

## 1. 목적

사용자가 진행 상태·트랙·대상에 따라 참여 가능한 Challenge를 탐색한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PUB-002` |
| Path | `/challenges` |
| Surface | `public` |
| Authentication | `none` |
| Roles | anonymous, authenticated |
| Indexing | `index` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-002` |

## 3. 사용자 목표

- 진행 중 Challenge를 빠르게 찾는다.
- 예정·종료 Challenge의 차이를 이해한다.
- 필터 결과를 URL과 함께 공유할 수 있다.

## 4. Layout

Page Header → Status Tabs → Filters → Result Summary → Challenge Grid → Pagination or Load More.

## 5. 주요 Components

- `PageHeader`
- `ChallengeStatusTabs`
- `ChallengeTrackFilter`
- `ChallengeCard`
- `EmptyState`
- `LoadingRegion`
- `Pagination`

## 6. Data Dependencies

- published Challenge list
- track labels
- submission period
- eligibility summary
- approved sponsor display state

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- 상태·트랙 filter
- filter reset
- Challenge detail 열기

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `EMPTY_FILTERED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 filter는 Sheet로 열며 현재 적용 개수를 button에 표시한다. Card는 1열, 태블릿 2열, 데스크톱 3열.

## 10. Accessibility

- Tabs에 올바른 tab semantics
- filter label과 result count 연결
- 마감일을 절대 날짜로 제공
- Card 전체 clickable div 사용 금지

## 11. Analytics Events

- `challenge_list_viewed`
- `challenge_filter_changed`
- `challenge_opened`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- URL search params가 filter 상태와 일치한다.
- 비공개·draft Challenge가 노출되지 않는다.
- empty filtered 상태에서 reset이 가능하다.

## 13. 비포함 범위

- 운영자용 Challenge 관리
- 개인별 추천 ranking
