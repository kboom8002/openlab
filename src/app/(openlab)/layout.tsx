import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { safeRoute } from "@/lib/routes";
import { Sparkles, Compass, LogIn, LogOut, User, Building, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: { default: "WELLB OPENLAB | AI 증강 오픈이노베이션", template: "%s | WELLB OPENLAB" },
  description: "AI 증강 오픈이노베이션 플랫폼 — 문제 해결 및 아이디어 실증",
};

export default async function OpenLabLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let user = null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // Graceful fallback if env is missing in static generation context
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f8f6] text-[var(--color-forest-900)] font-sans antialiased">
      {/* Naver+ Style Sleek Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e2eaf0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 sm:gap-8 shrink-0">
            <Link href={safeRoute("/")} className="flex items-center gap-2 text-decoration-none group shrink-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:bg-emerald-900 transition-colors">
                O
              </div>
              <span className="text-base sm:text-lg font-black tracking-tight text-emerald-950 whitespace-nowrap">
                WELLB <span className="text-emerald-700 font-bold">OPENLAB</span>
              </span>
            </Link>

            <nav aria-label="메인 메뉴" className="hidden md:flex items-center gap-5 sm:gap-6 shrink-0 flex-nowrap">
              <Link
                href={safeRoute("/challenges")}
                className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>챌린지 탐색</span>
              </Link>
              <Link
                href={safeRoute("/company")}
                className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-emerald-800 transition-colors flex items-center gap-1 py-1 whitespace-nowrap shrink-0"
              >
                <Building className="w-4 h-4 shrink-0" />
                <span>WellB Company</span>
                <ExternalLink className="w-3 h-3 opacity-60 shrink-0" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={safeRoute("/onboarding")}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 hover:text-emerald-800 hover:bg-emerald-50 px-3.5 py-2 rounded-xl border border-gray-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <User className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>프로필</span>
                </Link>
                <form action="/api/auth/signout" method="POST" className="inline">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-xl border border-gray-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 shrink-0 text-gray-500" />
                    <span>로그아웃</span>
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href={safeRoute("/sign-in")}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold bg-emerald-800 hover:bg-emerald-700 !text-white px-4 py-2 rounded-xl border border-emerald-700 shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
                style={{ color: "#ffffff" }}
              >
                <LogIn className="w-4 h-4 shrink-0" style={{ color: "#ffffff" }} />
                <span className="font-extrabold" style={{ color: "#ffffff" }}>로그인 / 회원가입</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main id="main" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Naver+ Style Trusted Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-gray-700">
              © 2026 WELLB OPENLAB. 모든 아이디어의 권리는 제안자에게 직접 귀속됩니다.
            </p>
            <p className="text-gray-400 text-[11px]">
              * JDC와의 관계는 공식 협약 전까지 <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">proposal</code> 상태이며, 공식 후원/공동주최를 의미하지 않습니다.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link href={safeRoute("/company")} className="text-emerald-700 hover:underline font-bold flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 shrink-0" /> WellB Company 공식 웹사이트 →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
