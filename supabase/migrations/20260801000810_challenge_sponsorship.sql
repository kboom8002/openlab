begin;

create table public.challenge_series (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  description text not null default '',
  status text not null check (status in ('DRAFT','PLANNED','ACTIVE','PAUSED','COMPLETED','ARCHIVED')) default 'DRAFT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add series_id to monthly_challenges
alter table public.monthly_challenges add column if not exists series_id uuid references public.challenge_series(id);

create table public.sponsorships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  challenge_series_id uuid references public.challenge_series(id),
  relationship_status text not null check (relationship_status in ('proposal','under_discussion','agreement_pending','active','paused','ended')) default 'proposal',
  approved_scope jsonb not null default '{}'::jsonb,
  contact_name text,
  contact_email text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.challenge_tracks (
  id uuid primary key default gen_random_uuid(),
  monthly_challenge_id uuid not null references public.monthly_challenges(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  description text not null default '',
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.challenge_participations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  monthly_challenge_id uuid not null references public.monthly_challenges(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  unique(user_id, monthly_challenge_id)
);

-- Enable RLS
alter table public.challenge_series enable row level security;
alter table public.sponsorships enable row level security;
alter table public.challenge_tracks enable row level security;
alter table public.challenge_participations enable row level security;

-- RLS: challenge_series public read for active, manager write
create policy series_public_read on public.challenge_series for select
  using (status in ('ACTIVE', 'COMPLETED'));
create policy series_manager_all on public.challenge_series for all
  using (private.is_org_member(organization_id))
  with check (private.is_org_member(organization_id));

-- RLS: sponsorships visible to org members and managers
create policy sponsorship_org_select on public.sponsorships for select
  using (private.is_org_member(organization_id));
create policy sponsorship_manager_write on public.sponsorships for insert
  with check (private.is_org_member(organization_id));
create policy sponsorship_manager_update on public.sponsorships for update
  using (private.is_org_member(organization_id))
  with check (private.is_org_member(organization_id));

-- RLS: challenge_tracks public read (follows parent challenge visibility)
create policy tracks_public_read on public.challenge_tracks for select
  using (exists(select 1 from public.monthly_challenges mc where mc.id = monthly_challenge_id and mc.status in ('SCHEDULED','OPEN','CLOSED','EVALUATION','SELECTION','PILOTING','COMPLETED')));
create policy tracks_manager_all on public.challenge_tracks for all
  using (exists(select 1 from public.monthly_challenges mc where mc.id = monthly_challenge_id and private.manages_challenge(mc.id)))
  with check (exists(select 1 from public.monthly_challenges mc where mc.id = monthly_challenge_id and private.manages_challenge(mc.id)));

-- RLS: challenge_participations - owner and manager
create policy participation_self on public.challenge_participations for select
  using (user_id = auth.uid());
create policy participation_insert on public.challenge_participations for insert
  with check (user_id = auth.uid());
create policy participation_manager_read on public.challenge_participations for select
  using (exists(select 1 from public.monthly_challenges mc where mc.id = monthly_challenge_id and private.manages_challenge(mc.id)));

-- Indexes
create index idx_tracks_challenge on public.challenge_tracks(monthly_challenge_id);
create index idx_participations_user on public.challenge_participations(user_id);
create index idx_participations_challenge on public.challenge_participations(monthly_challenge_id);
create index idx_sponsorships_org on public.sponsorships(organization_id);

-- Grants
grant select on public.challenge_series to anon, authenticated;
grant select on public.challenge_tracks to anon, authenticated;
grant select, insert on public.challenge_participations to authenticated;
grant select on public.sponsorships to authenticated;

commit;
