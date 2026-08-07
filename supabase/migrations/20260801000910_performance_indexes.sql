begin;

-- Performance indexes for RLS-heavy queries
-- (Some may already exist from previous migrations, use IF NOT EXISTS)

-- Idea lookups
create index if not exists idx_ideas_challenge_status on public.ideas(challenge_id, status);
create index if not exists idx_ideas_status on public.ideas(status);
create index if not exists idx_idea_versions_idea on public.idea_versions(idea_id);

-- Evaluation lookups
create index if not exists idx_evaluations_version on public.evaluations(idea_version_id);
create index if not exists idx_evaluations_type on public.evaluations(evaluation_type);
create index if not exists idx_evaluation_assignments_evaluator on public.evaluation_assignments(evaluator_id);
create index if not exists idx_evaluation_assignments_version on public.evaluation_assignments(idea_version_id);

-- Partial unique: only 1 submitted version per idea (REL-006)
create unique index if not exists idx_ideas_one_submitted
  on public.ideas(id) where status = 'SUBMITTED';

-- Conversation lookups
create index if not exists idx_conversation_messages_conv on public.conversation_messages(conversation_id);

-- Timestamp-based lookups
create index if not exists idx_audit_events_occurred on public.audit_events(occurred_at desc);

commit;
