---
doc_id: WOL-AI-009
title: AI Provider Abstraction
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-ADR-005
- WOL-AI-011
affects:
- src/ai/providers/**
- contracts/ai/provider-registry.yaml
supersedes: null
---

# AI Provider Abstraction

## 1. 결정

MVP primary provider는 OpenAI Responses API adapter로 시작한다. application code는 provider-neutral interface만 사용하며, fallback provider는 production activation 전 별도 privacy·schema·eval 검증을 거친다.

## 2. Interface

```ts
type AIProvider = {
  generateStructured<T>(request: StructuredRequest<T>): Promise<ProviderResult<T>>
  streamStructured<T>(request: StructuredRequest<T>): AsyncIterable<ProviderEvent<T>>
  moderate?(request: ModerationRequest): Promise<ModerationResult>
  health(): Promise<ProviderHealth>
}
```

## 3. ProviderResult

- normalized status
- parsed output
- refusal
- finish reason
- usage tokens
- latency
- provider request ID
- model snapshot
- cache metadata
- error classification

## 4. 금지

- UI·Route Handler에서 OpenAI SDK 직접 import
- provider raw exception을 사용자에게 노출
- browser에서 API key 사용
- provider state storage를 제품 memory로 간주
- fallback 시 데이터 전송 범위를 자동 확대

## 5. D-T05 해결

- primary: OpenAI provider adapter
- fallback: `disabled` 기본값
- test: deterministic fixture provider

Fallback activation은 운영 승인과 regression eval을 요구한다.
