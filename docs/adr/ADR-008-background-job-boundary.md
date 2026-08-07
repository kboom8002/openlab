---
doc_id: WOL-ADR-008
title: Introduce a Background Job Boundary Before Long Tasks
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


# ADR-008 — Introduce a Background Job Boundary Before Long Tasks

## Status

Accepted

## Context

AI evaluation, report, export와 notification은 request timeout·provider rate limit·retry를 필요로 한다.

## Decision

long-running operation은 `JobDispatcher` interface와 persisted job state 뒤에서 실행한다. 구체 queue vendor는 Batch 7·11에서 결정한다.

## Consequences

- long evaluation을 browser request 안에서 완료시키지 않는다.
- job payload는 object ID·capability 중심이다.
- idempotency, retry, dead-letter가 필수다.
- first vertical slice의 short coach stream은 동기 Route Handler로 허용한다.

## Rejected alternatives

- 모든 AI를 Route Handler에서 동기 실행: timeout·재시도·관측 취약.
- provider queue에 domain state를 위임: canonical 상태와 audit 분리.

## Verification

- async-required job type이 contract에 등록된다.
- duplicate enqueue test가 존재한다.
