import Link from "next/link";
import { safeRoute } from "@/lib/routes";

export const dynamic = "force-dynamic";

interface PairwisePageProps {
  params: Promise<{ challengeId: string }>;
}

export default async function PairwiseEvaluationPage({ params }: PairwisePageProps) {
  const resolvedParams = await params;

  return (
    <main id="main" className="card-pane" style={{ maxWidth: "42rem", margin: "2rem auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", color: "var(--wellb-forest-900)", margin: 0 }}>
          👥 현장 전문가 & 동료 Pairwise 1:1 상대평가
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginTop: "0.25rem" }}>
          챌린지 ID: {resolvedParams.challengeId} (현장 실증 적합도 상대 선호도 투표)
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ border: "2px solid var(--primary)", padding: "1rem", borderRadius: "var(--radius-md)", background: "white" }}>
          <span className="status-badge badge-open" style={{ marginBottom: "0.5rem" }}>Idea A</span>
          <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.5rem 0" }}>스마트 태양광 기반 이동형 충전 스테이션</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            지역 주민 참여형 자율 분배 및 실증 모델
          </p>
          <button type="button" className="btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            A 아이디어 우위 선택
          </button>
        </div>

        <div style={{ border: "2px solid var(--surface-border)", padding: "1rem", borderRadius: "var(--radius-md)", background: "white" }}>
          <span className="status-badge badge-scheduled" style={{ marginBottom: "0.5rem" }}>Idea B</span>
          <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.5rem 0" }}>마을 공동체 연계 빗물 재활용 수질 제어</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            농가 및 마을회관 모니터링 자동화
          </p>
          <button type="button" className="btn-secondary" style={{ width: "100%", marginTop: "1rem" }}>
            B 아이디어 우위 선택
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link href={safeRoute("/challenges")} className="btn-secondary">
          ← 챌린지 목록으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
