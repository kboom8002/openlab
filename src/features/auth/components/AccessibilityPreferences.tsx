import React from "react";

export interface AccessibilityPreferencesProps {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize?: "normal" | "large" | "x-large";
  onReducedMotionChange: (val: boolean) => void;
  onHighContrastChange: (val: boolean) => void;
  onFontSizeChange?: (val: "normal" | "large" | "x-large") => void;
  disabled?: boolean;
}

/**
 * AccessibilityPreferences
 * Controls for reduced motion, high contrast mode, and font size preferences.
 */
export function AccessibilityPreferences({
  reducedMotion,
  highContrast,
  fontSize = "normal",
  onReducedMotionChange,
  onHighContrastChange,
  onFontSizeChange,
  disabled = false,
}: AccessibilityPreferencesProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "var(--bg)",
        padding: "1.25rem",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--surface-border)",
      }}
    >
      <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--wellb-forest-900)" }}>
        ♿ 접근성 및 화면 표시 설정
      </h3>

      {/* Reduced Motion Toggle */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
      >
        <div>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", color: "var(--ink-primary)" }}>
            애니메이션 최소화 (Reduced Motion)
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            화면 전환 효과와 생동적인 애니메이션 동작을 줄입니다.
          </span>
        </div>
        <input
          type="checkbox"
          checked={reducedMotion}
          disabled={disabled}
          onChange={(e) => onReducedMotionChange(e.target.checked)}
          style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer", accentColor: "var(--primary)" }}
        />
      </label>

      <hr style={{ border: "none", borderTop: "1px solid var(--surface-border)", margin: 0 }} />

      {/* High Contrast Toggle */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: disabled ? "not-allowed" : "pointer",
          userSelect: "none",
        }}
      >
        <div>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", color: "var(--ink-primary)" }}>
            고대비 모드 (High Contrast)
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            글자와 배경의 시각적 대비를 더욱 뚜렷하게 강조합니다.
          </span>
        </div>
        <input
          type="checkbox"
          checked={highContrast}
          disabled={disabled}
          onChange={(e) => onHighContrastChange(e.target.checked)}
          style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer", accentColor: "var(--primary)" }}
        />
      </label>

      {onFontSizeChange && (
        <>
          <hr style={{ border: "none", borderTop: "1px solid var(--surface-border)", margin: 0 }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", color: "var(--ink-primary)" }}>
                글자 크기 (Font Size)
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                본문 텍스트 크기를 설정합니다.
              </span>
            </div>
            <select
              className="form-select"
              value={fontSize}
              disabled={disabled}
              onChange={(e) => onFontSizeChange(e.target.value as "normal" | "large" | "x-large")}
              style={{ width: "auto", padding: "0.35rem 0.6rem", fontSize: "0.85rem" }}
            >
              <option value="normal">보통 (100%)</option>
              <option value="large">크게 (115%)</option>
              <option value="x-large">매우 크게 (130%)</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
}
