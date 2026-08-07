"use client";

import { useState, useTransition } from "react";
import { declareConflictAction } from "@/server/actions/evaluation";

interface ConflictDeclarationProps {
  assignmentId: string;
  onDeclared: () => void;
}

export function ConflictDeclaration({ assignmentId, onDeclared }: ConflictDeclarationProps) {
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDeclare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    startTransition(async () => {
      const res = await declareConflictAction({ assignmentId, reason });
      if (res.ok) {
        setShowModal(false);
        onDeclared();
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  return (
    <div className="card-pane" style={{ marginBottom: "1.5rem", borderLeft: "4px solid var(--wellb-gold-500)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h3 style={{ fontSize: "1.1rem", color: "var(--wellb-forest-900)", margin: 0 }}>
            ⚖️ 이해상충 (Conflict of Interest) 자가 진단
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-muted)", margin: "0.25rem 0 0 0" }}>
            본 아이디어의 작성자나 관련 단체와 직간접적 이해관계가 있으신가요?
          </p>
        </div>

        <button
          type="button"
          className="btn-secondary"
          style={{ borderColor: "var(--wellb-gold-500)", color: "var(--wellb-gold-500)" }}
          onClick={() => setShowModal(true)}
        >
          🚨 이해상충 신고 및 회피 신청
        </button>
      </div>

      {showModal && (
        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--surface-border)" }}>
          <form onSubmit={handleDeclare}>
            <h4 style={{ fontSize: "0.95rem", margin: "0 0 0.5rem 0" }}>이해상충 사유 입력</h4>
            {errorMessage && <div className="alert-box alert-error" style={{ marginBottom: "0.5rem" }}>{errorMessage}</div>}
            <textarea
              className="form-textarea"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="예: 작성자와 동일 기관 소속이거나 공동 소유 관계임"
              disabled={isPending}
              required
            />
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button type="submit" className="btn-primary" disabled={isPending || !reason.trim()}>
                {isPending ? "처리 중..." : "확인 및 배정 회피 제출"}
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
