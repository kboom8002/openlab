---
doc_id: WOL-ARCH-003
title: Runtime Boundaries
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-002
- WOL-UX-002
affects:
- src/app/**
- src/server/**
- src/ai/**
- contracts/architecture/runtime-boundaries.yaml
supersedes: null
---


# Runtime Boundaries

## 1. 목적

코드가 Browser, Next.js Node runtime, Database 또는 Job runtime 중 어디에서 실행되는지 고정한다.

## 2. 기본 Runtime

Next.js server code의 기본은 Node.js runtime이다. Edge runtime은 MVP 기본값이 아니며, 명확한 필요·호환성 검증·ADR 없이 도입하지 않는다.

## 3. Browser runtime

허용:

- 입력 상태·폼 상호작용
- Idea Studio conversation UI
- optimistic display와 accessibility interaction
- Supabase Auth client action
- 제한된 realtime subscription의 향후 adapter

금지:

- Service Role
- AI provider secret·직접 provider 호출
- raw SQL·admin mutation
- canonical authorization 결정
- prompt system contract 노출

## 4. Next.js Node runtime

책임:

- Server Component data read
- Server Action mutation
- Route Handler streaming·callback
- session·role·object authorization
- Zod validation
- domain service·repository 호출
- AI Orchestrator 호출
- signed URL 발급

## 5. Database runtime

책임:

- RLS
- constraint·foreign key·unique invariant
- append-only migration
- transaction
- audit trigger 또는 function의 최소 집합
- aggregate/read model의 안전한 생성

도메인 전체를 PL/pgSQL에 숨기지 않는다. 데이터 무결성과 authorization에 가까운 로직만 둔다.

## 6. Job runtime

책임:

- 장기 AI evaluation
- batch report·export
- notification fan-out
- retry·dead-letter
- scheduled maintenance

Job은 사용자 session cookie를 전달받아 신뢰하지 않는다. job creator, object ID, requested capability를 저장하고 실행 시 시스템 권한과 대상 상태를 재검사한다.

## 7. Runtime matrix

| Operation | Browser | Next Node | Database | Job |
|---|---:|---:|---:|---:|
| Challenge public read | hydrate only | primary | RLS/query | X |
| Draft save | form state | primary action | transaction·RLS | X |
| AI coach stream | render stream | route handler | checkpoint/provenance | optional |
| AI evaluation | status UI | enqueue | job state | primary |
| Pairwise vote | interaction | action | constraint·RLS | X |
| Sponsor report | render | authorized read | read model | generation |
| Export | request | enqueue | snapshot | generate |

## 8. Acceptance Criteria

- 각 operation이 하나의 primary runtime을 가진다.
- Edge-only API에 의존하지 않는다.
- Browser code에 secret·admin responsibility가 없다.
- Job이 session을 권한 근거로 사용하지 않는다.
