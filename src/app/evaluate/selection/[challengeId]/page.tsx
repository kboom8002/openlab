import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SelectionBoardClient, type CandidateIdeaItem } from "@/features/evaluation/components/SelectionBoardClient";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";

export const dynamic = "force-dynamic";

interface SelectionBoardPageProps {
  params: Promise<{ challengeId: string }>;
}

export default async function SelectionBoardPage({ params }: SelectionBoardPageProps) {
  const resolvedParams = await params;
  const challengeId = resolvedParams.challengeId;

  const supabase = await createSupabaseServerClient();

  // Fetch challenge info (by ID or slug)
  const { data: challengeData } = await supabase
    .from("monthly_challenges")
    .select("id, slug, title, status, summary")
    .or(`id.eq.${challengeId},slug.eq.${challengeId}`)
    .maybeSingle();

  const challenge = challengeData ?? {
    id: challengeId,
    slug: challengeId,
    title: "2026-08 제주 지역 생활 돌봄 및 자원순환 챌린지",
    status: "SELECTION",
    summary: "지역 사회 문제를 해결하기 위한 현장 실증 선발 심의위원회 이사회",
  };

  // Fetch candidate idea versions for this challenge
  const { data: versionsData } = await supabase
    .from("idea_versions")
    .select("id, version_number, title, created_at, idea_id, ideas(status, owner_id)")
    .eq("challenge_id", challenge.id)
    .order("created_at", { ascending: false });

  // Fetch existing selection decisions for this challenge
  const { data: decisionsData } = await supabase
    .from("selection_decisions")
    .select("id, idea_version_id, decision, reason, decided_at")
    .eq("challenge_id", challenge.id);

  const decisionsMap = new Map<string, { id: string; decision: "promising" | "pilot_ready" | "hold" | "not_selected"; reason: string; decidedAt: string }>();
  if (decisionsData) {
    decisionsData.forEach((d) => {
      decisionsMap.set(d.idea_version_id, {
        id: d.id,
        decision: d.decision as "promising" | "pilot_ready" | "hold" | "not_selected",
        reason: d.reason,
        decidedAt: d.decided_at,
      });
    });
  }

  // Build candidate items
  let candidates: CandidateIdeaItem[] = [];

  if (versionsData && versionsData.length > 0) {
    candidates = versionsData.map((v) => {
      const ideaStatus = (v.ideas as unknown as { status?: string })?.status || "UNDER_EVALUATION";
      const decision = decisionsMap.get(v.id) || null;

      return {
        ideaId: v.idea_id,
        versionId: v.id,
        versionNumber: v.version_number,
        title: v.title || "무제 아이디어",
        submitterName: "참여자",
        status: ideaStatus,
        compositeScore: 78.5,
        aiScore: 75,
        pairwiseScore: 82,
        expertScore: 80,
        latestDecision: decision,
      };
    });
  } else {
    // Provide sample candidate data for demonstration if no DB versions exist yet
    candidates = [
      {
        ideaId: "mock-idea-1",
        versionId: "11111111-1111-4111-8111-111111111111",
        versionNumber: 1,
        title: "스마트 태양광 기반 이동형 충전 스테이션 및 자원순환 수거 네트워크",
        submitterName: "제주이노베이터",
        status: "UNDER_EVALUATION",
        compositeScore: 88.5,
        aiScore: 85,
        pairwiseScore: 90,
        expertScore: 90,
        latestDecision: decisionsMap.get("11111111-1111-4111-8111-111111111111") || null,
      },
      {
        ideaId: "mock-idea-2",
        versionId: "22222222-2222-4222-8222-222222222222",
        versionNumber: 2,
        title: "마을 공동체 연계 빗물 재활용 수질 제어 및 농가 모니터링 자동화",
        submitterName: "그린오픈랩",
        status: "UNDER_EVALUATION",
        compositeScore: 79.2,
        aiScore: 80,
        pairwiseScore: 76,
        expertScore: 82,
        latestDecision: decisionsMap.get("22222222-2222-4222-8222-222222222222") || null,
      },
      {
        ideaId: "mock-idea-3",
        versionId: "33333333-3333-4333-8333-333333333333",
        versionNumber: 1,
        title: "고령층 가구 자율 배차 및 케어 서비스 통합 모빌리티 플러그인",
        submitterName: "돌봄이음",
        status: "UNDER_EVALUATION",
        compositeScore: 72.0,
        aiScore: 70,
        pairwiseScore: 74,
        expertScore: 72,
        latestDecision: decisionsMap.get("33333333-3333-4333-8333-333333333333") || null,
      },
    ];
  }

  return (
    <main id="main" className="container-shell" style={{ maxWidth: "64rem", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href={safeRoute("/admin")} className="btn-secondary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.82rem" }}>
          ← 관리자 대시보드
        </Link>
      </div>

      <SelectionBoardClient challenge={challenge} candidates={candidates} />
    </main>
  );
}
