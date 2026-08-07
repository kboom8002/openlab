---
doc_id: WOL-API-003
title: Route Handler Catalog
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-API-001, WOL-AI-014]
affects: [src/app/api/**]
supersedes: null
---

# Route Handler Catalog

| Endpoint ID | Method·path | Auth | 용도 |
|---|---|---|---|
| API-AI-001 | POST `/api/ai/idea-stream` | idea_owner | SSE graph stream 시작·재연결 |
| API-AI-002 | POST `/api/ai/runs/[runId]/resume` | run owner | human interrupt 결정 재개 |
| API-FILE-001 | POST `/api/uploads/sign` | authenticated | 허용 bucket·MIME·size 검증 후 upload token |
| API-EXPORT-001 | POST `/api/exports` | object reader | 비동기 export job 생성 |
| API-EXPORT-002 | GET `/api/exports/[jobId]` | job owner | 상태·만료 download URL |
| API-HOOK-001 | POST `/api/webhooks/[provider]` | signed callback | allowlist provider callback |
| API-OPS-001 | GET `/api/health/live` | none | process liveness; dependency 비노출 |
| API-OPS-002 | GET `/api/health/ready` | protected monitor | dependency readiness |

SSE event 이름은 `contracts/ai/streaming-events.yaml`만 사용한다. webhook은 raw body 서명, timestamp tolerance, replay key를 검증한 후 처리한다. health endpoint는 비밀·버전·테이블 정보를 반환하지 않는다.

