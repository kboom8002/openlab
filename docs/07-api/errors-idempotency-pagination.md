---
doc_id: WOL-API-004
title: Errors Idempotency and Pagination
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-ARCH-009, WOL-API-001]
affects: [contracts/api/**]
supersedes: null
---

# Errors, Idempotency and Pagination

- 모든 응답은 `request_id`를 포함한다. 오류는 stable code, safe message, retryable만 기본 노출한다.
- create/submit/resume/export/webhook은 `Idempotency-Key` 또는 동등한 durable key가 필수다.
- 같은 actor·operation·key·request hash는 기존 결과를 반환한다. 다른 hash 재사용은 `CONFLICT_DUPLICATE_REQUEST`다.
- 목록은 opaque cursor와 고정 정렬키 `(created_at,id)`를 쓴다. 기본 20, 최대 100이다.
- Retry-After는 rate limit 또는 일시 장애에서만 반환한다.
- 로그에는 request id와 error code를 남기되 입력 본문, AI raw payload, access token은 남기지 않는다.

