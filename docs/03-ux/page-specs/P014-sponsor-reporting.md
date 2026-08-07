---
doc_id: WOL-PAGE-014
title: Page Spec — Sponsor Reporting
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
  - /sponsor, /sponsor/reports/[challengeId]
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Sponsor Reporting

## 1. 목적

승인된 Sponsor가 월간 Challenge의 집계 성과, 동의 Showcase와 허용된 Pilot 현황을 확인한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-SP-001` |
| Path | `/sponsor, /sponsor/reports/[challengeId]` |
| Surface | `sponsor` |
| Authentication | `required` |
| Roles | sponsor_viewer |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-014` |

## 3. 사용자 목표

- 성과 정의와 기간을 이해한다.
- 집계 funnel과 Pilot 상태를 본다.
- 데이터 접근 경계를 명확히 인지한다.

## 4. Layout

Sponsor Shell → Relationship/Scope Notice → Portfolio Metrics → Monthly Reports → Aggregated Funnel → Showcases → Pilot Portfolio → Export.

## 5. 주요 Components

- `SponsorPortfolioSummary`
- `AggregatedFunnel`
- `MonthlyImpactCard`
- `ShowcaseCard`
- `PilotPortfolioSummary`
- `DataBoundaryNotice`

## 6. Data Dependencies

- sponsor-scoped aggregate
- consent-approved Showcase
- contract-approved Pilot fields
- report generation status

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- 월간 report 열기
- 허용 report export
- Showcase 열기

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `PERMISSION_DENIED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 metric 2열, report list 1열. Export는 명확한 format과 범위를 표시.

## 10. Accessibility

- 집계 정의와 단위 제공
- chart text summary
- Data Boundary Notice를 쉽게 찾을 수 있음

## 11. Analytics Events

- `sponsor_dashboard_viewed`
- `sponsor_report_opened`
- `sponsor_report_exported`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- Draft·private Idea·AI conversation·평가자 신원이 포함되지 않는다.
- approved relationship과 scope가 없는 계정은 접근하지 못한다.
- Showcase는 별도 동의 Version만 사용한다.

## 13. 비포함 범위

- Idea 원문 전체 검색
- 평가자 관리
- 최종선발 조작
