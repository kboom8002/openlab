"use client";

import { useState, useTransition } from "react";
import type { ExpertAssignmentItem } from "@/server/queries/evaluation";
import { submitExpertReviewAction } from "@/server/actions/evaluation";
import { ConflictDeclaration } from "./ConflictDeclaration";

interface ExpertReviewClientProps {
  assignment: ExpertAssignmentItem;
}

export function ExpertReviewClient({ assignment }: ExpertReviewClientProps) {
  const [isConflictDeclared, setIsConflictDeclared] = useState(
    assignment.status === "CONFLICT_DECLARED"
  );
  const [conflictAcknowledged, setConflictAcknowledged] = useState(false);

  // Rubric Scores (Total 100)
  const [problemReality, setProblemReality] = useState(12); // Max 15
  const [userValue, setUserValue] = useState(12); // Max 15
  const [solutionFit, setSolutionFit] = useState(16); // Max 20
  const [feasibility, setFeasibility] = useState(16); // Max 20
  const [pilotability, setPilotability] = useState(12); // Max 15
  const [scalability, setScalability] = useState(4); // Max 5
  const [socialValueSafety, setSocialValueSafety] = useState(8); // Max 10

  const [rationale, setRationale] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(assignment.status === "SUBMITTED");
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalScore = problemReality + userValue + solutionFit + feasibility + pilotability + scalability + socialValueSafety;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!conflictAcknowledged) {
      setErrorMessage("이해상충이 없음을 확인해야 평가를 제출할 수 있습니다.");
      return;
    }

    startTransition(async () => {
      const res = await submitExpertReviewAction({
        assignmentId: assignment.id,
        versionId: assignment.idea_version_id,
        conflictDeclared: false,
        rubricScores: {
          problemReality,
          userValue,
          solutionFit,
          feasibility,
          pilotability,
          scalability,
          socialValueSafety,
        },
        rationale,
      });

      if (res.ok) {
        setIsSubmitted(true);
        setSubmittedScore(res.data.score);
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  if (isConflictDeclared) {
    return (
      <main id="main" className="card-pane" style={{ maxWidth: "34rem", margin: "2rem auto", textAlign: "center" }}>
        <h2>🚨 이해상충 신고 완료</h2>
        <p style={{ color: "var(--ink-secondary)", fontSize: "0.95rem" }}>
          이해상충 신고가 접수되어 본 아이디어 평가 배정이 회피 처리되었습니다.
        </p>
      </main>
    );
  }

  if (isSubmitted) {
    return (
      <main id="main" className="card-pane" style={{ maxWidth: "34rem", margin: "2rem auto", textAlign: "center" }}>
        <h2>✅ 전문가 평가 제출 완료</h2>
        <p style={{ color: "var(--ink-secondary)", fontSize: "0.95rem" }}>
          총점 <strong>{submittedScore ?? totalScore}점</strong>으로 평가 제출이 완료되었습니다. (평가자 간 점수 격리 적용 중)
        </p>
      </main>
    );
  }

  const passport = assignment.idea_versions.passport;
  const problemObj = (passport.problem as Record<string, unknown>) || {};
  const solutionObj = (passport.solution as Record<string, unknown>) || {};
  const experimentObj = (passport.experiment as Record<string, unknown>) || {};

  return (
    <main id="main" style={{ maxWidth: "56rem", margin: "2rem auto" }}>
      <header className="card-pane" style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", color: "var(--wellb-forest-900)", margin: 0 }}>
          전문가 평가 심사 (Expert Review)
        </h1>
        <p style={{ color: "var(--ink-muted)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
          대상 아이디어: <strong>{assignment.idea_versions.title}</strong> (v{assignment.idea_versions.version_number})
        </p>
      </header>

      <ConflictDeclaration
        assignmentId={assignment.id}
        onDeclared={() => setIsConflictDeclared(true)}
      />

      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="alert-box alert-error" style={{ marginBottom: "1rem" }} role="alert">
            {errorMessage}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {/* Left Column: Passport Snapshot */}
          <div className="card-pane" style={{ height: "fit-content" }}>
            <h2 style={{ fontSize: "1.1rem", color: "var(--wellb-forest-900)", marginTop: 0 }}>
              📄 Idea Passport 고정 스냅샷
            </h2>
            <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "var(--radius-md)", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div>
                <strong>문제 정의:</strong>
                <p style={{ margin: "0.25rem 0 0 0" }}>{String(problemObj.context || "미작성")}</p>
              </div>
              <div>
                <strong>핵심 솔루션:</strong>
                <p style={{ margin: "0.25rem 0 0 0" }}>{String(solutionObj.core_solution || "미작성")}</p>
              </div>
              <div>
                <strong>실증 설계:</strong>
                <p style={{ margin: "0.25rem 0 0 0" }}>{String(experimentObj.key_assumption || "미작성")}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Rubric Inputs */}
          <div className="card-pane" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "1.1rem", color: "var(--wellb-forest-900)", margin: 0 }}>
                📊 전문가 평가지 (Rubric)
              </h2>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--primary)" }}>
                {totalScore} / 100점
              </span>
            </div>

            {/* Rubric items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem" }}>
                1. 문제의 실질성 (Max 15점): {problemReality}점
                <input type="range" min={0} max={15} value={problemReality} onChange={(e) => setProblemReality(Number(e.target.value))} style={{ width: "100%" }} />
              </label>

              <label style={{ fontSize: "0.85rem" }}>
                2. 사용자 가치 및 체감성 (Max 15점): {userValue}점
                <input type="range" min={0} max={15} value={userValue} onChange={(e) => setUserValue(Number(e.target.value))} style={{ width: "100%" }} />
              </label>

              <label style={{ fontSize: "0.85rem" }}>
                3. 솔루션 부합성 (Max 20점): {solutionFit}점
                <input type="range" min={0} max={20} value={solutionFit} onChange={(e) => setSolutionFit(Number(e.target.value))} style={{ width: "100%" }} />
              </label>

              <label style={{ fontSize: "0.85rem" }}>
                4. 실행 가능성 (Max 20점): {feasibility}점
                <input type="range" min={0} max={20} value={feasibility} onChange={(e) => setFeasibility(Number(e.target.value))} style={{ width: "100%" }} />
              </label>

              <label style={{ fontSize: "0.85rem" }}>
                5. 실증 용이성 (Max 15점): {pilotability}점
                <input type="range" min={0} max={15} value={pilotability} onChange={(e) => setPilotability(Number(e.target.value))} style={{ width: "100%" }} />
              </label>

              <label style={{ fontSize: "0.85rem" }}>
                6. 확장 가능성 (Max 5점): {scalability}점
                <input type="range" min={0} max={5} value={scalability} onChange={(e) => setScalability(Number(e.target.value))} style={{ width: "100%" }} />
              </label>

              <label style={{ fontSize: "0.85rem" }}>
                7. 사회적 가치 및 안전성 (Max 10점): {socialValueSafety}점
                <input type="range" min={0} max={10} value={socialValueSafety} onChange={(e) => setSocialValueSafety(Number(e.target.value))} style={{ width: "100%" }} />
              </label>
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, display: "block", marginBottom: "0.25rem" }}>
                정성 평가 근거 및 의견 (최소 10자 이상)
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                placeholder="해당 아이디어의 강점, 위험요인, 실증 시 제언 사항을 충실히 적어주세요."
                required
              />
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
              <input
                type="checkbox"
                checked={conflictAcknowledged}
                onChange={(e) => setConflictAcknowledged(e.target.checked)}
              />
              <strong>[필수] 본 평가 대상과의 이해상충이 없음을 최종 확인합니다.</strong>
            </label>

            <button
              type="submit"
              className="btn-primary"
              disabled={isPending || !conflictAcknowledged || rationale.trim().length < 10}
            >
              {isPending ? "제출 중..." : "🔒 전문가 평가 최종 제출"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
