begin;

create table public.sponsor_report_snapshots (
  id uuid primary key default gen_random_uuid(),
  sponsorship_id uuid not null references public.sponsorships(id) on delete cascade,
  challenge_id uuid not null references public.monthly_challenges(id),
  report_data jsonb not null default '{}'::jsonb,
  generated_at timestamptz not null default now(),
  approved_by uuid references auth.users(id),
  approved_at timestamptz,
  published_at timestamptz,
  status text not null check (status in ('draft','approved','published','archived')) default 'draft'
);

create table public.sponsor_showcase_items (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.sponsor_report_snapshots(id) on delete cascade,
  idea_version_id uuid not null references public.idea_versions(id),
  showcase_permission_id uuid not null references public.showcase_permissions(id),
  summary_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.sponsor_pilot_summaries (
  id uuid primary key default gen_random_uuid(),
  snapshot_id uuid not null references public.sponsor_report_snapshots(id) on delete cascade,
  pilot_id uuid not null references public.pilots(id),
  summary_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.sponsor_report_snapshots enable row level security;
alter table public.sponsor_showcase_items enable row level security;
alter table public.sponsor_pilot_summaries enable row level security;

-- RLS: sponsor_report_snapshots
create policy snapshot_sponsor_read on public.sponsor_report_snapshots for select
  using (private.can_view_sponsor_snapshot(id));

create policy snapshot_manager_all on public.sponsor_report_snapshots for all
  using (private.manages_challenge(challenge_id))
  with check (private.manages_challenge(challenge_id));

-- RLS: sponsor_showcase_items (follows snapshot)
create policy showcase_item_sponsor on public.sponsor_showcase_items for select
  using (exists(select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.can_view_sponsor_snapshot(srs.id)));

create policy showcase_item_manager on public.sponsor_showcase_items for all
  using (exists(select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id)))
  with check (exists(select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id)));

-- RLS: sponsor_pilot_summaries (follows snapshot)
create policy pilot_summary_sponsor on public.sponsor_pilot_summaries for select
  using (exists(select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.can_view_sponsor_snapshot(srs.id)));

create policy pilot_summary_manager on public.sponsor_pilot_summaries for all
  using (exists(select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id)))
  with check (exists(select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id)));

-- Indexes
create index idx_snapshots_sponsorship on public.sponsor_report_snapshots(sponsorship_id);
create index idx_snapshots_challenge on public.sponsor_report_snapshots(challenge_id);
create index idx_showcase_snapshot on public.sponsor_showcase_items(snapshot_id);
create index idx_pilot_summary_snapshot on public.sponsor_pilot_summaries(snapshot_id);

grant select on public.sponsor_report_snapshots to authenticated;
grant select on public.sponsor_showcase_items to authenticated;
grant select on public.sponsor_pilot_summaries to authenticated;

commit;
