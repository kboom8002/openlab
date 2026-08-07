---
doc_id: WOL-GOV-014
title: Batch 6 AI and LangGraph Report
status: approved
authority: informative
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-000
- WOL-GOV-013
affects:
- docs/06-ai/**
- contracts/ai/**
- contracts/prompts/**
- contracts/json-schema/**
supersedes: null
---

# Batch 6 — AI·LangGraph Completion Report

## 1. 범위

Batch 0~5를 계승해 LangGraph topology, state, node, routing, durable checkpoint, human interrupt, prompt registry, provider abstraction, model registry, structured output, streaming, retry, safety, cost, provenance와 AI evaluation framework를 canonical 문서로 확정했다.

## 2. 생성 산출물

- AI Core 문서 18개
- Prompt source 8개
- AI machine-readable contract 16개
- JSON Schema 5개
- Batch manifest 1개

## 3. 주요 결정

- Production durable saver는 Postgres와 격리 checkpoint schema
- Idea Studio·Passport·Preflight·Evaluation graph 분리
- OpenAI Responses adapter primary
- Cross-provider fallback 기본 비활성
- Model·Prompt·Schema registry 중앙화
- Structured output validation + repair 1회
- Human interrupt accept·edit·reject 후 canonical 적용
- Provider 전송은 최소 field allowlist와 PII redaction
- hidden chain-of-thought 저장·stream 금지
- AI 변경은 regression evaluation report 필요

## 4. Open 상태

- 실제 LangGraph Postgres saver package·migration compatibility spike
- 법률 검토를 반영한 checkpoint·AI log retention 기간
- production model ID·quota·budget threshold
- Batch 10 golden set와 수치 release gate

## 5. 공식 기술 근거

- LangGraph persistence는 thread별 checkpoint를 저장해 human-in-the-loop, memory, time travel과 fault tolerance를 지원한다.
- LangGraph interrupt는 durable state에서 실행을 일시 중지하고 외부 입력 후 resume할 수 있다.
- LangGraph streaming은 state update, message token과 custom event를 제공한다.
- OpenAI Structured Outputs는 developer-supplied JSON Schema에 맞춘 출력을 지원하며, schema 준수가 내용의 사실성까지 보장하는 것은 아니다.

## 6. 다음 Batch

Batch 7 — Server Actions, Route Handlers, Streaming Endpoint, Authorization, Idempotency and Error Contract.
