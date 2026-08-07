---
doc_id: WOL-PAGE-015
title: Page Spec — Pilot Management
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
  - /admin/pilots
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Pilot Management

## 1. 목적

Pilot 후보·진행·결과를 가정, 범위, 지표와 계약 상태 중심으로 관리한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-MG-007` |
| Path | `/admin/pilots` |
| Surface | `manager` |
| Authentication | `required` |
| Roles | challenge_manager, pilot_owner, admin |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-015` |

## 3. 사용자 목표

- Pilot-ready와 실제 Pilot 확정을 구분한다.
- 실험 가정·기간·성공 기준·파트너를 관리한다.
- 결과를 Validated 또는 종료로 기록한다.

## 4. Layout

Pilot Status Board → Filters → Pilot List → Pilot Detail Drawer/Page → Hypothesis → Scope → Metrics → Partner/Contract → Result.

## 5. 주요 Components

- `PilotStatusBoard`
- `PilotCard`
- `PilotDetail`
- `ExperimentCard`
- `SuccessMetricList`
- `PartnerSummary`
- `AuditTimeline`

## 6. Data Dependencies

- authorized Pilot records
- linked Idea Version
- partner scope
- contract status summary
- result evidence

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Pilot 생성 요청
- 상태 변경
- 지표 기록
- 결과 요약
- Validated 검토

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `PERMISSION_DENIED`
- `ERROR_BLOCKING`

## 9. Responsive

모바일 Kanban 대신 상태 filter + list. Desktop에서만 board 제공.

## 10. Accessibility

- drag-and-drop 없이 상태 변경 가능
- 날짜·기간 명확화
- 성공기준과 실제 결과를 구분

## 11. Analytics Events

- `pilot_management_viewed`
- `pilot_status_changed`
- `pilot_result_recorded`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- Pilot-ready가 자동 Pilot 생성으로 이어지지 않는다.
- 별도 계약 필요 상태를 표시한다.
- Validated는 명시된 가정 검증만 의미한다.

## 13. 비포함 범위

- 계약 전자서명
- 실증비 결제
