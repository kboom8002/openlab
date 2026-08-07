---
doc_id: WOL-API-001
title: API and Server Contract
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-ARCH-004, WOL-DOM-001, WOL-DATA-004, WOL-AI-001]
affects: [src/app/**, src/server/**, contracts/api/**]
supersedes: null
---

# API and Server Contract

## 경계

- Server Action: 인증된 제품 UI의 일반 mutation. 입력 재검증, RLS 적용, audit 기록 후 typed result를 반환한다.
- Route Handler: AI streaming, webhook, export/download, health endpoint처럼 HTTP 계약이 필요한 경우만 사용한다.
- Background job: 오래 걸리거나 재시도가 필요한 작업. DB에 먼저 job을 기록한 뒤 별도 runner가 claim한다.
- Browser는 service-role key, provider key, raw SQL, 내부 stack trace를 받지 않는다.

## 공통 불변조건

1. 인증과 권한은 서로 다른 검사다. 객체 비공개 여부를 숨길 때는 `ACCESS_OBJECT_NOT_FOUND`를 사용한다.
2. 모든 mutation은 canonical enum과 상태전이 함수를 사용한다.
3. Submitted Version과 제출된 Evaluation은 update하지 않는다.
4. Sponsor API는 dedicated read model만 조회한다.
5. AI 적용은 interrupt decision과 provenance 없이는 canonical Passport를 변경하지 않는다.
6. 오류 envelope, request ID, idempotency 규칙은 machine contract가 기준이다.

## P1 결정의 처리

Job runner 제품은 아직 확정하지 않는다. Batch 7은 `JobDispatcher` port와 persisted job 계약만 승인하며 구체 공급자는 `pending_decision`이다.

