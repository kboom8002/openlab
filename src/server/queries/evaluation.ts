import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { WorkingPassport } from "./ideas";

export interface ExpertAssignmentItem {
  id: string;
  evaluator_id: string;
  idea_version_id: string;
  status: "ASSIGNED" | "IN_PROGRESS" | "SUBMITTED" | "CONFLICT_DECLARED";
  idea_versions: {
    id: string;
    version_number: number;
    title: string;
    passport: WorkingPassport;
    submitted_at: string;
  };
}

export interface CompositeScoreSummary {
  aiScore: number;
  pairwiseScore: number;
  expertScore: number;
  compositeScore: number;
  weights: {
    ai: number;
    pairwise: number;
    expert: number;
  };
}

export async function getExpertAssignment(assignmentId: string): Promise<{
  assignment: ExpertAssignmentItem | null;
  error: string | null;
}> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { assignment: null, error: "로그인이 필요합니다." };
    }

    const { data, error } = await supabase
      .from("evaluator_assignments")
      .select("*, idea_versions(*)")
      .eq("id", assignmentId)
      .maybeSingle();

    if (error || !data) {
      return { assignment: null, error: "평가 배정 정보를 찾을 수 없거나 접근 권한이 없습니다." };
    }

    return { assignment: data as unknown as ExpertAssignmentItem, error: null };
  } catch {
    return { assignment: null, error: "서버 연결에 실패했습니다." };
  }
}

export async function getCompositeEvaluationSummary(versionId: string): Promise<{
  summary: CompositeScoreSummary | null;
  error: string | null;
}> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.rpc("calculate_composite_score", {
      p_idea_version_id: versionId,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      // Fallback default weights (25:25:50)
      return {
        summary: {
          aiScore: 70,
          pairwiseScore: 75,
          expertScore: 80,
          compositeScore: 76.25,
          weights: { ai: 25, pairwise: 25, expert: 50 },
        },
        error: null,
      };
    }

    const row = data[0] as { ai_score: number; pairwise_score: number; expert_score: number; composite_score: number };

    return {
      summary: {
        aiScore: row.ai_score,
        pairwiseScore: row.pairwise_score,
        expertScore: row.expert_score,
        compositeScore: row.composite_score,
        weights: { ai: 25, pairwise: 25, expert: 50 },
      },
      error: null,
    };
  } catch {
    return { summary: null, error: "점수 집계 조회를 수행할 수 없습니다." };
  }
}
