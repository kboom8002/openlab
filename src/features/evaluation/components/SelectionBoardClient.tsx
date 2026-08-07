"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { recordSelectionDecisionAction } from "@/server/actions/evaluation";
import { StatusBadge } from "@/components/shared/StatusBadge";

export type SelectionDecisionType = "promising" | "pilot_ready" | "hold" | "not_selected";

export interface CandidateIdeaItem {
  ideaId: string;
  versionId: string;
  versionNumber: number;
  title: string;
  submitterName: string;
  status: string;
  compositeScore: number;
  aiScore: number;
  pairwiseScore: number;
  expertScore: number;
  latestDecision?: {
    id: string;
    decision: SelectionDecisionType;
    reason: string;
    decidedAt: string;
  } | null;
}

export interface SelectionBoardClientProps {
  challenge: {
    id: string;
    title: string;
    slug: string;
    status: string;
    summary?: string;
  };
  candidates: CandidateIdeaItem[];
}

const DECISION_LABELS: Record<SelectionDecisionType, { label: string; badge: string; color: string; desc: string }> = {
  pilot_ready: {
    label: "파일럿 직행 (Pilot Ready)",
    badge: "badge-open",
    color: "#065f46",
    desc: "현장 실증 가치가 검증되어 파일럿 프로젝트로 직행 선정합니다.",
  },
  promising: {
    label: "유망 아이디어 (Promising)",
    badge: "badge-scheduled",
    color: "#92400e",
    desc: "우수한 구상을 갖춘 유망 아이디어로 후속 기획 지원 대상에 포함합니다.",
  },
  hold: {
    label: "심의 보류 (Hold)",
    badge: "badge-closed",
    color: "#4b5563",
    desc: "추가 소명 또는 자문 후 재심의가 필요하여 보류 결정합니다.",
  },
  not_selected: {
    label: "미선발 (Not Selected)",
    badge: "badge-closed",
    color: "#991b1b",
    desc: "이번 챌린지 선발 기준에 미달하여 최종 미선발합니다.",
  },
};

export function SelectionBoardClient({ challenge, candidates: initialCandidates }: SelectionBoardClientProps) {
  const [candidates, setCandidates] = useState<CandidateIdeaItem[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateIdeaItem | null>(null);

  // Form State
  const [decision, setDecision] = useState<SelectionDecisionType>("pilot_ready");
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenDecisionModal = (candidate: CandidateIdeaItem) => {
    setSelectedCandidate(candidate);
    setDecision(candidate.latestDecision?.decision || "pilot_ready");
    setReason(candidate.latestDecision?.reason || "");
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
    setErrorMessage(null);
  };

  const handleSubmitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!selectedCandidate) return;

    if (reason.trim().length < 10) {
      setErrorMessage("선발 심의 사유는 최소 10자 이상 필수 입력해야 합니다.");
      return;
    }

    startTransition(async () => {
      const res = await recordSelectionDecisionAction({
        challengeId: challenge.id,
        ideaVersionId: selectedCandidate.versionId,
        decision,
        reason: reason.trim(),
      });

      if (res.ok) {
        setSuccessMessage("선발 심의 결정이 성공적으로 기록되었습니다.");
        // Update local candidates array
        setCandidates((prev) =>
          prev.map((c) => {
            if (c.versionId === selectedCandidate.versionId) {
              return {
                ...c,
                status: decision === "pilot_ready" ? "PILOT_READY" : decision === "promising" ? "PROMISING" : c.status,
                latestDecision: {
                  id: res.data.decisionId,
                  decision,
                  reason: reason.trim(),
                  decidedAt: new Date().toISOString(),
                },
              };
            }
            return c;
          })
        );
        setTimeout(() => {
          setSelectedCandidate(null);
        }, 1200);
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Header Info */}
      <header className="card-pane" style={{ background: "var(--wellb-forest-900)", color: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span className="status-badge badge-scheduled" style={{ backgroundColor: "#d97706", color: "white", border: "none" }}>
                P013 Selection Board
              </span>
              <StatusBadge status={challenge.status} />
            </div>
            <h1 style={{ fontSize: "1.6rem", margin: "0 0 0.5rem 0", color: "white" }}>
              🏆 {challenge.title}
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--wellb-sage-100)", margin: 0 }}>
              최종 선발 심의 이사회 (Selection Board) · 후보 아이디어 총 {candidates.length}건
            </p>
          </div>
          <Link
            href={safeRoute(`/challenges/${challenge.slug}`)}
            className="btn-secondary"
            style={{ fontSize: "0.85rem", background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            ← 챌린지 상세
          </Link>
        </div>
      </header>

      {/* Candidates List */}
      <section aria-labelledby="candidates-heading">
        <h2 id="candidates-heading" style={{ fontSize: "1.25rem", color: "var(--wellb-forest-900)", marginBottom: "1rem" }}>
          📋 심의 대상 아이디어 목록
        </h2>

        {candidates.length === 0 ? (
          <div className="card-pane" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</p>
            <p style={{ fontSize: "1.05rem", fontWeight: 600, margin: "0 0 0.25rem" }}>심의 대상 후보 아이디어가 없습니다.</p>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>제출 완료된 아이디어가 등록되면 심의 목록에 표출됩니다.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {candidates.map((candidate) => {
              const hasDecision = !!candidate.latestDecision;
              const decMeta = candidate.latestDecision ? DECISION_LABELS[candidate.latestDecision.decision] : null;

              return (
                <article
                  key={candidate.versionId}
                  className="card-pane"
                  style={{
                    borderLeft: hasDecision ? `6px solid ${decMeta?.color}` : "6px solid var(--surface-border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: "280px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--primary)" }}>
                          v{candidate.versionNumber}
                        </span>
                        <StatusBadge status={candidate.status} />
                        {hasDecision && decMeta && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "0.2rem 0.5rem",
                              borderRadius: "var(--radius-sm)",
                              backgroundColor: decMeta.color,
                              color: "white",
                            }}
                          >
                            결정: {decMeta.label}
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem 0", color: "var(--wellb-forest-900)" }}>
                        {candidate.title}
                      </h3>

                      <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: "0 0 0.75rem 0" }}>
                        제안자: {candidate.submitterName}
                      </p>

                      {/* Scores Breakdown */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          background: "var(--bg)",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "var(--radius-md)",
                          fontSize: "0.82rem",
                        }}
                      >
                        <div>
                          <span style={{ color: "var(--ink-muted)" }}>종합점수: </span>
                          <strong style={{ color: "var(--wellb-forest-900)", fontSize: "0.95rem" }}>
                            {candidate.compositeScore.toFixed(1)}점
                          </strong>
                        </div>
                        <span style={{ color: "var(--surface-border)" }}>|</span>
                        <div>AI 평가: {candidate.aiScore}점</div>
                        <span style={{ color: "var(--surface-border)" }}>|</span>
                        <div>Pairwise: {candidate.pairwiseScore}점</div>
                        <span style={{ color: "var(--surface-border)" }}>|</span>
                        <div>전문가: {candidate.expertScore}점</div>
                      </div>
                    </div>

                    {/* Decision Action */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                      <button
                        type="button"
                        className={hasDecision ? "btn-secondary" : "btn-primary"}
                        onClick={() => handleOpenDecisionModal(candidate)}
                        style={{ padding: "0.6rem 1.1rem", fontSize: "0.88rem" }}
                      >
                        {hasDecision ? "📝 결정/사유 수정" : "⚖️ 선발 결정 기록"}
                      </button>
                    </div>
                  </div>

                  {/* Decision Reason Display */}
                  {candidate.latestDecision && (
                    <div
                      style={{
                        marginTop: "1rem",
                        padding: "0.75rem 1rem",
                        background: "var(--wellb-sage-100)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--surface-border)",
                      }}
                    >
                      <p style={{ fontSize: "0.82rem", fontWeight: 700, margin: "0 0 0.25rem 0", color: "var(--wellb-forest-900)" }}>
                        🗣️ 심의 의결 사유 ({new Date(candidate.latestDecision.decidedAt).toLocaleDateString("ko-KR")})
                      </p>
                      <p style={{ fontSize: "0.88rem", color: "var(--ink-primary)", margin: 0, whiteSpace: "pre-wrap" }}>
                        "{candidate.latestDecision.reason}"
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Decision Recording Modal / Backdrop */}
      {selectedCandidate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: "1rem",
          }}
        >
          <div
            className="card-pane"
            style={{
              maxWidth: "34rem",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <header style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 id="modal-title" style={{ fontSize: "1.25rem", color: "var(--wellb-forest-900)", margin: 0 }}>
                  ⚖️ 선발 심의 결정 기록
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-muted)", marginTop: "0.25rem" }}>
                대상 아이디어: <strong>{selectedCandidate.title}</strong>
              </p>
            </header>

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

            <form onSubmit={handleSubmitDecision}>
              {/* Decision Radio Choice */}
              <div className="form-group">
                <label className="form-label" style={{ marginBottom: "0.5rem" }}>
                  선발 결정 (Decision) <span style={{ color: "red" }}>*</span>
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {(["pilot_ready", "promising", "hold", "not_selected"] as SelectionDecisionType[]).map((type) => {
                    const item = DECISION_LABELS[type];
                    const isChecked = decision === type;
                    return (
                      <label
                        key={type}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "0.75rem",
                          border: isChecked ? `2px solid ${item.color}` : "1px solid var(--surface-border)",
                          borderRadius: "var(--radius-md)",
                          background: isChecked ? "var(--wellb-sage-100)" : "white",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="radio"
                          name="selection-decision"
                          value={type}
                          checked={isChecked}
                          onChange={() => setDecision(type)}
                          disabled={isPending}
                          style={{ marginTop: "0.25rem" }}
                        />
                        <div>
                          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: item.color }}>
                            {item.label}
                          </span>
                          <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)", margin: "0.15rem 0 0" }}>
                            {item.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Reasoning Input */}
              <div className="form-group" style={{ marginTop: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="decision-reason" className="form-label">
                    선발/미선발 사유 (필수, 최소 10자) <span style={{ color: "red" }}>*</span>
                  </label>
                  <span style={{ fontSize: "0.78rem", color: reason.trim().length >= 10 ? "var(--wellb-forest-700)" : "var(--error-ink)", fontWeight: 700 }}>
                    {reason.trim().length} / 10자 이상
                  </span>
                </div>
                <textarea
                  id="decision-reason"
                  className="form-textarea"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="선발 심의위원회 평가 점수, 기술성, 현장 실증 가능성 등을 종합 고려한 결정 근거를 상세히 기재해 주세요."
                  required
                  disabled={isPending}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={isPending}>
                  취소
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isPending || reason.trim().length < 10}
                >
                  {isPending ? "저장 중..." : "의결 사항 기록 완료"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
