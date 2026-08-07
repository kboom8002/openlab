---
doc_id: WOL-UX-003
title: Navigation Model
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-UX-001
  - WOL-UX-002
  - WOL-PROD-003
affects:
  - src/components/navigation/**
  - src/app/**/layout.tsx
supersedes: null
---

# Navigation Model

## 1. 목적

역할별 사용자가 현재 위치와 다음 행동을 이해하도록 Global, Workspace, Context navigation을 정의한다.

## 2. Navigation 계층

1. **Global Navigation:** 제품의 공개 영역
2. **Workspace Navigation:** Participant·Expert·Manager·Sponsor 영역
3. **Context Navigation:** Idea Studio 단계, Admin Challenge 탭 등 객체 내부
4. **Action Navigation:** 현재 화면의 Primary CTA

한 화면에서 Primary CTA는 원칙적으로 하나다.

## 3. Public GNB

```text
WELLB OPENLAB
Challenges
Ideas
How It Works
For Organizations
About
[Sign In]
[Start an Idea]
```

- `Start an Idea`는 활성 Challenge 선택 화면 또는 지정 Challenge로 이동한다.
- 공식 Sponsor 관계가 확정되지 않으면 GNB에 Sponsor 명칭·로고를 표시하지 않는다.
- 모바일은 Drawer를 사용하고 메뉴를 동일 순서로 유지한다.

## 4. Participant Navigation

Desktop:

```text
Dashboard
My Ideas
Evaluate
Notifications
Profile
```

Mobile bottom navigation:

```text
Home
Ideas
Evaluate
Alerts
Profile
```

Idea Studio 진입 시 일반 bottom navigation을 숨기고 Studio 전용 Header·Stage navigation을 사용한다.

## 5. Expert Navigation

```text
Assigned Reviews
Completed
Review Guide
Profile
```

평가 중에는 Idea Passport 목차와 평가 Form을 context navigation으로 제공한다.

## 6. Manager Navigation

```text
Overview
Challenges
Ideas
Evaluations
Selection
Pilots
Reports
Settings
```

작은 화면에서는 left sidebar를 Sheet로 전환하며, 모든 메뉴는 키보드 접근 가능해야 한다.

## 7. Sponsor Navigation

```text
Impact Overview
Monthly Reports
Showcases
Pilots
```

Sponsor에 `Ideas`, `Evaluations`, `Users` 메뉴를 노출하지 않는다.

## 8. Breadcrumb

다음 surface에서 사용한다.

- Challenge Detail 아래의 Manager 하위 화면
- Expert review
- Selection Board
- Pilot management
- 깊이 2 이상의 설정 화면

Participant Dashboard와 Idea Studio에서는 breadcrumb 대신 명확한 Back action과 객체 제목을 사용한다.

## 9. Active State

- 현재 route와 일치하는 항목을 텍스트·아이콘·indicator로 표시한다.
- 색상만으로 표시하지 않는다.
- 상위 메뉴는 자식 route에서도 활성 상태다.
- `aria-current="page"` 또는 적절한 current value를 적용한다.

## 10. Exit와 Unsaved State

Idea Studio에서 이탈 시:

- 저장 완료면 즉시 이동
- 저장 중이면 완료 또는 실패를 확인
- 저장 실패·오프라인 미동기화가 있으면 Dialog
- 브라우저 닫기 경고는 실제 데이터 손실 가능성이 있을 때만 사용

## 11. Deep Link

알림은 사용자가 접근 가능한 object route로만 연결한다. 권한이 변경되었으면 안전한 대체 화면과 이유를 보여준다.

## 12. Acceptance Criteria

- 역할마다 허용되지 않은 메뉴가 렌더되지 않는다.
- 메뉴 미노출과 별개로 route 권한이 서버에서 검증된다.
- 모바일과 데스크톱에서 정보 구조가 동일하다.
- 키보드와 screen reader로 메뉴를 완전 탐색할 수 있다.
- Idea Studio의 저장되지 않은 상태가 안전하게 처리된다.
