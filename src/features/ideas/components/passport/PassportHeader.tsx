"use client";

import Link from "next/link";
import { safeRoute } from "@/lib/routes";

interface PassportHeaderProps {
  ideaId: string;
  title: string;
  status: string;
  isSubmitted: boolean;
  versionNumber?: number;
  submittedAt?: string;
  isOwner: boolean;
}

export function PassportHeader({
  ideaId,
  title,
  status,
  isSubmitted,
  versionNumber,
  submittedAt,
  isOwner,
}: PassportHeaderProps) {
  return (
    <header className="card-pane" style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span className={`status-badge ${isSubmitted ? "badge-open" : "badge-scheduled"}`}>
              {isSubmitted ? `Submitted (v${versionNumber})` : "Working Passport (Draft)"}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
              Status: {status}
            </span>
          </div>

          <h1 style={{ fontSize: "1.65rem", color: "var(--wellb-forest-900)", margin: 0 }}>
            {title}
          </h1>

          {isSubmitted && submittedAt && (
            <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", marginTop: "0.5rem", margin: 0 }}>
              🔒 본 문서는 제출 완료된 <strong>Immutable Snapshot</strong>이며 수정이 차단되어 있습니다. (제출일시: {new Date(submittedAt).toLocaleString("ko-KR")})
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {isOwner && !isSubmitted && (
            <>
              <Link href={safeRoute(`/ideas/${ideaId}/studio`)} className="btn-secondary">
                ✏️ Studio에서 계속 편집
              </Link>
              <Link href={safeRoute(`/ideas/${ideaId}/submit`)} className="btn-primary">
                🚀 제출하기 (Preflight) →
              </Link>
            </>
          )}
          <Link href={safeRoute("/my/ideas")} className="btn-secondary">
            내 목록으로
          </Link>
        </div>
      </div>
    </header>
  );
}
