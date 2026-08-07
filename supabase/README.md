---
doc_id: WOL-SUPABASE-000
title: Supabase Directory Contract
status: approved
authority: canonical
owner: data-platform
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-000
- WOL-DATA-007
affects:
- supabase/**
supersedes: null
---

# Supabase Directory Contract

이 디렉터리는 이후 구현 Batch에서 생성할 Supabase local project의 경계다.

```text
supabase/
├─ config.toml
├─ migrations/
├─ seed.sql
├─ policies/
├─ tests/
│  └─ rls/
└─ functions/        # Edge Function을 채택한 경우만
```

현재 Batch 5는 실행 migration을 생성하지 않는다. `contracts/data/`와 `docs/05-data/` 승인 후 Vertical Slice task에서 timestamped migration을 생성한다.
