---
doc_id: WOL-DATA-009
title: Data Retention, Deletion and Anonymization Policy
status: review
authority: policy-proposal
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DOM-008
- WOL-DATA-002
affects:
- contracts/data/retention-policy.yaml
- supabase/migrations/**
- docs/08-security/**
supersedes: null
---

# Data Retention, Deletion and Anonymization Policy

## 1. 상태

이 문서는 제품·기술 기본값을 제시하는 **법률 검토 전 제안 정책**이다. 실제 보존기간은 개인정보처리방침, Sponsor 협약, 공공기관 기록 의무와 사용자 동의를 검토해 확정한다.

## 2. 원칙

- 목적에 필요한 최소 기간만 보존한다.
- account deletion과 Idea withdrawal은 서로 다른 workflow다.
- audit·consent·분쟁 대응 기록은 일반 콘텐츠보다 별도 기준을 적용한다.
- 삭제 요청 시 active system, Storage, export, backup의 범위를 구분한다.
- Sponsor report에는 가능한 한 집계·비식별 데이터를 사용한다.

## 3. 제안 기본값

| 데이터 | 제안 보존 |
|---|---|
| 미제출 Draft | 마지막 활동 후 12개월, 사전 알림 후 삭제 |
| 제출 Idea | Challenge 종료 후 3년 또는 사용자 요청·계약에 따름 |
| AI conversation raw text | 마지막 활동 후 12개월, Passport/provenance와 분리 |
| Agent raw payload | 90일, 이후 최소 metadata만 유지 |
| Evaluation | Challenge 종료 후 3년 |
| Consent acceptance | 동의 효력 종료 후 5년 제안 |
| Audit event | 3년 제안 |
| Export file | 7일 |
| Sponsor report snapshot | 협약 종료 후 3년 제안 |
| Pilot evidence | Pilot 종료 후 3년 또는 별도 계약 |

## 4. Account deletion

1. 본인 확인.
2. 진행 중 평가·분쟁·법적 보존 여부 확인.
3. profile 비활성화와 신규 처리 차단.
4. 개인 식별자 삭제 또는 pseudonymization.
5. 소유 Idea의 삭제·익명화·유지 선택 처리.
6. Storage object cleanup.
7. 완료 audit와 사용자 통지.

## 5. Idea deletion and withdrawal

- `WITHDRAWN`은 평가·공개 중단 상태이며 즉시 hard delete와 동일하지 않다.
- public Idea는 cache·search index·report에서 제거 queue를 생성한다.
- 이미 별도 계약으로 진행 중인 Pilot은 계약 조건을 우선한다.
- Submitted Version의 historical integrity가 필요한 경우 사용자 ID를 pseudonymize하고 콘텐츠 삭제 범위를 검토한다.

## 6. Backup

- backup에서 개별 row를 즉시 제거하기 어렵다는 점을 개인정보처리방침에 설명한다.
- backup은 제한된 복구 목적에만 사용한다.
- 복구 후 deletion tombstone 또는 purge queue를 재적용한다.

## 7. Acceptance Criteria

- 구현 전 법률·정책 owner 승인 필요.
- 자동 purge는 dry-run·report·approval 절차를 가진다.
- Sponsor report가 삭제된 사용자를 재식별하지 않는다.
