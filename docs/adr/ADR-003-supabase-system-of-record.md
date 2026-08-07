---
doc_id: WOL-ADR-003
title: Use Supabase PostgreSQL as System of Record
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


# ADR-003 — Use Supabase PostgreSQL as System of Record

## Status

Accepted

## Context

Idea Version, rights, evaluation, selection, agent provenance와 sponsor read model은 관계·transaction·authorization이 필요하다.

## Decision

Supabase PostgreSQL을 canonical product state의 System of Record로 사용한다. Auth는 Supabase Auth, attachment는 Supabase Storage를 사용한다. 모든 노출 사용자 table은 RLS를 갖는다.

## Consequences

- migration은 append-only Git asset이다.
- canonical state를 browser local storage나 AI checkpoint에 두지 않는다.
- Server check와 RLS를 함께 사용한다.
- Service Role은 제한된 system adapter에서만 사용한다.

## Rejected alternatives

- document database primary: relational rights·version·evaluation invariant에 부적합.
- application authorization only: direct Data API와 우회 접근 방어가 약함.

## Verification

- exposed schema table의 RLS test가 존재한다.
- submitted version invariant가 database constraint·service로 보호된다.

## References

- https://supabase.com/docs/guides/database/postgres/row-level-security
