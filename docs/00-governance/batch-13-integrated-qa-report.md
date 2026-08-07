---
doc_id: WOL-GOV-B13
title: Batch 13 Integrated QA Report
status: approved
authority: informative
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-INDEX-001, WOL-QA-001, WOL-AGSK-001]
affects: [contracts/batch13-manifest.yaml, QA_REPORT.txt]
supersedes: null
---

# Batch 13 통합 QA 보고서

## 결론

Batch 0~12를 하나의 지속 레포로 통합했고 Batch 13 자동·수동 QA를 통과했다. 기존 파일은 삭제하지 않았고 Batch 7~12 종료 시 중간 ZIP을 만들지 않았다.

| 검사 | 결과 | 근거 |
|---|---|---|
| YAML·JSON parse | PASS | YAML 68, JSON 7 |
| doc_id·contract_id 중복 | PASS | 중복 0 |
| Markdown 내부 링크 | PASS | broken 0 |
| 평가 비중 | PASS | AI 25·Pairwise 25·Expert 50·Committee 0 |
| JDC 상태 | PASS | `proposal`; active claim 없음 |
| Sponsor·RLS 경계 | PASS | dedicated read model, raw Draft denied |

자동 검사: `python scripts/qa/repo_contract_qa.py`

Antigravity onboarding test는 `VS-03`을 샘플로 AGENTS → INDEX → Feature → Page → API → Data/RLS → AI → Security → Quality trace를 수행했다. Owner-only Draft, expected revision, interrupt decision, provenance, cross-user denial을 추적할 수 있다.

미확정 상태는 유지했다: D-T04 runner, D-T06 deployment platform, D-UX09 publication, D-S02 operator exception, D-S03 provider allowlist legal approval, D-S04·D-S05 retention/deletion, SLO·RPO·RTO와 일반 AI threshold. JDC는 `proposal`이다.

실제 애플리케이션 코드가 없으므로 pnpm 검증, migration, E2E, 배포는 `NOT_RUN — documentation-only repository`다.
