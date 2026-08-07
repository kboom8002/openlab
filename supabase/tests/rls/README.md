---
doc_id: WOL-SUPABASE-003
title: RLS Test Catalog
status: approved
authority: canonical
owner: quality-security
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-005
affects:
- supabase/tests/rls/**
supersedes: null
---

# RLS Test Catalog

최소 테스트 personas와 deny cases는 `docs/05-data/seed-data-policy.md`와 `contracts/data/rls-policy-matrix.yaml`을 따른다.

필수 그룹:

- profile self vs cross-user
- Draft owner vs cross-user
- assigned vs unassigned evaluator
- same vs cross organization manager
- Sponsor own snapshot vs other Sponsor
- Sponsor raw Idea/AI denial
- submitted Version immutability
- Storage object parent permission
