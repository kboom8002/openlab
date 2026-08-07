begin;

-- Rename tables
alter table if exists public.user_roles rename to platform_role_assignments;
alter table if exists public.evaluator_assignments rename to evaluation_assignments;

-- Rename type
alter type public.idea_visibility rename to visibility;

-- Rename function
alter function public.submit_idea_version(uuid, public.visibility, jsonb) rename to submit_idea;

-- Update function grants
revoke execute on function public.submit_idea(uuid, public.visibility, jsonb) from public;
grant execute on function public.submit_idea(uuid, public.visibility, jsonb) to authenticated;
grant execute on function public.submit_idea(uuid, public.visibility, jsonb) to service_role;

-- Rename policies
alter policy evaluator_assignments_self on public.evaluation_assignments rename to evaluation_assignments_self;
alter policy evaluations_self_only on public.evaluations rename to evaluations_evaluator_own;

commit;
