begin;

create table public.pairwise_votes (
  id uuid primary key default gen_random_uuid(),
  voter_id uuid not null references auth.users(id) on delete cascade,
  challenge_id uuid not null references public.monthly_challenges(id) on delete cascade,
  idea_version_a_id uuid not null references public.idea_versions(id),
  idea_version_b_id uuid not null references public.idea_versions(id),
  choice text not null check (choice in ('A','B','similar','cannot_judge')),
  reasoning text,
  created_at timestamptz not null default now(),
  -- Prevent duplicate votes on same pair
  unique(voter_id, idea_version_a_id, idea_version_b_id)
);

create table public.selection_decisions (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id),
  challenge_id uuid not null references public.monthly_challenges(id),
  decided_by uuid not null references auth.users(id),
  decision text not null check (decision in ('promising','pilot_ready','hold','not_selected')),
  reason text not null check (char_length(reason) >= 10),
  snapshot_data jsonb not null default '{}'::jsonb,
  decided_at timestamptz not null default now()
);

alter table public.pairwise_votes enable row level security;
alter table public.selection_decisions enable row level security;

-- RLS: pairwise_votes - insert self, manager reads aggregate
create policy pairwise_self_insert on public.pairwise_votes for insert
  with check (voter_id = auth.uid());

create policy pairwise_self_read on public.pairwise_votes for select
  using (voter_id = auth.uid());

create policy pairwise_manager_read on public.pairwise_votes for select
  using (private.manages_challenge(challenge_id));

-- RLS: selection_decisions - manager write, participant reads after publish
create policy selection_manager_all on public.selection_decisions for all
  using (private.manages_challenge(challenge_id))
  with check (private.manages_challenge(challenge_id));

create policy selection_participant_read on public.selection_decisions for select
  using (exists(
    select 1 from public.idea_versions iv
    join public.ideas i on i.id = iv.idea_id
    where iv.id = idea_version_id and i.owner_id = auth.uid()
  ));

-- Indexes
create index idx_pairwise_voter on public.pairwise_votes(voter_id);
create index idx_pairwise_challenge on public.pairwise_votes(challenge_id);
create index idx_selection_version on public.selection_decisions(idea_version_id);
create index idx_selection_challenge on public.selection_decisions(challenge_id);

grant select, insert on public.pairwise_votes to authenticated;
grant select on public.selection_decisions to authenticated;

commit;
