---
doc_id: WOL-SUPABASE-001
title: Migration Directory Rules
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-007
affects:
- supabase/migrations/**
supersedes: null
---

# Migration Directory Rules

- 공유된 migration 수정 금지.
- timestamp + snake_case name.
- schema·constraint·RLS·index·grant를 변경 목적에 맞게 함께 검토.
- 모든 migration은 local reset, allow test와 deny test를 통과해야 한다.
- 실행 SQL은 이후 feature task에서 생성한다.
