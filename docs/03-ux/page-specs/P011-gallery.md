---
doc_id: WOL-PAGE-011
title: Page Spec — Public Idea Gallery
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
  - /ideas
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Public Idea Gallery

## 1. 목적

동의된 Public 또는 Anonymous Idea를 Showcase로 소개해 학습과 참여를 촉진한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PUB-004` |
| Path | `/ideas` |
| Surface | `public` |
| Authentication | `none` |
| Roles | anonymous, authenticated |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-011` |

## 3. 사용자 목표

- Challenge·트랙·상태별 공개 Idea를 탐색한다.
- 공개 범위와 작성자 표시 방식을 이해한다.
- 인기순위로 오해하지 않는다.

## 4. Layout

Page Header + Disclosure → Filters → Showcase Grid → Pagination.

## 5. 주요 Components

- `PageHeader`
- `GalleryDisclosure`
- `IdeaShowcaseCard`
- `ChallengeFilter`
- `TrackFilter`
- `EmptyState`
- `Pagination`

## 6. Data Dependencies

- publication-approved public/anonymous Idea summaries only
- Challenge public metadata
- optional consented pilot result

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- filter
- public Idea detail 열기
- Challenge로 이동

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `EMPTY_FILTERED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 1열. Card 간 정보 밀도를 유지하고 carousel 사용 금지.

## 10. Accessibility

- anonymous 여부 text 표시
- 상태가 우수성 ranking으로 오인되지 않게 설명
- filter result count announce

## 11. Analytics Events

- `idea_gallery_viewed`
- `idea_gallery_filter_changed`
- `public_idea_opened`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- private·evaluators_only Idea가 노출되지 않는다.
- publication approval와 consent를 통과한 Version만 보인다.
- Public Pilot에서 noindex가 적용된다.

## 13. 비포함 범위

- 좋아요 수
- 실시간 평가 점수
- 작성자 민감정보
