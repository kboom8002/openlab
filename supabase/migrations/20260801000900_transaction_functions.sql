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
