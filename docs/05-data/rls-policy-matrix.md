---
doc_id: WOL-DATA-005
title: Row Level Security Policy Matrix
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-002
- WOL-DATA-004
- WOL-DOM-008
affects:
- contracts/data/rls-policy-matrix.yaml
- supabase/policies/**
- supabase/tests/rls/**
supersedes: null
---

# Row Level Security Policy Matrix

## 1. 정책 원칙

- `public`의 모든 table에 RLS를 명시적으로 enable한다.
- policy는 `TO anon` 또는 `TO authenticated`를 명시한다.
- owner 비교는 `(select auth.uid())` 형태를 기본으로 한다.
- policy 컬럼과 helper lookup 컬럼에는 인덱스를 둔다.
- RLS는 defense-in-depth이며 Server Action에서도 object authorization을 수행한다.
- policy 이름은 `<table>_<operation>_<subject>_<condition>` 형식을 따른다.

## 2. 역할별 요약

| Resource | anon | participant | assigned evaluator | challenge manager | sponsor viewer | admin/service |
|---|---|---|---|---|---|---|
| 공개 Challenge | R | R | R | CRUD own org | R | R |
| 개인 Draft | X | owner CRUD | X | limited safety/ops | X | audited |
| Submitted Version | public 조건만 | owner R | assigned R | managed challenge R | read-model only | audited |
| AI conversation | X | owner R/W | X | 기본 X | X | safety-only |
| Evaluation | X | released projection | own assignment | managed challenge R | aggregate only | audited |
| Pilot | public summary | participant scope | assigned scope | manager scope | read-model | audited |
| Sponsor report | X | X | X | own program R | own sponsor org R | R |

## 3. Table policy rules

### Profiles and roles

- `profiles`: authenticated self select/update. Admin service path only for other users.
- `platform_role_assignments`: user may select own role names; mutation admin only.
- `organization_members`: user selects own memberships; organization admin manages own organization; sponsor viewer cannot enumerate unrelated members.

### Challenge

- `challenge_series`, `monthly_challenges`, `challenge_tracks`: `published_at`과 public 상태인 row는 anon read.
- manager CRUD는 `owner_organization_id` membership 확인.
- Draft challenge는 manager와 admin만 read.
- `challenge_participations`: owner CRUD/read; manager aggregate/read limited.

### Idea

- `ideas`: owner read; Draft owner update; public/anonymous Submitted는 공개 projection 조건에서 read.
- `idea_versions`: owner read. 일반 insert는 owner Draft flow만. submitted row update/delete policy 없음.
- evaluator read는 assignment와 exact `idea_version_id` 일치.
- manager read는 managed challenge and operational purpose.
- Sponsor direct policy 없음.

### Provenance and AI

- provenance·claim·evidence·attachment는 parent Version permission을 따른다.
- `conversations`, `conversation_messages`, `agent_runs`: owner and trusted internal role only.
- evaluator·Sponsor는 raw AI interaction을 읽지 않는다.

### Evaluation

- assignment: evaluator 자신의 assignment select; manager insert/update.
- evaluation Draft: assigned evaluator CRUD own.
- submitted evaluation: evaluator read, manager read; update 없음.
- participant에게는 evaluator identity를 제거한 release projection만 제공한다.
- pairwise vote: authenticated insert, self Idea pair 금지; raw aggregate select 금지.

### Consent·Showcase

- active consent document는 인증 사용자 read.
- acceptance는 self insert/read; delete 대신 withdrawal workflow.
- Showcase permission은 grantor self read/grant/revoke; manager는 운영 범위 read.

### Operations

- notification: owner select/update read state.
- background_jobs, audit_events: client policy 없음.
- Sponsor read model: Sponsor organization active member와 program manager만 read.

## 4. Deny test catalog

최소 필수 deny tests:

1. anon이 Draft Idea를 읽지 못함.
2. participant A가 participant B Draft를 읽지 못함.
3. evaluator가 배정되지 않은 Submitted Version을 읽지 못함.
4. evaluator가 raw conversation을 읽지 못함.
5. sponsor_viewer가 `ideas`와 `agent_runs`를 직접 읽지 못함.
6. manager가 다른 organization Challenge를 수정하지 못함.
7. submitted Version update·delete가 실패함.
8. Service Role key 없는 client가 audit_events를 읽지 못함.
9. revoked Showcase item이 새로운 Sponsor snapshot에 포함되지 않음.

## 5. Performance 규칙

- owner FK, challenge FK, organization FK, assignment FK에 btree index.
- helper function은 row별 가변이 아닐 때 `(select private.fn(...))` 형태 검토.
- 복잡한 join policy는 security definer helper 또는 authorization relation으로 단순화.
- 정책을 넓게 만들고 UI에서 필터링하는 방식을 금지한다.

## 6. Acceptance Criteria

- table catalog의 `exposed: true` table은 모두 RLS required.
- allow test와 deny test가 한 쌍으로 존재한다.
- Sponsor read 정책이 raw Idea table에 추가되지 않는다.
- 정책 변경은 migration과 test를 같은 PR에서 수정한다.
