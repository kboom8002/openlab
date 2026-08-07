---
doc_id: WOL-ARCH-011
title: Dependency and Import Rules
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-004
affects:
- src/**
- eslint.config.*
- contracts/architecture/dependency-rules.yaml
supersedes: null
---


# Dependency and Import Rules

## 1. 목적

레이어 간 순환, Client bundle secret 포함과 기능 간 결합을 방지한다.

## 2. 허용 방향

```text
app
├─> feature UI
├─> shared components
└─> server query/action entry

feature UI
├─> components/ui
├─> components/shared
├─> own feature domain/schema
└─> client-safe lib

server
├─> feature domain/schema
├─> repositories
├─> ai service interface
└─> server-only lib

ai
├─> domain contracts/schema
├─> provider/checkpoint adapter
└─> server-only lib
```

## 3. 금지 방향

- `components/**` → `server/**`
- Client Component → `ai/**`
- `ai/**` → React component 또는 `app/**`
- feature A → feature B의 internal module
- `lib/**` → feature-specific module
- `app/page.tsx` → Supabase SDK direct query
- browser module → service role/admin client
- prompt registry → UI bundle

## 4. Public module surface

각 feature는 필요한 경우 `index.ts`를 통해 외부 사용 가능 symbol을 제한한다. 내부 directory deep import를 금지한다.

## 5. Contract dependency

Domain enum·Idea Passport·Evaluation weight는 machine-readable contract에서 파생하거나 같은 source module을 공유한다. 문자열 literal을 route·component에 반복하지 않는다.

## 6. Server-only protection

- server module entry에 `server-only` 사용
- `.server.ts` 또는 server directory convention
- secret 환경변수 접근 module 분리
- build 검사로 Client import 실패 처리

## 7. Enforcement

- ESLint restricted imports
- TypeScript path alias
- dependency graph test
- bundle scan
- CI grep는 보조 수단이며 AST/ESLint 검사를 대체하지 않는다.

## 8. Acceptance Criteria

- dependency contract의 deny rule이 lint로 구현 가능하다.
- Client bundle에서 server-only import가 실패한다.
- feature 간 deep import가 없다.
- Graph node가 React·route module을 import하지 않는다.
