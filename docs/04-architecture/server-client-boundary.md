---
doc_id: WOL-ARCH-005
title: Server and Client Component Boundary
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-003
- WOL-UX-005
affects:
- src/app/**/*.tsx
- src/components/**
- src/features/**
supersedes: null
---


# Server and Client Component Boundary

## 1. 기본 원칙

App Router의 page와 layout은 Server Component가 기본이다. `use client`는 파일 편의가 아니라 브라우저 runtime이 반드시 필요한 경계에만 선언한다.

## 2. Server Component 책임

- session 기반 초기 data load
- public·protected metadata
- role·object authorization 후 read
- list·detail·dashboard shell
- server-fetched read model 전달
- loading·not-found·error boundary 구성

## 3. Client Component 책임

- input, selection, drag, dialog, accordion
- Idea Studio composer·stream rendering
- unsaved state·optimistic feedback
- browser event와 focus management
- pairwise selection interaction
- chart/filter의 local state

## 4. Prop 경계

Server에서 Client로 전달하는 값은 직렬화 가능하고 최소화되어야 한다. 다음을 전달하지 않는다.

- Supabase client
- Service object·repository
- provider credential
- full audit log
- 다른 사용자의 hidden field
- prompt system text

## 5. Mutation pattern

```text
Client Form
   ↓
Server Action
   ↓
Auth + Zod + Object Authorization
   ↓
Domain Service + Repository
   ↓
Database Transaction
   ↓
Typed Action Result
```

Client는 성공 toast만 보고 canonical state를 가정하지 않는다. action result 또는 revalidated server data를 사용한다.

## 6. Idea Studio boundary

### Server shell

- Challenge·Idea·current Version ownership 확인
- stage summary와 initial transcript read
- inaccessible Idea는 존재를 노출하지 않는 response

### Client islands

- `StudioStageNav`
- `ConversationPanel`
- `SuggestionCard`
- `IdeaMapSheet`
- `SaveStatus`

AI stream endpoint는 Client가 호출하지만, authorization·thread ownership은 Route Handler가 검사한다.

## 7. shadcn/ui primitive

신규 scaffold는 Base UI 기반 shadcn/ui를 사용한다. primitive를 바꾸거나 혼합하려면 ADR과 regression test가 필요하다.

## 8. Common mistakes

- 상위 layout 전체를 `use client`로 전환
- Client에서 protected data를 다시 fetch해 flash 발생
- Client-side role check만 사용
- Server Action 내부에서 input parse 생략
- UI component가 server repository를 import

## 9. Acceptance Criteria

- 모든 Client Component에 브라우저 runtime 필요 이유가 있다.
- protected data는 server authorization 후 전달된다.
- action input과 output이 schema로 정의된다.
- Idea Studio shell이 전체 client app이 아니다.
