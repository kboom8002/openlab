---
doc_id: WOL-ARCH-000
title: System Architecture Index
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-INDEX-001
- WOL-GOV-006
- WOL-UX-002
affects:
- docs/04-architecture/**
- docs/adr/**
- contracts/architecture/**
- src/**
supersedes: null
---


# System Architecture Index

## 1. 목적

WELLB OPENLAB의 제품·도메인·UX 계약을 Next.js, Supabase, AI API와 LangGraph.js가 실행할 수 있는 런타임 경계로 전환한다. 이 문서는 구현 상세보다 **책임의 위치, 호출 방향, 보안 경계와 변경 규칙**을 고정한다.

## 2. 아키텍처 원칙

1. Server Component가 읽기와 초기 렌더링의 기본이다.
2. Client Component는 브라우저 상호작용이 필요한 최소 영역으로 제한한다.
3. 사용자 요청 mutation은 Server Action을 우선하고, 스트리밍·웹훅·외부 호출은 Route Handler를 사용한다.
4. Supabase PostgreSQL이 제품 상태의 System of Record다.
5. RLS와 서버 object authorization을 함께 적용한다.
6. AI가 생성한 내용은 검증·provenance·사용자 확인을 통과하기 전 canonical state가 아니다.
7. Sponsor UI는 raw operational table이 아닌 승인된 read model만 사용한다.
8. 긴 작업은 동기 HTTP request와 분리할 수 있는 job boundary를 갖는다.
9. 모든 경계는 테스트 가능한 machine-readable contract를 가진다.

## 3. 문서 구성

| 문서 | 책임 |
|---|---|
| `system-context.md` | 사용자·기관·외부 시스템 경계 |
| `container-architecture.md` | Web·Supabase·AI·Job·관측 컨테이너 |
| `runtime-boundaries.md` | Node·Browser·Database·Worker 실행 위치 |
| `repository-structure.md` | 단일 레포 디렉터리와 ownership |
| `server-client-boundary.md` | Server·Client Component 분리 |
| `request-flow.md` | 읽기·mutation·callback 요청 흐름 |
| `ai-request-flow.md` | LangGraph·provider·HITL 흐름 |
| `event-and-job-model.md` | 긴 작업·이벤트·재시도 경계 |
| `caching-strategy.md` | public·protected·draft 데이터 캐시 |
| `error-taxonomy.md` | 안전한 오류 코드와 복구 |
| `dependency-rules.md` | import 방향과 금지 의존성 |

## 4. ADR

`docs/adr/`의 결정문은 architecture core보다 구체적인 기술 선택을 기록한다. ADR과 본문이 충돌하면 승인된 최신 ADR이 우선하며, core 문서를 같은 변경에서 갱신해야 한다.

## 5. 구현 시작 전 읽기 순서

1. `AGENTS.md`
2. 관련 Product·Domain Canon
3. 해당 Page Spec
4. 이 Architecture Index
5. 관련 architecture core 문서
6. 관련 ADR
7. `contracts/architecture/`
8. 이후 Batch의 DB·AI·API·Feature Contract

## 6. 공식 기술 근거

- Next.js Server·Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Supabase Next.js Auth: https://supabase.com/docs/guides/auth/quickstarts/nextjs
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- LangGraph persistence: https://docs.langchain.com/oss/javascript/langgraph/persistence
- LangGraph interrupts: https://docs.langchain.com/oss/javascript/langgraph/interrupts
- shadcn/ui CLI: https://ui.shadcn.com/docs/cli
