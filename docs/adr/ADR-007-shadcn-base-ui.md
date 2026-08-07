---
doc_id: WOL-ADR-007
title: Use shadcn/ui with Base UI Primitives
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


# ADR-007 — Use shadcn/ui with Base UI Primitives

## Status

Accepted

## Context

신규 WELLB OPENLAB scaffold는 primitive 혼용 없이 접근 가능한 component foundation이 필요하다.

## Decision

shadcn/ui를 Base UI primitive로 초기화한다. Radix와 React Aria component를 같은 프로젝트에 임의 혼합하지 않는다.

## Consequences

- `components.json`이 primitive 선택의 code-level source다.
- component code는 repository가 소유한다.
- upstream update는 diff·accessibility regression을 검토한다.
- 기존 example을 복사할 때 Base UI variant인지 확인한다.

## Rejected alternatives

- Radix: 계속 지원되지만 신규 프로젝트의 기본 선택을 따를 이점이 큼.
- 혼합: focus·state selector·API 차이로 유지보수 비용 증가.

## Verification

- `shadcn info`와 `components.json`이 Base UI를 표시한다.
- primitive package 혼합을 dependency check가 탐지한다.

## References

- https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default
- https://ui.shadcn.com/docs/cli
