import React from "react";

export interface InterestOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface InterestSelectorProps {
  options?: InterestOption[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  disabled?: boolean;
}

export const DEFAULT_INTEREST_OPTIONS: InterestOption[] = [
  { id: "local-life", label: "지역 생활·돌봄", icon: "🏡", description: "고령화, 돌봄, 지역 공동체 이슈 해결" },
  { id: "environment", label: "친환경·자원 재구성", icon: "🌱", description: "탄소중립, 자원 순환, 제로웨이스트" },
  { id: "work-automation", label: "AI 업무 자동화", icon: "⚡", description: "공공/민간 업무 효율화, AI 가공" },
  { id: "smart-mobility", label: "스마트 모빌리티·교통", icon: "🚗", description: "지역 교통 복지, 친환경 이동 수단" },
  { id: "education", label: "교육·인재 육성", icon: "📚", description: "지역 교육 격차 해소, 디지털 교육" },
  { id: "healthcare", label: "디지털 헬스케어", icon: "🩺", description: "원격 건강 관리, 스마트 수면·건강" },
];

/**
 * InterestSelector
 * Multi-select chips/cards for topic interests in onboarding.
 */
export function InterestSelector({
  options = DEFAULT_INTEREST_OPTIONS,
  selectedIds,
  onChange,
  disabled = false,
}: InterestSelectorProps) {
  const toggleOption = (id: string) => {
    if (disabled) return;
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div
        role="group"
        aria-label="관심 분야 선택"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "0.75rem",
        }}
      >
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => toggleOption(option.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "0.875rem 1rem",
                borderRadius: "var(--radius-md)",
                border: isSelected
                  ? "2px solid var(--wellb-forest-700)"
                  : "1px solid var(--surface-border)",
                background: isSelected ? "var(--wellb-sage-100)" : "var(--surface)",
                cursor: disabled ? "not-allowed" : "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
                boxShadow: isSelected ? "0 2px 8px rgba(18, 77, 53, 0.08)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "1rem", marginRight: "0.5rem" }}>
                  {option.icon || "📌"}
                </span>
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: isSelected ? "var(--wellb-forest-900)" : "var(--ink-primary)",
                    flex: 1,
                  }}
                >
                  {option.label}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: isSelected ? "var(--primary)" : "var(--surface-border)",
                    fontWeight: 800,
                  }}
                >
                  {isSelected ? "✓" : "+"}
                </span>
              </div>
              {option.description && (
                <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.3 }}>
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize: "0.8rem", color: "var(--ink-muted)", textAlign: "right" }}>
        선택됨: {selectedIds.length}개
      </div>
    </div>
  );
}
