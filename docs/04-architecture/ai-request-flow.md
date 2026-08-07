---
doc_id: WOL-ARCH-007
title: AI Request and LangGraph Flow
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-002
- WOL-DOM-003
- WOL-PAGE-006
affects:
- src/ai/**
- src/app/api/ai/**
- contracts/architecture/request-handling.yaml
supersedes: null
---


# AI Request and LangGraph Flow

## 1. 목적

Idea Studio와 Evaluation의 AI 호출이 사용자 권리, structured output, checkpoint와 human-in-the-loop 원칙을 보존하도록 실행 흐름을 정의한다.

## 2. Idea Studio flow

```text
Client message
  ↓
AI Route Handler
  ↓ auth · ownership · rate limit · input schema
PII/secret redaction boundary
  ↓
IdeaStudioGraph(thread_id)
  ↓
Stage router → Domain node → Provider adapter
  ↓
Structured output validation
  ↓
Provenance + AgentRun + checkpoint
  ↓
Pending AI Suggestion stream
  ↓
User accept / edit / reject
  ↓
Server Action updates canonical Passport
```

AI node가 직접 Passport canonical row를 update하지 않는다.

## 3. Evaluation flow

- Submitted Version ID가 고정되어야 한다.
- 작성 지원 transcript 전체를 기본 입력으로 보내지 않는다.
- 평가에 필요한 Passport snapshot과 허용 evidence만 사용한다.
- 결과는 reference score·rationale·confidence·flags로 저장한다.
- AI 결과는 최종 selection transition을 자동 수행하지 않는다.

## 4. Thread identity

- Idea Studio thread는 `idea_id + participant scope + graph generation`에 연결한다.
- thread ID는 URL이나 analytics에 원문 그대로 노출하지 않는다.
- 다른 사용자가 thread ID를 알아도 resume할 수 없어야 한다.
- checkpoint와 Idea Version은 같은 개념이 아니다.

## 5. Interrupt

사용자 확인이 필요한 제안은 LangGraph interrupt 또는 application-level pending suggestion으로 중단할 수 있다. 어느 방식을 사용하든 다음이 보장되어야 한다.

- JSON-serializable payload
- durable checkpoint
- resume authorization
- 중복 resume 차단
- accept·edit·reject provenance

구체 saver와 interrupt implementation은 Batch 6에서 확정한다.

## 6. Provider boundary

`AIProvider` interface가 model key, structured schema, timeout, usage와 provider error를 표준화한다. UI·graph node가 provider SDK를 직접 import하지 않는다.

## 7. Data minimization

전송 전 다음을 제거하거나 일반화한다.

- 이메일·전화·상세 주소
- unrelated profile field
- 다른 사용자의 content
- Sponsor-only·manager-only data
- storage secret URL

최종 field allowlist는 Batch 6·9에서 확정한다.

## 8. Failure behavior

- provider timeout: Draft 유지, retry 안내
- schema failure: repair 1회 후 direct edit
- checkpoint failure: suggestion을 canonical 적용하지 않음
- stream disconnect: run status를 조회해 안전하게 resume
- safety flag: human review 또는 input revision

## 9. Acceptance Criteria

- user confirmation 없이 AI output이 Passport에 확정되지 않는다.
- Evaluation Graph가 Draft를 받지 않는다.
- 모든 run이 prompt version과 model key를 가진다.
- provider SDK가 route·component에 직접 노출되지 않는다.
