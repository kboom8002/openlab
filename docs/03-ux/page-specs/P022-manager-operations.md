---
doc_id: WOL-PAGE-022
title: Page Spec — Challenge and Evaluation Operations
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
  - /admin/challenges, /admin/challenges/[challengeId], /admin/ideas, /admin/evaluations, /admin/reports, /admin/settings
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Challenge and Evaluation Operations

## 1. 목적

운영자가 Challenge 설정, 참가자·Idea eligibility, 평가 배정·진행, 내부 보고와 scope 설정을 관리한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-MG-002` |
| Path | `/admin/challenges, /admin/challenges/[challengeId], /admin/ideas, /admin/evaluations, /admin/reports, /admin/settings` |
| Surface | `manager` |
| Authentication | `required` |
| Roles | challenge_manager, admin |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-022` |

## 3. 사용자 목표

- Challenge lifecycle과 제출 현황을 관리한다.
- eligibility와 safety hold를 처리한다.
- 평가 coverage와 지연을 관리한다.
- 집계 보고서를 생성하되 Sponsor scope를 분리한다.

## 4. Layout

Manager Shell → Scope Selector → Section Tabs → Data View → Detail Panel → Action Bar → Audit.

## 5. 주요 Components

- `WorkspaceSidebar`
- `ChallengeAdminList`
- `ChallengeSettingsForm`
- `IdeaAdminTable`
- `EligibilityReviewPanel`
- `EvaluationCoverage`
- `ExpertAssignmentPanel`
- `InternalReportBuilder`
- `AuditTimeline`

## 6. Data Dependencies

- organization-scoped Challenges
- Ideas and Versions by authorized scope
- evaluation assignments
- operational aggregate
- audit events

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Challenge 상태 변경
- eligibility 결정
- revision 요청
- expert 배정
- 평가 단계 시작·종료
- internal report 생성

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `PERMISSION_DENIED`
- `ERROR_BLOCKING`
- `SAVE_FAILED`

## 9. Responsive

모바일은 full editing보다 review·핵심 action 중심. 복잡 설정은 desktop 권장 안내 가능하나 접근 차단 금지.

## 10. Accessibility

- table header·filter label
- bulk action 대상 수 announce
- 상태 변경 결과와 이유 field
- audit event reading order

## 11. Analytics Events

- `admin_challenges_viewed`
- `eligibility_decision_recorded`
- `expert_assignment_created`
- `evaluation_phase_changed`
- `internal_report_generated`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 조직 scope 밖 데이터 접근이 차단된다.
- 상태 전이와 이유가 canonical lifecycle을 따른다.
- 평가 시작 후 rubric version이 고정된다.
- Sponsor report와 내부 report가 분리된다.

## 13. 비포함 범위

- production DB 직접 편집
- Sponsor의 운영 action
