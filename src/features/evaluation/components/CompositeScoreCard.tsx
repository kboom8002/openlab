import type { CompositeScoreSummary } from "@/server/queries/evaluation";

interface CompositeScoreCardProps {
  summary: CompositeScoreSummary;
}

export function CompositeScoreCard({ summary }: CompositeScoreCardProps) {
  return (
    <div className="card-pane">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", color: "var(--wellb-forest-900)", margin: 0 }}>
            🏆 다층 평가 합산 점수 (Composite Score)
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", margin: "0.25rem 0 0 0" }}>
            계약 명시 가중치: AI 평가(25%) + 현장 Pairwise(25%) + 전문가 심사(50%)
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--primary)" }}>
            {summary.compositeScore.toFixed(2)}점
          </div>
          <span className="status-badge badge-open">100점 만점 기준</span>
        </div>
      </div>

      {/* Layer Breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ background: "#f8fafc", padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 600 }}>
            🤖 AI 참조 점수 (25%)
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--wellb-forest-900)", marginTop: "0.25rem" }}>
            {summary.aiScore.toFixed(1)}점
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
            기여점수: {(summary.aiScore * 0.25).toFixed(2)}점
          </span>
        </div>

        <div style={{ background: "#f8fafc", padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 600 }}>
            👥 현장 Pairwise 비교 (25%)
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--wellb-forest-900)", marginTop: "0.25rem" }}>
            {summary.pairwiseScore.toFixed(1)}점
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
            기여점수: {(summary.pairwiseScore * 0.25).toFixed(2)}점
          </span>
        </div>

        <div style={{ background: "#f8fafc", padding: "0.875rem", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", fontWeight: 600 }}>
            🎓 전문가 정성/정량 심사 (50%)
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--wellb-forest-900)", marginTop: "0.25rem" }}>
            {summary.expertScore.toFixed(1)}점
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>
            기여점수: {(summary.expertScore * 0.50).toFixed(2)}점
          </span>
        </div>
      </div>
    </div>
  );
}
