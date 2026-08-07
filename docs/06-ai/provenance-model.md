---
doc_id: WOL-AI-016
title: AI Provenance and Run Trace Model
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-010
- WOL-ADR-010
- WOL-DOM-003
affects:
- src/ai/provenance/**
- contracts/ai/provenance-policy.yaml
supersedes: null
---

# AI Provenance and Run Trace Model

## 1. Content provenance

Idea Passport field마다 다음 source를 기록한다.

```text
user_original
user_edited
ai_suggested
external_source
manager_edited
```

AI suggestion이 사용자가 편집되면 최종 source는 `user_edited`이며 origin link로 suggestion run을 참조한다.

## 2. Run trace

AgentRun은 다음을 기록한다.

- run·thread·graph·node
- prompt·schema·model version
- input field allowlist와 content hash
- output snapshot
- usage·latency·request ID
- validation·safety·error status
- interrupt·resume link

## 3. 저장하지 않는 것

- hidden chain-of-thought
- provider secret
- unrelated full user record
- raw authorization data

## 4. 사용자 표시

Idea Passport는 필드별로 `사용자 작성`, `AI 정리`, `사용자 수정`, `외부 근거`를 이해하기 쉬운 label로 표시한다.

## 5. Audit와 구분

Provenance는 content 생성·변경의 출처를 설명한다. Audit Event는 누가 어떤 시스템 action을 수행했는지 기록한다. 둘은 상호 참조할 수 있지만 대체하지 않는다.
