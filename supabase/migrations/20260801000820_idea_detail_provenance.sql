begin;

create table public.idea_field_provenance (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id) on delete cascade,
  field_path text not null,
  source text not null check (source in ('user_original','user_edited','ai_suggested','external_source','admin_edited')),
  confirmed_by uuid references auth.users(id),
  confirmed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.idea_claims (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id) on delete cascade,
  claim_type text not null check (claim_type in ('fact','experience','assumption','expected_impact')),
  content text not null,
  evidence_refs text[] not null default '{}',
  section text not null,
  created_at timestamptz not null default now()
);

create table public.idea_evidence_items (
  id uuid primary key default gen_random_uuid(),
  idea_version_id uuid not null references public.idea_versions(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  source_type text not null default 'reference',
  url text,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table public.idea_attachments (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  storage_path text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0),
  uploaded_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

-- Enable RLS (all follow parent_permission pattern)
alter table public.idea_field_provenance enable row level security;
alter table public.idea_claims enable row level security;
alter table public.idea_evidence_items enable row level security;
alter table public.idea_attachments enable row level security;

-- RLS: parent_permission — accessible if user owns the parent idea
create policy provenance_parent on public.idea_field_provenance for select
  using (exists(select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and i.owner_id = auth.uid()));

create policy claims_parent on public.idea_claims for select
  using (exists(select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and i.owner_id = auth.uid()));

create policy evidence_parent on public.idea_evidence_items for select
  using (exists(select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and i.owner_id = auth.uid()));

create policy attachments_owner on public.idea_attachments for all
  using (exists(select 1 from public.ideas i where i.id = idea_id and i.owner_id = auth.uid()))
  with check (exists(select 1 from public.ideas i where i.id = idea_id and i.owner_id = auth.uid()));

-- Indexes
create index idx_provenance_version on public.idea_field_provenance(idea_version_id);
create index idx_claims_version on public.idea_claims(idea_version_id);
create index idx_evidence_version on public.idea_evidence_items(idea_version_id);
create index idx_attachments_idea on public.idea_attachments(idea_id);

-- Grants
grant select on public.idea_field_provenance to authenticated;
grant select on public.idea_claims to authenticated;
grant select on public.idea_evidence_items to authenticated;
grant select, insert, delete on public.idea_attachments to authenticated;

commit;
