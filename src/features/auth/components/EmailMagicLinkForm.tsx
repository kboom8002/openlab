import React from "react";
import type { AuthMode, AuthMethod } from "./SignInOptions";

export interface EmailMagicLinkFormProps {
  mode: AuthMode;
  method?: AuthMethod;
  email: string;
  password?: string;
  displayName?: string;
  onEmailChange: (val: string) => void;
  onPasswordChange?: (val: string) => void;
  onDisplayNameChange?: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
}

/**
 * EmailMagicLinkForm
 * Email input form for passwordless magic links or standard password authentication.
 */
export function EmailMagicLinkForm({
  mode,
  method = "password",
  email,
  password = "",
  displayName = "",
  onEmailChange,
  onPasswordChange,
  onDisplayNameChange,
  onSubmit,
  isPending = false,
  errorMessage,
  successMessage,
}: EmailMagicLinkFormProps) {
  const isMagicLink = method === "magic_link" && mode === "signin";

  return (
    <form onSubmit={onSubmit} noValidate aria-label={isMagicLink ? "매직링크 인증 폼" : "이메일 인증 폼"}>
      {errorMessage && (
        <div className="alert-box alert-error" role="alert" aria-live="polite">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="alert-box alert-info" role="status" aria-live="polite">
          {successMessage}
        </div>
      )}

      {mode === "signup" && onDisplayNameChange && (
        <div className="form-group">
          <label htmlFor="auth-displayName" className="form-label">
            이름 / 닉네임 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="auth-displayName"
            type="text"
            className="form-input"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            required
            disabled={isPending}
            placeholder="홍길동 (또는 닉네임)"
            autoComplete="name"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="auth-email" className="form-label">
          이메일 주소 <span style={{ color: "red" }}>*</span>
        </label>
        <input
          id="auth-email"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={isPending}
          placeholder="user@example.com"
          autoComplete="email"
        />
      </div>

      {!isMagicLink && onPasswordChange && (
        <div className="form-group">
          <label htmlFor="auth-password" className="form-label">
            비밀번호 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="auth-password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            disabled={isPending}
            placeholder={mode === "signup" ? "최소 6자 이상" : "비밀번호 입력"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </div>
      )}

      {isMagicLink && (
        <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginTop: "0.5rem", marginBottom: "1rem" }}>
          입력하신 이메일로 원클릭 로그인 매직링크를 전송해 드립니다.
        </p>
      )}

      <div style={{ marginTop: "1.5rem" }}>
        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%", padding: "0.75rem 1.25rem" }}
          disabled={isPending}
        >
          {isPending
            ? "처리 중..."
            : isMagicLink
            ? "매직링크 전송하기"
            : mode === "signin"
            ? "로그인하기"
            : "가입하기"}
        </button>
      </div>
    </form>
  );
}
