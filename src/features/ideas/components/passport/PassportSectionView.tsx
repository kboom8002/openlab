import type { WorkingPassport } from "@/server/queries/ideas";

interface PassportSectionViewProps {
  passport: WorkingPassport;
}

const SECTION_TITLES: { key: string; label: string; icon: string }[] = [
  { key: "identity", label: "1. 아이디어 기본 정의 (Identity)", icon: "📌" },
  { key: "problem", label: "2. 관찰된 문제 및 대상 (Problem)", icon: "🔍" },
  { key: "people_context", label: "3. 사람과 운용 맥락 (People & Context)", icon: "👥" },
  { key: "solution", label: "4. 핵심 솔루션 및 흐름 (Solution)", icon: "💡" },
  { key: "feasibility", label: "5. 실행 가능성 및 리소스 (Feasibility)", icon: "⚙️" },
  { key: "impact", label: "6. 기대 효과 및 성과 지표 (Impact)", icon: "📈" },
  { key: "experiment", label: "7. 최소 프로토타입 실증 설계 (Experiment)", icon: "🧪" },
  { key: "rights", label: "8. 권리 및 투명성 동의 (Rights)", icon: "🛡️" },
];

export function PassportSectionView({ passport }: PassportSectionViewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {SECTION_TITLES.map((sec) => {
        const dataObj = (passport[sec.key] as Record<string, unknown>) || {};
        const entries = Object.entries(dataObj);

        return (
          <section key={sec.key} className="card-pane">
            <h2 style={{ fontSize: "1.2rem", color: "var(--wellb-forest-900)", marginTop: 0, marginBottom: "0.75rem" }}>
              {sec.icon} {sec.label}
            </h2>

            {entries.length === 0 ? (
              <p style={{ color: "var(--ink-muted)", fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>
                작성된 내용이 없습니다.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "0.75rem" }}>
                {entries.map(([k, v]) => (
                  <div key={k} style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--surface-border)" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--wellb-forest-700)", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                      {k}
                    </div>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink-primary)", whiteSpace: "pre-wrap" }}>
                      {String(v || "(내용 없음)")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
