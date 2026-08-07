begin;
select plan(4);

-- Check conversations RLS policy
select row_security_active('public.conversations'::regclass, 'conversations RLS active');
select policies_are('public', 'conversations', array['conversation_owner_all'], 'conversations owner policy');

-- Check conversation_messages RLS policy
select row_security_active('public.conversation_messages'::regclass, 'conversation_messages RLS active');
select policies_are('public', 'conversation_messages', array['message_owner_all'], 'conversation_messages owner policy');

select * from finish();
rollback;
