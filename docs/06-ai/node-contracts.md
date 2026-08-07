---
doc_id: WOL-AI-004
title: AI Node Contracts
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-002
- WOL-AI-003
- WOL-DOM-003
affects:
- src/ai/nodes/**
- contracts/ai/node-registry.yaml
- contracts/json-schema/**
supersedes: null
---

# AI Node Contracts

## 1. 공통 Node 계약

모든 node는 다음 interface를 따른다.

```ts
type NodeContract<I, O> = {
  nodeKey: string
  version: string
  inputSchema: ZodSchema<I>
  outputSchema: ZodSchema<O>
  allowedPassportFields: string[]
  promptKey?: string
  modelProfile: string
  timeoutMs: number
  retryClass: 'none' | 'schema_once' | 'transient'
  safetyProfile: string
}
```

## 2. 작성 지원 Node

| Node | 입력 | 출력 | 핵심 금지 |
|---|---|---|---|
| intake | 사용자 최초 설명 | topic·type·next question | 해결책 임의 확정 |
| problem_framing | 관찰·상황·대상 | problem frame·누락 질문 | 통계 생성 |
| people_context | 사용자·이해관계자 | user card·stakeholder map | 민감특성 추정 |
| solution_coach | confirmed problem | 최대 3개 대안·trade-off | 무제한 브레인스토밍 |
| feasibility_review | 선택 해결안 | 자원·제약·unknown | 법률 적합성 단정 |
| impact_review | 해결안·대상 | 기대효과·부작용·지표 | 기대를 fact로 변환 |
| experiment_design | 핵심 가정 | 30일 test card | 성공 보장 |
| passport_synthesis | confirmed fields | passport candidate | inferred field 무표시 |
| preflight | submitted candidate | readiness·issues | 제출 강제 차단 |

## 3. Evaluation Node

`rubric_scoring`은 rubric criterion별 score, rationale, evidence path, insufficiency flag를 반환한다. author profile·writing polish·sponsor preference는 입력에서 제거한다.

## 4. Node 완료 조건

- output schema 통과
- required provenance 생성
- usage 기록
- refusal·safety flag 처리
- timeout 또는 provider error 정규화
