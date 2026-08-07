begin;

-- Organizations table
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  slug text not null unique,
  description text not null default '',
  status text not null check (status in ('active', 'paused', 'archived')) default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Organization members table
create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('member', 'challenge_manager', 'sponsor_viewer', 'pilot_partner', 'organization_admin')) default 'member',
  joined_at timestamptz not null default now(),
  unique(organization_id, user_id)
);

-- Add organization_id to monthly_challenges for org-scoped management
alter table public.monthly_challenges add column if not exists organization_id uuid references public.organizations(id);

-- Enable RLS
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;

-- RLS: organizations visible to members
create policy org_member_select on public.organizations for select
  using (exists(select 1 from public.organization_members om where om.organization_id = id and om.user_id = auth.uid()));

create policy org_admin_all on public.organizations for all
  using (exists(select 1 from public.organization_members om where om.organization_id = id and om.user_id = auth.uid() and om.role = 'organization_admin'))
  with check (exists(select 1 from public.organization_members om where om.organization_id = id and om.user_id = auth.uid() and om.role = 'organization_admin'));

-- RLS: org members see own memberships
create policy org_member_self_select on public.organization_members for select
  using (user_id = auth.uid());

create policy org_member_admin_all on public.organization_members for all
  using (exists(select 1 from public.organization_members om2 where om2.organization_id = organization_id and om2.user_id = auth.uid() and om2.role = 'organization_admin'))
  with check (exists(select 1 from public.organization_members om2 where om2.organization_id = organization_id and om2.user_id = auth.uid() and om2.role = 'organization_admin'));

-- Add manager read policy to monthly_challenges for org-scoped challenges
create policy challenge_manager_org on public.monthly_challenges for all
  using (private.manages_challenge(id))
  with check (private.manages_challenge(id));

-- Indexes
create index idx_org_members_user on public.organization_members(user_id);
create index idx_org_members_org on public.organization_members(organization_id);
create index idx_challenges_org on public.monthly_challenges(organization_id);

-- Grants
grant select on public.organizations to authenticated;
grant select on public.organization_members to authenticated;

commit;
