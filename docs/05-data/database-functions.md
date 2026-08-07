---
doc_id: WOL-DATA-012
title: Database Helper and Transaction Function Contract
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-003
- WOL-DATA-004
- WOL-ARCH-006
affects:
- contracts/data/database-functions.yaml
- supabase/migrations/**
- src/server/repositories/**
supersedes: null
---

# Database Helper and Transaction Function Contract

## 1. 원칙

DB function은 다음에만 사용한다.

- RLS authorization helper
- 하나의 atomic transaction으로 보호해야 하는 invariant
- append-only audit·provenance record
- Sponsor snapshot build의 안전한 transform

일반 비즈니스 흐름 전체를 PL/pgSQL에 숨기지 않는다.

## 2. Authorization helpers

`private` schema:

- `has_platform_role(required_role text) returns boolean`
- `is_org_member(target_org uuid, allowed_roles text[]) returns boolean`
- `manages_challenge(target_challenge uuid) returns boolean`
- `owns_idea(target_idea uuid) returns boolean`
- `is_assigned_evaluator(target_version uuid) returns boolean`
- `can_view_sponsor_snapshot(target_snapshot uuid) returns boolean`
- `can_access_storage_resource(bucket text, object_name text, operation text) returns boolean`

함수는 null user를 명시적으로 거부한다.

## 3. Transaction functions

### `create_idea_draft`

입력: Challenge ID, optional track.

동작: Challenge OPEN 확인 → participation 확인/생성 → Idea → Version 1 → audit.

### `accept_ai_suggestion`

입력: Idea, base Version, field path, proposed value, Agent Run.

동작: ownership·base current 확인 → 새 Draft Version 생성 → provenance user confirmation → current pointer 변경.

### `submit_idea`

입력: Idea, Draft Version, consent document IDs.

동작: Challenge 상태·submission limit·required consent·ownership 확인 → Version immutable → submitted pointer → Idea status → audit.

### `submit_evaluation`

assignment·conflict·rubric·Version 일치 확인 후 immutable result 생성.

### `record_selection_decision`

manager 권한·evaluation snapshot·reason 확인 후 decision과 Idea status를 transaction으로 기록.

### `grant_showcase_permission` / `revoke_showcase_permission`

사용자 권리·scope·expiry와 audit를 함께 처리.

### `build_sponsor_report_snapshot`

service worker만 실행. allowlist aggregate와 suppression을 적용하고 immutable snapshot을 생성한다.

## 4. Security definer rules

- 필요할 때만 `security definer`.
- owner는 migration-owned trusted role.
- `set search_path = ''` 또는 명시 schema.
- object를 schema-qualified 이름으로 참조.
- `PUBLIC` execute revoke 후 필요한 role에만 grant.
- 입력 UUID에 대해 대상 권한을 함수 내부에서 재확인.
- function body와 grants를 migration review 대상에 포함.

## 5. Idempotency

- profile provisioning
- notification fan-out
- report snapshot generation
- job completion callback

위 함수는 idempotency key 또는 unique business key를 사용한다.

## 6. Acceptance Criteria

- helper function이 RLS recursion을 만들지 않는다.
- security definer function이 search_path injection에 안전하다.
- concurrent submission에서 Challenge limit을 초과하지 않는다.
- transaction 실패 시 partial Idea·Version·audit가 남지 않는다.
