import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { WorkingPassport, IdeaItem } from "./ideas";

export interface SubmittedVersionItem {
  id: string;
  version_number: number;
  title: string;
  passport: WorkingPassport;
  content_hash: string;
  submitted_at: string;
}

export interface PreflightIssue {
  section: string;
  severity: "error" | "warning";
  message: string;
}

export interface PreflightResult {
  isReady: boolean;
  score: number;
  issues: PreflightIssue[];
}

export async function getPassportDetail(ideaId: string): Promise<{
  idea: IdeaItem & { working_passport: WorkingPassport } | null;
  submittedVersion: SubmittedVersionItem | null;
  isOwner: boolean;
  error: string | null;
}> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { idea: null, submittedVersion: null, isOwner: false, error: "로그인이 필요합니다." };
    }

    const { data: idea, error: ideaErr } = await supabase
      .from("ideas")
      .select("*, monthly_challenges(title, slug)")
      .eq("id", ideaId)
      .maybeSingle();

    if (ideaErr || !idea) {
      return { idea: null, submittedVersion: null, isOwner: false, error: "아이디어를 찾을 수 없거나 접근 권한이 없습니다." };
    }

    const isOwner = idea.owner_id === user.id;

    let submittedVersion: SubmittedVersionItem | null = null;
    if (idea.submitted_version_id) {
      const { data: versionData } = await supabase
        .from("idea_versions")
        .select("*")
        .eq("id", idea.submitted_version_id)
        .maybeSingle();
      
      if (versionData) {
        submittedVersion = versionData as unknown as SubmittedVersionItem;
      }
    }

    return {
      idea: idea as unknown as IdeaItem & { working_passport: WorkingPassport },
      submittedVersion,
      isOwner,
      error: null,
    };
  } catch {
    return { idea: null, submittedVersion: null, isOwner: false, error: "서버 연결에 실패했습니다." };
  }
}

export function runPreflightAnalysis(passport: WorkingPassport): PreflightResult {
  const issues: PreflightIssue[] = [];

  // Check 1: Identity
  if (!passport.identity?.title) {
    issues.push({ section: "identity", severity: "error", message: "아이디어 제목이 누락되었습니다." });
  }

  // Check 2: Problem
  if (!passport.problem?.target_user || !passport.problem?.context) {
    issues.push({ section: "problem", severity: "error", message: "문제 정의 및 타겟 사용자 설명이 필요합니다." });
  }

  // Check 3: People Context
  if (!passport.people_context?.primary_users) {
    issues.push({ section: "people_context", severity: "warning", message: "주요 이해관계자 정보가 미흡합니다." });
  }

  // Check 4: Solution
  if (!passport.solution?.core_solution) {
    issues.push({ section: "solution", severity: "error", message: "핵심 솔루션 설명이 작성되지 않았습니다." });
  }

  // Check 5: Feasibility
  if (!passport.feasibility?.required_resources) {
    issues.push({ section: "feasibility", severity: "warning", message: "실행에 필요한 자원 및 리소스 설명 작성을 권장합니다." });
  }

  // Check 6: Impact
  if (!passport.impact?.expected_changes) {
    issues.push({ section: "impact", severity: "warning", message: "기대되는 변화와 성과 지표 작성을 권장합니다." });
  }

  // Check 7: Experiment
  if (!passport.experiment?.key_assumption) {
    issues.push({ section: "experiment", severity: "error", message: "실증을 위한 핵심 가설(key assumption)이 정의되지 않았습니다." });
  }

  const errorsCount = issues.filter((i) => i.severity === "error").length;
  const isReady = errorsCount === 0;
  const score = Math.max(0, 100 - issues.length * 15);

  return { isReady, score, issues };
}
