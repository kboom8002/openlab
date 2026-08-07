---
doc_id: WOL-AI-007
title: Human-in-the-Loop and Interrupt Contract
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-006
- WOL-DOM-003
- WOL-DOM-005
affects:
- src/ai/interrupts/**
- contracts/ai/interrupt-contract.yaml
supersedes: null
---

# Human-in-the-Loop and Interrupt Contract

## 1. Interrupt 유형

| Type | 발생 조건 | 허용 결정 |
|---|---|---|
| suggestion_review | Passport update 후보 | accept·edit·reject |
| inferred_fact_confirmation | AI inference | confirm·correct·reject |
| safety_review | 민감·위험 가능성 | revise·submit_for_review·cancel |
| evaluation_insufficient | 핵심 정보 부족 | human_review·request_revision |
| provider_fallback | primary provider 실패 | retry·direct_entry |

## 2. Payload

Interrupt payload는 JSON serializable이며 secret·raw provider response를 포함하지 않는다.

```ts
type InterruptPayload = {
  interruptId: string
  runId: string
  type: InterruptType
  summary: string
  proposedChange?: FieldPatch[]
  allowedDecisions: string[]
  expiresAt?: string
  nonce: string
}
```

## 3. 사용자 결정

- accept: AI 제안 그대로 적용
- edit: 사용자 수정문을 적용하고 source를 `user_edited`로 기록
- reject: canonical content 변경 없음
- decision에는 actor·timestamp·before·after·reason을 기록

## 4. UX 원칙

AI 제안은 확정 문서처럼 보이지 않아야 한다. 사용자는 원문 비교·정리 이유·거절을 선택할 수 있다.

## 5. 재개 안전성

같은 `interruptId + nonce`는 한 번만 소비한다. resume 이후 side effect는 idempotent key를 사용한다.
