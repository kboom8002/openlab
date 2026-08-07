import 'server-only';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { IdeaStatus, Visibility } from '@/types/domain';

// ---------------------------------------------------------------------------
// Shared types used across queries/ideas, queries/passport, queries/evaluation
// and features/ideas/components
// ---------------------------------------------------------------------------

export interface WorkingPassport {
  identity?: { title?: string; [key: string]: unknown };
  problem?: { target_user?: string; context?: string; [key: string]: unknown };
  people_context?: { primary_users?: string; [key: string]: unknown };
  solution?: { core_solution?: string; [key: string]: unknown };
  feasibility?: { required_resources?: string; [key: string]: unknown };
  impact?: { expected_changes?: string; [key: string]: unknown };
  experiment?: { key_assumption?: string; [key: string]: unknown };
  rights?: { [key: string]: unknown };
  [section: string]: unknown;
}

export interface ConversationMessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  sender?: 'user' | 'ai_coach' | string;
  content: string;
  created_at: string;
  metadata?: Record<string, unknown>;
  suggestion_payload?: {
    stage?: string;
    field_path?: string;
    suggested_text?: string;
    [key: string]: unknown;
  } | null;
  suggestion_status?: 'pending' | 'accepted' | 'rejected' | null;
}

export interface IdeaItem {
  id: string;
  title: string;
  status: IdeaStatus;
  visibility: Visibility;
  owner_id: string;
  challenge_id: string;
  working_passport: WorkingPassport;
  revision?: number;
  submitted_version_id?: string | null;
  monthly_challenges?: { title?: string; [key: string]: unknown } | null;
  updated_at: string;
  created_at: string;
}

export interface IdeaSummary {
  id: string;
  title: string;
  status: IdeaStatus;
  visibility: Visibility;
  owner_id: string;
  challenge_id: string;
  updated_at: string;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Public queries
// ---------------------------------------------------------------------------

/** Get ideas visible to the public (submitted + public visibility) */
export async function getPublicIdeas(): Promise<{ ideas: IdeaSummary[]; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('ideas')
      .select('id, title, status, visibility, owner_id, challenge_id, updated_at, created_at')
      .in('status', ['SUBMITTED', 'ELIGIBLE', 'UNDER_EVALUATION', 'PROMISING', 'PILOT_READY', 'IN_PILOT', 'VALIDATED', 'ADOPTED'])
      .eq('visibility', 'public')
      .order('updated_at', { ascending: false })
      .limit(50);

    if (error) return { ideas: [], error: error.message };
    return { ideas: (data ?? []) as IdeaSummary[], error: null };
  } catch (err) {
    return { ideas: [], error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/** Get a single idea by ID (public visibility only) */
export async function getPublicIdeaById(ideaId: string): Promise<{ idea: IdeaSummary | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('ideas')
      .select('id, title, status, visibility, owner_id, challenge_id, updated_at, created_at')
      .eq('id', ideaId)
      .eq('visibility', 'public')
      .in('status', ['SUBMITTED', 'ELIGIBLE', 'UNDER_EVALUATION', 'PROMISING', 'PILOT_READY', 'IN_PILOT', 'VALIDATED', 'ADOPTED'])
      .maybeSingle();

    if (error) return { idea: null, error: error.message };
    return { idea: data as IdeaSummary | null, error: null };
  } catch (err) {
    return { idea: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// ---------------------------------------------------------------------------
// Authenticated queries
// ---------------------------------------------------------------------------

/** Get user's own ideas (alias: getOwnIdeas) */
export async function getMyIdeas(): Promise<{ ideas: IdeaSummary[]; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { ideas: [], error: '로그인이 필요합니다.' };

    const { data, error } = await supabase
      .from('ideas')
      .select('id, title, status, visibility, owner_id, challenge_id, updated_at, created_at')
      .eq('owner_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) return { ideas: [], error: error.message };
    return { ideas: (data ?? []) as IdeaSummary[], error: null };
  } catch (err) {
    return { ideas: [], error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/** Backward-compatible alias */
export const getOwnIdeas = getMyIdeas;

// ---------------------------------------------------------------------------
// Idea Studio context
// ---------------------------------------------------------------------------

export interface IdeaStudioContext {
  idea: (IdeaItem & { working_passport: WorkingPassport }) | null;
  conversationId: string | null;
  messages: ConversationMessageItem[];
  error: string | null;
}

/** Fetch full studio context for the Idea Studio page */
export async function getIdeaStudioContext(ideaId: string): Promise<IdeaStudioContext> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { idea: null, conversationId: null, messages: [], error: '로그인이 필요합니다.' };

    // Fetch the idea
    const { data: idea, error: ideaError } = await supabase
      .from('ideas')
      .select('*')
      .eq('id', ideaId)
      .eq('owner_id', user.id)
      .maybeSingle();

    if (ideaError || !idea) {
      return { idea: null, conversationId: null, messages: [], error: ideaError?.message ?? 'Idea not found' };
    }

    // Fetch conversation
    const { data: conversations } = await supabase
      .from('conversations')
      .select('id')
      .eq('idea_id', ideaId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    const conversationId = conversations?.[0]?.id ?? null;

    // Fetch messages
    let messages: ConversationMessageItem[] = [];
    if (conversationId) {
      const { data: msgData } = await supabase
        .from('conversation_messages')
        .select('id, role, content, created_at, metadata')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      messages = (msgData ?? []) as ConversationMessageItem[];
    }

    return {
      idea: idea as IdeaItem & { working_passport: WorkingPassport },
      conversationId,
      messages,
      error: null,
    };
  } catch (err) {
    return { idea: null, conversationId: null, messages: [], error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
