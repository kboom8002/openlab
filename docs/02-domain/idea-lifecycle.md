---
doc_id: WOL-DOM-004
title: Idea Lifecycle and State Machine
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-07-31
depends_on:
  - WOL-DOM-001
  - WOL-DOM-003
affects:
  - docs/03-ux/**
  - docs/05-data/**
  - docs/07-api/**
  - contracts/domain/domain-enums.yaml
supersedes: null
---

# Idea Lifecycle and State Machine

## 1. 목적

Idea의 작성, 제출, 평가, 고도화, Pilot, 채택 상태를 하나의 명확한 상태 머신으로 정의한다.

## 2. Canonical Idea Status

```text
DRAFT
READY_FOR_REVIEW
PREFLIGHT_CHECKING
PREFLIGHT_COMPLETE
SUBMITTED
ELIGIBILITY_REVIEW
ELIGIBLE
UNDER_EVALUATION
PROMISING
PILOT_READY
IN_PILOT
VALIDATED
ADOPTED
RETURNED_FOR_REVISION
INELIGIBLE
WITHDRAWN
SAFETY_HOLD
ARCHIVED
```

## 3. 정상 흐름

```text
DRAFT
→ READY_FOR_REVIEW
→ PREFLIGHT_CHECKING
→ PREFLIGHT_COMPLETE
→ SUBMITTED
→ ELIGIBILITY_REVIEW
→ ELIGIBLE
→ UNDER_EVALUATION
→ PROMISING
→ PILOT_READY
→ IN_PILOT
→ VALIDATED
→ ADOPTED
```

## 4. 상태 정의

| 상태 | 의미 | 변경 주체 |
|---|---|---|
| DRAFT | 작성 가능한 Working Idea | Participant |
| READY_FOR_REVIEW | 필수 필드 충족, Preflight 요청 가능 | Participant/System |
| PREFLIGHT_CHECKING | AI·정책 검수 진행 | System |
| PREFLIGHT_COMPLETE | 검수 결과 확인 완료, 제출 전 | Participant/System |
| SUBMITTED | 제출 버전 고정 | Participant |
| ELIGIBILITY_REVIEW | 기본 요건 검토 중 | Manager/System |
| ELIGIBLE | 평가 대상 승인 | Manager |
| UNDER_EVALUATION | AI·Pairwise·Expert 평가 진행 | Manager/System |
| PROMISING | 고도화 대상으로 승인 | Selection Gate |
| PILOT_READY | Pilot 설계 검토에 필요한 조건 승인 | Selection Gate |
| IN_PILOT | 별도 Pilot이 진행 중 | Manager |
| VALIDATED | 명시된 핵심 가정이 Pilot 결과로 확인 | Pilot Owner |
| ADOPTED | 실제 운영·서비스·정책에 적용 | Adopting Organization |
| RETURNED_FOR_REVISION | 평가 전 보완 요청 | Manager |
| INELIGIBLE | 참여·안전·완성 요건 미충족 | Manager |
| WITHDRAWN | 제출자가 철회 | Participant/Manager |
| SAFETY_HOLD | 안전·권리·민감정보 검토로 보류 | Admin/Manager |
| ARCHIVED | 활성 과정 종료 후 보관 | Manager/System |

## 5. 주요 전이 규칙

### DRAFT → READY_FOR_REVIEW

- 필수 Passport 필드 충족
- 사용자 확인되지 않은 필수 AI Suggestion 없음
- 저장 성공

### PREFLIGHT_CHECKING → PREFLIGHT_COMPLETE

- Structured Output 검증 성공
- 안전 플래그가 없거나 해결됨
- 확인 필요 항목을 사용자에게 표시

Safety 문제가 있으면 `SAFETY_HOLD`, 정보 부족이면 `DRAFT`로 돌아갈 수 있다.

### PREFLIGHT_COMPLETE → SUBMITTED

- visibility 선택
- 필수 동의 완료
- 권리 안내 확인
- 제출 수 제한 통과
- immutable Submitted Version 생성

### SUBMITTED → ELIGIBILITY_REVIEW

- Challenge 마감 전 즉시 또는 마감 후 일괄
- 운영 설정에 따라 자동 전이 가능

### ELIGIBILITY_REVIEW → RETURNED_FOR_REVISION

- 평가 시작 전 보완 가능
- 반환 이유와 기한 필수
- 수정은 새 Working Version에서 수행
- 재제출 시 새 Submitted Version 생성

### ELIGIBLE → UNDER_EVALUATION

- 평가 루브릭 버전 고정
- 필요한 평가 방식과 배정 생성
- Submitted Version 변경 금지

### UNDER_EVALUATION → PROMISING

- 최소 평가 요건 충족
- Selection Gate의 근거 기록
- AI 점수 단독으로 전이 금지

### PROMISING → PILOT_READY

- 핵심 가정·실험 범위·파트너·안전 조건 검토
- 별도 계약 필요 여부 확인

### IN_PILOT → VALIDATED

- Pilot 성공 기준과 결과 데이터 존재
- 결과 승인 주체와 날짜 기록
- 전체 사업 성공이 아니라 명시된 가정의 검증임을 유지

## 6. 예외 전이

- Participant는 정책 기간 내 `SUBMITTED`, `ELIGIBILITY_REVIEW`에서 `WITHDRAWN` 요청 가능
- `UNDER_EVALUATION` 이후 철회는 운영자 승인과 평가 종료 처리 필요
- `SAFETY_HOLD` 해제 후 이전 활성 상태로 복귀
- `INELIGIBLE`, `WITHDRAWN`, `ADOPTED`는 자동 재활성화하지 않음
- `ARCHIVED` 복구는 Admin과 감사로그 필요

## 7. 상태와 Version 관계

- Idea Status는 Aggregate 상태다.
- 평가는 항상 특정 Submitted Version을 참조한다.
- RETURNED_FOR_REVISION 후 이전 평가가 있으면 무효 상태와 이유를 보존한다.
- 상태 변경이 Passport 내용을 수정하지 않는다.

## 8. 사용자 표시명

| enum | UI 표시 |
|---|---|
| DRAFT | 작성 중 |
| READY_FOR_REVIEW | 제출 전 확인 가능 |
| PREFLIGHT_CHECKING | 제출 전 검수 중 |
| PREFLIGHT_COMPLETE | 제출 준비 완료 |
| SUBMITTED | 제출 완료 |
| ELIGIBILITY_REVIEW | 기본 요건 검토 중 |
| ELIGIBLE | 평가 대상 확정 |
| UNDER_EVALUATION | 평가 중 |
| PROMISING | 고도화 후보 |
| PILOT_READY | 실증 준비 후보 |
| IN_PILOT | 현장 실증 중 |
| VALIDATED | 실증 결과 확인 |
| ADOPTED | 적용됨 |
| RETURNED_FOR_REVISION | 보완 요청 |
| INELIGIBLE | 기본 요건 미충족 |
| WITHDRAWN | 철회됨 |
| SAFETY_HOLD | 확인 필요 |
| ARCHIVED | 종료·보관 |

## 9. Acceptance Criteria

- 허용되지 않은 전이는 API와 DB 수준에서 차단한다.
- 상태 변경 주체·시간·이유를 기록한다.
- 제출 버전과 평가 버전이 불변으로 연결된다.
- AI가 최종 상태를 단독 변경하지 않는다.
- UI가 enum과 다른 의미의 상태명을 만들지 않는다.
