import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeRoute } from "@/lib/routes";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "WELLB OPENLAB", template: "%s | WELLB OPENLAB" },
  description: "AI 증강 오픈이노베이션 플랫폼 — 문제 해결 및 아이디어 실증",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let user = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Graceful fallback if env is missing in static generation context
  }

  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main">
          본문으로 바로가기
        </a>
        <header className="site-header" role="banner">
          <div className="site-nav-container">
            <Link href={safeRoute("/")} className="site-title" aria-label="WELLB OPENLAB 홈">
              WELLB OPENLAB
            </Link>
            <nav aria-label="메인 메뉴">
              <ul className="nav-links">
                <li>
                  <Link href={safeRoute("/challenges")}>챌린지 목록</Link>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link href={safeRoute("/onboarding")}>프로필 설정</Link>
                    </li>
                    <li>
                      <form action="/api/auth/signout" method="POST" style={{ display: "inline" }}>
                        <button type="submit" className="btn-secondary" style={{ padding: "0.35rem 0.75rem", fontSize: "0.85rem" }}>
                          로그아웃
                        </button>
                      </form>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link href={safeRoute("/sign-in")} className="btn-primary" style={{ padding: "0.35rem 0.85rem", fontSize: "0.85rem" }}>
                      로그인
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>
        <div className="container-shell">{children}</div>
        <footer style={{ borderTop: "1px solid var(--surface-border)", background: "white", padding: "1.5rem", marginTop: "auto", textAlign: "center", fontSize: "0.85rem", color: "var(--ink-muted)" }}>
          <p>© 2026 WELLB OPENLAB. 본 플랫폼의 아이디어 권리는 제출자에게 귀속됩니다.</p>
          <p style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
            * JDC와의 관계는 공식 협약 전까지 <code>proposal</code> 상태입니다. JDC 공식 후원 및 공동주최를 의미하지 않습니다.
          </p>
        </footer>
      </body>
    </html>
  );
}
