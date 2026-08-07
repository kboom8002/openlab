---
doc_id: WOL-DOM-003
title: Idea Passport Contract
status: approved
authority: canonical
owner: product-ai
last_verified: 2026-07-31
depends_on:
  - WOL-DOM-001
  - WOL-PROD-001
affects:
  - docs/03-ux/**
  - docs/05-data/**
  - docs/06-ai/**
  - contracts/domain/idea-passport.contract.yaml
supersedes: null
---

# Idea Passport Contract

## 1. 목적

모든 Idea가 동일한 구조로 작성·검토·평가·실증될 수 있도록 표준 데이터와 사용자 확인 규칙을 정의한다.

## 2. 핵심 원칙

- Passport는 AI가 자동 완성하는 문서가 아니라 사용자와 AI의 공동 작업 결과다.
- 사용자 확인 전 AI Suggestion은 Passport의 확정값이 아니다.
- 사실·경험·가정·기대효과를 구분한다.
- 필드별 provenance를 기록한다.
- Draft는 수정 가능하지만 Submitted Version은 불변이다.

## 3. 최상위 구조

```yaml
idea_passport:
  identity: {}
  challenge: {}
  problem: {}
  people_context: {}
  solution: {}
  feasibility: {}
  impact: {}
  experiment: {}
  evidence: []
  provenance: []
  rights: {}
  completeness: {}
```

## 4. Identity

필수:

- `title`
- `one_line_summary`
- `track`
- `category`

선택:

- `keywords`
- `cover_visual`

제목의 화려함은 평가 항목이 아니다.

## 5. Problem

필수:

- `target_user`
- `context`
- `observed_problem`
- `current_alternative`
- `consequence`

권장:

- `probable_causes`
- `frequency_or_scale`
- `problem_statement`

Problem Statement 표준:

> `[대상]은 [상황]에서 [원인 또는 조건] 때문에 [문제]를 겪으며, 그 결과 [영향]이 발생한다.`

## 6. People and Context

필수:

- `primary_users`
- `affected_stakeholders`
- `operating_context`

권장:

- `payers_or_decision_makers`
- `required_partners`
- `accessibility_conditions`
- `possible_excluded_groups`

## 7. Solution

필수:

- `core_solution`
- `user_flow`
- `expected_value`

권장:

- `differentiator`
- `alternative_options_considered`
- `out_of_scope`
- `operating_owner`

AI가 제안한 대안은 최대 3개로 제한하고, 사용자가 선택하거나 조합한 결과만 core solution에 반영한다.

## 8. Feasibility

필수:

- `required_people`
- `required_resources`
- `cost_range`
- `critical_constraints`
- `critical_risks`
- `unknowns`

선택:

- `technology`
- `data_requirements`
- `legal_or_policy_conditions`
- `dependencies`

비용은 MVP에서 범주형으로 관리한다.

```text
under_1m_krw
1m_to_10m_krw
10m_to_50m_krw
over_50m_krw
unknown
```

## 9. Impact

- `direct_beneficiaries`
- `expected_changes`
- `business_value`
- `social_value`
- `accessibility_considerations`
- `possible_negative_effects`
- `measurable_indicators`

각 기대 변화에는 Claim Type과 검증 상태를 연결한다.

## 10. Experiment

필수:

- `key_assumption`
- `target_participants`
- `minimum_prototype`
- `test_method`
- `success_criteria`
- `duration`
- `required_partner`
- `risk_and_safeguard`

기본 설계 기간은 30일 이내를 권장하지만 Challenge 특성에 따라 조정할 수 있다.

## 11. Evidence

Evidence 항목:

- `id`
- `type`: experience, observation, interview, public_source, internal_data, prototype_test
- `summary`
- `source_reference`
- `collected_at`
- `verification_status`
- `sensitivity`

외부 출처를 붙였다는 이유만으로 사실 여부가 자동 확정되지 않는다.

## 12. Provenance

필드별 최소 기록:

- `field_path`
- `source_type`
- `source_reference`
- `agent_run_id` — 해당 시
- `confirmed_by_user`
- `created_at`

사용자가 AI 제안을 수정하면 `user_edited`로 새 기록을 만들고 원래 AI Suggestion과 연결한다.

## 13. Rights

- `visibility`
- `author_ownership_acknowledged`
- `evaluation_consent_version`
- `ai_processing_consent_version`
- `showcase_consent`
- `pilot_contact_consent`
- `research_analytics_consent`

선택 동의는 필수 동의와 분리한다.

## 14. Completeness

Passport 완성도는 필수 필드 충족과 사용자 확인 상태로 계산한다. AI가 긴 문장을 생성했다고 완성도가 높아지지 않는다.

단계별 권장:

- Starting Point
- Problem
- People
- Solution
- Feasibility
- Impact
- Experiment

## 15. Versioning

- Draft 저장은 현재 Working Version을 갱신한다.
- 주요 단계 완료 시 snapshot을 만들 수 있다.
- 제출 시 새로운 immutable Submitted Version을 생성한다.
- 평가와 결과는 Submitted Version ID를 참조한다.
- 재제출은 새 Version이며 이전 버전을 덮어쓰지 않는다.

## 16. Acceptance Criteria

- 필수 필드와 선택 필드가 구분된다.
- 모든 AI 제안은 사용자 확인 상태를 가진다.
- Claim Type·Evidence·Provenance가 연결된다.
- 평가와 Pilot가 동일 Submitted Version을 참조한다.
- 권리·visibility·동의가 Passport와 버전으로 추적된다.
