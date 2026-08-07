---
doc_id: WOL-AI-005
title: Graph and Node Routing Policy
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-002
- WOL-AI-004
affects:
- src/ai/router/**
- contracts/ai/routing-policy.yaml
supersedes: null
---

# Graph and Node Routing Policy

## 1. Router 입력

- requested operation
- current route와 user role
- Idea status와 current stage
- missing field summary
- active interrupt
- graph version

## 2. Graph 선택

| 요청 | Graph |
|---|---|
| Studio message | IdeaStudioGraph |
| Passport 생성 | PassportSynthesisGraph |
| 제출 전 검수 | PreflightGraph |
| AI reference evaluation | EvaluationGraph |

## 3. Stage router 우선순위

1. active interrupt가 있으면 resume path
2. safety hold이면 human review path
3. 사용자가 명시한 현재 stage
4. 가장 중요한 missing field
5. 다음 sequential stage

## 4. 반복 질문 방지

- confirmed field를 다시 질문하지 않는다.
- 같은 질문 signature를 3회 이내 재사용하지 않는다.
- 사용자가 답변을 거절하면 skip reason을 기록하고 대안을 제시한다.

## 5. Unauthorized route

- Draft owner가 아니면 Studio graph 실행 금지
- evaluator assignment가 없으면 evaluation detail 실행 금지
- Sponsor role은 AI conversation route를 호출할 수 없음
- Submitted Version 평가가 아니면 EvaluationGraph 실행 금지
