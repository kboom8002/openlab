begin;
select plan(4);

-- Check evaluator_assignments RLS policy
select row_security_active('public.evaluator_assignments'::regclass, 'evaluator_assignments RLS active');
select policies_are('public', 'evaluator_assignments', array['evaluator_assignments_self'], 'evaluator_assignments self policy');

-- Check evaluations RLS policy (Evaluator Isolation Invariant)
select row_security_active('public.evaluations'::regclass, 'evaluations RLS active');
select policies_are('public', 'evaluations', array['evaluations_self_only'], 'evaluations evaluator isolation policy');

select * from finish();
rollback;
