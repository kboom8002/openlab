---
doc_id: WOL-ADR-001
title: Use Next.js App Router
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


# ADR-001 — Use Next.js App Router

## Status

Accepted

## Context

WELLB OPENLAB은 public·participant·expert·manager·sponsor surface, nested layout, loading/error boundary와 server-first rendering이 필요하다.

## Decision

Next.js App Router를 유일한 application router로 사용한다. Pages Router와 혼합하지 않는다. Route group은 URL이 아닌 surface layout·access boundary를 표현한다.

## Consequences

- page·layout은 Server Component 기본이다.
- `loading.tsx`, `error.tsx`, `not-found.tsx`를 route 경계에 둔다.
- custom HTTP endpoint는 `app/**/route.ts`로 구현한다.
- route map과 Page Spec 없는 신규 route를 만들지 않는다.

## Rejected alternatives

- Pages Router: 신규 architecture와 surface 계약에 맞지 않음.
- Client-only SPA: SSR auth·metadata·protected read 경계가 약해짐.

## Verification

- App Router route만 존재한다.
- route ID가 `contracts/ux/routes.yaml`과 일치한다.

## References

- https://nextjs.org/docs/app
