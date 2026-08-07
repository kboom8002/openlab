begin;
select plan(2);

-- Check idea_versions RLS policy
select row_security_active('public.idea_versions'::regclass, 'idea_versions RLS active');
select has_trigger('public', 'idea_versions', 'idea_version_immutability_trigger', 'idea_versions immutability trigger active');

select * from finish();
rollback;
