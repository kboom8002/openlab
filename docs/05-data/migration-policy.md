---
doc_id: WOL-DATA-007
title: Supabase Migration and Schema Change Policy
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-000
- WOL-ARCH-004
affects:
- contracts/data/migration-plan.yaml
- supabase/migrations/**
- .agents/workflows/migrate-database.md
- CI
supersedes: null
---

# Supabase Migration and Schema Change Policy

## 1. Source of truth

- `supabase/migrations/`의 timestamped SQL이 적용 순서의 진실 공급원이다.
- Dashboard 직접 변경은 production 운영 절차가 아니다.
- `supabase/seed.sql`은 개발 fixture이며 schema 정의가 아니다.
- 생성된 TypeScript database type은 migration 적용 후 재생성한다.

## 2. Local-first workflow

```text
supabase start
→ migration new 또는 db diff
→ SQL review
→ supabase db reset --local
→ RLS allow/deny test
→ type generation
→ application test
→ staging push
→ smoke test
→ approved production push
```

CLI는 project dev dependency로 pin하고 package runner로 실행한다.

## 3. Migration rules

- 이미 공유·적용된 migration을 수정하지 않는다.
- 한 migration은 하나의 논리적 변화에 집중한다.
- schema·constraint·index·RLS·grant를 가능한 한 같은 변화에서 다룬다.
- destructive change는 expand → backfill → switch → contract 단계로 분리한다.
- long lock 위험이 있는 change는 lock timeout·batch backfill을 설계한다.
- enum contract 변경은 DB check·TypeScript·YAML·UI label을 같은 PR에서 갱신한다.

## 4. Planned migration order

1. extensions·private helper schema
2. identity·organization
3. challenge·sponsorship
4. idea·version·provenance
5. consent·rights
6. AI interaction
7. evaluation·selection
8. pilot
9. reporting read model
10. storage buckets·policies
11. audit·job
12. indexes·performance hardening

## 5. Required verification

```bash
pnpm supabase start
pnpm supabase db reset --local
pnpm test:db
pnpm test:rls
pnpm supabase gen types --lang typescript --local
pnpm typecheck
```

실제 script 이름은 구현 시 package contract에서 확정한다.

## 6. Remote safety

- `db reset --linked`는 developer task에서 금지.
- `db push`는 ask/approval 대상.
- production migration은 release artifact와 rollback plan 필요.
- migration 전 backup·point-in-time recovery 상태 확인.
- production hotfix도 migration file을 통해 기록한다.

## 7. Rollback

Schema rollback은 무조건 down migration을 뜻하지 않는다.

우선순위:

1. feature flag 또는 application rollback
2. additive compatibility 유지
3. corrective forward migration
4. 데이터 복구 절차

데이터 손실 위험이 있는 자동 reverse migration을 기본 제공하지 않는다.

## 8. Acceptance Criteria

- 새 clone에서 `db reset --local`로 동일 schema가 생성된다.
- 모든 exposed table RLS 상태가 검증된다.
- migration history와 remote history가 일치한다.
- destructive remote command가 agent permission에서 차단된다.
