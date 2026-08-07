---
doc_id: WOL-DATA-004
title: Supabase Auth and Application Role Model
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-000
- WOL-DOM-001
- WOL-ARCH-003
affects:
- contracts/data/auth-roles.yaml
- src/lib/supabase/**
- src/server/auth/**
- supabase/migrations/**
supersedes: null
---

# Supabase Auth and Application Role Model

## 1. 인증 주체

Supabase Auth의 `auth.users.id`가 사용자 식별자의 원천이다. 제품 화면과 도메인 데이터는 `public.profiles.id`를 FK로 참조한다.

Browser와 Server는 cookie 기반 session을 사용한다. 서버 권한 판정은 단순히 클라이언트가 전달한 role 문자열을 신뢰하지 않고 DB membership을 재검사한다.

## 2. 세 가지 역할 층

### Postgres request role

- `anon`
- `authenticated`
- `service_role`

이는 Supabase Data API 접근 역할이며 제품의 participant·expert 역할과 동일하지 않다.

### Platform role

`platform_role_assignments`에 저장한다.

- participant
- evaluator
- expert
- admin
- service_worker

한 사용자가 복수 역할을 가질 수 있다.

### Organization-scoped role

`organization_members`에 저장한다.

- member
- challenge_manager
- sponsor_viewer
- pilot_partner
- organization_admin

organization role은 다른 조직에 전파되지 않는다.

## 3. JWT 사용 원칙

- `raw_user_meta_data`는 사용자가 변경할 수 있으므로 authorization 근거로 사용하지 않는다.
- `raw_app_meta_data`는 coarse platform claim cache로 사용할 수 있으나 canonical role DB를 대체하지 않는다.
- membership·expiry·Sponsor scope는 DB에서 확인한다.
- role 변경 직후 JWT 갱신이 늦어도 DB helper가 올바른 결정을 내려야 한다.

## 4. Profile provisioning

신규 Auth user 생성 후 server-side provisioning 또는 안전한 trigger로 `profiles`를 생성한다.

필수 조건:

- duplicate에 idempotent
- 최소 필드만 생성
- display name과 organization을 임의 추론하지 않음
- 실패 시 사용자에게 안전한 onboarding 복구 제공

## 5. Authorization helper

`private` schema의 stable helper를 사용한다.

- `private.has_platform_role(role_text)`
- `private.is_org_member(org_id, role_array)`
- `private.manages_challenge(challenge_id)`
- `private.owns_idea(idea_id)`
- `private.is_assigned_evaluator(version_id)`
- `private.can_view_sponsor_snapshot(snapshot_id)`

Helper는 RLS recursion을 피하고 `security definer`일 경우 owner·search_path·execute grant를 명시한다.

## 6. Service Role

허용:

- background worker
- report snapshot 생성
- internal audit 조회
- migration·trusted admin operation

금지:

- Browser bundle
- Client Component
- user-visible log
- 일반 Server Action에서 RLS를 피하기 위한 편의 사용

Service Role을 사용한 job도 object 상태·requested capability·actor를 재검사하고 audit event를 남긴다.

## 7. Session과 계정 상태

- disabled profile은 app 접근을 거부한다.
- membership `expires_at`이 지났으면 역할을 인정하지 않는다.
- account deletion pending 상태에서는 새로운 submission을 막는다.
- authentication success와 domain authorization success를 구분한다.

## 8. Acceptance Criteria

- participant와 sponsor_viewer를 JWT user metadata만으로 판정하지 않는다.
- 하나의 사용자가 participant이면서 특정 조직의 challenge_manager가 될 수 있다.
- sponsor_viewer는 자신의 Sponsor organization snapshot만 읽는다.
- Service Role 없이 일반 사용자 flow가 동작한다.
