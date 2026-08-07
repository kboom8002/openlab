---
doc_id: WOL-DATA-003
title: Relationship, Constraint and Immutability Rules
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-001
- WOL-DATA-002
- WOL-DOM-004
affects:
- contracts/data/relationships.yaml
- supabase/migrations/**
- supabase/tests/**
supersedes: null
---

# Relationship, Constraint and Immutability Rules

## 1. 삭제 규칙

| 관계 | 기본 규칙 |
|---|---|
| `auth.users → profiles` | user 삭제 lifecycle에서 명시 처리 |
| Organization → Challenge Series | restrict |
| Challenge Series → Monthly Challenge | restrict 또는 archive |
| Challenge → Idea | restrict; Challenge 삭제 대신 archive |
| Idea → Version | cascade는 Idea hard-delete workflow에서만 |
| Version → Evaluation | restrict |
| Idea → Pilot | restrict |
| Consent Document → Acceptance | restrict; 문서 version 삭제 금지 |
| Sponsor Report Snapshot | source 삭제와 독립된 historical snapshot |

도메인 레코드는 일반 UI에서 hard delete하지 않고 상태 전이·archive를 사용한다.

## 2. Unique와 cardinality

- `profiles.id = auth.users.id`, 1:1.
- `(organization_id, user_id, role)` unique.
- `challenge_series.slug` unique.
- `(series_id, cycle_key)` unique for monthly challenge.
- `(challenge_id, code)` unique for track.
- `(challenge_id, user_id)` unique for participation.
- `(idea_id, version_number)` unique.
- 동일 Idea의 `is_submitted = true` version은 1개만 존재하도록 partial unique index.
- `(idea_version_id, evaluation_type, evaluator_id)` assignment unique.
- Pairwise pair는 version UUID를 정렬해 중복 방지.
- `(consent_type, version)` unique.
- active Showcase permission은 scope·grantee 조합별 1개.

## 3. Idea invariants

### Multiple drafts

한 사용자는 동일 Challenge에서 복수 Draft Idea를 만들 수 있다. 따라서 `(challenge_id, author_id)` unique를 두지 않는다.

### Final submission limit

Challenge별 1~3개의 제출 제한은 단순 unique constraint로 처리하지 않는다. `submit_idea` transaction에서 현재 제출 수, Challenge 설정과 상태를 lock 후 확인한다.

### Submitted Version immutability

`idea_versions.is_submitted = true` 또는 `submitted_at is not null`인 row는 일반 update·delete를 거부한다. 보완 요청은 새 Version을 생성하고 새로운 제출 pointer를 명시적으로 변경하는 별도 workflow로 처리한다.

### Current pointers

- `ideas.current_draft_version_id`는 같은 Idea의 non-submitted Version만 참조한다.
- `ideas.submitted_version_id`는 같은 Idea의 submitted Version만 참조한다.
- pointer 변경은 transaction helper에서 검증한다.

## 4. Evaluation invariants

- 평가 대상은 반드시 Submitted Version이다.
- AI와 Expert 평가가 다른 Version을 참조하면 통합점수를 계산하지 않는다.
- evaluator는 자신의 Idea를 평가할 수 없다.
- 제출 완료된 Evaluation은 수정하지 않고 amendment record 또는 새 evaluation version을 생성한다.
- low AI confidence는 penalty가 아니라 review flag다.

## 5. Sponsor invariants

- `sponsor_report_snapshots`는 승인된 report generation job만 생성한다.
- Snapshot payload에 user ID, email, raw private Idea text, evaluator identity를 넣지 않는다.
- Showcase item은 active `showcase_permissions`가 있어야 한다.
- Permission revoke 후 새 report에는 제외하며 이미 발행된 보고서 처리 규칙은 협약·법률 검토에 따른다.

## 6. Consent invariants

- 동의는 문서 version을 참조한다.
- required consent가 없으면 제출 transaction을 완료하지 않는다.
- optional consent는 별도 boolean column이 아니라 acceptance 또는 permission record로 관리한다.
- withdrawal과 revocation은 audit event를 남긴다.

## 7. Transaction boundaries

하나의 transaction으로 처리:

- profile provisioning
- Idea Draft + first Version 생성
- AI suggestion accept + Version/provenance update
- Idea submission + consent validation + immutable Version marking
- evaluator assignment
- evaluation submit
- selection decision + Idea status transition
- Showcase permission grant/revoke

## 8. Check constraints

- status·role·visibility·claim type은 canonical enum contract와 일치.
- 점수는 0~100.
- duration·size·cost 값은 음수 금지.
- Challenge 일정은 시작 ≤ 종료.
- Sponsor agreement 상태가 `active`가 아니면 official branding flag를 true로 할 수 없음.

## 9. Acceptance Criteria

- invalid FK와 cross-Idea pointer가 DB 수준에서 거부된다.
- 제출 Version 변경 시도가 실패한다.
- final submission limit이 concurrent request에서도 지켜진다.
- Sponsor snapshot에 PII 필드가 schema 수준에서 존재하지 않는다.
