---
doc_id: WOL-GOV-006
title: Technology Stack Lock
status: approved
authority: canonical
owner: engineering
last_verified: 2026-07-31
depends_on:
  - WOL-GOV-003
affects:
  - package.json
  - pnpm-lock.yaml
  - src/**
  - supabase/**
  - .agents/**
supersedes: null
---

# Technology Stack Lock

## 1. 목적

AI coding agent가 임의로 프레임워크·패키지·책임 경계를 변경하지 못하도록 기본 스택과 선택 원칙을 고정한다. 정확한 패키지 버전의 단일 진실 공급원은 `package.json`과 `pnpm-lock.yaml`이다.

## 2. Locked stack

| 계층 | 선택 | 상태 |
|---|---|---|
| Web framework | Next.js App Router | locked |
| Language | TypeScript strict | locked |
| Runtime | Node.js runtime 중심 | locked |
| Package manager | pnpm | locked |
| Database | Supabase PostgreSQL | locked |
| Authentication | Supabase Auth + cookie-based SSR | locked |
| Authorization | PostgreSQL RLS + server-side checks | locked |
| File storage | Supabase Storage | locked |
| AI orchestration | LangGraph.js | locked |
| AI API | Provider abstraction, OpenAI primary candidate | architecture locked, provider configurable |
| AI output | Zod/JSON Schema structured outputs | locked |
| Styling | Tailwind CSS | locked |
| UI components | shadcn/ui | locked |
| Primitive | shadcn/ui Base UI | locked by ADR-007 |
| Validation | Zod | locked |
| Testing | unit + integration + E2E + RLS + AI eval | locked |

## 3. Next.js 적용 원칙

- `src/app`은 routing·layout·loading·error boundary에 집중한다.
- Server Component를 기본값으로 사용한다.
- 브라우저 상태·이벤트·interactive widget만 Client Component로 만든다.
- 단순 mutation은 Server Action을 우선 검토한다.
- AI streaming, webhook, 외부 callback은 Route Handler를 사용한다.
- 도메인 로직을 page component에 직접 작성하지 않는다.
- 인증·권한 확인을 middleware 하나에만 의존하지 않는다.

## 4. Supabase 적용 원칙

- 브라우저 client와 서버 client를 분리한다.
- `@supabase/ssr` 기반 cookie session을 사용한다.
- 공개 schema의 모든 사용자 데이터 테이블에 RLS를 활성화한다.
- Service Role key는 서버의 제한된 작업에서만 사용한다.
- migration 파일은 append-only로 관리한다.
- Dashboard에서 만든 임시 SQL은 migration으로 재현되기 전까지 정식 변경으로 인정하지 않는다.
- sponsor_viewer는 원문 아이디어가 아니라 승인된 view 또는 aggregate table만 읽는다.

## 5. AI·LangGraph 적용 원칙

- UI에 여러 독립 챗봇을 노출하지 않는다. Orchestrator가 stage별 node를 호출한다.
- Idea Studio Graph와 Evaluation Graph를 분리한다.
- 모든 run에 `thread_id`, `idea_id`, `prompt_version`, `model_key`, `input_snapshot`, `output_snapshot`을 기록한다.
- 사용자 확인 전 AI 제안을 canonical Idea Passport에 확정하지 않는다.
- 제출된 버전만 Evaluation Graph에 입력한다.
- Structured Output 검증 실패 시 복구 1회 후 직접 작성 또는 human review로 전환한다.
- production은 durable checkpoint boundary를 사용한다. 구체 saver·schema는 Batch 6에서 확정한다.

## 6. Tailwind·shadcn/ui 적용 원칙

- WellB Forest·Sage·Gold 계열을 CSS variable token으로 정의한다.
- 색상값을 component class에 반복 하드코딩하지 않는다.
- shadcn component는 복사된 repo code로 관리하고 변경 이유를 남긴다.
- primitive를 혼합하지 않는다.
- 접근성 동작을 시각 디자인 때문에 제거하지 않는다.
- Idea Studio는 desktop 3-panel, mobile single-flow + drawer를 기본으로 한다.

## 7. Repository·Runtime 결정

- 단일 Git repository와 단일 package workspace를 사용한다.
- Next.js server runtime은 Node.js가 기본이다. Edge는 별도 ADR 전 사용하지 않는다.
- 장기 AI 평가·report·export는 background job boundary 뒤에 둔다.
- Sponsor UI는 dedicated read model만 사용한다.

## 8. 코드 경계

```text
src/
├─ app/                 # routes, layouts, route handlers
├─ components/ui/       # shadcn-derived primitives
├─ components/shared/   # cross-domain presentation
├─ features/            # domain feature modules
├─ server/              # queries, actions, services
├─ ai/                  # graphs, nodes, prompts, providers, schemas, evals
├─ lib/                 # infrastructure utilities
└─ types/               # genuinely shared types only
```

금지:

- `lib/`에 모든 로직을 모으기
- Client Component에서 service role 사용
- page 파일에서 SQL 또는 LLM 호출
- model name·prompt text를 여러 파일에 중복
- AI output을 정규식으로 파싱
- RLS 없이 UI에서 버튼만 숨겨 권한 처리

## 9. 버전 정책

- 문서에는 무분별하게 `latest`를 적지 않는다.
- 실제 설치 버전은 lockfile이 결정한다.
- 신규 scaffold 시 공식 문서와 호환성을 확인한 뒤 exact 또는 compatible range를 고정한다.
- major upgrade는 별도 ADR·migration·regression test를 요구한다.
- 의존성 자동 업데이트는 월 1회 검토 주기를 기본으로 한다.

## 10. 공식 기술 근거

- Next.js App Router: https://nextjs.org/docs/app
- Supabase Next.js Auth: https://supabase.com/docs/guides/auth/quickstarts/nextjs
- Supabase Next.js SSR example: https://supabase.com/nextjs
- LangGraph persistence: https://docs.langchain.com/oss/javascript/langgraph/persistence
- Tailwind Next.js guide: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- shadcn CLI: https://ui.shadcn.com/docs/cli
- OpenAI Structured Outputs: https://platform.openai.com/docs/guides/structured-outputs
- Antigravity Rules: https://antigravity.google/docs/ide-rules
- Antigravity Workflows: https://antigravity.google/docs/ide-workflows
- Antigravity Permissions: https://antigravity.google/docs/permissions

## 11. Scaffold Gate

코드 scaffold를 시작하기 전에 남은 P0 결정의 영향 범위를 확인한다.

- D-T03 durable checkpoint saver·schema·retention
- D-S02 운영자 Draft 예외 열람 절차
- D-S03 AI provider 전송 데이터·PII redaction 경계

D-T03·D-S03에 직접 의존하지 않는 public shell과 Supabase 기초 scaffold는 진행할 수 있지만, 실제 AI·민감 데이터 Vertical Slice는 해당 Canon 승인 전 활성화하지 않는다.
