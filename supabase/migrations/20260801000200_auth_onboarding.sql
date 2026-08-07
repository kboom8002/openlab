begin;

-- Profiles table expansion for onboarding fields
alter table public.profiles
  add column if not exists bio text default '',
  add column if not exists interests text[] default '{}',
  add column if not exists accessibility_preferences jsonb default '{"reduced_motion": false, "high_contrast": false}'::jsonb,
  add column if not exists onboarding_completed boolean not null default false;

-- Trigger to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1), '참여자')
  )
  on conflict (id) do nothing;
  
  insert into public.user_roles (user_id, role)
  values (new.id, 'participant')
  on conflict do nothing;

  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RPC to update user onboarding profile securely
create or replace function public.complete_user_onboarding(
  p_display_name text,
  p_bio text,
  p_interests text[],
  p_accessibility_preferences jsonb
)
returns public.profiles language plpgsql security invoker set search_path = '' as $$
declare
  v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'authentication required' using errcode = '28000';
  end if;

  update public.profiles
  set
    display_name = trim(p_display_name),
    bio = trim(coalesce(p_bio, '')),
    interests = p_interests,
    accessibility_preferences = coalesce(p_accessibility_preferences, '{}'::jsonb),
    onboarding_completed = true,
    updated_at = now()
  where id = auth.uid()
  returning * into v_profile;

  return v_profile;
end $$;

grant execute on function public.complete_user_onboarding(text, text, text[], jsonb) to authenticated;

commit;
