---
doc_id: WOL-OPS-003
title: Production Readiness Gate
status: approved
authority: canonical
owner: platform-operations
last_verified: 2026-08-01
depends_on: [WOL-OPS-001, WOL-QA-001, WOL-SEC-001]
affects: [.github/**, src/**, supabase/**]
supersedes: null
---

# Production Readiness Gate

이 레포는 production-capable scaffold를 포함하지만 승인 없이 배포하지 않는다.

## 자동 필수 Gate

- frozen dependency install
- contract QA, lint, strict typecheck, unit test, production build
- clean Supabase reset, pgTAP RLS test
- CodeQL·dependency review에 unresolved critical/high 없음
- migration review와 staging smoke

## 사람 승인 Gate

- D-T06 배포 플랫폼과 environment ownership
- D-S02~05 privacy·operator·retention·deletion 승인
- 비밀키 생성·rotation·break-glass owner
- backup restore drill로 RPO/RTO baseline 측정
- incident owner와 통지 절차
- 공개·Sponsor 기능은 consent·approval 결정 후 별도 feature flag 승인
- JDC 공식 계약·명칭·로고 승인 전 `proposal` 유지

## 배포 판정

`READY_FOR_STAGING`은 모든 자동 Gate 통과 상태다. `APPROVED_FOR_PRODUCTION`은 staging evidence와 사람 승인 Gate까지 충족한 경우에만 release approver가 선언한다. AI agent는 이 상태를 스스로 부여할 수 없다.

