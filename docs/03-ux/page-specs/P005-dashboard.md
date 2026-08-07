---
doc_id: WOL-PAGE-005
title: Page Spec — Participant Dashboard
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
  - /dashboard
  - src/app/**
  - src/features/**
supersedes: null
---

# Page Spec — Participant Dashboard

## 1. 목적

참가자가 자신의 Challenge, Idea, 평가 요청과 다음 행동을 한 화면에서 파악한다.

## 2. Route Contract

| 항목 | 값 |
|---|---|
| Route ID | `R-PT-001` |
| Path | `/dashboard` |
| Surface | `participant` |
| Authentication | `required` |
| Roles | participant |
| Indexing | `noindex` |
| Page owner | `src/app/.../page.tsx` |
| Page specification | `WOL-PAGE-005` |

## 3. 사용자 목표

- 마지막 Draft를 이어 쓴다.
- 제출·평가·선정 상태를 확인한다.
- 새 Challenge와 Pairwise task로 이동한다.

## 4. Layout

Workspace Header → Greeting/Next Action → Metrics → Continue Working → My Ideas → Evaluation Tasks → Notifications.

## 5. 주요 Components

- `WorkspaceHeader`
- `MetricSummary`
- `ContinueIdeaCard`
- `MyIdeaList`
- `EvaluationTaskList`
- `NotificationPreview`
- `RecommendedChallenges`

## 6. Data Dependencies

- current user profile
- own Ideas only
- active participations
- pairwise task availability
- notifications

데이터는 서버에서 object-level authorization을 통과한 뒤 전달한다. Client에서 숨기는 것으로 권한을 대체하지 않는다.

## 7. Actions and Mutations

- Draft 이어쓰기
- Idea list filter
- Pairwise 시작
- notification 열기

모든 mutation은 pending·success·error state와 중복 실행 방지를 제공한다.

## 8. Required States

- `LOADING_INITIAL`
- `EMPTY_FIRST_USE`
- `ERROR_RETRYABLE`
- `PERMISSION_DENIED`

## 9. Responsive

모바일 metric 2열, 목록 1열. Continue card의 CTA가 우선.

## 10. Accessibility

- metric을 의미 없는 큰 숫자만으로 제공하지 않음
- 현재 상태와 다음 행동을 text로 제공
- notification unread를 색상 외 표시

## 11. Analytics Events

- `participant_dashboard_viewed`
- `continue_idea_clicked`
- `pairwise_task_started`

개인정보·Idea 원문·AI 대화 원문을 analytics property에 기록하지 않는다.

## 12. Acceptance Criteria

- 다른 사용자의 Idea가 포함되지 않는다.
- 가장 중요한 다음 행동이 하나로 강조된다.
- Idea status label이 canonical copy와 일치한다.

## 13. 비포함 범위

- Sponsor metrics
- Manager controls
