begin;

-- Create immutable version trigger to block updates/deletes on submitted idea_versions
create or replace function public.enforce_idea_version_immutability()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if TG_OP = 'UPDATE' then
    raise exception 'Submitted idea version is immutable and cannot be updated.' using errcode = '42000';
  elsif TG_OP = 'DELETE' then
    raise exception 'Submitted idea version is immutable and cannot be deleted.' using errcode = '42000';
  end if;
  return null;
end $$;

drop trigger if exists idea_version_immutability_trigger on public.idea_versions;
create trigger idea_version_immutability_trigger
  before update or delete on public.idea_versions
  for each row execute function public.enforce_idea_version_immutability();

-- RPC to submit an idea, creating an immutable version snapshot
create or replace function public.submit_idea_version(
  p_idea_id uuid,
  p_visibility public.idea_visibility,
  p_consent_versions jsonb
)
returns table(submitted_version_id uuid, version_number integer)
language plpgsql security invoker set search_path = '' as $$
declare
  v_idea public.ideas;
  v_next_version_num integer;
  v_new_version_id uuid;
  v_content_hash text;
begin
  if auth.uid() is null then
    raise exception 'authentication required' using errcode = '28000';
  end if;

  -- 1. Get Idea and verify ownership & status
  select * into v_idea
  from public.ideas
  where id = p_idea_id and owner_id = auth.uid();

  if v_idea.id is null then
    raise exception 'idea not found or permission denied' using errcode = 'P0002';
  end if;

  if v_idea.status = 'SUBMITTED' then
    raise exception 'idea is already submitted' using errcode = '40001';
  end if;

  -- 2. Determine next version number
  select coalesce(max(version_number), 0) + 1 into v_next_version_num
  from public.idea_versions
  where idea_id = p_idea_id;

  -- 3. Calculate content hash for integrity verification
  v_content_hash := encode(digest(v_idea.working_passport::text, 'sha256'), 'hex');

  -- 4. Create immutable idea_version snapshot
  insert into public.idea_versions (
    idea_id,
    version_number,
    title,
    passport,
    content_hash,
    submitted_by
  ) values (
    p_idea_id,
    v_next_version_num,
    v_idea.title,
    v_idea.working_passport,
    v_content_hash,
    auth.uid()
  ) returning id into v_new_version_id;

  -- 5. Update parent idea status, visibility and reference
  update public.ideas
  set
    status = 'SUBMITTED',
    visibility = p_visibility,
    submitted_version_id = v_new_version_id,
    updated_at = now()
  where id = p_idea_id;

  return query select v_new_version_id, v_next_version_num;
end $$;

grant execute on function public.submit_idea_version(uuid, public.idea_visibility, jsonb) to authenticated;

commit;
