---
doc_id: WOL-ARCH-002
title: Container Architecture
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-001
- WOL-GOV-006
affects:
- src/**
- supabase/**
- contracts/architecture/runtime-boundaries.yaml
supersedes: null
---


# Container Architecture

## 1. 목적

MVP의 논리적 컨테이너와 각 컨테이너가 소유하는 책임을 정의한다. 배포 제품 수와 repository 수를 동일시하지 않는다.

## 2. 논리 컨테이너

| Container | 기술 | 책임 |
|---|---|---|
| Web Application | Next.js App Router | route, rendering, form, auth surface, BFF |
| Domain Services | TypeScript server modules | authorization, lifecycle, selection, rights |
| AI Orchestrator | LangGraph.js | stage routing, node execution, interrupt, resume |
| Data Platform | Supabase PostgreSQL | canonical state, RLS, audit, read model |
| Identity | Supabase Auth | cookie-based session, OAuth·Magic Link |
| Object Storage | Supabase Storage | private attachment, signed access |
| Job Runtime | adapter boundary | long evaluation, export, reporting, retries |
| External AI | provider adapter | structured generation and evaluation support |
| Observability | adapter boundary | logs, traces, errors, cost metrics |

## 3. MVP deployment shape

```text
Single Git Repository
├─ Next.js Web Deployment
├─ Supabase Project
└─ Optional Job Runner Deployment
```

단일 레포를 사용하되 Web request와 장기 job은 runtime responsibility를 분리한다. 별도 job runner가 아직 배포되지 않은 단계에서는 long-running 기능을 활성화하지 않거나 제한된 동기 spike로만 검증한다.

## 4. Web Application

- pages·layouts는 Server Component 기본
- Server Action은 same-origin user mutation
- Route Handler는 AI stream, callback, webhook, job enqueue
- middleware/proxy 계층은 session refresh와 coarse route handling만 담당
- object authorization은 query/action service 안에서 재검사

## 5. Data Platform

PostgreSQL이 다음의 단일 진실 공급원이다.

- Challenge·Idea·Version·Passport
- Consent·Visibility·Rights state
- Evaluation·Selection·Pilot
- AgentRun·Prompt version reference·Provenance
- Job·Audit·Sponsor read model

LangGraph checkpoint의 구체 schema와 saver는 Batch 6에서 확정하지만, production은 durable persistence를 사용해야 한다.

## 6. Job Runtime

긴 AI 평가, 대량 export, Sponsor report 생성, notification fan-out은 job interface 뒤에 둔다. HTTP request가 작업 완료까지 연결을 유지하는 것을 정상 경로로 만들지 않는다.

## 7. Cross-container rule

- Web은 AI provider를 직접 호출하지 않고 AI Orchestrator를 호출한다.
- AI Orchestrator는 raw database access를 임의로 수행하지 않고 repository/service contract를 사용한다.
- Sponsor UI는 raw Idea repository를 사용하지 않는다.
- Job runner는 job payload 안의 최소 ID를 사용하고 실행 시 최신 권한·상태를 재검사한다.

## 8. Failure isolation

- AI provider 실패 시 Draft와 사용자 입력은 유지된다.
- Job 실패 시 idempotent retry가 가능해야 한다.
- Storage 실패가 Idea text 저장을 rollback하지 않는다.
- Sponsor report 실패가 운영 데이터 mutation을 막지 않는다.

## 9. Acceptance Criteria

- 논리 컨테이너마다 owner와 interface가 있다.
- 단일 repo와 optional job runner가 모순되지 않는다.
- Web·AI·DB·Sponsor read path가 분리된다.
- 구체 배포 vendor 없이도 Vertical Slice 구현이 가능하다.
