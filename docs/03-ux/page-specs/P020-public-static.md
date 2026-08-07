---
doc_id: WOL-PAGE-020
title: Page Spec — Public Information Pages
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
  - /how-it-works, /organizations, /about, /faq
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Public Information Pages

## 1. 목적

제품 작동 방식, 기관용 제공범위, 운영주체와 FAQ를 신뢰 가능한 정적 콘텐츠로 제공한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PUB-006` |
| Path | `/how-it-works, /organizations, /about, /faq` |
| Surface | `public` |
| Authentication | `none` |
| Roles | anonymous, authenticated |
| Indexing | `index` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-020` |

## 3. 사용자 목표

- 참가자는 AI와 평가의 역할을 이해한다.
- 기관은 Challenge-as-a-Service 범위와 상담 경로를 확인한다.
- 권리·Sponsor·개인정보 오해를 해소한다.

## 4. Layout

각 page별 Page Hero → Content Sections → Evidence/Boundary Callout → CTA → Footer.

## 5. 주요 Components

- `PublicHeader`
- `PageHeader`
- `ProcessSteps`
- `OrganizationOffering`
- `TrustCallout`
- `FAQ`
- `ContactCTA`
- `PublicFooter`

## 6. Data Dependencies

- approved static content
- current relationship disclosure
- contact destination

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Challenge 탐색
- 기관 상담
- FAQ accordion

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_REGION`
- `ERROR_RETRYABLE`

## 9. Responsive

본문 reading width와 section card grid. 모바일 FAQ는 native button accordion.

## 10. Accessibility

- heading hierarchy
- FAQ expanded state
- 약어 첫 사용 설명
- CTA 결과를 명확히 설명

## 11. Analytics Events

- `how_it_works_viewed`
- `organizations_page_viewed`
- `about_page_viewed`
- `faq_viewed`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- AI 객관성·성공보장·권리보호를 과장하지 않는다.
- Sponsor 관계가 현재 상태와 일치한다.
- 각 page에 고유 metadata가 있다.

## 13. 비포함 범위

- 실시간 운영 데이터
- 가격 자동 견적
