"use client";

import Link from "next/link";
import { safeRoute } from "@/lib/routes";

interface StudioHeaderProps {
  title: string;
  revision: number;
  challengeTitle?: string;
  isSaving?: boolean;
}

export function StudioHeader({ title, revision, challengeTitle, isSaving }: StudioHeaderProps) {
  return (
    <header style={{ background: "white", borderBottom: "1px solid var(--surface-border)", padding: "1rem 1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--ink-muted)", marginBottom: "0.25rem" }}>
            <Link href={safeRoute("/my/ideas")}>내 아이디어</Link>
            {challengeTitle && <span> · {challengeTitle}</span>}
            <span> · Rev #{revision}</span>
          </div>
          <h1 style={{ fontSize: "1.35rem", color: "var(--wellb-forest-900)", margin: 0 }}>
            {title}
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.85rem", color: isSaving ? "var(--wellb-gold-500)" : "var(--success-ink)" }}>
            {isSaving ? "⏳ 저장 중..." : "✓ 자동 저장됨"}
          </span>
          <Link href={safeRoute("/my/ideas")} className="btn-secondary" style={{ fontSize: "0.85rem", padding: "0.4rem 0.85rem" }}>
            Studio 나가기
          </Link>
        </div>
      </div>
    </header>
  );
}
