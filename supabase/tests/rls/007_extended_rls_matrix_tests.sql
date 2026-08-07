-- =============================================================
-- Extended RLS Matrix Tests (pgTAP Test Suite)
-- Contract: WOL-CONTRACT-DATA-004 (rls-policy-matrix.yaml)
-- Test File: supabase/tests/rls/007_extended_rls_matrix_tests.sql
-- 
-- Verifies extended RLS policies for:
--   1. org_member access isolation
--   2. challenge_manager write scope
--   3. consent_documents active filter
--   4. pilot management permissions
-- =============================================================
begin;

select plan(10);

-- ─── Fixtures ────────────────────────────────------------------
do $$
declare
  v_user_org_a uuid := gen_random_uuid();
  v_user_org_b uuid := gen_random_uuid();
  v_user_participant uuid := gen_random_uuid();
  v_user_unrelated uuid := gen_random_uuid();
  v_user_admin uuid := gen_random_uuid();

  v_org_a uuid := gen_random_uuid();
  v_org_b uuid := gen_random_uuid();

  v_challenge_a uuid := gen_random_uuid();
  v_challenge_b uuid := gen_random_uuid();

  v_idea_a uuid := gen_random_uuid();
  v_version_a uuid := gen_random_uuid();

  v_pilot_a uuid := gen_random_uuid();
  v_sponsorship_a uuid := gen_random_uuid();
  v_sponsorship_b uuid := gen_random_uuid();

  v_doc_active uuid := gen_random_uuid();
  v_doc_inactive uuid := gen_random_uuid();
begin
  -- 1. Create auth.users
  insert into auth.users (id, email) values
    (v_user_org_a, 'user_org_a_ext@wellb.test'),
    (v_user_org_b, 'user_org_b_ext@wellb.test'),
    (v_user_participant, 'user_part_ext@wellb.test'),
    (v_user_unrelated, 'user_unrelated_ext@wellb.test'),
    (v_user_admin, 'user_admin_ext@wellb.test');

  -- 2. Profiles
  insert into public.profiles (id, display_name) values
    (v_user_org_a, 'Org A Manager'),
    (v_user_org_b, 'Org B Manager'),
    (v_user_participant, 'Participant User'),
    (v_user_unrelated, 'Unrelated User'),
    (v_user_admin, 'Platform Admin');

  -- 3. Platform Role Assignments
  insert into public.platform_role_assignments (user_id, role) values
    (v_user_admin, 'admin');

  -- 4. Organizations
  insert into public.organizations (id, name, slug) values
    (v_org_a, 'Org Alpha Ext', 'org-alpha-ext'),
    (v_org_b, 'Org Beta Ext', 'org-beta-ext');

  -- 5. Organization Members
  insert into public.organization_members (organization_id, user_id, role) values
    (v_org_a, v_user_org_a, 'challenge_manager'),
    (v_org_b, v_user_org_b, 'challenge_manager');

  -- 6. Sponsorships (JDC relationship status is always 'proposal')
  insert into public.sponsorships (id, organization_id, relationship_status, notes) values
    (v_sponsorship_a, v_org_a, 'proposal', 'Org A Sponsorship'),
    (v_sponsorship_b, v_org_b, 'proposal', 'Org B Sponsorship');

  -- 7. Monthly Challenges
  insert into public.monthly_challenges (id, slug, title, status, organization_id) values
    (v_challenge_a, 'challenge-alpha-ext', 'Challenge Alpha', 'OPEN', v_org_a),
    (v_challenge_b, 'challenge-beta-ext', 'Challenge Beta', 'OPEN', v_org_b);

  -- 8. Ideas and Idea Versions for Pilot
  insert into public.ideas (id, challenge_id, owner_id, title, status, visibility) values
    (v_idea_a, v_challenge_a, v_user_participant, 'Pilot Idea Alpha', 'SUBMITTED', 'public');

  insert into public.idea_versions (id, idea_id, version_number, title, passport, content_hash, submitted_by) values
    (v_version_a, v_idea_a, 1, 'Pilot Idea Alpha', '{}', 'hash_pilot_ext_123', v_user_participant);

  update public.ideas set submitted_version_id = v_version_a where id = v_idea_a;

  -- 9. Pilots & Pilot Participants
  insert into public.pilots (id, idea_version_id, challenge_id, status, title) values
    (v_pilot_a, v_version_a, v_challenge_a, 'PLANNED', 'Pilot Project Alpha');

  insert into public.pilot_participants (pilot_id, user_id, organization_id, role) values
    (v_pilot_a, v_user_participant, v_org_a, 'idea_owner');

  -- 10. Consent Documents
  insert into public.consent_documents (id, version, title, type, content_hash, body, active) values
    (v_doc_active, 'v1.0-active-ext', 'Active Consent Document', 'terms_of_service', 'hash_act_ext', 'Active terms', true),
    (v_doc_inactive, 'v0.9-inactive-ext', 'Inactive Consent Document', 'terms_of_service', 'hash_inact_ext', 'Inactive terms', false);

  -- Store IDs in temp table
  create temp table _ext_test_ids (
    user_org_a uuid, user_org_b uuid, user_participant uuid, user_unrelated uuid, user_admin uuid,
    org_a uuid, org_b uuid, challenge_a uuid, challenge_b uuid,
    sponsorship_a uuid, sponsorship_b uuid, pilot_a uuid,
    doc_active uuid, doc_inactive uuid
  ) on commit drop;

  insert into _ext_test_ids values (
    v_user_org_a, v_user_org_b, v_user_participant, v_user_unrelated, v_user_admin,
    v_org_a, v_org_b, v_challenge_a, v_challenge_b,
    v_sponsorship_a, v_sponsorship_b, v_pilot_a,
    v_doc_active, v_doc_inactive
  );
end $$;

-- ─── 1. org_member access isolation ──────────────────────────
select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_org_a from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.sponsorships where organization_id = (select org_a from _ext_test_ids)
  ) _query),
  1,
  'org_member access isolation: Member of Org A can read Org A sponsorships'
);

select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_org_a from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.sponsorships where organization_id = (select org_b from _ext_test_ids)
  ) _query),
  0,
  'org_member access isolation: Member of Org A cannot read Org B sponsorships'
);

-- ─── 2. challenge_manager write scope ─────────────────────────
select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_org_a from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    update public.monthly_challenges set title = 'Updated Challenge Alpha'
    where id = (select challenge_a from _ext_test_ids) returning 1
  ) _query),
  1,
  'challenge_manager write scope: Challenge Manager A can update Challenge A'
);

select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_org_a from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    update public.monthly_challenges set title = 'Hacked Challenge Beta'
    where id = (select challenge_b from _ext_test_ids) returning 1
  ) _query),
  0,
  'challenge_manager write scope: Challenge Manager A cannot update Challenge B'
);

-- ─── 3. consent_documents active filter ───────────────────────
select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_unrelated from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.consent_documents where id = (select doc_active from _ext_test_ids)
  ) _query),
  1,
  'consent_documents active filter: Standard user can read active consent document'
);

select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_unrelated from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.consent_documents where id = (select doc_inactive from _ext_test_ids)
  ) _query),
  0,
  'consent_documents active filter: Standard user cannot read inactive consent document'
);

select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_admin from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.consent_documents where id = (select doc_inactive from _ext_test_ids)
  ) _query),
  1,
  'consent_documents active filter: Admin user can read inactive consent document'
);

-- ─── 4. pilot management permissions ──────────────────────────
select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_org_a from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.pilots where id = (select pilot_a from _ext_test_ids)
  ) _query),
  1,
  'pilot management permissions: Challenge Manager can view pilot'
);

select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_participant from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.pilots where id = (select pilot_a from _ext_test_ids)
  ) _query),
  1,
  'pilot management permissions: Pilot Participant can view pilot'
);

select is(
  (select count(*)::integer from (
    select set_config('request.jwt.claims', json_build_object('sub', (select user_unrelated from _ext_test_ids))::text, true)
  ) _setup,
  lateral (
    select 1 from public.pilots where id = (select pilot_a from _ext_test_ids)
  ) _query),
  0,
  'pilot management permissions: Unrelated user cannot view pilot'
);

select * from finish();
rollback;
