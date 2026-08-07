---
doc_id: WOL-AI-000
title: AI and LangGraph Documentation Index
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-INDEX-001
- WOL-ARCH-007
- WOL-DATA-010
affects:
- docs/06-ai/**
- contracts/ai/**
- contracts/prompts/**
- contracts/json-schema/**
supersedes: null
---

# AI·LangGraph Documentation Index

## 1. 목적

WELLB OPENLAB의 AI 작성 지원·평가·검수 기능을 LangGraph.js, provider abstraction, structured output, durable checkpoint와 human-in-the-loop 계약으로 고정한다.

## 2. 읽기 순서

1. `ai-system-overview.md`
2. `graph-topology.md`
3. `state-schema.md`
4. `node-contracts.md`
5. `routing-policy.md`
6. `checkpoint-strategy.md`
7. `human-in-the-loop.md`
8. `prompt-versioning.md`
9. `provider-abstraction.md`
10. `model-registry.md`
11. `structured-output.md`
12. `streaming-contract.md`
13. `retry-and-fallback.md`
14. `safety-policy.md`
15. `cost-control.md`
16. `provenance-model.md`
17. `ai-evaluation-framework.md`

## 3. 핵심 불변 조건

- Idea Studio Graph와 Evaluation Graph를 분리한다.
- AI output은 사용자 확인 전 canonical Idea Passport에 적용하지 않는다.
- Evaluation Graph는 immutable Submitted Version만 받는다.
- 모든 run은 graph·prompt·schema·model version을 기록한다.
- structured output 검증 실패는 1회 bounded repair 후 typed fallback으로 전환한다.
- AI 점수는 최종 선정이나 자동 탈락을 수행하지 않는다.
- checkpoint resume은 server authorization을 통과해야 한다.

## 4. 공식 기술 기준

- LangGraph persistence·threads·checkpoint
- LangGraph interrupts와 durable resume
- LangGraph streaming·event streaming
- OpenAI Responses API·Structured Outputs

실제 패키지 버전은 `package.json`과 lockfile이 최종 진실 공급원이다.
