begin;

create table public.consent_documents (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  title text not null,
  type text not null check (type in ('evaluation_consent','ai_processing','showcase','pilot_contact','research_analytics','terms_of_service','privacy_policy')),
  content_hash text not null,
  body text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(type, version)
);

create table public.consent_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  consent_document_id uuid not null references public.consent_documents(id),
  accepted_at timestamptz not null default now(),
  ip_hash text,
  revoked_at timestamptz,
  unique(user_id, consent_document_id)
);

create table public.showcase_permissions (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id),
  granted_by uuid not null references auth.users(id),
  scope text not null check (scope in ('gallery','sponsor_report','both')) default 'gallery',
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id)
);

-- Enable RLS
alter table public.consent_documents enable row level security;
alter table public.consent_acceptances enable row level security;
alter table public.showcase_permissions enable row level security;

-- RLS: consent_documents - active ones readable by all authenticated
create policy consent_docs_active_read on public.consent_documents for select
  using (active = true);

create policy consent_docs_admin_write on public.consent_documents for all
  using (private.has_platform_role('admin'))
  with check (private.has_platform_role('admin'));

-- RLS: consent_acceptances - owner read, owner insert
create policy consent_accept_self on public.consent_acceptances for select
  using (user_id = auth.uid());

create policy consent_accept_insert on public.consent_acceptances for insert
  with check (user_id = auth.uid());

create policy consent_accept_admin on public.consent_acceptances for select
  using (private.has_platform_role('admin'));

-- RLS: showcase_permissions - grantor and manager
create policy showcase_grantor on public.showcase_permissions for select
  using (granted_by = auth.uid());

create policy showcase_grantor_insert on public.showcase_permissions for insert
  with check (granted_by = auth.uid());

create policy showcase_manager_read on public.showcase_permissions for select
  using (exists(select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id join public.monthly_challenges mc on mc.id = i.challenge_id where iv.id = idea_version_id and private.manages_challenge(mc.id)));

-- Indexes
create index idx_consent_accept_user on public.consent_acceptances(user_id);
create index idx_showcase_version on public.showcase_permissions(idea_version_id);

-- Grants
grant select on public.consent_documents to anon, authenticated;
grant select, insert on public.consent_acceptances to authenticated;
grant select, insert on public.showcase_permissions to authenticated;

commit;
