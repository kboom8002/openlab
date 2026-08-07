---
doc_id: WOL-AI-006
title: LangGraph Checkpoint Strategy
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-002
- WOL-AI-003
- WOL-ADR-006
- WOL-DATA-009
affects:
- src/ai/checkpoints/**
- contracts/ai/checkpoint-policy.yaml
- supabase/**
supersedes: null
---

# LangGraph Checkpoint Strategy

## 1. 결정

Production은 durable PostgreSQL checkpointer를 사용한다. MVP spike에서 LangGraph JS의 공식 Postgres saver 호환성을 검증하고, application tables와 분리된 `langgraph_checkpoint` schema를 사용한다.

## 2. Thread identity

```text
studio:{environment}:{idea_id}:{actor_id}:{graph_generation}
eval:{environment}:{idea_version_id}:{evaluation_run_id}
```

원문 thread ID를 URL·analytics·client storage에 노출하지 않는다. Client에는 opaque run token만 전달한다.

## 3. Checkpoint 시점

- graph input 수신 후
- 각 node super-step 후
- human interrupt 직전
- human resume 직후
- 최종 output validation 후

## 4. Authorization

Resume 요청은 다음을 모두 확인한다.

- authenticated actor
- idea ownership 또는 evaluation assignment
- run status가 resumable
- interrupt nonce 일치
- 이미 소비된 resume command가 아님

## 5. Retention

- Draft checkpoint: active 기간 + policy window
- Submitted evaluation checkpoint: 평가 이의제기 window까지
- checkpoint 삭제는 Idea content 삭제와 별도 처리
- legal retention 결정 전 구체 기간은 configuration으로 둔다.

## 6. Failure

- saver unavailable이면 canonical suggestion 적용 금지
- duplicate resume는 idempotent result 반환
- incompatible graph version이면 manual recovery queue
- checkpoint corruption은 original messages·passport snapshot으로 재구성하지 않고 human review로 전환

## 7. D-T03 해결

D-T03의 기본 결정을 `Postgres durable saver + isolated schema + retention configuration`으로 확정한다. 실제 package와 migration은 Vertical Slice spike에서 검증한다.
