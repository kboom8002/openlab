---
doc_id: WOL-SEC-001
title: Security Rights and Governance
status: approved
authority: canonical
owner: security-product
last_verified: 2026-08-01
depends_on: [WOL-DOM-008, WOL-DATA-004, WOL-API-001]
affects: [src/**, supabase/**, contracts/security/**]
supersedes: null
---

# Security, Rights and Governance

아이디어 권리는 제출자에게 유지되며 제출만으로 소유권이 이전되지 않는다. 접근은 deny-by-default, RLS, 최소권한, purpose limitation을 적용한다. Sponsor는 dedicated read model만 사용한다.

| 자산 | 기본 접근 | 예외 |
|---|---|---|
| Draft·AI 대화 | owner | D-S02 승인 전 운영자 예외 비활성 |
| Submitted Version | 지정 evaluator/expert/manager | 역할·assignment 범위 |
| Public projection | anonymous | consent + approval 후만 |
| Sponsor report | sponsor_viewer | aggregate·consented only |
| Audit | authorized admin | 목적·기간 제한 |

미확정 보존기간은 `pending_legal_review`이며 임의 일수를 만들지 않는다.

