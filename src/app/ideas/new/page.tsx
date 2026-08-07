"use client";

import { useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createIdeaDraft } from "@/server/actions/idea-draft";
import { safeRoute } from "@/lib/routes";

function DraftCreateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const challengeId = searchParams.get("challengeId") || "";

  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("아이디어 제목을 입력해 주세요.");
      return;
    }

    if (!challengeId) {
      setErrorMessage("참여할 챌린지가 선택되지 않았습니다.");
      return;
    }

    setErrorMessage(null);

    startTransition(async () => {
      const res = await createIdeaDraft({ challengeId, title });
      if (res.ok) {
        router.push(safeRoute(`/ideas/${res.data.ideaId}/studio`));
        router.refresh();
      } else {
        setErrorMessage(res.error.message);
      }
    });
  };

  return (
    <main id="main" className="card-pane" style={{ maxWidth: "32rem", margin: "2rem auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <Link href={safeRoute("/challenges")} style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>
          ← 챌린지 상세로 돌아가기
        </Link>
        <h1 style={{ fontSize: "1.5rem", color: "var(--wellb-forest-900)", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          새 아이디어 초안(Draft) 시작하기
        </h1>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", margin: 0 }}>
          정해진 문제에 구애받지 않고 발견한 해결책의 제목을 가볍게 입력하여 스튜디오를 시작해보세요.
        </p>
      </header>

      {errorMessage && (
        <div className="alert-box alert-error" role="alert" aria-live="polite">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleCreate} noValidate>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            아이디어 제목 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 제주 해안 재활용품 자동 수거함 설치 및 모바일 연동"
            maxLength={120}
            required
            disabled={isPending}
          />
        </div>

        <div className="alert-box alert-info" style={{ marginTop: "1rem" }}>
          <p style={{ margin: 0, fontSize: "0.85rem" }}>
            🛡️ <strong>권리 보호</strong>: 작성하시는 아이디어의 소유권은 작성자 본인에게 유지됩니다.
          </p>
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <Link href={safeRoute("/challenges")} className="btn-secondary">
            취소
          </Link>
          <button type="submit" className="btn-primary" disabled={isPending || !title.trim()}>
            {isPending ? "생성 중..." : "Idea Studio 시작하기 →"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default function DraftCreatePage() {
  return (
    <Suspense fallback={<div className="card-pane" style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>}>
      <DraftCreateForm />
    </Suspense>
  );
}
