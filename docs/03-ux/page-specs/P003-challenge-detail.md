---
doc_id: WOL-PAGE-003
title: Page Spec — Challenge Detail
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
  - /challenges/[slug]
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Challenge Detail

## 1. 목적

Challenge의 핵심 질문, 대상, 일정, 평가, 권리와 Sponsor 관계를 이해하고 참여 여부를 결정하게 한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PUB-003` |
| Path | `/challenges/[slug]` |
| Surface | `public` |
| Authentication | `none` |
| Roles | anonymous, participant |
| Indexing | `index_when_published` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-003` |

## 3. 사용자 목표

- 참여 조건과 제출물을 확인한다.
- 평가와 권리 한계를 이해한다.
- 로그인 상태에 맞는 단일 CTA로 Draft를 시작하거나 이어간다.

## 4. Layout

Challenge Hero → Core Question → Tracks → Eligibility → Required Output → Timeline → Evaluation → Rights → Sponsor Disclosure → FAQ → Sticky CTA.

## 5. 주요 Components

- `ChallengeHero`
- `ChallengeTimeline`
- `TrackCards`
- `EligibilitySummary`
- `EvaluationMethodSummary`
- `RightsNotice`
- `ChallengeSponsorPanel`
- `FAQ`
- `ParticipationCTA`

## 6. Data Dependencies

- single published Challenge
- current user participation state if authenticated
- submission count only if approved for display

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- 로그인 후 참여
- Draft 생성
- 기존 Draft 이어쓰기
- Gallery 열기

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `NOT_FOUND`
- `PERMISSION_LOGIN_REQUIRED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 sticky CTA는 safe-area를 고려한다. Timeline은 세로로 전환한다.

## 10. Accessibility

- 상태·마감·참여 조건을 heading과 list로 구조화
- sticky CTA가 content와 focus를 가리지 않음
- FAQ button에 expanded state 제공

## 11. Analytics Events

- `challenge_detail_viewed`
- `challenge_join_started`
- `challenge_rights_opened`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- Challenge 상태에 따라 CTA가 정확히 바뀐다.
- 마감 후 Draft 생성이 차단된다.
- Sponsor relationship status와 copy가 일치한다.
- 권리 안내가 CTA 이전에 접근 가능하다.

## 13. 비포함 범위

- Challenge 편집
- 실시간 평가 결과
