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


begin;

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('idea_status','evaluation_task','review_complete','selection_result','pilot_update','system','admin')),
  title text not null,
  body text not null default '',
  target_route text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.background_jobs (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  status text not null check (status in ('pending','running','completed','failed','cancelled')) default 'pending',
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  error_message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  scheduled_for timestamptz
);

alter table public.notifications enable row level security;
alter table public.background_jobs enable row level security;

-- RLS: notifications - owner only
create policy notification_owner on public.notifications for select
  using (user_id = auth.uid());

create policy notification_owner_update on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- RLS: background_jobs - service/admin only (no client access)
revoke all on public.background_jobs from anon, authenticated;

create policy jobs_admin_read on public.background_jobs for select
  using (private.has_platform_role('admin'));

-- Indexes
create index idx_notifications_user on public.notifications(user_id, read_at);
create index idx_notifications_created on public.notifications(created_at desc);
create index idx_jobs_status on public.background_jobs(status);
create index idx_jobs_scheduled on public.background_jobs(scheduled_for) where status = 'pending';

grant select, update on public.notifications to authenticated;

commit;


begin;

-- Create storage buckets per storage-buckets.yaml contract
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
  ('public-assets', 'public-assets', true, 10485760, array['image/png','image/jpeg','image/webp','image/svg+xml']),
  ('avatars', 'avatars', false, 5242880, array['image/png','image/jpeg','image/webp']),
  ('challenge-assets', 'challenge-assets', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp']),
  ('idea-attachments', 'idea-attachments', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp','text/plain']),
  ('idea-visuals', 'idea-visuals', false, 10485760, array['image/png','image/webp','image/svg+xml','application/pdf']),
  ('evaluation-attachments', 'evaluation-attachments', false, 26214400, array['application/pdf','image/png','image/jpeg','image/webp']),
  ('pilot-evidence', 'pilot-evidence', false, 104857600, array['application/pdf','image/png','image/jpeg','image/webp','video/mp4','text/csv']),
  ('exports', 'exports', false, 104857600, array['application/pdf','text/csv','application/zip']),
  ('sponsor-reports', 'sponsor-reports', false, 104857600, array['application/pdf','text/csv','application/zip'])
on conflict (id) do nothing;

-- Storage RLS policies
-- public-assets: public read, manager write
create policy "public-assets read" on storage.objects for select using (bucket_id = 'public-assets');

-- avatars: owner read/write
create policy "avatars owner read" on storage.objects for select
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner write" on storage.objects for insert
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner update" on storage.objects for update
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "avatars owner delete" on storage.objects for delete
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- idea-attachments: idea owner
create policy "idea-attachments owner read" on storage.objects for select
  using (bucket_id = 'idea-attachments' and private.can_access_storage_resource(name));
create policy "idea-attachments owner write" on storage.objects for insert
  with check (bucket_id = 'idea-attachments' and private.can_access_storage_resource(name));

-- idea-visuals: idea owner or system
create policy "idea-visuals owner read" on storage.objects for select
  using (bucket_id = 'idea-visuals' and private.can_access_storage_resource(name));
create policy "idea-visuals owner write" on storage.objects for insert
  with check (bucket_id = 'idea-visuals' and private.can_access_storage_resource(name));

-- evaluation-attachments: assigned evaluator
create policy "eval-attachments owner read" on storage.objects for select
  using (bucket_id = 'evaluation-attachments' and private.can_access_storage_resource(name));
create policy "eval-attachments owner write" on storage.objects for insert
  with check (bucket_id = 'evaluation-attachments' and private.can_access_storage_resource(name));

commit;


begin;

-- 1. accept_ai_suggestion: Accept AI suggestion into working passport with provenance
create or replace function public.accept_ai_suggestion(
  p_idea_id uuid,
  p_field_path text,
  p_value jsonb,
  p_expected_revision integer
)
returns integer
language plpgsql security invoker set search_path = '' as $$
declare
  v_idea public.ideas;
  v_passport jsonb;
  v_new_revision integer;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;

  select * into v_idea from public.ideas where id = p_idea_id and owner_id = auth.uid();
  if v_idea.id is null then raise exception 'not found' using errcode = 'P0002'; end if;
  if v_idea.status not in ('DRAFT','READY_FOR_REVIEW','PREFLIGHT_COMPLETE') then raise exception 'invalid status' using errcode = 'P0003'; end if;
  if v_idea.revision != p_expected_revision then raise exception 'stale revision' using errcode = '40001'; end if;

  -- Update working passport with AI suggestion at field_path
  v_passport := coalesce(v_idea.working_passport, '{}'::jsonb);
  v_passport := jsonb_set(v_passport, string_to_array(p_field_path, '.'), p_value);

  update public.ideas
  set working_passport = v_passport, revision = revision + 1, updated_at = now()
  where id = p_idea_id
  returning revision into v_new_revision;

  return v_new_revision;
end $$;

-- 2. submit_evaluation: Submit evaluation score (immutable after submit)
create or replace function public.submit_evaluation(
  p_assignment_id uuid,
  p_scores jsonb,
  p_rationale text
)
returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  v_assignment public.evaluation_assignments;
  v_eval_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;

  select * into v_assignment from public.evaluation_assignments
  where id = p_assignment_id and evaluator_id = auth.uid();
  if v_assignment.id is null then raise exception 'assignment not found' using errcode = 'P0002'; end if;
  if v_assignment.status = 'SUBMITTED' then raise exception 'already submitted' using errcode = '40001'; end if;
  if v_assignment.status = 'CONFLICT_DECLARED' then raise exception 'conflict declared' using errcode = 'P0003'; end if;

  -- Calculate average score from rubric scores
  insert into public.evaluations (idea_version_id, evaluator_id, evaluation_type, score, rubric_scores, rationale)
  values (
    v_assignment.idea_version_id,
    auth.uid(),
    'EXPERT',
    (select avg(value::numeric) from jsonb_each_text(p_scores)),
    p_scores,
    p_rationale
  ) returning id into v_eval_id;

  update public.evaluation_assignments set status = 'SUBMITTED', updated_at = now() where id = p_assignment_id;

  return v_eval_id;
end $$;

-- 3. record_selection_decision
create or replace function public.record_selection_decision(
  p_idea_version_id uuid,
  p_decision text,
  p_reason text
)
returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  v_challenge_id uuid;
  v_decision_id uuid;
  v_snapshot jsonb;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;

  -- Get challenge_id from idea
  select i.challenge_id into v_challenge_id
  from public.idea_versions iv join public.ideas i on i.id = iv.idea_id
  where iv.id = p_idea_version_id;
  if v_challenge_id is null then raise exception 'version not found' using errcode = 'P0002'; end if;

  -- Verify manager permission
  if not private.manages_challenge(v_challenge_id) then raise exception 'permission denied' using errcode = '42501'; end if;

  -- Build snapshot of current scores
  select jsonb_build_object(
    'composite', (select row_to_json(r) from public.calculate_composite_score(p_idea_version_id) r)
  ) into v_snapshot;

  insert into public.selection_decisions (idea_version_id, challenge_id, decided_by, decision, reason, snapshot_data)
  values (p_idea_version_id, v_challenge_id, auth.uid(), p_decision, p_reason, v_snapshot)
  returning id into v_decision_id;

  return v_decision_id;
end $$;

-- 4. grant_showcase_permission
create or replace function public.grant_showcase_permission(
  p_idea_version_id uuid,
  p_scope text default 'gallery'
)
returns uuid
language plpgsql security invoker set search_path = '' as $$
declare
  v_perm_id uuid;
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;
  -- Verify ownership
  if not exists(select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = p_idea_version_id and i.owner_id = auth.uid()) then
    raise exception 'not owner' using errcode = '42501';
  end if;

  insert into public.showcase_permissions (idea_version_id, granted_by, scope)
  values (p_idea_version_id, auth.uid(), p_scope)
  returning id into v_perm_id;

  return v_perm_id;
end $$;

-- 5. revoke_showcase_permission
create or replace function public.revoke_showcase_permission(
  p_permission_id uuid
)
returns void
language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'authentication required' using errcode = '28000'; end if;

  update public.showcase_permissions
  set revoked_at = now(), revoked_by = auth.uid()
  where id = p_permission_id
    and granted_by = auth.uid()
    and revoked_at is null;

  if not found then raise exception 'permission not found or already revoked' using errcode = 'P0002'; end if;
end $$;

-- 6. build_sponsor_report_snapshot
create or replace function public.build_sponsor_report_snapshot(
  p_sponsorship_id uuid,
  p_challenge_id uuid
)
returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  v_snapshot_id uuid;
  v_report_data jsonb;
begin
  -- Verify caller manages the challenge
  if not private.manages_challenge(p_challenge_id) then
    raise exception 'permission denied' using errcode = '42501';
  end if;

  -- Build aggregate report data (no PII, no raw ideas)
  select jsonb_build_object(
    'funnel', jsonb_build_object(
      'total_ideas', (select count(*) from public.ideas where challenge_id = p_challenge_id),
      'submitted', (select count(*) from public.ideas where challenge_id = p_challenge_id and status = 'SUBMITTED'),
      'pilot_ready', (select count(*) from public.ideas where challenge_id = p_challenge_id and status = 'PILOT_READY')
    ),
    'generated_at', now()
  ) into v_report_data;

  insert into public.sponsor_report_snapshots (sponsorship_id, challenge_id, report_data)
  values (p_sponsorship_id, p_challenge_id, v_report_data)
  returning id into v_snapshot_id;

  return v_snapshot_id;
end $$;

-- Grants
grant execute on function public.accept_ai_suggestion(uuid, text, jsonb, integer) to authenticated;
grant execute on function public.submit_evaluation(uuid, jsonb, text) to authenticated;
grant execute on function public.record_selection_decision(uuid, text, text) to authenticated;
grant execute on function public.grant_showcase_permission(uuid, text) to authenticated;
grant execute on function public.revoke_showcase_permission(uuid) to authenticated;
revoke execute on function public.build_sponsor_report_snapshot(uuid, uuid) from public;
grant execute on function public.build_sponsor_report_snapshot(uuid, uuid) to authenticated;

commit;


begin;

-- Performance indexes for RLS-heavy queries
-- (Some may already exist from previous migrations, use IF NOT EXISTS)

-- Idea lookups
create index if not exists idx_ideas_challenge_status on public.ideas(challenge_id, status);
create index if not exists idx_ideas_status on public.ideas(status);
create index if not exists idx_idea_versions_idea on public.idea_versions(idea_id);

-- Evaluation lookups
create index if not exists idx_evaluations_version on public.evaluations(idea_version_id);
create index if not exists idx_evaluations_type on public.evaluations(evaluation_type);
create index if not exists idx_evaluation_assignments_evaluator on public.evaluation_assignments(evaluator_id);
create index if not exists idx_evaluation_assignments_version on public.evaluation_assignments(idea_version_id);

-- Partial unique: only 1 submitted version per idea (REL-006)
create unique index if not exists idx_ideas_one_submitted
  on public.ideas(id) where status = 'SUBMITTED';

-- Conversation lookups
create index if not exists idx_conversation_messages_conv on public.conversation_messages(conversation_id);

-- Timestamp-based lookups
create index if not exists idx_audit_events_occurred on public.audit_events(occurred_at desc);

commit;


begin;

-- =============================================================
-- Migration: 20260801000920_rls_policy_alignment.sql
-- Description: Phase 2B RLS Policy Alignment Migration
-- Alignment with contracts/data/rls-policy-matrix.yaml (WOL-CONTRACT-DATA-004)
-- Enforces explicit RLS on all 34 public schema tables using private.* helper functions
-- =============================================================

-- -------------------------------------------------------------
-- 1. profiles
-- -------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists profile_self_select on public.profiles;
drop policy if exists profile_self_update on public.profiles;
drop policy if exists profiles_select_self on public.profiles;
drop policy if exists profiles_insert_self on public.profiles;
drop policy if exists profiles_update_self on public.profiles;
drop policy if exists profiles_delete_self on public.profiles;

create policy profiles_select_self on public.profiles for select
  using (id = auth.uid());

create policy profiles_insert_self on public.profiles for insert
  with check (id = auth.uid());

create policy profiles_update_self on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy profiles_delete_self on public.profiles for delete
  using (id = auth.uid());

-- -------------------------------------------------------------
-- 2. platform_role_assignments
-- -------------------------------------------------------------
alter table public.platform_role_assignments enable row level security;

drop policy if exists role_self_select on public.platform_role_assignments;
drop policy if exists platform_role_select on public.platform_role_assignments;
drop policy if exists platform_role_admin_all on public.platform_role_assignments;

create policy platform_role_select on public.platform_role_assignments for select
  using (user_id = auth.uid() or private.has_platform_role('admin'));

create policy platform_role_admin_all on public.platform_role_assignments for all
  using (private.has_platform_role('admin'))
  with check (private.has_platform_role('admin'));

-- -------------------------------------------------------------
-- 3. organizations
-- -------------------------------------------------------------
alter table public.organizations enable row level security;

drop policy if exists org_member_select on public.organizations;
drop policy if exists org_admin_all on public.organizations;

create policy org_member_select on public.organizations for select
  using (private.is_org_member(id) or private.has_platform_role('admin'));

create policy org_admin_all on public.organizations for all
  using (
    (private.is_org_member(id) and exists (
      select 1 from public.organization_members om
      where om.organization_id = id and om.user_id = auth.uid() and om.role = 'organization_admin'
    ))
    or private.has_platform_role('admin')
  )
  with check (
    (private.is_org_member(id) and exists (
      select 1 from public.organization_members om
      where om.organization_id = id and om.user_id = auth.uid() and om.role = 'organization_admin'
    ))
    or private.has_platform_role('admin')
  );

-- -------------------------------------------------------------
-- 4. organization_members
-- -------------------------------------------------------------
alter table public.organization_members enable row level security;

drop policy if exists org_member_self_select on public.organization_members;
drop policy if exists org_member_admin_all on public.organization_members;

create policy org_member_self_select on public.organization_members for select
  using (user_id = auth.uid() or private.is_org_member(organization_id) or private.has_platform_role('admin'));

create policy org_member_admin_all on public.organization_members for all
  using (
    (private.is_org_member(organization_id) and exists (
      select 1 from public.organization_members om2
      where om2.organization_id = organization_id and om2.user_id = auth.uid() and om2.role = 'organization_admin'
    ))
    or private.has_platform_role('admin')
  )
  with check (
    (private.is_org_member(organization_id) and exists (
      select 1 from public.organization_members om2
      where om2.organization_id = organization_id and om2.user_id = auth.uid() and om2.role = 'organization_admin'
    ))
    or private.has_platform_role('admin')
  );

-- -------------------------------------------------------------
-- 5. challenge_series
-- -------------------------------------------------------------
alter table public.challenge_series enable row level security;

drop policy if exists series_public_read on public.challenge_series;
drop policy if exists series_manager_all on public.challenge_series;

create policy series_public_read on public.challenge_series for select
  using (status in ('ACTIVE', 'COMPLETED') or private.is_org_member(organization_id));

create policy series_manager_all on public.challenge_series for all
  using (private.is_org_member(organization_id))
  with check (private.is_org_member(organization_id));

-- -------------------------------------------------------------
-- 6. sponsorships
-- -------------------------------------------------------------
alter table public.sponsorships enable row level security;

drop policy if exists sponsorship_org_select on public.sponsorships;
drop policy if exists sponsorship_manager_write on public.sponsorships;
drop policy if exists sponsorship_manager_update on public.sponsorships;
drop policy if exists sponsorship_manager_all on public.sponsorships;

create policy sponsorship_org_select on public.sponsorships for select
  using (private.is_org_member(organization_id));

create policy sponsorship_manager_all on public.sponsorships for all
  using (private.is_org_member(organization_id))
  with check (private.is_org_member(organization_id));

-- -------------------------------------------------------------
-- 7. monthly_challenges
-- -------------------------------------------------------------
alter table public.monthly_challenges enable row level security;

drop policy if exists challenge_public_read on public.monthly_challenges;
drop policy if exists challenge_manager_org on public.monthly_challenges;
drop policy if exists challenge_manager_all on public.monthly_challenges;
drop policy if exists challenge_manager_insert on public.monthly_challenges;
drop policy if exists challenge_manager_update on public.monthly_challenges;

create policy challenge_public_read on public.monthly_challenges for select
  using (status in ('SCHEDULED','OPEN','CLOSED','EVALUATION','SELECTION','PILOTING','COMPLETED') or (organization_id is not null and private.manages_challenge(id)));

create policy challenge_manager_insert on public.monthly_challenges for insert
  with check (organization_id is not null and private.is_org_member(organization_id));

create policy challenge_manager_update on public.monthly_challenges for update
  using (private.manages_challenge(id))
  with check (private.manages_challenge(id));

-- -------------------------------------------------------------
-- 8. challenge_tracks
-- -------------------------------------------------------------
alter table public.challenge_tracks enable row level security;

drop policy if exists tracks_public_read on public.challenge_tracks;
drop policy if exists tracks_manager_all on public.challenge_tracks;

create policy tracks_public_read on public.challenge_tracks for select
  using (
    exists (
      select 1 from public.monthly_challenges mc
      where mc.id = monthly_challenge_id and mc.status in ('SCHEDULED','OPEN','CLOSED','EVALUATION','SELECTION','PILOTING','COMPLETED')
    ) or private.manages_challenge(monthly_challenge_id)
  );

create policy tracks_manager_all on public.challenge_tracks for all
  using (private.manages_challenge(monthly_challenge_id))
  with check (private.manages_challenge(monthly_challenge_id));

-- -------------------------------------------------------------
-- 9. challenge_participations
-- -------------------------------------------------------------
alter table public.challenge_participations enable row level security;

drop policy if exists participation_self on public.challenge_participations;
drop policy if exists participation_insert on public.challenge_participations;
drop policy if exists participation_manager_read on public.challenge_participations;

create policy participation_self on public.challenge_participations for select
  using (user_id = auth.uid() or private.manages_challenge(monthly_challenge_id));

create policy participation_insert on public.challenge_participations for insert
  with check (user_id = auth.uid());

-- -------------------------------------------------------------
-- 10. ideas
-- -------------------------------------------------------------
alter table public.ideas enable row level security;

drop policy if exists idea_owner_all on public.ideas;
drop policy if exists idea_select_aligned on public.ideas;
drop policy if exists idea_insert_aligned on public.ideas;
drop policy if exists idea_update_aligned on public.ideas;

create policy idea_select_aligned on public.ideas for select
  using (
    private.owns_idea(id)
    or private.manages_challenge(challenge_id)
    or exists (
      select 1 from public.evaluation_assignments ea
      join public.idea_versions iv on iv.id = ea.idea_version_id
      where iv.idea_id = ideas.id and ea.evaluator_id = auth.uid()
    )
    or (visibility = 'public' and status in ('SUBMITTED','ELIGIBILITY_REVIEW','ELIGIBLE','UNDER_EVALUATION','PROMISING','PILOT_READY','IN_PILOT','VALIDATED','ADOPTED'))
  );

create policy idea_insert_aligned on public.ideas for insert
  with check (owner_id = auth.uid());

create policy idea_update_aligned on public.ideas for update
  using (
    (private.owns_idea(id) and status in ('DRAFT','READY_FOR_REVIEW','PREFLIGHT_COMPLETE'))
    or private.manages_challenge(challenge_id)
  )
  with check (
    (private.owns_idea(id) and status in ('DRAFT','READY_FOR_REVIEW','PREFLIGHT_COMPLETE'))
    or private.manages_challenge(challenge_id)
  );

-- -------------------------------------------------------------
-- 11. idea_versions
-- -------------------------------------------------------------
alter table public.idea_versions enable row level security;

drop policy if exists version_owner_read on public.idea_versions;
drop policy if exists version_select_aligned on public.idea_versions;
drop policy if exists version_insert_aligned on public.idea_versions;
drop policy if exists version_update_aligned on public.idea_versions;
drop policy if exists version_delete_aligned on public.idea_versions;

create policy version_select_aligned on public.idea_versions for select
  using (
    private.owns_idea(idea_id)
    or exists (select 1 from public.ideas i where i.id = idea_id and private.manages_challenge(i.challenge_id))
    or exists (select 1 from public.evaluation_assignments ea where ea.idea_version_id = id and ea.evaluator_id = auth.uid())
  );

create policy version_insert_aligned on public.idea_versions for insert
  with check (private.owns_idea(idea_id));

create policy version_update_aligned on public.idea_versions for update
  using (private.owns_idea(idea_id))
  with check (private.owns_idea(idea_id));

create policy version_delete_aligned on public.idea_versions for delete
  using (private.owns_idea(idea_id));

-- -------------------------------------------------------------
-- 12. idea_field_provenance
-- -------------------------------------------------------------
alter table public.idea_field_provenance enable row level security;

drop policy if exists provenance_parent on public.idea_field_provenance;
drop policy if exists provenance_select_aligned on public.idea_field_provenance;
drop policy if exists provenance_insert_aligned on public.idea_field_provenance;

create policy provenance_select_aligned on public.idea_field_provenance for select
  using (
    exists (select 1 from public.idea_versions iv where iv.id = idea_version_id and private.owns_idea(iv.idea_id))
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  );

create policy provenance_insert_aligned on public.idea_field_provenance for insert
  with check (
    exists (select 1 from public.idea_versions iv where iv.id = idea_version_id and private.owns_idea(iv.idea_id))
  );

-- -------------------------------------------------------------
-- 13. idea_claims
-- -------------------------------------------------------------
alter table public.idea_claims enable row level security;

drop policy if exists claims_parent on public.idea_claims;
drop policy if exists claims_select_aligned on public.idea_claims;
drop policy if exists claims_insert_aligned on public.idea_claims;

create policy claims_select_aligned on public.idea_claims for select
  using (
    exists (select 1 from public.idea_versions iv where iv.id = idea_version_id and private.owns_idea(iv.idea_id))
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  );

create policy claims_insert_aligned on public.idea_claims for insert
  with check (
    exists (select 1 from public.idea_versions iv where iv.id = idea_version_id and private.owns_idea(iv.idea_id))
  );

-- -------------------------------------------------------------
-- 14. idea_evidence_items
-- -------------------------------------------------------------
alter table public.idea_evidence_items enable row level security;

drop policy if exists evidence_parent on public.idea_evidence_items;
drop policy if exists evidence_select_aligned on public.idea_evidence_items;
drop policy if exists evidence_insert_aligned on public.idea_evidence_items;

create policy evidence_select_aligned on public.idea_evidence_items for select
  using (
    exists (select 1 from public.idea_versions iv where iv.id = idea_version_id and private.owns_idea(iv.idea_id))
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  );

create policy evidence_insert_aligned on public.idea_evidence_items for insert
  with check (
    exists (select 1 from public.idea_versions iv where iv.id = idea_version_id and private.owns_idea(iv.idea_id))
  );

-- -------------------------------------------------------------
-- 15. idea_attachments
-- -------------------------------------------------------------
alter table public.idea_attachments enable row level security;

drop policy if exists attachments_owner on public.idea_attachments;
drop policy if exists attachments_select_aligned on public.idea_attachments;
drop policy if exists attachments_all_aligned on public.idea_attachments;

create policy attachments_select_aligned on public.idea_attachments for select
  using (
    private.owns_idea(idea_id)
    or private.can_access_storage_resource(storage_path)
    or exists (select 1 from public.ideas i where i.id = idea_id and private.manages_challenge(i.challenge_id))
  );

create policy attachments_all_aligned on public.idea_attachments for all
  using (
    private.owns_idea(idea_id)
    or private.can_access_storage_resource(storage_path)
  )
  with check (
    private.owns_idea(idea_id)
    or private.can_access_storage_resource(storage_path)
  );

-- -------------------------------------------------------------
-- 16. conversations
-- -------------------------------------------------------------
alter table public.conversations enable row level security;

drop policy if exists conversation_owner_all on public.conversations;
drop policy if exists conversations_owner_aligned on public.conversations;

create policy conversations_owner_aligned on public.conversations for all
  using (private.owns_idea(idea_id))
  with check (private.owns_idea(idea_id));

-- -------------------------------------------------------------
-- 17. conversation_messages
-- -------------------------------------------------------------
alter table public.conversation_messages enable row level security;

drop policy if exists message_owner_all on public.conversation_messages;
drop policy if exists messages_owner_aligned on public.conversation_messages;

create policy messages_owner_aligned on public.conversation_messages for all
  using (
    exists (select 1 from public.conversations c where c.id = conversation_id and private.owns_idea(c.idea_id))
  )
  with check (
    exists (select 1 from public.conversations c where c.id = conversation_id and private.owns_idea(c.idea_id))
  );

-- -------------------------------------------------------------
-- 18. agent_runs
-- -------------------------------------------------------------
alter table public.agent_runs enable row level security;

drop policy if exists agent_runs_owner_summary on public.agent_runs;
drop policy if exists agent_runs_owner_aligned on public.agent_runs;

create policy agent_runs_owner_aligned on public.agent_runs for select
  using (
    exists (select 1 from public.conversations c where c.id = conversation_id and private.owns_idea(c.idea_id))
  );

-- -------------------------------------------------------------
-- 19. evaluation_assignments
-- -------------------------------------------------------------
alter table public.evaluation_assignments enable row level security;

drop policy if exists evaluator_assignments_self on public.evaluation_assignments;
drop policy if exists evaluation_assignments_self on public.evaluation_assignments;
drop policy if exists eval_assign_select_aligned on public.evaluation_assignments;
drop policy if exists eval_assign_manager_all on public.evaluation_assignments;
drop policy if exists eval_assign_evaluator_update on public.evaluation_assignments;

create policy eval_assign_select_aligned on public.evaluation_assignments for select
  using (
    evaluator_id = auth.uid()
    or private.is_assigned_evaluator(id)
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  );

create policy eval_assign_evaluator_update on public.evaluation_assignments for update
  using (evaluator_id = auth.uid() or private.is_assigned_evaluator(id))
  with check (evaluator_id = auth.uid() or private.is_assigned_evaluator(id));

create policy eval_assign_manager_all on public.evaluation_assignments for all
  using (
    exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  )
  with check (
    exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  );

-- -------------------------------------------------------------
-- 20. evaluations
-- -------------------------------------------------------------
alter table public.evaluations enable row level security;

drop policy if exists evaluations_self_only on public.evaluations;
drop policy if exists evaluations_evaluator_own on public.evaluations;
drop policy if exists eval_select_aligned on public.evaluations;
drop policy if exists eval_evaluator_write on public.evaluations;

create policy eval_select_aligned on public.evaluations for select
  using (
    evaluator_id = auth.uid()
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
    or exists (select 1 from public.selection_decisions sd join public.idea_versions iv on iv.id = sd.idea_version_id join public.ideas i on i.id = iv.idea_id where iv.id = evaluations.idea_version_id and private.owns_idea(i.id))
  );

create policy eval_evaluator_write on public.evaluations for all
  using (evaluator_id = auth.uid())
  with check (evaluator_id = auth.uid());

-- -------------------------------------------------------------
-- 21. pairwise_votes
-- -------------------------------------------------------------
alter table public.pairwise_votes enable row level security;

drop policy if exists pairwise_self_insert on public.pairwise_votes;
drop policy if exists pairwise_self_read on public.pairwise_votes;
drop policy if exists pairwise_manager_read on public.pairwise_votes;
drop policy if exists pairwise_select_aligned on public.pairwise_votes;
drop policy if exists pairwise_insert_aligned on public.pairwise_votes;

create policy pairwise_select_aligned on public.pairwise_votes for select
  using (voter_id = auth.uid() or private.manages_challenge(challenge_id));

create policy pairwise_insert_aligned on public.pairwise_votes for insert
  with check (voter_id = auth.uid());

-- -------------------------------------------------------------
-- 22. selection_decisions
-- -------------------------------------------------------------
alter table public.selection_decisions enable row level security;

drop policy if exists selection_manager_all on public.selection_decisions;
drop policy if exists selection_participant_read on public.selection_decisions;
drop policy if exists selection_select_aligned on public.selection_decisions;
drop policy if exists selection_manager_write on public.selection_decisions;

create policy selection_select_aligned on public.selection_decisions for select
  using (
    private.manages_challenge(challenge_id)
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.owns_idea(i.id))
  );

create policy selection_manager_write on public.selection_decisions for all
  using (private.manages_challenge(challenge_id))
  with check (private.manages_challenge(challenge_id));

-- -------------------------------------------------------------
-- 23. pilots
-- -------------------------------------------------------------
alter table public.pilots enable row level security;

drop policy if exists pilot_participant_read on public.pilots;
drop policy if exists pilot_manager_all on public.pilots;
drop policy if exists pilot_select_aligned on public.pilots;
drop policy if exists pilot_manager_write on public.pilots;

create policy pilot_select_aligned on public.pilots for select
  using (
    private.manages_challenge(challenge_id)
    or exists (select 1 from public.pilot_participants pp where pp.pilot_id = id and pp.user_id = auth.uid())
  );

create policy pilot_manager_write on public.pilots for all
  using (private.manages_challenge(challenge_id))
  with check (private.manages_challenge(challenge_id));

-- -------------------------------------------------------------
-- 24. pilot_participants
-- -------------------------------------------------------------
alter table public.pilot_participants enable row level security;

drop policy if exists pilot_part_self on public.pilot_participants;
drop policy if exists pilot_part_manager on public.pilot_participants;
drop policy if exists pilot_part_select_aligned on public.pilot_participants;
drop policy if exists pilot_part_manager_write on public.pilot_participants;

create policy pilot_part_select_aligned on public.pilot_participants for select
  using (
    user_id = auth.uid()
    or exists (select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id))
  );

create policy pilot_part_manager_write on public.pilot_participants for all
  using (
    exists (select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id))
  )
  with check (
    exists (select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id))
  );

-- -------------------------------------------------------------
-- 25. pilot_updates
-- -------------------------------------------------------------
alter table public.pilot_updates enable row level security;

drop policy if exists pilot_updates_scoped on public.pilot_updates;
drop policy if exists pilot_updates_author on public.pilot_updates;
drop policy if exists pilot_updates_manager on public.pilot_updates;
drop policy if exists pilot_updates_select_aligned on public.pilot_updates;
drop policy if exists pilot_updates_author_insert on public.pilot_updates;
drop policy if exists pilot_updates_manager_write on public.pilot_updates;

create policy pilot_updates_select_aligned on public.pilot_updates for select
  using (
    exists (select 1 from public.pilot_participants pp where pp.pilot_id = pilot_id and pp.user_id = auth.uid())
    or exists (select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id))
  );

create policy pilot_updates_author_insert on public.pilot_updates for insert
  with check (
    author_id = auth.uid()
    and exists (select 1 from public.pilot_participants pp where pp.pilot_id = pilot_id and pp.user_id = auth.uid())
  );

create policy pilot_updates_manager_write on public.pilot_updates for all
  using (
    exists (select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id))
  )
  with check (
    exists (select 1 from public.pilots p where p.id = pilot_id and private.manages_challenge(p.challenge_id))
  );

-- -------------------------------------------------------------
-- 26. consent_documents
-- -------------------------------------------------------------
alter table public.consent_documents enable row level security;

drop policy if exists consent_docs_active_read on public.consent_documents;
drop policy if exists consent_docs_admin_write on public.consent_documents;
drop policy if exists consent_docs_select_aligned on public.consent_documents;

create policy consent_docs_select_aligned on public.consent_documents for select
  using (active = true or private.has_platform_role('admin'));

create policy consent_docs_admin_write on public.consent_documents for all
  using (private.has_platform_role('admin'))
  with check (private.has_platform_role('admin'));

-- -------------------------------------------------------------
-- 27. consent_acceptances
-- -------------------------------------------------------------
alter table public.consent_acceptances enable row level security;

drop policy if exists consent_accept_self on public.consent_acceptances;
drop policy if exists consent_accept_insert on public.consent_acceptances;
drop policy if exists consent_accept_admin on public.consent_acceptances;
drop policy if exists consent_accept_select_aligned on public.consent_acceptances;
drop policy if exists consent_accept_insert_aligned on public.consent_acceptances;

create policy consent_accept_select_aligned on public.consent_acceptances for select
  using (user_id = auth.uid() or private.has_platform_role('admin'));

create policy consent_accept_insert_aligned on public.consent_acceptances for insert
  with check (user_id = auth.uid());

-- -------------------------------------------------------------
-- 28. showcase_permissions
-- -------------------------------------------------------------
alter table public.showcase_permissions enable row level security;

drop policy if exists showcase_grantor on public.showcase_permissions;
drop policy if exists showcase_grantor_insert on public.showcase_permissions;
drop policy if exists showcase_manager_read on public.showcase_permissions;
drop policy if exists showcase_select_aligned on public.showcase_permissions;
drop policy if exists showcase_grantor_write on public.showcase_permissions;

create policy showcase_select_aligned on public.showcase_permissions for select
  using (
    granted_by = auth.uid()
    or exists (select 1 from public.idea_versions iv join public.ideas i on i.id = iv.idea_id where iv.id = idea_version_id and private.manages_challenge(i.challenge_id))
  );

create policy showcase_grantor_write on public.showcase_permissions for all
  using (granted_by = auth.uid())
  with check (granted_by = auth.uid());

-- -------------------------------------------------------------
-- 29. notifications
-- -------------------------------------------------------------
alter table public.notifications enable row level security;

drop policy if exists notification_owner on public.notifications;
drop policy if exists notification_owner_update on public.notifications;
drop policy if exists notification_select_aligned on public.notifications;
drop policy if exists notification_update_aligned on public.notifications;

create policy notification_select_aligned on public.notifications for select
  using (user_id = auth.uid());

create policy notification_update_aligned on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- -------------------------------------------------------------
-- 30. background_jobs
-- -------------------------------------------------------------
alter table public.background_jobs enable row level security;

drop policy if exists jobs_admin_read on public.background_jobs;
drop policy if exists jobs_admin_select on public.background_jobs;

create policy jobs_admin_select on public.background_jobs for select
  using (private.has_platform_role('admin'));

-- -------------------------------------------------------------
-- 31. audit_events
-- -------------------------------------------------------------
alter table public.audit_events enable row level security;

drop policy if exists audit_admin_read on public.audit_events;
drop policy if exists audit_admin_select on public.audit_events;

create policy audit_admin_select on public.audit_events for select
  using (private.has_platform_role('admin'));

-- -------------------------------------------------------------
-- 32. sponsor_report_snapshots
-- -------------------------------------------------------------
alter table public.sponsor_report_snapshots enable row level security;

drop policy if exists snapshot_sponsor_read on public.sponsor_report_snapshots;
drop policy if exists snapshot_manager_all on public.sponsor_report_snapshots;
drop policy if exists snapshot_select_aligned on public.sponsor_report_snapshots;
drop policy if exists snapshot_manager_write on public.sponsor_report_snapshots;

create policy snapshot_select_aligned on public.sponsor_report_snapshots for select
  using (private.can_view_sponsor_snapshot(id) or private.manages_challenge(challenge_id));

create policy snapshot_manager_write on public.sponsor_report_snapshots for all
  using (private.manages_challenge(challenge_id))
  with check (private.manages_challenge(challenge_id));

-- -------------------------------------------------------------
-- 33. sponsor_showcase_items
-- -------------------------------------------------------------
alter table public.sponsor_showcase_items enable row level security;

drop policy if exists showcase_item_sponsor on public.sponsor_showcase_items;
drop policy if exists showcase_item_manager on public.sponsor_showcase_items;
drop policy if exists showcase_item_select_aligned on public.sponsor_showcase_items;
drop policy if exists showcase_item_manager_write on public.sponsor_showcase_items;

create policy showcase_item_select_aligned on public.sponsor_showcase_items for select
  using (
    exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.can_view_sponsor_snapshot(srs.id))
    or exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id))
  );

create policy showcase_item_manager_write on public.sponsor_showcase_items for all
  using (
    exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id))
  )
  with check (
    exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id))
  );

-- -------------------------------------------------------------
-- 34. sponsor_pilot_summaries
-- -------------------------------------------------------------
alter table public.sponsor_pilot_summaries enable row level security;

drop policy if exists pilot_summary_sponsor on public.sponsor_pilot_summaries;
drop policy if exists pilot_summary_manager on public.sponsor_pilot_summaries;
drop policy if exists pilot_summary_select_aligned on public.sponsor_pilot_summaries;
drop policy if exists pilot_summary_manager_write on public.sponsor_pilot_summaries;

create policy pilot_summary_select_aligned on public.sponsor_pilot_summaries for select
  using (
    exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.can_view_sponsor_snapshot(srs.id))
    or exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id))
  );

create policy pilot_summary_manager_write on public.sponsor_pilot_summaries for all
  using (
    exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id))
  )
  with check (
    exists (select 1 from public.sponsor_report_snapshots srs where srs.id = snapshot_id and private.manages_challenge(srs.challenge_id))
  );

commit;


