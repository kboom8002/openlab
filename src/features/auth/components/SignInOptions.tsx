import React from "react";

export type AuthMode = "signin" | "signup";
export type AuthMethod = "password" | "magic_link";

export interface SignInOptionsProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  method?: AuthMethod;
  onMethodChange?: (method: AuthMethod) => void;
  disabled?: boolean;
}

/**
 * SignInOptions
 * Controls to switch between Login/Signup modes and Password/MagicLink auth methods.
 */
export function SignInOptions({
  mode,
  onModeChange,
  method = "password",
  onMethodChange,
  disabled = false,
}: SignInOptionsProps) {
  return (
    <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Mode Switcher: 로그인 / 회원가입 */}
      <div
        role="tablist"
        aria-label="인증 모드 선택"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "var(--wellb-sage-100)",
          padding: "0.25rem",
          borderRadius: "var(--radius-md)",
          gap: "0.25rem",
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signin"}
          disabled={disabled}
          onClick={() => onModeChange("signin")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            fontWeight: mode === "signin" ? 700 : 500,
            color: mode === "signin" ? "var(--wellb-forest-900)" : "var(--ink-secondary)",
            background: mode === "signin" ? "var(--surface)" : "transparent",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: disabled ? "not-allowed" : "pointer",
            boxShadow: mode === "signin" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          로그인
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "signup"}
          disabled={disabled}
          onClick={() => onModeChange("signup")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            fontWeight: mode === "signup" ? 700 : 500,
            color: mode === "signup" ? "var(--wellb-forest-900)" : "var(--ink-secondary)",
            background: mode === "signup" ? "var(--surface)" : "transparent",
            border: "none",
            borderRadius: "var(--radius-sm)",
            cursor: disabled ? "not-allowed" : "pointer",
            boxShadow: mode === "signup" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            transition: "all 0.15s ease",
          }}
        >
          회원가입
        </button>
      </div>

      {/* Method Switcher: 비밀번호 / 매직링크 */}
      {onMethodChange && mode === "signin" && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", fontSize: "0.85rem" }}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onMethodChange("password")}
            style={{
              background: "none",
              border: "none",
              padding: "0.25rem 0",
              fontWeight: method === "password" ? 700 : 400,
              color: method === "password" ? "var(--primary)" : "var(--ink-muted)",
              borderBottom: method === "password" ? "2px solid var(--primary)" : "2px solid transparent",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            🔑 비밀번호 로그인
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onMethodChange("magic_link")}
            style={{
              background: "none",
              border: "none",
              padding: "0.25rem 0",
              fontWeight: method === "magic_link" ? 700 : 400,
              color: method === "magic_link" ? "var(--primary)" : "var(--ink-muted)",
              borderBottom: method === "magic_link" ? "2px solid var(--primary)" : "2px solid transparent",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            ✨ 매직링크 (비밀번호 없음)
          </button>
        </div>
      )}
    </div>
  );
}
