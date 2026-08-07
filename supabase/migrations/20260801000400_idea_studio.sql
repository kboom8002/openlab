begin;

-- Create conversations table for Idea Studio
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  stage text not null default 'identity',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(idea_id)
);

-- Create conversation_messages table
create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender text not null check (sender in ('user', 'ai_coach', 'system')),
  content text not null,
  suggestion_payload jsonb null,
  suggestion_status text check (suggestion_status in ('pending', 'accepted', 'rejected', 'edited')),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.conversations enable row level security;
alter table public.conversation_messages enable row level security;

-- Owner-only RLS policies for conversations
create policy conversation_owner_all on public.conversations
  for all using (
    exists (
      select 1 from public.ideas i
      where i.id = conversations.idea_id and i.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.ideas i
      where i.id = conversations.idea_id and i.owner_id = auth.uid()
    )
  );

-- Owner-only RLS policies for conversation_messages
create policy message_owner_all on public.conversation_messages
  for all using (
    exists (
      select 1 from public.conversations c
      join public.ideas i on i.id = c.idea_id
      where c.id = conversation_messages.conversation_id and i.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.conversations c
      join public.ideas i on i.id = c.idea_id
      where c.id = conversation_messages.conversation_id and i.owner_id = auth.uid()
    )
  );

-- Add passport JSONB column to ideas if not present
alter table public.ideas
  add column if not exists working_passport jsonb not null default '{
    "identity": {},
    "problem": {},
    "people_context": {},
    "solution": {},
    "feasibility": {},
    "impact": {},
    "experiment": {},
    "rights": {}
  }'::jsonb;

-- RPC to update working passport fields with optimistic concurrency control
create or replace function public.update_working_passport(
  p_idea_id uuid,
  p_passport jsonb,
  p_expected_revision integer
)
returns integer language plpgsql security invoker set search_path = '' as $$
declare
  v_revision integer;
begin
  update public.ideas
  set
    working_passport = coalesce(p_passport, working_passport),
    revision = revision + 1,
    updated_at = now()
  where id = p_idea_id
    and owner_id = auth.uid()
    and status in ('DRAFT', 'READY_FOR_REVIEW', 'PREFLIGHT_COMPLETE')
    and revision = p_expected_revision
  returning revision into v_revision;

  if v_revision is null then
    if exists (select 1 from public.ideas where id = p_idea_id and owner_id = auth.uid()) then
      raise exception 'stale revision' using errcode = '40001';
    end if;
    raise exception 'not found or permission denied' using errcode = 'P0002';
  end if;

  return v_revision;
end $$;

grant execute on function public.update_working_passport(uuid, jsonb, integer) to authenticated;
grant select, insert, update, delete on public.conversations to authenticated;
grant select, insert, update, delete on public.conversation_messages to authenticated;

commit;
