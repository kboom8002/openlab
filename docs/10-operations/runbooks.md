---
doc_id: WOL-OPS-002
title: Runbooks Incident Backup Monthly Challenge
status: approved
authority: canonical
owner: platform-operations
last_verified: 2026-08-01
depends_on: [WOL-OPS-001, WOL-DOM-002]
affects: [.agents/artifacts/**]
supersedes: null
---

# Operations Runbooks

## Incident

SEV-1: private data exposure, auth/RLS bypass, destructive corruption. 즉시 write/feature 차단, 증거 보존, security owner 호출. SEV-2: 제출·평가·AI 핵심 흐름 장애. SEV-3: 비핵심 저하. 외부 통지 문구와 법정 시한은 승인된 정책 없이는 확정하지 않는다.

## Backup·restore

정기 backup 존재 여부만으로 복구를 선언하지 않는다. staging에서 RPO/RTO를 측정하고 restore drill report를 남긴다. 목표값은 `baseline_required`다.

## Monthly Challenge

Draft → content/rights review → schedule → open → monitor → close → eligibility → evaluation → selection → pilot → complete. Sponsor 명칭·로고는 relationship과 approval flag를 확인하며 JDC는 기본 proposal이다.

