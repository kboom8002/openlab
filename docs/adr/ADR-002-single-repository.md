---
doc_id: WOL-ADR-002
title: Start with a Single Repository
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


# ADR-002 — Start with a Single Repository

## Status

Accepted

## Context

MVP는 Web, shared domain, AI graph와 optional worker 경계를 필요로 하지만 아직 독립 package·team·release cadence가 없다.

## Decision

단일 Git repository와 단일 pnpm package workspace로 시작한다. 별도 deploy entrypoint가 필요해도 같은 repository의 명시된 runtime boundary를 사용한다.

## Consequences

- 초기 package publishing과 cross-package versioning이 없다.
- domain schema와 contracts를 복제하지 않는다.
- worker가 필요하면 `src/worker` 또는 deployment entry를 추가하되 monorepo로 자동 전환하지 않는다.
- 전환 조건을 `repository-structure.md`에서 측정한다.

## Rejected alternatives

- 초기 monorepo: 실제 deployable·ownership 분리가 없어 복잡도만 증가.
- 별도 AI repository: schema·prompt·domain drift 위험.

## Verification

- 하나의 root `package.json`과 lockfile이 진실 공급원이다.
- repository boundary contract가 path ownership을 설명한다.
