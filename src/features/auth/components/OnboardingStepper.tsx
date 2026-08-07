import React from "react";

export interface StepInfo {
  step: number;
  label: string;
}

export interface OnboardingStepperProps {
  currentStep: number;
  totalSteps?: number;
  steps?: StepInfo[];
}

const DEFAULT_STEPS: StepInfo[] = [
  { step: 1, label: "프로필 설정" },
  { step: 2, label: "관심 분야" },
  { step: 3, label: "접근성 & 약관" },
];

/**
 * OnboardingStepper
 * Visual step indicator for onboarding progression.
 */
export function OnboardingStepper({
  currentStep,
  totalSteps = 3,
  steps = DEFAULT_STEPS,
}: OnboardingStepperProps) {
  const progressPercent = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <nav aria-label="온보딩 진행 단계" style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--wellb-forest-700)" }}>
          Step {currentStep} / {totalSteps}
        </span>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink-secondary)" }}>
          {steps.find((s) => s.step === currentStep)?.label || ""}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: "6px",
          background: "var(--surface-border)",
          borderRadius: "3px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            background: "var(--primary)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Step badges */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        {steps.map((s) => {
          const isDone = currentStep > s.step;
          const isCurrent = currentStep === s.step;
          return (
            <div
              key={s.step}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: "0.75rem",
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent
                  ? "var(--wellb-forest-900)"
                  : isDone
                  ? "var(--primary)"
                  : "var(--ink-muted)",
                padding: "0.25rem",
                borderBottom: isCurrent
                  ? "2px solid var(--primary)"
                  : isDone
                  ? "2px solid var(--wellb-sage-500)"
                  : "2px solid transparent",
              }}
            >
              {isDone ? "✓ " : `${s.step}. `}
              {s.label}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
