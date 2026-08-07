---
doc_id: WOL-DOM-006
title: Pilot Lifecycle
status: approved
authority: canonical
owner: product-operations
last_verified: 2026-07-31
depends_on:
  - WOL-DOM-004
  - WOL-DOM-005
affects:
  - docs/10-operations/**
  - docs/11-project/**
  - contracts/domain/domain-enums.yaml
supersedes: null
---

# Pilot Lifecycle

## 1. 목적

Promising Idea가 단순 수상에 머물지 않고, 별도 권리·안전·운영 조건 아래 제한된 현장 실증으로 전환되는 과정을 정의한다.

## 2. Pilot의 정의

Pilot은 다음을 모두 가진 제한된 실험이다.

- 검증할 핵심 가정
- 대상 사용자 또는 현장
- 최소 구현 범위
- 기간
- 성공·중단 기준
- 책임 주체
- 예산 범위
- 데이터와 안전 계획
- 결과 보고

Idea의 제출만으로 Pilot 참여나 비용 지원이 보장되지 않는다.

## 3. Pilot Status

```text
PLANNED
READY
IN_PROGRESS
PAUSED
COMPLETED
VALIDATED
NOT_VALIDATED
CANCELLED
ARCHIVED
```

Idea의 `PILOT_READY`, `IN_PILOT`, `VALIDATED` 상태와 Pilot 객체 상태를 혼동하지 않는다. 하나의 Idea가 여러 Pilot을 가질 수 있다.

## 4. 단계

### Pilot Design

- 핵심 가정 선택
- 대상·현장·기간 확정
- 최소 구현과 데이터 수집 방식
- 안전·개인정보·접근성 검토
- 파트너와 책임 분담
- 계약·예산 필요 여부 확인

### Ready Gate

- Pilot Owner 지정
- 참가자·파트너 동의
- 성공·중단 기준
- 리스크와 보호조치
- 필요한 별도 계약 완료

### Execution

- 변경·사고·중단 기록
- 사용자의 안전과 철회권 보장
- 목표와 무관한 데이터 수집 금지

### Result Review

- 실제 결과와 계획 비교
- 성공·실패·혼합 결과 기록
- 부정적 영향과 한계 포함
- 다음 행동 결정

## 5. 결과 판정

### VALIDATED

명시한 핵심 가정이 사전 정의된 기준에 따라 확인됨.

### NOT_VALIDATED

핵심 가정이 기준을 충족하지 못하거나 반대 증거가 확인됨. 실패 결과도 학습 자산으로 보존한다.

### INCONCLUSIVE

별도 enum 대신 `COMPLETED`와 결과 요약에서 표본 부족·운영 실패·데이터 부족을 표시한다. 이후 새 Pilot을 설계할 수 있다.

## 6. 권리와 계약

다음은 별도 계약 없이 진행하지 않는다.

- 아이디어 독점 사용
- 공동개발 결과물 소유권
- 수익배분
- 특허 출원 주체
- 참가자 개인정보의 추가 활용
- 기관 내부 시스템·데이터 접근
- Pilot 비용과 손해 책임

## 7. Sponsor 역할

Sponsor는 다음을 지원할 수 있다.

- Pilot 비용
- 현장·기관 연결
- 성과 확산
- 공개된 또는 동의된 결과 리포트

Sponsor가 자동으로 Idea 또는 Pilot 결과물의 소유권을 갖지 않는다.

## 8. Pilot-ready Gate

필수:

- 문제·대상·핵심 가정이 명확
- 최소 실험 범위
- 성공 기준
- 운영 주체 후보
- 주요 위험·보호조치
- 필요한 파트너와 접근 가능성
- 권리·데이터 조건의 미결정 목록

`PILOT_READY`는 실제 계약 완료 또는 Pilot 시작을 의미하지 않는다.

## 9. Monthly Challenge와 연결

- 한 Monthly Challenge에서 여러 Pilot 후보를 만들 수 있다.
- Pilot은 Challenge 종료 후에도 계속될 수 있다.
- Monthly Report에는 집계 상태와 동의된 사례만 포함한다.
- 연간 리포트는 성공 사례뿐 아니라 미검증·중단 원인도 집계한다.

## 10. Acceptance Criteria

- Idea 상태와 Pilot 상태가 분리된다.
- 성공 기준이 시작 전에 기록된다.
- 별도 계약이 필요한 경계를 명시한다.
- NOT_VALIDATED 결과도 삭제하지 않고 학습으로 남긴다.
- Sponsor가 지원과 소유권을 혼동하지 않는다.
