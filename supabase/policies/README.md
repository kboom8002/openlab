---
doc_id: WOL-SUPABASE-002
title: RLS Policy Implementation Notes
status: approved
authority: canonical
owner: security-data
last_verified: '2026-07-31'
depends_on:
- WOL-DATA-005
- WOL-DATA-012
affects:
- supabase/policies/**
supersedes: null
---

# RLS Policy Implementation Notes

정책 원본은 migration이며 이 디렉터리는 복잡한 policy의 review용 분리 SQL 또는 설명을 둘 수 있다.

- policy 이름은 table·operation·subject·condition을 포함한다.
- `TO authenticated` 등 role을 명시한다.
- `(select auth.uid())`를 사용한다.
- Sponsor operational table read policy를 만들지 않는다.
