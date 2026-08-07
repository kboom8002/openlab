"use client";

export type StudioStage = "identity" | "problem" | "people_context" | "solution" | "feasibility" | "impact" | "experiment";

export interface StageItem {
  id: StudioStage;
  number: number;
  title: string;
  subtitle: string;
}

export const STUDIO_STAGES: StageItem[] = [
  { id: "identity", number: 1, title: "아이디어 정의", subtitle: "제목 및 핵심 분야" },
  { id: "problem", number: 2, title: "문제 관찰", subtitle: "대상 및 겪는 불편" },
  { id: "people_context", number: 3, title: "사람과 맥락", subtitle: "주요 이해관계자" },
  { id: "solution", number: 4, title: "해결 방안", subtitle: "핵심 솔루션 및 흐름" },
  { id: "feasibility", number: 5, title: "실행 가능성", subtitle: "필요 자원 및 위험" },
  { id: "impact", number: 6, title: "기대 효과", subtitle: "변화 및 핵심 지표" },
  { id: "experiment", number: 7, title: "실증 설계", subtitle: "최소 프로토타입 검증" },
];

interface StageNavigationProps {
  currentStage: StudioStage;
  onSelectStage: (stage: StudioStage) => void;
}

export function StageNavigation({ currentStage, onSelectStage }: StageNavigationProps) {
  return (
    <nav aria-label="7단계 아이디어 스튜디오 스테이지" style={{ width: "100%" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {STUDIO_STAGES.map((s) => {
          const isActive = currentStage === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelectStage(s.id)}
                aria-current={isActive ? "step" : undefined}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: isActive ? "2px solid var(--primary)" : "1px solid var(--surface-border)",
                  background: isActive ? "var(--wellb-sage-100)" : "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    background: isActive ? "var(--primary)" : "#e5e7eb",
                    color: isActive ? "white" : "var(--ink-secondary)",
                  }}
                >
                  {s.number}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: isActive ? "var(--wellb-forest-900)" : "var(--ink-primary)" }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>{s.subtitle}</div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
