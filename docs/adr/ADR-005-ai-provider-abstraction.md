---
doc_id: WOL-ADR-005
title: Use an AI Provider Abstraction
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


# ADR-005 — Use an AI Provider Abstraction

## Status

Accepted

## Context

초기 primary candidate는 OpenAI지만 model·price·availability·policy는 변경될 수 있다.

## Decision

Graph node는 provider SDK가 아니라 `AIProvider` interface를 호출한다. Model key는 central registry에서 provider·model·timeout·capability로 해석한다.

## Required capabilities

- structured output
- streaming
- timeout·abort
- token/usage capture
- provider error normalization
- test provider

## Consequences

최저 공통 기능에만 맞추지 않는다. capability가 필요한 graph는 registry에서 명시적으로 요구하고 unsupported provider는 실행 전에 실패한다.

## Rejected alternative

Provider SDK를 component·node에 직접 사용: 교체·테스트·error normalization이 어려움.

## Verification

- provider package import는 `src/ai/providers/**`에 제한된다.
- golden test는 deterministic test provider로 실행 가능하다.
