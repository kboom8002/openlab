import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type MonthlyChallengeStatus, PUBLIC_CHALLENGE_STATUSES } from "@/types/domain";

/** @deprecated Use MonthlyChallengeStatus from @/types/domain */
export type ChallengeStatus = MonthlyChallengeStatus;

export interface MonthlyChallenge {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: MonthlyChallengeStatus;
  opens_at: string | null;
  closes_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getPublicChallenges(statusFilter?: string): Promise<{ challenges: MonthlyChallenge[]; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();
    let query = supabase
      .from("monthly_challenges")
      .select("*")
      .in("status", PUBLIC_CHALLENGE_STATUSES)
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "ALL" && PUBLIC_CHALLENGE_STATUSES.includes(statusFilter as MonthlyChallengeStatus)) {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      return { challenges: [], error: "챌린지 목록을 불러오지 못했습니다." };
    }

    return { challenges: (data as MonthlyChallenge[]) || [], error: null };
  } catch {
    return { challenges: [], error: "서버에 연결할 수 없습니다." };
  }
}

export async function getChallengeBySlug(slug: string): Promise<{ challenge: MonthlyChallenge | null; error: string | null }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("monthly_challenges")
      .select("*")
      .eq("slug", slug)
      .in("status", PUBLIC_CHALLENGE_STATUSES)
      .maybeSingle();

    if (error) {
      return { challenge: null, error: "챌린지 상세 정보를 불러오지 못했습니다." };
    }

    return { challenge: (data as MonthlyChallenge) || null, error: null };
  } catch {
    return { challenge: null, error: "서버에 연결할 수 없습니다." };
  }
}
