begin;
select plan(4);

-- Check monthly_challenges RLS policy
select row_security_active('public.monthly_challenges'::regclass, 'monthly_challenges RLS active');
select policies_are('public', 'monthly_challenges', array['challenge_public_read'], 'challenge public policy');

-- Check profiles RLS policies
select row_security_active('public.profiles'::regclass, 'profiles RLS active');
select policies_are('public', 'profiles', array['profile_self_select', 'profile_self_update'], 'profile self policies');

select * from finish();
rollback;
