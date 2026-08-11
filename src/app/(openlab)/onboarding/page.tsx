"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/server/actions/onboarding";
import { safeRoute } from "@/lib/routes";
import {
  AuthShell,
  OnboardingStepper,
  InterestSelector,
  AccessibilityPreferences,
  ConsentNotice,
} from "@/features/auth/components";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Profile
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  // Step 2: Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Step 3: Accessibility & Consent
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [agreedRights, setAgreedRights] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreedTerms || !agreedPrivacy || !agreedRights) {
      setErrorMessage("서비스 이용을 위해 필수 약관 및 아이디어 권리 보장에 모두 동의해 주세요.");
      return;
    }

    startTransition(async () => {
      const res = await completeOnboarding({
        displayName: displayName || "참여자",
        bio,
        interests: selectedInterests,
        accessibilityPreferences: {
          reduced_motion: reducedMotion,
          high_contrast: highContrast,
        },
      });

      if (res.ok) {
        router.push(safeRoute("/challenges"));
        router.refresh();
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  return (
    <AuthShell
      title="온보딩 및 맞춤 설정"
      subtitle="WELLB OPENLAB 참여를 위한 프로필, 관심 분야 및 접근성 환경을 설정합니다."
      maxWidth="34rem"
    >
      <OnboardingStepper currentStep={step} totalSteps={3} />

      {errorMessage && (
        <div className="alert-box alert-error" role="alert" aria-live="polite" style={{ marginBottom: "1.25rem" }}>
          {errorMessage}
        </div>
      )}

      {/* Step 1: Profile Setup */}
      {step === 1 && (
        <section aria-labelledby="step1-heading">
          <h2 id="step1-heading" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem", color: "var(--wellb-forest-900)" }}>
            1. 기본 프로필 정보 입력
          </h2>
          <div className="form-group">
            <label htmlFor="displayName" className="form-label">
              표시 이름 / 닉네임 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="displayName"
              type="text"
              className="form-input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="예: 제주이노베이터"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              간단한 자기소개 (선택)
            </label>
            <textarea
              id="bio"
              className="form-textarea"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="해결하고 싶은 지역 문제나 관심 분야를 적어주세요."
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                if (!displayName.trim()) {
                  setErrorMessage("표시 이름을 입력해 주세요.");
                  return;
                }
                setErrorMessage(null);
                setStep(2);
              }}
            >
              다음 단계로 (관심 분야) →
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Interest Selection */}
      {step === 2 && (
        <section aria-labelledby="step2-heading">
          <h2 id="step2-heading" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--wellb-forest-900)" }}>
            2. 관심 오프닝 이노베이션 분야 선택
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.25rem" }}>
            주로 관심 있는 지역 사회 문제 및 혁신 영역을 선택해 주세요 (복수 선택 가능).
          </p>

          <InterestSelector
            selectedIds={selectedInterests}
            onChange={setSelectedInterests}
          />

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              ← 이전
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>
              다음 단계로 (접근성 & 약관) →
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Accessibility & Consent Notice */}
      {step === 3 && (
        <form onSubmit={handleComplete} aria-labelledby="step3-heading">
          <h2 id="step3-heading" style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--wellb-forest-900)" }}>
            3. 접근성 환경 및 서비스 동의
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.25rem" }}>
            편안한 서비스 이용을 위한 화면 설정과 주요 약관 동의를 완료해 주세요.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.5rem" }}>
            <AccessibilityPreferences
              reducedMotion={reducedMotion}
              highContrast={highContrast}
              onReducedMotionChange={setReducedMotion}
              onHighContrastChange={setHighContrast}
              disabled={isPending}
            />

            <ConsentNotice
              agreedTerms={agreedTerms}
              agreedPrivacy={agreedPrivacy}
              agreedRights={agreedRights}
              onAgreedTermsChange={setAgreedTerms}
              onAgreedPrivacyChange={setAgreedPrivacy}
              onAgreedRightsChange={setAgreedRights}
              disabled={isPending}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(2)} disabled={isPending}>
              ← 이전
            </button>
            <button type="submit" className="btn-primary" disabled={isPending}>
              {isPending ? "저장 중..." : "온보딩 완료하고 챌린지 보기"}
            </button>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
