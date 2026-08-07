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
