---
doc_id: WOL-ARCH-004
title: Repository Structure
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-GOV-006
- WOL-ARCH-002
affects:
- src/**
- supabase/**
- tests/**
- contracts/**
supersedes: null
---


# Repository Structure

## 1. 결정

MVP는 **단일 Git repository와 단일 package workspace**로 시작한다. 초기부터 monorepo package 경계를 만들지 않는다. Web과 optional worker는 동일한 domain contract·schema를 사용하되 deploy entrypoint는 분리할 수 있다.

## 2. 기준 구조

```text
wellb-openlab/
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  ├─ (auth)/
│  │  ├─ (participant)/
│  │  ├─ (expert)/
│  │  ├─ (manager)/
│  │  ├─ (sponsor)/
│  │  └─ api/
│  ├─ components/
│  │  ├─ ui/
│  │  └─ shared/
│  ├─ features/
│  │  ├─ auth/
│  │  ├─ challenges/
│  │  ├─ ideas/
│  │  ├─ studio/
│  │  ├─ evaluations/
│  │  ├─ sponsorship/
│  │  └─ pilots/
│  ├─ server/
│  │  ├─ actions/
│  │  ├─ queries/
│  │  ├─ repositories/
│  │  └─ services/
│  ├─ ai/
│  │  ├─ graphs/
│  │  ├─ nodes/
│  │  ├─ prompts/
│  │  ├─ providers/
│  │  ├─ schemas/
│  │  ├─ checkpoints/
│  │  └─ evals/
│  ├─ lib/
│  │  ├─ supabase/
│  │  ├─ auth/
│  │  ├─ logging/
│  │  ├─ jobs/
│  │  └─ errors/
│  └─ types/
├─ supabase/
│  ├─ migrations/
│  ├─ tests/
│  ├─ policies/
│  └─ seed.sql
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
├─ contracts/
├─ docs/
└─ .agents/
```

## 3. Directory ownership

### `app/`

routing, layout, metadata, loading, error, route handler entrypoint만 소유한다. 복잡한 query·domain mutation·provider 호출을 직접 넣지 않는다.

### `features/`

사용자 기능 단위 UI와 순수 domain behavior를 소유한다. feature 간 비공개 내부 module을 직접 import하지 않는다.

### `server/`

request-aware query/action/service와 repository adapter를 소유한다. `server-only` 경계를 사용한다.

### `ai/`

Graph, node, prompt reference, provider adapter, structured schema와 AI eval을 소유한다. React UI를 import하지 않는다.

### `lib/`

공통 infrastructure만 둔다. `lib`을 도메인 로직의 dumping ground로 사용하지 않는다.

### `types/`

둘 이상의 bounded context가 실제 공유하는 type만 둔다. feature type을 편의상 이동하지 않는다.

## 4. File naming

- React component: `kebab-case.tsx`
- Server Action: `*.action.ts`
- Query: `*.query.ts`
- Repository: `*.repository.ts`
- Domain service: `*.service.ts`
- Zod schema: `*.schema.ts`
- Graph: `*.graph.ts`
- Node: `*.node.ts`
- Prompt metadata: `*.prompt.ts` 또는 registry data
- Test: `*.test.ts`, E2E `*.spec.ts`

## 5. Generated files

DB type, JSON Schema derived type 등 generated file은 header와 generator command를 명시한다. 직접 편집하지 않는다.

## 6. Monorepo 전환 조건

다음 중 둘 이상이 실제로 발생할 때 별도 ADR로 검토한다.

- Web과 worker의 독립 release cadence
- 둘 이상의 deployable app
- 외부 공개 SDK·component package
- build time 또는 dependency conflict가 측정됨
- 팀 ownership이 package 수준으로 분리됨

## 7. Acceptance Criteria

- route file에서 Supabase·LLM direct call이 없다.
- feature 간 순환 의존이 없다.
- server-only module이 client bundle에 포함되지 않는다.
- 디렉터리 추가가 dependency rules와 함께 검토된다.
