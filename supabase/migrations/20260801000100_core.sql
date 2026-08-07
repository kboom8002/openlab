begin;

create extension if not exists pgcrypto;

create type public.user_role as enum ('participant','evaluator','expert','challenge_manager','sponsor_viewer','admin','service_worker');
create type public.monthly_challenge_status as enum ('DRAFT','SCHEDULED','OPEN','CLOSED','ELIGIBILITY_REVIEW','EVALUATION','SELECTION','PILOTING','COMPLETED','CANCELLED','ARCHIVED');
create type public.idea_status as enum ('DRAFT','READY_FOR_REVIEW','PREFLIGHT_CHECKING','PREFLIGHT_COMPLETE','SUBMITTED','ELIGIBILITY_REVIEW','ELIGIBLE','UNDER_EVALUATION','PROMISING','PILOT_READY','IN_PILOT','VALIDATED','ADOPTED','RETURNED_FOR_REVISION','INELIGIBLE','WITHDRAWN','SAFETY_HOLD','ARCHIVED');
create type public.idea_visibility as enum ('public','anonymous','evaluators_only','private');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.user_role not null,
  created_at timestamptz not null default now(), primary key(user_id,role)
);
create table public.monthly_challenges (
  id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null,
  summary text not null default '', status public.monthly_challenge_status not null default 'DRAFT',
  opens_at timestamptz, closes_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check ((opens_at is null and closes_at is null) or opens_at < closes_at)
);
create table public.ideas (
  id uuid primary key default gen_random_uuid(), challenge_id uuid not null references public.monthly_challenges(id), owner_id uuid not null references auth.users(id),
  title text not null check(char_length(title) between 1 and 120), status public.idea_status not null default 'DRAFT', visibility public.idea_visibility not null default 'private',
  revision integer not null default 0 check(revision >= 0), submitted_version_id uuid null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.idea_versions (
  id uuid primary key default gen_random_uuid(), idea_id uuid not null references public.ideas(id), version_number integer not null,
  title text not null, passport jsonb not null, content_hash text not null, submitted_at timestamptz not null default now(), submitted_by uuid not null references auth.users(id),
  unique(idea_id,version_number)
);
alter table public.ideas add constraint ideas_submitted_version_fk foreign key(submitted_version_id) references public.idea_versions(id);
create table public.audit_events (
  id uuid primary key default gen_random_uuid(), actor_id uuid, action text not null, object_type text not null, object_id uuid,
  request_id uuid not null, metadata jsonb not null default '{}'::jsonb, occurred_at timestamptz not null default now()
);

create index ideas_owner_idx on public.ideas(owner_id,updated_at desc);
create index challenges_public_idx on public.monthly_challenges(status,opens_at);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.monthly_challenges enable row level security;
alter table public.ideas enable row level security;
alter table public.idea_versions enable row level security;
alter table public.audit_events enable row level security;

create policy profile_self_select on public.profiles for select using (id=auth.uid());
create policy profile_self_update on public.profiles for update using (id=auth.uid()) with check (id=auth.uid());
create policy role_self_select on public.user_roles for select using (user_id=auth.uid());
create policy challenge_public_read on public.monthly_challenges for select using (status in ('SCHEDULED','OPEN','CLOSED','EVALUATION','SELECTION','PILOTING','COMPLETED'));
create policy idea_owner_all on public.ideas for all using(owner_id=auth.uid()) with check(owner_id=auth.uid());
create policy version_owner_read on public.idea_versions for select using(exists(select 1 from public.ideas i where i.id=idea_id and i.owner_id=auth.uid()));

create or replace function public.create_idea_draft(p_challenge_id uuid,p_title text)
returns table(idea_id uuid,revision integer) language plpgsql security invoker set search_path='' as $$
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode='28000'; end if;
  if not exists(select 1 from public.monthly_challenges c where c.id=p_challenge_id and c.status='OPEN') then raise exception 'challenge unavailable' using errcode='P0002'; end if;
  return query insert into public.ideas(challenge_id,owner_id,title) values(p_challenge_id,auth.uid(),trim(p_title)) returning id,ideas.revision;
end $$;

create or replace function public.update_idea_draft(p_idea_id uuid,p_title text,p_expected_revision integer)
returns integer language plpgsql security invoker set search_path='' as $$
declare v_revision integer;
begin
  update public.ideas set title=trim(p_title),revision=revision+1,updated_at=now()
  where id=p_idea_id and owner_id=auth.uid() and status in ('DRAFT','READY_FOR_REVIEW','PREFLIGHT_COMPLETE') and revision=p_expected_revision
  returning revision into v_revision;
  if v_revision is null then
    if exists(select 1 from public.ideas where id=p_idea_id and owner_id=auth.uid()) then raise exception 'stale revision' using errcode='40001'; end if;
    raise exception 'not found' using errcode='P0002';
  end if;
  return v_revision;
end $$;

revoke all on public.audit_events from anon,authenticated;
revoke insert,update,delete on public.idea_versions from anon,authenticated;
grant select on public.monthly_challenges to anon,authenticated;
grant select,insert,update,delete on public.ideas to authenticated;
grant select on public.idea_versions to authenticated;
grant execute on function public.create_idea_draft(uuid,text),public.update_idea_draft(uuid,text,integer) to authenticated;

commit;
