---
doc_id: WOL-AI-002
title: LangGraph Topology
status: approved
authority: canonical
owner: ai-engineering
last_verified: '2026-07-31'
depends_on:
- WOL-AI-001
- WOL-DOM-004
- WOL-PAGE-006
affects:
- src/ai/graphs/**
- contracts/ai/graph-registry.yaml
supersedes: null
---

# LangGraph Topology

## 1. 그래프 목록

### IdeaStudioGraph

```text
START
  → load_context
  → safety_input_check
  → stage_router
     ├─ starting_point → intake
     ├─ problem → problem_framing
     ├─ people → people_context
     ├─ solution → solution_coach
     ├─ feasibility → feasibility_review
     ├─ impact → impact_review
     └─ experiment → experiment_design
  → schema_validate
  → pending_suggestion_interrupt
  → persist_run
  → END
```

### PassportSynthesisGraph

```text
START → load_confirmed_fields → detect_gaps → synthesize_sections
      → validate_claim_types → schema_validate → persist_version_candidate → END
```

### PreflightGraph

```text
START → completeness → logic_consistency → claims_and_evidence
      → privacy_and_rights → safety_review → readiness_summary → END
```

### EvaluationGraph

```text
START → submitted_version_guard → anonymized_input_builder
      → rubric_scoring → evidence_sufficiency → confidence_calibration
      → bias_and_safety_guard → human_review_gate → persist_reference_evaluation → END
```

## 2. 그래프 분리 이유

- 작성 지원과 평가의 목적·입력·권한·prompt를 분리한다.
- 평가가 작성 대화의 문체와 사용자의 배경에 영향받지 않도록 한다.
- submitted version과 draft checkpoint를 혼동하지 않는다.

## 3. Subgraph 원칙

공통 node는 helper function이 아니라 독립적으로 checkpoint·test할 가치가 있을 때만 subgraph로 승격한다. 초기 MVP에서는 safety input check와 structured output validation을 middleware/service로 유지한다.

## 4. Side effect 원칙

- node 내부 외부 side effect는 idempotent key를 가져야 한다.
- interrupt 이전에 실행되는 side effect는 재실행 가능해야 한다.
- canonical mutation은 graph completion과 분리한다.

## 5. Graph version

`idea-studio@1`, `preflight@1`, `evaluation@1`처럼 major graph contract를 versioning한다. node 순서·state 필드·interrupt semantics 변경은 major 또는 minor version을 올리고 regression eval을 실행한다.
