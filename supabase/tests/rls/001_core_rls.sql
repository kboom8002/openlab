begin;
select plan(5);
select has_table('public','ideas','ideas exists');
select row_security_active('public.ideas'::regclass,'ideas RLS active');
select policies_are('public','ideas',array['idea_owner_all'],'owner policy only');
select function_returns('public','create_idea_draft',array['uuid','text'],'record','create draft function exists');
select isnt_empty($$select 1 from pg_proc where proname='update_idea_draft' and prosecdef=false$$,'draft update is security invoker');
select * from finish();
rollback;
