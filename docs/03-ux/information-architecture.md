---
doc_id: WOL-UX-001
title: Information Architecture
status: approved
authority: canonical
owner: product-design
last_verified: 2026-07-31
depends_on:
  - WOL-PROD-002
  - WOL-PROD-003
  - WOL-DOM-001
  - WOL-DOM-007
  - WOL-DOM-008
affects:
  - docs/03-ux/route-map.md
  - docs/03-ux/navigation-model.md
  - contracts/ux/routes.yaml
  - src/app/**
supersedes: null
---

# Information Architecture

## 1. 목적

WELLB OPENLAB의 사용자 목표와 역할별 작업을 정보영역으로 분리하고, 공개·참가자·평가자·운영자·Sponsor surface의 경계를 정의한다.

## 2. 최상위 Surface

| Surface | 주요 사용자 | 목적 | 데이터 경계 |
|---|---|---|---|
| Public | 방문자·잠재 참가자·기관 | 제품 이해, Challenge 탐색, 공개 Idea 열람 | 공개 승인 데이터만 |
| Auth | 모든 계정 사용자 | 로그인, 콜백, 최초 설정 | 본인 인증 데이터 |
| Participant | 참가자 | Idea 작성·제출·상태 확인·Pairwise 참여 | 본인 Idea와 허용 평가 데이터 |
| Expert | 전문가 평가자 | 배정 Idea 평가 | 배정된 Submitted Version |
| Manager | Challenge 운영자 | Challenge·Idea·평가·Selection·Pilot 운영 | 관리 범위의 조직 데이터 |
| Sponsor | 승인된 Sponsor viewer | 집계 성과·동의 Showcase·Pilot 현황 | 집계 및 명시 동의 데이터 |
| System | worker·webhook | AI, 알림, 비동기 처리 | 최소 서비스 권한 |

## 3. Public IA

```text
Home
├─ Challenges
│  ├─ 진행 중
│  ├─ 예정
│  └─ 종료
├─ Idea Gallery
│  └─ Public / Anonymous Idea
├─ How It Works
├─ For Organizations
├─ About OpenLab
├─ FAQ
└─ Sign In
```

Public surface는 제품을 “공모전 게시판”이 아니라 문제 발견에서 Pilot까지 이어지는 실행체계로 설명해야 한다.

## 4. Participant IA

```text
My OpenLab
├─ Dashboard
├─ My Ideas
│  ├─ Draft
│  ├─ Submitted
│  ├─ Under Review
│  ├─ Selected
│  └─ Pilot
├─ Idea Studio
├─ Idea Passport
├─ Submission
├─ Pairwise Evaluation
├─ Notifications
└─ Profile & Accessibility
```

## 5. Expert IA

```text
Expert Workspace
├─ Assigned Reviews
├─ Review Guide
├─ Conflict Declaration
├─ Expert Review
└─ Completed Reviews
```

전문가에게 현재 순위·다른 평가자의 점수·작성자 배경을 기본 제공하지 않는다.

## 6. Manager IA

```text
Operations
├─ Overview
├─ Challenge Management
├─ Participants
├─ Idea Eligibility
├─ Evaluation Operations
├─ Selection Board
├─ Pilot Management
├─ Reports
└─ Settings
```

## 7. Sponsor IA

```text
Sponsor Impact
├─ Portfolio Summary
├─ Monthly Challenge Report
├─ Aggregated Funnel
├─ Consent-based Showcase
├─ Pilot Portfolio
└─ Report Export
```

Sponsor surface는 운영자 Admin의 축소판이 아니다. 평가자 신원, 비공개 원문, AI 대화와 Draft는 포함하지 않는다.

## 8. Cross-cutting objects

- Challenge Series
- Monthly Challenge
- Idea
- Idea Version
- Idea Passport
- Evaluation
- Selection Decision
- Pilot
- Notification
- Consent

사용자에게는 객체의 기술 구조보다 현재 해야 할 행동과 상태를 먼저 보여준다.

## 9. 주요 사용자 여정

### 참가자

```text
Challenge 발견
→ 참여조건 확인
→ Draft 생성
→ 7단계 Idea Studio
→ Passport 검토
→ Preflight
→ 권리·visibility 설정
→ 제출
→ 평가·보완 상태 확인
→ 고도화·Pilot
```

### 기관

```text
기관용 소개
→ 상담
→ Challenge 설계
→ 운영
→ 평가
→ Selection
→ Pilot
→ 결과 보고
```

### Sponsor

```text
로그인
→ 집계 Dashboard
→ 월간 성과 확인
→ 동의 Showcase 열람
→ Pilot 현황 확인
→ 보고서 Export
```

## 10. 검색과 발견

- Challenge는 상태·트랙·대상·기간으로 탐색한다.
- Public Idea는 공개 설정과 Challenge 정책을 통과한 것만 노출한다.
- 개인 Dashboard 검색은 본인 Idea만 대상으로 한다.
- Admin 검색 결과는 조직 scope와 role을 따른다.
- Sponsor 검색은 Showcase와 집계 리포트로 제한한다.

## 11. Acceptance Criteria

- 역할별 Surface가 라우트와 navigation에서 구분된다.
- Public route가 비공개 데이터를 요구하지 않는다.
- Sponsor surface가 Admin 권한을 재사용하지 않는다.
- 참가자가 핵심 여정을 3단계 이내의 상위 navigation에서 시작할 수 있다.
- Idea Studio와 제출 플로의 현재 단계와 다음 행동이 항상 보인다.
