---
doc_id: WOL-SEC-003
title: Threat Model and Abuse Controls
status: approved
authority: canonical
owner: security-engineering
last_verified: 2026-08-01
depends_on: [WOL-SEC-001, WOL-API-004]
affects: [src/**, supabase/**]
supersedes: null
---

# Threat Model

주요 위협은 IDOR, RLS bypass, service-role 노출, prompt injection, malicious upload, webhook replay, evaluation manipulation, Sponsor re-identification, log leakage다. 통제는 object authorization, RLS negative tests, server-only secrets, tool/field allowlist, MIME magic-byte 검사, replay cache, conflict declaration, small-cell suppression, structured logging redaction이다.

운영자 break-glass는 D-S02 결정 전 비활성이다. 안전 hold는 권리 이전이나 자동 탈락을 뜻하지 않으며 reason·reviewer·expiry·audit가 필요하다.

