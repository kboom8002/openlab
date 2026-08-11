import Link from "next/link";
import { safeRoute } from "@/lib/routes";

export default function AccessDeniedPage() {
  return (
    <main id="main" className="card-pane" style={{ maxWidth: "30rem", margin: "3rem auto", textAlign: "center" }}>
      <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🔒</div>
      <h1 style={{ fontSize: "1.5rem", color: "var(--wellb-forest-900)", marginBottom: "0.75rem" }}>
        접근 권한이 필요합니다
      </h1>
      <p style={{ color: "var(--ink-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
        요청하신 페이지에 접근하기 위한 권한이 없거나 로그인 세션이 만료되었습니다.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
        <Link href={safeRoute("/sign-in")} className="btn-primary">
          로그인 페이지로
        </Link>
        <Link href={safeRoute("/challenges")} className="btn-secondary">
          공개 챌린지 둘러보기
        </Link>
      </div>
    </main>
  );
}
