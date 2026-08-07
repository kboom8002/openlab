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
