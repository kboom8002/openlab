---
doc_id: WOL-ROOT-001
title: WELLB OPENLAB Repository Documentation
status: approved
authority: informative
owner: product-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-INDEX-001
affects:
- '**'
supersedes: null
---

# WELLB OPENLAB Repository Documentation

> AI-Augmented Open Innovation Platform

Antigravity 기반 AI-pair coding으로 WELLB OPENLAB을 구현하기 위한 repo-native 문서 세트다.

현재 상태는 **Batch 6 — LangGraph·Prompt Registry·AI Provider·Structured Output·Safety·AI Evaluation**이다.

## 시작 순서

1. `AGENTS.md`
2. `GEMINI.md`
3. `docs/INDEX.md`
4. `docs/00-governance/source-of-truth-map.md`
5. 관련 Product·Domain 문서
6. 관련 Page Spec
7. 관련 Architecture·Data 문서
8. `docs/06-ai/README.md`
9. 관련 `contracts/ai/`, `contracts/prompts/`, `contracts/json-schema/`
10. `/bootstrap-context`
11. `/plan-feature`

## 핵심 제품 결정

- 사용자의 경험이 Idea의 출발점
- AI Suggestion은 사용자 확인 전 미확정
- Submitted Version은 불변
- Reference Score: AI 25%, Pairwise 25%, Expert 50%
- Sponsor는 집계와 동의 Showcase만 기본 접근
- JDC 상태는 공식 협약 전 `proposal`

## 핵심 AI 결정

- Idea Studio·Passport·Preflight·Evaluation Graph 분리
- Postgres durable checkpointer와 격리 schema
- OpenAI Responses adapter primary, cross-provider fallback 기본 비활성
- 중앙 Model·Prompt·Schema Registry
- JSON Schema structured output + repair 1회
- typed event stream, hidden reasoning 비노출
- PII 최소 전송·redaction·human review
- 모든 content field provenance와 AgentRun trace

## 디렉터리

```text
AGENTS.md
GEMINI.md
.agents/                    Antigravity Rules·Workflows·Artifacts
docs/00-governance/         진실 공급원·결정·문서정책
docs/01-product/            제품 비전·범위·지표
docs/02-domain/             상태·Passport·평가·권리
docs/03-ux/                 IA·라우트·컴포넌트·Page Spec
docs/04-architecture/       런타임·요청·AI·Job·의존 경계
docs/05-data/               ERD·Auth·RLS·Storage·Audit
docs/06-ai/                 Graph·Prompt·Provider·Schema·Safety·Eval
docs/adr/                   기술 결정 기록
contracts/domain/           machine-readable domain values
contracts/ux/               route·breakpoint·component·copy
contracts/architecture/     runtime·request·error·dependency·job
contracts/data/             table·RLS·Storage·migration
contracts/ai/               graph·node·model·stream·safety·eval
contracts/prompts/          versioned prompt source
contracts/json-schema/      structured output schema
```

## 현재 QA

- Batch 6 보고서: `docs/00-governance/batch-6-ai-langgraph-report.md`
- QA 결과: `QA_REPORT.txt`
