---
doc_id: WOL-ADR-009
title: Use Dedicated Sponsor Read Models
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


# ADR-009 — Use Dedicated Sponsor Read Models

## Status

Accepted

## Context

Sponsor는 집계 성과와 동의된 Showcase를 볼 수 있지만 Draft, 비공개 원문, transcript와 평가자 신원은 볼 수 없다.

## Decision

Sponsor surface는 dedicated aggregate·showcase·pilot read model만 사용한다. raw operational Idea·Conversation·Evaluation repository를 직접 조회하지 않는다.

## Consequences

- manager approval·participant consent가 publication input이다.
- report에는 기준 시각과 source scope를 기록한다.
- sponsor membership과 read model RLS를 별도 테스트한다.
- official sponsor status·logo approval는 별도 domain state다.

## Rejected alternative

Raw table에 sponsor SELECT policy 추가: 향후 column 추가·join으로 정보 누출 가능성이 큼.

## Verification

- Sponsor query module이 raw Idea repository를 import하지 않는다.
- consent 철회 시 Showcase 제거 flow가 존재한다.
