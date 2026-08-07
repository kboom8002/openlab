---
doc_id: WOL-ADR-004
title: Separate Server Actions and Route Handlers by Interaction Type
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-000
affects:
- src/**
- supabase/**
- contracts/architecture/**
supersedes: null
---


# ADR-004 — Separate Server Actions and Route Handlers by Interaction Type

## Status

Accepted

## Decision

- same-origin, 짧은 UI mutation은 Server Action을 우선한다.
- AI streaming, webhook, OAuth callback, file signing, job enqueue와 외부 API는 Route Handler를 사용한다.
- 두 entrypoint는 domain service·authorization·Zod schema를 공유한다.

## Consequences

Route Handler를 일반 CRUD API로 무분별하게 만들지 않고, Server Action에 streaming·외부 callback을 억지로 넣지 않는다.

## Selection checklist

| 질문 | Yes일 때 |
|---|---|
| 외부 시스템이 호출하는가 | Route Handler |
| stream 또는 custom HTTP가 필요한가 | Route Handler |
| same-origin form mutation인가 | Server Action |
| 긴 작업인가 | Job enqueue Route Handler/Action + Job |

## Verification

- handler/action file에 복잡한 domain logic이 없다.
- mutation authorization test가 entrypoint와 무관하게 통과한다.

## References

- https://nextjs.org/docs/app/getting-started/route-handlers
