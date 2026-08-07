---
doc_id: WOL-AI-012
title: AI Streaming Contract
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-001
- WOL-AI-002
- WOL-ARCH-006
affects:
- src/app/api/ai/**
- src/ai/streaming/**
- contracts/ai/streaming-events.yaml
supersedes: null
---

# AI Streaming Contract

## 1. Transport

Next.js Route Handler가 server-sent event 또는 Web Streams compatible response를 제공한다. Client는 provider event를 직접 받지 않고 OpenLab event envelope만 소비한다.

## 2. Event 유형

```text
run.started
node.started
assistant.delta
suggestion.preview
node.completed
interrupt.requested
run.completed
run.failed
heartbeat
```

## 3. Event envelope

```ts
type OpenLabAIEvent = {
  eventId: string
  runId: string
  sequence: number
  type: AIEventType
  timestamp: string
  nodeKey?: string
  payload: unknown
}
```

## 4. 재연결

- sequence 번호로 duplicate를 제거한다.
- stream disconnect 후 run status를 조회한다.
- completed run은 최종 typed output을 재조회한다.
- client가 재연결했다고 provider call을 새로 만들지 않는다.

## 5. 표시 원칙

- token delta는 대화 설명에만 사용한다.
- canonical suggestion은 schema validation 이후 한 번에 표시한다.
- hidden reasoning 또는 chain-of-thought를 streaming하지 않는다.
- 진행 상태는 사용자에게 이해 가능한 node label로 변환한다.
