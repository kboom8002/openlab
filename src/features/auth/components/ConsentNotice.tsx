import React from "react";

export interface ConsentNoticeProps {
  agreedTerms: boolean;
  agreedPrivacy: boolean;
  agreedRights: boolean;
  onAgreedTermsChange: (val: boolean) => void;
  onAgreedPrivacyChange: (val: boolean) => void;
  onAgreedRightsChange: (val: boolean) => void;
  onAgreeAll?: () => void;
  disabled?: boolean;
}

/**
 * ConsentNotice
 * Agreement checkboxes for Terms of Service, Privacy Policy, and Open Innovation Rights notice.
 */
export function ConsentNotice({
  agreedTerms,
  agreedPrivacy,
  agreedRights,
  onAgreedTermsChange,
  onAgreedPrivacyChange,
  onAgreedRightsChange,
  onAgreeAll,
  disabled = false,
}: ConsentNoticeProps) {
  const allAgreed = agreedTerms && agreedPrivacy && agreedRights;

  const handleToggleAll = () => {
    if (disabled) return;
    const target = !allAgreed;
    onAgreedTermsChange(target);
    onAgreedPrivacyChange(target);
    onAgreedRightsChange(target);
    if (onAgreeAll && target) {
      onAgreeAll();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        background: "var(--surface)",
        padding: "1.25rem",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--surface-border)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "1rem", fontWeight: 700, margin: 0, color: "var(--wellb-forest-900)" }}>
          📜 서비스 이용 동의 및 권리 보장
        </h3>
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggleAll}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary)",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: disabled ? "not-allowed" : "pointer",
            textDecoration: "underline",
          }}
        >
          {allAgreed ? "전체 해제" : "전체 동의하기"}
        </button>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid var(--surface-border)", margin: 0 }} />

      {/* Terms of Service */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: disabled ? "not-allowed" : "pointer" }}>
        <input
          type="checkbox"
          checked={agreedTerms}
          disabled={disabled}
          onChange={(e) => onAgreedTermsChange(e.target.checked)}
          style={{ marginTop: "0.2rem", cursor: "pointer", accentColor: "var(--primary)" }}
        />
        <div style={{ fontSize: "0.875rem", color: "var(--ink-primary)" }}>
          <span style={{ fontWeight: 600 }}>[필수] 이용약관 동의</span>
          <p style={{ margin: "0.15rem 0 0", fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            WELLB OPENLAB 서비스 플랫폼 이용 규칙 및 회원의 권리 의무에 동의합니다.
          </p>
        </div>
      </label>

      {/* Privacy Policy */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: disabled ? "not-allowed" : "pointer" }}>
        <input
          type="checkbox"
          checked={agreedPrivacy}
          disabled={disabled}
          onChange={(e) => onAgreedPrivacyChange(e.target.checked)}
          style={{ marginTop: "0.2rem", cursor: "pointer", accentColor: "var(--primary)" }}
        />
        <div style={{ fontSize: "0.875rem", color: "var(--ink-primary)" }}>
          <span style={{ fontWeight: 600 }}>[필수] 개인정보 수집 및 이용 동의</span>
          <p style={{ margin: "0.15rem 0 0", fontSize: "0.78rem", color: "var(--ink-muted)" }}>
            계정 관리, 챌린지 참여, 파일럿 연결을 위한 최소한의 개인정보 수집에 동의합니다.
          </p>
        </div>
      </label>

      {/* Idea Rights Notice */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: disabled ? "not-allowed" : "pointer" }}>
        <input
          type="checkbox"
          checked={agreedRights}
          disabled={disabled}
          onChange={(e) => onAgreedRightsChange(e.target.checked)}
          style={{ marginTop: "0.2rem", cursor: "pointer", accentColor: "var(--primary)" }}
        />
        <div style={{ fontSize: "0.875rem", color: "var(--ink-primary)" }}>
          <span style={{ fontWeight: 600 }}>[필수] 아이디어 소유권 및 지식재산권 보장 확인</span>
          <p style={{ margin: "0.15rem 0 0", fontSize: "0.78rem", color: "var(--ink-muted)", lineHeight: 1.35 }}>
            제출된 모든 아이디어의 소유권은 제안자 본인에게 유지되며, 무단 사용/도용하지 않음을 확인합니다.
          </p>
        </div>
      </label>

      {/* Rights Alert Highlight */}
      <div className="alert-box alert-info" style={{ margin: "0.25rem 0 0", padding: "0.75rem 1rem" }}>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#1e40af" }}>
          💡 <strong>투명한 오픈이노베이션 원칙</strong>: WELLB OPENLAB은 아이디어 제안자의 귀속 권리를 보호하며 공정한 심의 및 실증 협업을 지원합니다.
        </p>
      </div>
    </div>
  );
}
