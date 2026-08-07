begin;

create table public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  model_id text not null,
  prompt_tokens integer not null default 0,
  completion_tokens integer not null default 0,
  cost_usd numeric(10, 6) not null default 0,
  input_summary text,
  output_summary text,
  status text not null check (status in ('running','completed','failed','cancelled')) default 'running',
  error_message text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

alter table public.agent_runs enable row level security;

-- RLS: owner sees summary, internal service sees raw
create policy agent_runs_owner_summary on public.agent_runs for select
  using (exists(
    select 1 from public.conversations c
    join public.ideas i on i.id = c.idea_id
    where c.id = conversation_id and i.owner_id = auth.uid()
  ));

-- Service role has full access by default (bypasses RLS)

create index idx_agent_runs_conversation on public.agent_runs(conversation_id);
create index idx_agent_runs_status on public.agent_runs(status);

grant select on public.agent_runs to authenticated;

commit;
