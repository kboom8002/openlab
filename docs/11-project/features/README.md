---
doc_id: WOL-FEAT-001
title: Feature Vertical Slice Index
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-API-001, WOL-INDEX-001]
affects: [src/**, contracts/features/**]
supersedes: null
---

# Feature Vertical Slice Index

| ID | Slice | Page | Server | Data·RLS | AI |
|---|---|---|---|---|---|
| VS-01 | Auth·Onboarding | P004 | callback, onboarding action | profile self | 없음 |
| VS-02 | Challenge Discovery | P002·P003 | read query | published challenge | 없음 |
| VS-03 | Idea Draft·Studio | P006·P018 | draft actions, AI stream | owner-only draft | Idea Graph |
| VS-04 | Passport·Submission | P007·P008 | apply, preflight, submit | immutable version | Synthesis·Preflight |
| VS-05 | Evaluation·Selection | P009·P010·P013 | evaluation actions | assignment scoped | Evaluation Graph |
| VS-06 | Publication·Sponsor | P011·P014·P019 | publication decision, reports | consent + read model | 없음 |

각 Slice는 한 번에 하나의 acceptance boundary로 구현한다. P0 결정·권리 충돌·RLS 공백이 있으면 작업을 중단한다.

