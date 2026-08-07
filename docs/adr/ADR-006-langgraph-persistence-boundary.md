---
doc_id: WOL-ADR-006
title: Require Durable LangGraph Persistence Boundary
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


# ADR-006 — Require Durable LangGraph Persistence Boundary

## Status

Accepted with implementation deferred

## Context

Idea Studio는 중단·재개·human confirmation·fault recovery가 필요하다. LangGraph persistence는 thread와 checkpoint를 사용한다.

## Decision

Production graph는 durable checkpointer와 `thread_id`를 사용한다. In-memory saver는 local test에만 허용한다. Checkpoint는 canonical Idea Version이 아니며 별도 lifecycle을 가진다.

구체 Postgres saver·schema·retention·encryption은 Batch 6에서 확정한다.

## Consequences

- resume endpoint는 thread ownership을 검사한다.
- interrupt payload는 JSON serializable이어야 한다.
- checkpoint 실패 시 AI suggestion을 canonical state에 적용하지 않는다.
- deletion·retention 정책은 Idea data와 별도 검토한다.

## References

- https://docs.langchain.com/oss/javascript/langgraph/persistence
- https://docs.langchain.com/oss/javascript/langgraph/interrupts
