---
doc_id: WOL-PAGE-001
title: Page Spec — Public Home
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
  - /
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Public Home

## 1. 목적

제품의 정체성, 현재 Challenge, 참여 방식, 기관용 가치와 신뢰 원칙을 이해시키고 적절한 시작 행동으로 연결한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PUB-001` |
| Path | `/` |
| Surface | `public` |
| Authentication | `none` |
| Roles | anonymous, authenticated |
| Indexing | `index` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-001` |

## 3. 사용자 목표

- 방문자는 10초 안에 WELLB OPENLAB이 AI 증강 오픈이노베이션 플랫폼임을 이해한다.
- 참가자는 활성 Challenge 또는 Idea 시작으로 이동한다.
- 기관 담당자는 기관용 서비스와 상담 경로를 찾는다.

## 4. Layout

Hero → Active Challenges → Why OpenLab → How It Works → Selected Ideas → For Participants → For Organizations → Trust & Rights → Final CTA.

## 5. 주요 Components

- `PublicHeader`
- `HeroSection`
- `ActiveChallengeSection`
- `ChallengeCard`
- `HowItWorks`
- `SelectedIdeaPreview`
- `TrustAndRights`
- `SponsorDisclosure`
- `FinalCTA`
- `PublicFooter`

## 6. Data Dependencies

- published Challenge summary
- public Showcase only
- approved sponsor relationship copy
- static product content

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Challenge detail로 이동
- Idea 시작 route로 이동
- 기관 상담 route로 이동
- 공개 Idea detail 열람

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_REGION`
- `EMPTY_FILTERED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일은 Hero·Challenge·가치 card를 1열로 배치한다. 선택된 Idea preview는 horizontal carousel이 아니라 세로 list로 전환한다.

## 10. Accessibility

- H1은 하나만 사용
- Hero CTA 순서가 visual order와 동일
- Challenge status를 색상 외 text로 제공
- Sponsor disclosure를 logo만으로 전달하지 않음

## 11. Analytics Events

- `home_viewed`
- `home_primary_cta_clicked`
- `challenge_card_opened`
- `organization_cta_clicked`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 공식 승인 전 JDC 공식 후원 표현이 나타나지 않는다.
- 활성 Challenge가 없을 때 정확한 empty state가 표시된다.
- 모든 CTA가 keyboard로 동작한다.
- public data만 요청한다.

## 13. 비포함 범위

- 개인 Dashboard 데이터
- 실시간 점수·순위
- 비공개 Idea preview
