---
doc_id: WOL-ADR-010
title: Separate Audit Events from Content Provenance
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


# ADR-010 — Separate Audit Events from Content Provenance

## Status

Accepted

## Context

WELLB OPENLAB은 누가 어떤 상태를 변경했는지와 Passport 문장이 어디에서 왔는지를 모두 설명해야 한다.

## Decision

- **Audit Event:** 보안·운영 행위 기록.
- **Provenance Record:** 콘텐츠 field의 user·AI·external source 기원 기록.

두 모델을 별도 저장하고 목적에 맞는 retention·access를 적용한다.

## Consequences

- AI suggestion accept·edit·reject는 provenance와 audit를 모두 생성할 수 있다.
- Submitted Version은 provenance snapshot을 포함한다.
- 일반 사용자는 자신의 provenance를 볼 수 있지만 내부 보안 audit 전체는 보지 못한다.
- audit row는 append-only이며 민감 content를 복사하지 않는다.

## Rejected alternative

하나의 activity log에 모든 내용 저장: 권한·retention·privacy 목적이 충돌함.

## Verification

- field-level source와 state transition actor를 별도로 조회할 수 있다.
- audit log에 full Idea text가 없다.
