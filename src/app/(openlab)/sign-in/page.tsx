"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmail, signUpWithEmail } from "@/server/actions/auth";
import { safeRoute } from "@/lib/routes";
import {
  AuthShell,
  SignInOptions,
  EmailMagicLinkForm,
  type AuthMode,
  type AuthMethod,
} from "@/features/auth/components";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/challenges";

  const [mode, setMode] = useState<AuthMode>("signin");
  const [method, setMethod] = useState<AuthMethod>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleMethodChange = (newMethod: AuthMethod) => {
    setMethod(newMethod);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage("이메일 주소를 입력해 주세요.");
      return;
    }

    startTransition(async () => {
      if (method === "magic_link" && mode === "signin") {
        // Magic link path
        setSuccessMessage(`${email} (으)로 매직링크 로그인 안내가 전송되었습니다. 이메일함을 확인해 주세요.`);
        return;
      }

      if (mode === "signin") {
        const res = await signInWithEmail({ email, password, next: nextPath });
        if (res.ok) {
          router.push(safeRoute(res.data.redirectUrl));
          router.refresh();
        } else {
          setErrorMessage(res.error.message);
        }
      } else {
        const res = await signUpWithEmail({ email, password, displayName });
        if (res.ok) {
          router.push(safeRoute(res.data.redirectUrl));
          router.refresh();
        } else {
          setErrorMessage(res.error.message);
        }
      }
    });
  };

  const titleText = mode === "signin" ? "로그인" : "회원가입";
  const subtitleText =
    mode === "signin"
      ? "WELLB OPENLAB 플랫폼 참여 및 아이디어 활동을 위해 시작하세요."
      : "오픈이노베이션 도전에 참여하고 새로운 혁신을 제안하세요.";

  return (
    <AuthShell
      title={titleText}
      subtitle={subtitleText}
      footer={
        mode === "signin" ? (
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", margin: 0 }}>
            아직 계정이 없으신가요?{" "}
            <button
              type="button"
              onClick={() => handleModeChange("signup")}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              회원가입
            </button>
          </p>
        ) : (
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", margin: 0 }}>
            이미 계정이 있으신가요?{" "}
            <button
              type="button"
              onClick={() => handleModeChange("signin")}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary)",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              로그인
            </button>
          </p>
        )
      }
    >
      <SignInOptions
        mode={mode}
        onModeChange={handleModeChange}
        method={method}
        onMethodChange={handleMethodChange}
        disabled={isPending}
      />

      <EmailMagicLinkForm
        mode={mode}
        method={method}
        email={email}
        password={password}
        displayName={displayName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onDisplayNameChange={setDisplayName}
        onSubmit={handleSubmit}
        isPending={isPending}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </AuthShell>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="card-pane" style={{ textAlign: "center", padding: "2rem", maxWidth: "28rem", margin: "2rem auto" }}>
          로딩 중...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
