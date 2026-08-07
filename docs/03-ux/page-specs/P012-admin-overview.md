---
doc_id: WOL-PAGE-012
title: Page Spec — Operations Overview
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
  - /admin
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Operations Overview

## 1. 목적

운영자가 관리 범위 Challenge의 제출·검수·평가·선정·Pilot 진행 상황과 필요한 조치를 파악한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-MG-001` |
| Path | `/admin` |
| Surface | `manager` |
| Authentication | `required` |
| Roles | challenge_manager, admin |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-012` |

## 3. 사용자 목표

- 운영 병목을 찾는다.
- 안전·평가 지연·마감 이슈로 이동한다.
- 스폰서 보고와 내부 운영 데이터를 구분한다.

## 4. Layout

Manager Shell → Scope/Challenge Selector → Metrics → Funnel → Alerts → Evaluation Coverage → Recent Decisions.

## 5. 주요 Components

- `WorkspaceSidebar`
- `OperationsMetrics`
- `ChallengeFunnel`
- `OperationsAlertList`
- `EvaluationCoverage`
- `AuditTimeline`

## 6. Data Dependencies

- organization-scoped aggregate
- operational alerts
- evaluation completion
- selection decisions

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- scope 변경
- 운영 세부 화면 이동
- alert 확인

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `PERMISSION_DENIED`
- `ERROR_RETRYABLE`

## 9. Responsive

모바일 핵심 alert와 metric 우선. Dense chart는 data list 대안을 제공.

## 10. Accessibility

- metric 변화에 text 설명
- chart summary
- scope selector label
- alert severity를 text로 제공

## 11. Analytics Events

- `admin_overview_viewed`
- `admin_alert_opened`
- `admin_scope_changed`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 관리 조직 밖 데이터가 집계에도 섞이지 않는다.
- Sponsor dashboard와 다른 데이터 범위를 사용한다.
- 모든 지표의 정의와 기준 기간을 제공한다.

## 13. 비포함 범위

- production system health dashboard
- raw AI prompt viewing by default
