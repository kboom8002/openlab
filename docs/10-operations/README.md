---
doc_id: WOL-OPS-001
title: Deployment and Operations
status: approved
authority: canonical
owner: platform-operations
last_verified: 2026-08-01
depends_on: [WOL-QA-001, WOL-ARCH-003]
affects: [deployment/**, contracts/operations/**]
supersedes: null
---

# Deployment and Operations

환경은 local, preview, staging, production으로 분리하며 DB·Storage·AI checkpoint를 환경 간 공유하지 않는다. Vercel은 권장 후보이나 D-T06 미결정이므로 `candidate`다. Supabase project도 환경별 분리한다.

Release 순서: contract QA → test/build → migration dry-run → staging smoke/RLS/AI eval → 승인 → production migration → deploy → smoke → 관찰. rollback은 app rollback과 forward-only DB remediation을 분리한다.

