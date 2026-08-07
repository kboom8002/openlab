---
doc_id: WOL-ARCH-008
title: Event and Background Job Model
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-002
- WOL-ARCH-006
affects:
- src/lib/jobs/**
- src/server/services/**
- contracts/architecture/background-job-types.yaml
supersedes: null
---


# Event and Background Job Model

## 1. 목적

장기 작업, 재시도와 후속 처리로부터 사용자 request를 분리하고, 중복 실행에도 안전한 작업 계약을 정의한다.

## 2. Domain event와 Job 구분

- **Domain event:** 이미 발생한 사실. 예: `idea.submitted`.
- **Job:** 수행해야 할 명령. 예: `evaluation.ai.requested`.

Event 이름으로 mutation을 요청하거나 Job 이름을 사실처럼 사용하지 않는다.

## 3. 초기 Event

- `challenge.published`
- `idea.created`
- `idea.submitted`
- `idea.visibility_changed`
- `evaluation.assigned`
- `evaluation.completed`
- `selection.decision_recorded`
- `pilot.started`
- `pilot.completed`
- `sponsor.showcase_approved`

## 4. 초기 Job

- `ai.coach.run` — short path, 동기 우선
- `ai.evaluation.run` — async required
- `report.monthly.generate`
- `export.idea.generate`
- `notification.dispatch`
- `storage.attachment.scan`

## 5. Job record 최소 필드

```text
job_id
job_type
object_type
object_id
requested_by
capability
payload_version
idempotency_key
status
attempt_count
available_at
locked_at
last_error_code
created_at
completed_at
```

Payload에는 비밀과 전체 Idea snapshot을 넣지 않는다. 실행 시 object를 다시 조회하고 권한·상태를 검증한다.

## 6. 상태

`queued → running → succeeded | retryable_failed | terminal_failed | cancelled`

## 7. Retry

- exponential backoff + jitter
- provider rate limit은 retryable
- authorization·invalid state는 terminal
- max attempt 이후 dead-letter review
- side effect는 idempotency key로 중복 차단

## 8. Transactional enqueue

`idea.submitted` 저장과 evaluation job enqueue가 분리되어 유실되지 않도록 outbox 또는 같은 transaction 기반 enqueue를 Batch 5·7에서 확정한다.

## 9. Long task UX

UI는 `processing` 상태와 status endpoint를 사용한다. “잠시만 기다리세요”로 request를 무기한 유지하지 않는다.

## 10. Open implementation decision

Job runner와 queue provider는 아직 고정하지 않는다. 단, adapter·job table·idempotency·dead-letter 계약은 구현 전에 유지한다.

## 11. Acceptance Criteria

- async-required job이 HTTP timeout에 의존하지 않는다.
- job payload가 최소 ID 중심이다.
- retry와 terminal failure가 구분된다.
- event·job 이름이 machine-readable contract와 일치한다.
