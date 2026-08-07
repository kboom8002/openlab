begin;

-- Create evaluator_assignments table
create table if not exists public.evaluator_assignments (
  id uuid primary key default gen_random_uuid(),
  evaluator_id uuid not null references auth.users(id) on delete cascade,
  idea_version_id uuid not null references public.idea_versions(id) on delete cascade,
  status text not null check (status in ('ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'CONFLICT_DECLARED')) default 'ASSIGNED',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(evaluator_id, idea_version_id)
);

-- Create evaluations table
create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id) on delete cascade,
  evaluator_id uuid references auth.users(id) on delete set null,
  evaluation_type text not null check (evaluation_type in ('AI', 'PAIRWISE', 'EXPERT')),
  conflict_declared boolean not null default false,
  score numeric(5, 2) not null check (score >= 0 and score <= 100),
  rubric_scores jsonb default '{}'::jsonb,
  rationale text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.evaluator_assignments enable row level security;
alter table public.evaluations enable row level security;

-- Assignments RLS: evaluators read their own assignments
drop policy if exists evaluator_assignments_self on public.evaluator_assignments;
create policy evaluator_assignments_self on public.evaluator_assignments
  for all using (auth.uid() = evaluator_id);

-- Evaluations RLS: evaluators read/insert their own evaluations only (Evaluator Isolation)
drop policy if exists evaluations_self_only on public.evaluations;
create policy evaluations_self_only on public.evaluations
  for all using (auth.uid() = evaluator_id);

-- Function to compute composite multi-layer score (25% AI, 25% Pairwise, 50% Expert)
create or replace function public.calculate_composite_score(
  p_idea_version_id uuid
)
returns table(
  ai_score numeric,
  pairwise_score numeric,
  expert_score numeric,
  composite_score numeric
)
language plpgsql security definer set search_path = '' as $$
declare
  v_ai numeric;
  v_pairwise numeric;
  v_expert numeric;
  v_composite numeric;
begin
  -- 1. Get average AI score (or default 70)
  select coalesce(avg(score), 70.0) into v_ai
  from public.evaluations
  where idea_version_id = p_idea_version_id and evaluation_type = 'AI';

  -- 2. Get average Pairwise score (or default 75)
  select coalesce(avg(score), 75.0) into v_pairwise
  from public.evaluations
  where idea_version_id = p_idea_version_id and evaluation_type = 'PAIRWISE';

  -- 3. Get average Expert score (where conflict is false)
  select coalesce(avg(score), 80.0) into v_expert
  from public.evaluations
  where idea_version_id = p_idea_version_id and evaluation_type = 'EXPERT' and conflict_declared = false;

  -- 4. Calculate composite: 25% AI + 25% Pairwise + 50% Expert
  v_composite := round((v_ai * 0.25) + (v_pairwise * 0.25) + (v_expert * 0.50), 2);

  return query select v_ai, v_pairwise, v_expert, v_composite;
end $$;

grant execute on function public.calculate_composite_score(uuid) to authenticated;

commit;
