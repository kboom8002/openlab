---
doc_id: WOL-AI-011
title: Structured Output Contract
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-004
- WOL-AI-009
- WOL-DOM-003
affects:
- contracts/json-schema/**
- src/ai/schemas/**
- contracts/ai/schema-registry.yaml
supersedes: null
---

# Structured Output Contract

## 1. 원칙

AI 결과는 자유 텍스트를 regex로 파싱하지 않는다. Zod를 source schema로 사용하고 JSON Schema를 생성하거나 동기화한다.

## 2. 핵심 Schema

- `agent-response.schema.json`
- `passport-suggestion.schema.json`
- `preflight-output.schema.json`
- `evaluation-output.schema.json`
- `interrupt-payload.schema.json`

## 3. Validation pipeline

```text
Provider structured response
  → JSON parse
  → schema validation
  → semantic validation
  → provenance enrichment
  → persistence
```

Semantic validation은 다음을 포함한다.

- score 범위와 합계
- target field allowlist
- confirmed·inferred source 구분
- evidence path 존재
- user-visible text 길이
- unsupported enum 차단

## 4. Repair

Schema validation 실패 시 validation issue만 포함한 repair 요청을 1회 수행한다. 두 번째 실패는 `AI_SCHEMA_INVALID`로 종료하고 사용자 직접 입력 또는 human review를 제공한다.

## 5. Refusal

Provider refusal은 schema failure가 아니다. `refusal` status와 안전 안내를 typed result로 반환한다.
