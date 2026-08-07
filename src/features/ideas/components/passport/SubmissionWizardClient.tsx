"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { PreflightResult } from "@/server/queries/passport";
import type { WorkingPassport, IdeaItem } from "@/server/queries/ideas";
import { submitIdeaAction } from "@/server/actions/idea-submit";
import { PreflightSummary } from "./PreflightSummary";
import { safeRoute } from "@/lib/routes";

interface SubmissionWizardClientProps {
  idea: IdeaItem & { working_passport: WorkingPassport };
  preflightResult: PreflightResult;
}

type VisibilityType = "public" | "anonymous" | "evaluators_only" | "private";

export function SubmissionWizardClient({
  idea,
  preflightResult,
}: SubmissionWizardClientProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [visibility, setVisibility] = useState<VisibilityType>("evaluators_only");
  const [authorOwnershipAcknowledged, setAuthorOwnershipAcknowledged] = useState(false);
  const [aiProcessingConsent, setAiProcessingConsent] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedVersionId, setSubmittedVersionId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!authorOwnershipAcknowledged || !aiProcessingConsent) {
      setErrorMessage("필수 동의 항목에 모두 체크해 주세요.");
      return;
    }

    startTransition(async () => {
      const res = await submitIdeaAction({
        ideaId: idea.id,
        visibility,
        authorOwnershipAcknowledged: true,
        aiProcessingConsent: true,
      });

      if (res.ok) {
        setIsSubmitted(true);
        setSubmittedVersionId(res.data.submittedVersionId);
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  if (isSubmitted) {
    return (
      <main id="main" className="card-pane" style={{ maxWidth: "34rem", margin: "3rem auto", textAlign: "center" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>🎉</div>
        <h1 style={{ fontSize: "1.75rem", color: "var(--wellb-forest-900)", marginBottom: "0.75rem" }}>
          아이디어 제출이 완료되었습니다!
        </h1>
        <p style={{ color: "var(--ink-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          제출된 아이디어 버전은 <strong>Immutable Snapshot (ID: {submittedVersionId?.slice(0, 8)}...)</strong>으로 안전하게 저장되었습니다.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <Link href={safeRoute(`/ideas/${idea.id}/passport`)} className="btn-primary">
            제출된 Idea Passport 확인 →
          </Link>
          <Link href={safeRoute("/my/ideas")} className="btn-secondary">
            내 목록으로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="card-pane" style={{ maxWidth: "36rem", margin: "2rem auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <h1 style={{ fontSize: "1.5rem", color: "var(--wellb-forest-900)", margin: 0 }}>
            아이디어 제출 (Submission)
          </h1>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--wellb-forest-700)" }}>
            Step {step} / 4
          </span>
        </div>
        <div style={{ height: "4px", background: "var(--surface-border)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ width: `${(step / 4) * 100}%`, height: "100%", background: "var(--primary)", transition: "width 0.2s" }} />
        </div>
      </header>

      {errorMessage && (
        <div className="alert-box alert-error" role="alert" aria-live="polite">
          {errorMessage}
        </div>
      )}

      {/* Step 1: Preflight */}
      {step === 1 && (
        <section>
          <PreflightSummary result={preflightResult} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
            <Link href={safeRoute(`/ideas/${idea.id}/studio`)} className="btn-secondary">
              ← Studio에서 보완하기
            </Link>
            <button type="button" className="btn-primary" onClick={() => setStep(2)}>
              다음: 공개 범위 선택 →
            </button>
          </div>
        </section>
      )}

      {/* Step 2: Visibility Selection */}
      {step === 2 && (
        <section aria-labelledby="step2-heading">
          <h2 id="step2-heading" style={{ fontSize: "1.2rem", color: "var(--wellb-forest-900)", marginBottom: "0.5rem" }}>
            2. 공개 범위 설정 (Visibility)
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.25rem" }}>
            제출된 아이디어가 공개되거나 검토되는 범위를 설정합니다.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { id: "evaluators_only", label: "평가자 전용 (Evaluators Only)", desc: "할당된 전문가 및 평가진만 열람 가능 (기본 권장)" },
              { id: "public", label: "전체 공개 (Public)", desc: "플랫폼 내 모든 사용자 및 방문자에게 공개" },
              { id: "anonymous", label: "익명 공개 (Anonymous)", desc: "작성자 신원 비공개로 아이디어 내용만 전체 공개" },
              { id: "private", label: "비공개 (Private)", desc: "본인과 검토 관리자만 접근 가능" },
            ].map((opt) => (
              <label
                key={opt.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.875rem 1rem",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "var(--radius-md)",
                  background: visibility === opt.id ? "var(--wellb-sage-100)" : "white",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="visibility"
                    checked={visibility === opt.id}
                    onChange={() => setVisibility(opt.id as VisibilityType)}
                  />
                  <strong style={{ fontSize: "0.95rem" }}>{opt.label}</strong>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "0.25rem", marginLeft: "1.5rem" }}>
                  {opt.desc}
                </span>
              </label>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              이전
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep(3)}>
              다음: 권리 및 약관 동의 →
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Rights & Consent Checklist */}
      {step === 3 && (
        <section aria-labelledby="step3-heading">
          <h2 id="step3-heading" style={{ fontSize: "1.2rem", color: "var(--wellb-forest-900)", marginBottom: "0.5rem" }}>
            3. 권리 보장 및 약관 동의
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", marginBottom: "1.25rem" }}>
            아래 동의 항목을 확인해 주세요 (사전 체크되지 않습니다).
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.875rem", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-md)", background: "white", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={authorOwnershipAcknowledged}
                onChange={(e) => setAuthorOwnershipAcknowledged(e.target.checked)}
                style={{ marginTop: "0.25rem" }}
              />
              <div style={{ fontSize: "0.9rem" }}>
                <strong>[필수] 아이디어 권리 제출자 유지 확인</strong>
                <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                  본 플랫폼에 제출된 아이디어의 권리는 참가자 본인에게 지속 유지되며, 제출만으로 소유권이 이전되지 않음을 확인합니다.
                </p>
              </div>
            </label>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.875rem", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-md)", background: "white", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={aiProcessingConsent}
                onChange={(e) => setAiProcessingConsent(e.target.checked)}
                style={{ marginTop: "0.25rem" }}
              />
              <div style={{ fontSize: "0.9rem" }}>
                <strong>[필수] AI 및 전문가 다층 평가 동의</strong>
                <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "var(--ink-muted)" }}>
                  제출물에 대한 AI 평가는 최종 판정이 아닌 참고 지표로 사용되며, 다층 수치 및 전문가 심사를 거치게 됨에 동의합니다.
                </p>
              </div>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
              이전
            </button>
            <button
              type="button"
              className="btn-primary"
              disabled={!authorOwnershipAcknowledged || !aiProcessingConsent}
              onClick={() => setStep(4)}
            >
              다음: 최종 제출 확인 →
            </button>
          </div>
        </section>
      )}

      {/* Step 4: Final Confirmation */}
      {step === 4 && (
        <form onSubmit={handleFinalSubmit} aria-labelledby="step4-heading">
          <h2 id="step4-heading" style={{ fontSize: "1.2rem", color: "var(--wellb-forest-900)", marginBottom: "0.5rem" }}>
            4. 최종 제출 확정
          </h2>
          
          <div className="alert-box alert-info" style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>⚠️ 제출 전 필수 주의사항</h3>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.85rem", lineHeight: 1.6 }}>
              <li>제출 버튼을 누르면 <strong>불변(Immutable) Snapshot</strong>이 생성됩니다.</li>
              <li>제출 이후에는 내용 수정이 차단되며, 제출 버전 상태로 평가가 진행됩니다.</li>
              <li>공개 범위: <strong>{visibility}</strong></li>
            </ul>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" className="btn-secondary" onClick={() => setStep(3)} disabled={isPending}>
              이전
            </button>
            <button type="submit" className="btn-primary" disabled={isPending}>
              {isPending ? "제출 처리 중..." : "🔒 최종 제출 확정하기"}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
