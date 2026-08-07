---
doc_id: WOL-API-002
title: Server Action Catalog
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-API-001]
affects: [src/server/actions/**]
supersedes: null
---

# Server Action Catalog

| Action ID | Action | Actor | 핵심 guard | 결과 |
|---|---|---|---|---|
| ACT-IDEA-001 | createIdeaDraft | participant | active challenge, submission limit | draft id |
| ACT-IDEA-002 | updateIdeaDraft | idea_owner | expected revision, not submitted | revision |
| ACT-IDEA-003 | applyAiSuggestion | idea_owner | interrupt pending, explicit decision | provenance id |
| ACT-IDEA-004 | submitIdea | idea_owner | preflight complete, consent, idempotency | immutable version id |
| ACT-IDEA-005 | withdrawIdea | idea_owner | allowed lifecycle state | withdrawal record |
| ACT-EVAL-001 | submitPairwise | eligible_evaluator | assignment, no self-review | evaluation id |
| ACT-EVAL-002 | submitExpertReview | assigned_expert | conflict declared, version pinned | evaluation id |
| ACT-MGR-001 | transitionChallenge | challenge_manager/admin | transition policy | new state |
| ACT-MGR-002 | decidePublication | challenge_manager/admin | participant consent | publication decision |

모든 action은 `{ok:true,data,meta}` 또는 `{ok:false,error,meta}`를 반환한다. redirect는 성공 후 UI 계층에서 수행한다. 입력 오류는 field map을 포함할 수 있지만 권한·내부 오류의 세부사항은 노출하지 않는다.

