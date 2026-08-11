import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { ArrowRight, CheckCircle2, Globe, Search, Store, Landmark, Camera, ExternalLink } from "lucide-react";

const targets = [
  {
    title: "소상공인 · 로컬 브랜드",
    desc: "브랜드의 스토리, 사실과 고유 강점을 AI 검색 알고리즘이 추천할 수 있는 디지털 자산으로 전환합니다.",
    icon: Store,
    bullets: ["GEO(AI 검색 엔진 최적화) 프로필 구축", "상황별 고객 질문 매칭 데이터 연동", "브랜드 신뢰성 검증 자산화"],
  },
  {
    title: "관광 · 문화 · 웨딩 · 뷰티",
    desc: "여행자의 상황별 구체적 질문과 서비스의 조건(인원, 계절, 취향)을 정교하게 매칭해 발견 가능성을 극대화합니다.",
    icon: Camera,
    bullets: ["상황 기반 추천 조건 세부 모듈화", "다국어 AI 변환 매칭 네트워크", "방문·예약·문의 직통 연결 시스템"],
  },
  {
    title: "공공기관 · 지역 조직",
    desc: "지역 지식과 공공 정보를 AI가 쉽게 판독 가능한 데이터 구조로 바꾸고, 글로벌 고객 접근성을 확장합니다.",
    icon: Landmark,
    bullets: ["공공 지역 지식의 AI 판독형 아키텍처", "글로벌 관광객 및 파트너 연결", "지역 고유 문화 자산 자산화"],
  },
];

export default function JejuToGlobalPage() {
  return (
    <main className="py-16 space-y-20">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <span>Home</span>
            <span>/</span>
            <span>Jeju-to-global</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-b border-gray-100 pb-4">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3]">
              JEJU-TO-GLOBAL
            </h1>
            <a
              href="https://aihompy.vercel.app/ko/ai-hub/jeju"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold bg-emerald-800 hover:bg-emerald-700 !text-white px-4 py-2.5 rounded-xl border border-emerald-700 shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
              style={{ color: "#ffffff" }}
            >
              <Globe className="w-4 h-4" style={{ color: "#ffffff" }} />
              <span className="font-extrabold" style={{ color: "#ffffff" }}>Jeju-to-Global 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" style={{ color: "#ffffff" }} />
            </a>
          </div>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1">
            제주 지역 자산을 AI 검색 추천으로 연결하여 글로벌 고객 기회를 창출하는 지역 AX 대표 이니셔티브입니다.
          </p>
        </FadeIn>
      </section>

      {/* Discover & Connect Core Engines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Dual Engine Architecture</span>
          <span className="text-xs font-mono text-gray-500">DISCOVER & CONNECT</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="up" delay={0.1} className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/60 border border-emerald-600/40 text-emerald-300 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">1. Discover (AI 검색 발견)</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                사용자의 상황별 질문과 지역 브랜드를 연결해, 생성형 AI(ChatGPT, Perplexity 등) 검색 및 추천에서 자연스럽게 발견되도록 돕습니다.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>지식 구조화 기반 GEO 최적화</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>브랜드 사실 기반 팩트 앵커링</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-800/60 border border-amber-600/40 text-amber-300 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">2. Connect (실제 연결)</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                발견을 방문, 문의, 예약, 거래, 콘텐츠 및 글로벌 파트너십과 즉각 연결하여 실질적인 비즈니스 성과로 바꿉니다.
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-amber-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>상황별 문의 및 직통 거래 연결</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>글로벌 비즈니스 파트너십 구축</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Target Audiences Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Ecosystem Ecosystem</span>
          <h2 className="text-3xl font-black text-gray-900 mt-1">누구를 위한 이니셔티브인가요?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((t, i) => {
            const IconComponent = t.icon;
            return (
              <ScrollReveal
                key={t.title}
                delay={i * 0.1}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
                </div>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-700">
                  {t.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold">Jeju-to-global 참여 문의</h3>
            <p className="text-sm text-emerald-200/80">
              귀사의 로컬 브랜드나 서비스를 AI 추천 생태계에 등록하고 글로벌 고객과 연결해보세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://aihompy.vercel.app/ko/ai-hub/jeju"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 !text-slate-950 font-black text-sm h-12 px-6 rounded-xl shadow-md transition-all whitespace-nowrap"
              style={{ color: "#020617" }}
            >
              <Globe className="w-4 h-4" style={{ color: "#020617" }} />
              <span className="font-black" style={{ color: "#020617" }}>Jeju-to-Global 바로가기</span>
              <ExternalLink className="w-4 h-4" style={{ color: "#020617" }} />
            </a>
            <Link
              href={safeRoute("/company/contact")}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 !text-white font-bold text-sm h-12 px-5 rounded-xl border border-white/20 transition-all whitespace-nowrap"
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>참여 상담 신청</span>
              <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
