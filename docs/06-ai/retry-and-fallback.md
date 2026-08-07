---
doc_id: WOL-AI-013
title: AI Retry, Timeout and Fallback Policy
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-009
- WOL-AI-011
- WOL-ARCH-010
affects:
- src/ai/resilience/**
- contracts/ai/retry-policy.yaml
supersedes: null
---

# AI Retry, Timeout and Fallback Policy

## 1. 오류 분류

| Class | 예 | 처리 |
|---|---|---|
| input | schema·size·status | retry 없음 |
| auth | key·project | retry 없음, alert |
| rate_limit | 429 | bounded backoff |
| transient | 5xx·network | bounded retry |
| timeout | provider timeout | retry 1회 또는 direct entry |
| schema | invalid structured output | repair 1회 |
| refusal | safety refusal | 안내·human review |
| checkpoint | saver failure | canonical 적용 금지 |

## 2. Retry budget

하나의 사용자 action에서 provider call 총 횟수를 제한한다. 자동 retry와 schema repair를 합쳐 기본 2회 이내로 한다.

## 3. Idempotency

`run_id + node_key + attempt_class`로 idempotency를 관리한다. 사용자가 다시 누른 요청이 이미 완료되었으면 기존 결과를 반환한다.

## 4. Fallback

- primary model → 같은 provider의 approved lower-cost/alternate model은 registry policy가 허용할 때만
- cross-provider fallback은 기본 비활성
- 최종 fallback은 사용자 직접 작성·운영자 검토

## 5. 사용자 메시지

기술 오류 코드 대신 작성 내용이 보존되었는지, 다시 시도 가능한지, 직접 작성할 수 있는지를 설명한다.
