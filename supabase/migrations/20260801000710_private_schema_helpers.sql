begin;

create schema if not exists private;

-- 1. has_platform_role
create or replace function private.has_platform_role(p_role text)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.platform_role_assignments
    where user_id = auth.uid()
      and role = p_role::public.user_role
  );
$$;
revoke execute on function private.has_platform_role(text) from public;
grant execute on function private.has_platform_role(text) to authenticated;

-- 2. is_org_member
create or replace function private.is_org_member(p_org_id uuid)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = p_org_id
      and user_id = auth.uid()
  );
$$;
revoke execute on function private.is_org_member(uuid) from public;
grant execute on function private.is_org_member(uuid) to authenticated;

-- 3. manages_challenge
create or replace function private.manages_challenge(p_challenge_id uuid)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.monthly_challenges mc
    join public.organization_members om on mc.organization_id = om.organization_id
    where mc.id = p_challenge_id
      and om.user_id = auth.uid()
      and om.role in ('challenge_manager', 'organization_admin')
  );
$$;
revoke execute on function private.manages_challenge(uuid) from public;
grant execute on function private.manages_challenge(uuid) to authenticated;

-- 4. owns_idea
create or replace function private.owns_idea(p_idea_id uuid)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.ideas
    where id = p_idea_id
      and owner_id = auth.uid()
  );
$$;
revoke execute on function private.owns_idea(uuid) from public;
grant execute on function private.owns_idea(uuid) to authenticated;

-- 5. is_assigned_evaluator
create or replace function private.is_assigned_evaluator(p_assignment_id uuid)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.evaluation_assignments
    where id = p_assignment_id
      and evaluator_id = auth.uid()
  );
$$;
revoke execute on function private.is_assigned_evaluator(uuid) from public;
grant execute on function private.is_assigned_evaluator(uuid) to authenticated;

-- 6. can_view_sponsor_snapshot
create or replace function private.can_view_sponsor_snapshot(p_snapshot_id uuid)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1
    from public.sponsor_report_snapshots srs
    join public.sponsorships s on srs.sponsorship_id = s.id
    join public.organization_members om on s.organization_id = om.organization_id
    where srs.id = p_snapshot_id
      and om.user_id = auth.uid()
  );
$$;
revoke execute on function private.can_view_sponsor_snapshot(uuid) from public;
grant execute on function private.can_view_sponsor_snapshot(uuid) to authenticated;

-- 7. can_access_storage_resource
create or replace function private.can_access_storage_resource(p_path text)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select p_path like (auth.uid()::text || '/%');
$$;
revoke execute on function private.can_access_storage_resource(text) from public;
grant execute on function private.can_access_storage_resource(text) to authenticated;

commit;
