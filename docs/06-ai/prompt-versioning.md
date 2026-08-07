---
doc_id: WOL-AI-008
title: Prompt Registry and Versioning
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-004
- WOL-RULE-005
affects:
- contracts/prompts/**
- contracts/ai/prompt-registry.yaml
- src/ai/prompts/**
supersedes: null
---

# Prompt Registry and Versioning

## 1. 저장 위치

- canonical prompt source: `contracts/prompts/*.md`
- machine registry: `contracts/ai/prompt-registry.yaml`
- runtime loader: `src/ai/prompts/`

Prompt 본문을 graph node·Route Handler에 하드코딩하지 않는다.

## 2. 버전 형식

```text
wol.problem-framing@1.0.0
wol.evaluation@1.0.0
```

- major: 목적·출력 의미·평가 기준 변경
- minor: 질문 순서·안전 지침 개선
- patch: 오탈자·비의미 변경

## 3. Prompt 구성

1. 역할과 목표
2. 사용자 원문 우선 원칙
3. 허용 입력
4. 금지 추론
5. 출력 schema
6. safety·privacy 규칙
7. 예시와 counterexample
8. stop rule

## 4. Freeze 정책

- 제출된 평가 cycle은 prompt·rubric·model snapshot을 고정한다.
- 평가 중 prompt를 변경하면 신규 evaluation generation을 만든다.
- prompt change는 golden-set regression과 AI Evaluation Report가 필요하다.

## 5. Injection 방어

사용자 content는 data section으로 구분하고 system contract를 수정할 수 없음을 명시한다. 외부 문서의 지시문을 tool instruction으로 실행하지 않는다.
