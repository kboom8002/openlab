---
doc_id: WOL-DATA-000
title: Supabase Data Architecture Index
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-INDEX-001
- WOL-ARCH-003
- WOL-ADR-003
- WOL-DOM-001
affects:
- docs/05-data/**
- contracts/data/**
- supabase/**
- src/lib/supabase/**
- src/server/repositories/**
supersedes: null
---

# Supabase Data Architecture Index

## 1. 목적

WELLB OPENLAB의 제품·도메인·UX·시스템 아키텍처를 Supabase PostgreSQL, Auth, Storage와 Row Level Security가 실행할 수 있는 데이터 계약으로 전환한다.

이 Batch는 실제 production migration을 적용하지 않는다. 대신 **테이블 경계, 관계, 권한, 정책, 저장소, 마이그레이션 규칙과 검증 기준**을 고정해 Antigravity가 이후 구현 시 추측하지 않도록 한다.

## 2. 핵심 원칙

1. Supabase PostgreSQL이 canonical product state의 System of Record다.
2. `auth.users`는 인증 주체이며 제품 프로필은 `public.profiles`에 둔다.
3. 공개 API에 노출되는 모든 `public` 테이블은 RLS를 활성화한다.
4. Browser는 publishable key와 사용자 세션만 사용하며 Service Role은 서버·worker 전용이다.
5. 역할은 JWT 한 곳에만 고정하지 않고 platform role과 organization membership을 데이터로 관리한다.
6. Submitted Idea Version은 immutable하며 평가가 참조한 Version ID를 변경하지 않는다.
7. Sponsor는 raw operational table이 아닌 snapshot read model만 읽는다.
8. AI 대화·원시 Agent payload·비공개 Draft는 Sponsor에게 노출하지 않는다.
9. 모든 정책 조건에 사용되는 FK·owner·status 컬럼은 인덱스를 검토한다.
10. migration은 append-only이며 local reset과 RLS deny test를 통과해야 한다.

## 3. 문서 구성

| 문서 | 책임 |
|---|---|
| `erd.md` | Aggregate와 테이블 관계 |
| `table-dictionary.md` | 테이블·주요 컬럼·보존·RLS 수준 |
| `relationship-rules.md` | FK·unique·immutability·transaction invariant |
| `auth-and-role-model.md` | Auth, platform role, organization role |
| `rls-policy-matrix.md` | role·operation·resource 접근 규칙 |
| `storage-policy.md` | bucket·object path·signed URL·Storage RLS |
| `migration-policy.md` | local-first migration·검증·배포 절차 |
| `seed-data-policy.md` | 안전한 fixture와 금지 데이터 |
| `retention-and-deletion.md` | 보존·삭제·익명화 정책 제안 |
| `audit-model.md` | Audit Event와 Content Provenance 분리 |
| `sponsor-read-model.md` | 집계 snapshot·showcase·pilot summary |
| `database-functions.md` | helper·transaction RPC·security definer 규칙 |

## 4. Machine-readable contracts

- `contracts/data/table-catalog.yaml`
- `contracts/data/relationships.yaml`
- `contracts/data/auth-roles.yaml`
- `contracts/data/rls-policy-matrix.yaml`
- `contracts/data/storage-buckets.yaml`
- `contracts/data/retention-policy.yaml`
- `contracts/data/database-functions.yaml`
- `contracts/data/migration-plan.yaml`
- `contracts/data/sponsor-read-model.yaml`

## 5. 구현 시작 전 읽기 순서

1. `AGENTS.md`
2. 관련 Product·Domain Canon
3. 관련 Page Spec
4. System Architecture와 ADR-003·009·010
5. 이 Data Index
6. 관련 Data 문서
7. 관련 `contracts/data/`
8. migration task card

## 6. 공식 기술 근거

- Supabase Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase SSR Auth: https://supabase.com/docs/guides/auth/server-side/nextjs
- Supabase Storage Access Control: https://supabase.com/docs/guides/storage/security/access-control
- Supabase Local Development: https://supabase.com/docs/guides/local-development/overview
- Supabase CLI workflow: https://supabase.com/docs/guides/local-development/cli-workflows
