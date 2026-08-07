import type { PreflightResult } from "@/server/queries/passport";

interface PreflightSummaryProps {
  result: PreflightResult;
}

export function PreflightSummary({ result }: PreflightSummaryProps) {
  return (
    <div className="card-pane" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", color: "var(--wellb-forest-900)", margin: 0 }}>
            🔍 Preflight 완성도 검석 결과
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", margin: "0.25rem 0 0 0" }}>
            제출 전 Passport 9개 필수 영역의 논리 결함 및 미비점을 자동 진단했습니다.
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: result.isReady ? "var(--success-ink)" : "var(--wellb-gold-500)" }}>
            {result.score}점
          </div>
          <span className={`status-badge ${result.isReady ? "badge-open" : "badge-scheduled"}`}>
            {result.isReady ? "제출 가능" : "보완 필요"}
          </span>
        </div>
      </div>

      {result.issues.length === 0 ? (
        <div className="alert-box alert-info" style={{ margin: 0 }}>
          🎉 축하합니다! 모든 필수 항목이 충실히 작성되어 제출 준비가 완료되었습니다.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {result.issues.map((issue, idx) => (
            <div
              key={idx}
              style={{
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                background: issue.severity === "error" ? "var(--error-bg)" : "var(--wellb-gold-100)",
                border: issue.severity === "error" ? "1px solid var(--error-border)" : "1px solid #fcd34d",
                color: issue.severity === "error" ? "var(--error-ink)" : "var(--wellb-gold-500)",
                fontSize: "0.875rem",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <span>{issue.severity === "error" ? "❌ [필수]" : "⚠️ [권장]"}</span>
              <strong style={{ textTransform: "uppercase" }}>{issue.section}:</strong>
              <span>{issue.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
