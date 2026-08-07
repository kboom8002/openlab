---
doc_id: WOL-ADR-000
title: Architecture Decision Record Index
status: approved
authority: canonical
owner: architecture
last_verified: '2026-07-31'
depends_on:
- WOL-ARCH-000
affects:
- docs/adr/**
- contracts/architecture/adr-register.yaml
supersedes: null
---


# Architecture Decision Record Index

| ADR | Decision | Status |
|---|---|---|
| ADR-001 | Next.js App Router | Accepted |
| ADR-002 | Single repository | Accepted |
| ADR-003 | Supabase PostgreSQL System of Record | Accepted |
| ADR-004 | Server Action vs Route Handler | Accepted |
| ADR-005 | AI Provider abstraction | Accepted |
| ADR-006 | Durable LangGraph persistence boundary | Accepted, implementation deferred |
| ADR-007 | shadcn/ui Base UI primitive | Accepted |
| ADR-008 | Background job boundary | Accepted |
| ADR-009 | Dedicated Sponsor read model | Accepted |
| ADR-010 | Audit and provenance separation | Accepted |

## 변경 규칙

- Accepted ADR을 조용히 수정하지 않는다.
- 결정을 바꿀 때 새 ADR이 기존 ADR을 supersede한다.
- ADR 변경은 관련 core architecture와 machine contract를 같은 변경에서 갱신한다.
- 구현되지 않은 상세는 ADR에 확정된 것처럼 쓰지 않는다.
