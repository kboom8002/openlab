---
doc_id: WOL-DOM-002
title: Monthly Challenge Model
status: approved
authority: canonical
owner: product-operations
last_verified: 2026-07-31
depends_on:
  - WOL-DOM-001
  - WOL-DOM-007
affects:
  - docs/03-ux/**
  - docs/05-data/**
  - docs/10-operations/**
  - contracts/domain/monthly-challenge.defaults.yaml
supersedes: null
---

# Monthly Challenge Model

## 1. 목적

JDC 등 기관 스폰서십을 포함할 수 있는 반복형 월간 Challenge의 구조, 설정, 상태, 역할과 운영 경계를 정의한다.

## 2. Aggregate 구조

```text
Challenge Series
├─ Series Brand and Purpose
├─ Sponsor Relationships
├─ Shared Governance
└─ Monthly Challenge 1..N
   ├─ Theme and Core Question
   ├─ Tracks and Categories
   ├─ Eligibility
   ├─ Submission Policy
   ├─ Evaluation Configuration
   ├─ Timeline
   ├─ Field Partners
   └─ Pilot Program
```

## 3. Challenge Series

필수 속성:

- `id`, `slug`, `title`
- `purpose`, `owner_organization_id`
- `status`
- `default_tracks`
- `default_rights_policy_version`
- `sponsor_relationships`
- `start_date`, `end_date` — 미정 가능

상태:

```text
DRAFT → PLANNED → ACTIVE → COMPLETED → ARCHIVED
                  ↘ PAUSED ↗
```

## 4. Monthly Challenge 필수 속성

- 제목과 핵심 질문
- Challenge Series
- 운영 주체
- 주제·Track·Category
- 참여 대상과 제외 조건
- 제출 시작·마감
- 평가·선정·고도화 일정
- 최종 제출 허용 수
- visibility 선택 가능 범위
- 평가 루브릭 버전
- 평가 방식 활성화 여부
- 권리·동의 정책 버전
- Sponsor·Field Partner 표시 승인 상태

## 5. 상태 enum

```text
DRAFT
SCHEDULED
OPEN
CLOSED
ELIGIBILITY_REVIEW
EVALUATION
SELECTION
PILOTING
COMPLETED
CANCELLED
ARCHIVED
```

### 기본 전이

```text
DRAFT → SCHEDULED → OPEN → CLOSED
→ ELIGIBILITY_REVIEW → EVALUATION → SELECTION
→ PILOTING → COMPLETED → ARCHIVED
```

- `CANCELLED`는 OPEN 이전 또는 운영 불가 상황에서 가능하다.
- `PAUSED` 대신 일정·접수 중단 필드를 사용하며, Series 수준 중단은 `PAUSED`로 관리한다.
- 상태 변경은 Challenge Manager 이상 권한과 이유 기록이 필요하다.

## 6. 제출 정책

- 복수 Draft 허용
- 최종 제출 기본값: 1개
- Challenge 설정 허용 범위: 1~3개
- 개인·팀 제출 허용 여부 설정
- 한 Idea는 한 Monthly Challenge에만 속함
- 마감 후 신규 제출 금지
- 운영자 반환에 의한 재제출은 정책과 일정 안에서만 허용

## 7. 평가 설정

기본:

- Eligibility Review: 필수
- AI Evaluation: 활성
- Pairwise Evaluation: Public Pilot부터 활성 가능
- Expert Evaluation: 필수
- Selection Gate: 필수

평가 가중치와 Gate는 `evaluation-model.md`를 따른다. Challenge는 평가 방식 자체를 제거할 수 있지만 AI 단독 최종선발은 설정할 수 없다.

## 8. 월간 운영 사이클

```text
주제 확정
→ Challenge 설정·공개
→ 모집·Idea Studio
→ 마감·Eligibility
→ AI·Pairwise·Expert Evaluation
→ Selection Gate
→ 고도화 워크숍·Proof Day
→ Pilot 설계·수행
→ Monthly Insight Report
```

각 단계의 기간은 운영 설정이며 코드 상수로 고정하지 않는다.

## 9. 주제 로드맵

12개월 주제는 제안안이며 Challenge 데이터로 관리한다. 예시:

- 모두에게 열린 제주 여행
- AI로 줄이는 반복 업무
- 지역상권과 AI 발견성
- 청년의 새로운 일과 기회
- 포용적인 생활과 돌봄
- 배움과 미래 인재
- 환경과 자원순환
- 이동과 생활안전
- 농수산과 로컬푸드 혁신
- 관광 경험의 빈틈
- 공공지식과 시민 서비스
- Jeju-to-global

공식 일정으로 고정하거나 외부에 약속하기 전 Sponsor·Owner 승인이 필요하다.

## 10. Sponsor와 운영자 역할

- Sponsor는 주제와 확산 방향에 의견을 제시할 수 있다.
- Challenge Owner와 WellB 운영자는 문제 정의, 플랫폼, 참여, 평가와 결과 자산화를 책임진다.
- Sponsor는 자동 최종선발권을 갖지 않는다.
- Sponsor의 평가 참여가 필요한 경우 Expert 또는 Committee 역할로 명시하고 이해상충을 공개한다.
- 비공개 콘텐츠 접근은 `rights-and-visibility.md`와 별도 동의 없이는 불가하다.

## 11. Monthly Insight Report

기본 포함:

- 모집·작성·제출·평가 Funnel
- 주제·Track별 문제 분포
- 익명화된 공통 가정과 실행 장벽
- 평가 편차와 신뢰 이슈
- Promising·Pilot-ready 수
- Pilot 진행 상태
- 동의된 Showcase

비공개 Idea 원문과 개인별 AI 대화는 기본 포함하지 않는다.

## 12. Acceptance Criteria

- Series와 Monthly Challenge가 구분된다.
- 상태·일정·평가·권리 정책을 데이터로 설정할 수 있다.
- Sponsor 역할과 운영권·평가권이 혼동되지 않는다.
- 제출 수·마감·재제출 규칙이 명확하다.
- 월별 결과가 다음 Challenge 개선으로 연결된다.
