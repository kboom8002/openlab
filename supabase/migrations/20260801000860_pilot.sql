begin;

create table public.pilots (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id),
  challenge_id uuid not null references public.monthly_challenges(id),
  status text not null check (status in ('PLANNED','READY','IN_PROGRESS','PAUSED','COMPLETED','VALIDATED','NOT_VALIDATED','CANCELLED','ARCHIVED')) default 'PLANNED',
  title text not null,
  description text not null default '',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pilot_participants (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid not null references public.pilots(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id),
  role text not null check (role in ('idea_owner','partner','mentor','observer')) default 'idea_owner',
  joined_at timestamptz not null default now(),
  unique(pilot_id, user_id)
);

create table public.pilot_updates (
  id uuid primary key default gen_random_uuid(),
  pilot_id uuid not null references public.pilots(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  type text not null check (type in ('progress','milestone','metric','result','note')) default 'progress',
  title text not null,
  content text not null default '',
  evidence_path text,
  created_at timestamptz not null default now()
);

alter table public.pilots enable row level security;
alter table public.pilot_participants enable row level security;
alter table public.pilot_updates enable row level security;

-- RLS: pilots - participant/partner/manager scoped
create policy pilot_participant_read on public.pilots for select
  using (exists(select 1 from public.pilot_participants pp where pp.pilot_id = id and pp.user_id = auth.uid()));

create policy pilot_manager_all on public.pilots for all
  using (private.manages_challenge(challenge_id))
  with check (private.manages_challenge(challenge_id));

-- RLS: pilot_participants
create policy pilot_part_self on public.pilot_participants for select
  using (user_id = auth.uid());

create policy pilot_part_manager on public.pilot_participants for all
  using (exists(select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id)))
  with check (exists(select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id)));

-- RLS: pilot_updates
create policy pilot_updates_scoped on public.pilot_updates for select
  using (exists(select 1 from public.pilot_participants pp where pp.pilot_id = pilot_id and pp.user_id = auth.uid()));

create policy pilot_updates_author on public.pilot_updates for insert
  with check (author_id = auth.uid() and exists(select 1 from public.pilot_participants pp where pp.pilot_id = pilot_id and pp.user_id = auth.uid()));

create policy pilot_updates_manager on public.pilot_updates for all
  using (exists(select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id)))
  with check (exists(select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id)));

-- Indexes
create index idx_pilots_challenge on public.pilots(challenge_id);
create index idx_pilots_version on public.pilots(idea_version_id);
create index idx_pilot_participants_pilot on public.pilot_participants(pilot_id);
create index idx_pilot_participants_user on public.pilot_participants(user_id);
create index idx_pilot_updates_pilot on public.pilot_updates(pilot_id);

grant select on public.pilots to authenticated;
grant select on public.pilot_participants to authenticated;
grant select, insert on public.pilot_updates to authenticated;

commit;
