---
doc_id: WOL-AGSK-001
title: Antigravity Skill Package
status: approved
authority: canonical
owner: product-engineering
last_verified: 2026-08-01
depends_on: [WOL-AGENT-001, WOL-FEAT-001, WOL-QA-001]
affects: [.agents/**]
supersedes: null
---

# Antigravity Skill Package

Skill은 자동 권한이 아니다. 모든 skill은 AGENTS.md, task scope, open decision, RLS·rights stop rule을 먼저 적용한다.

| Skill | 입력 | 필수 산출물 |
|---|---|---|
| context-bootstrap | task id·paths | context digest·stop report |
| vertical-slice-plan | VS id | implementation plan·trace matrix |
| supabase-safe-change | migration scope | migration·RLS report |
| ai-contract-change | graph/prompt/schema | registry diff·AI eval report |
| release-evidence | candidate ref | test·release report |

