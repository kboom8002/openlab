import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { Sparkles, Compass, CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Layers, Users } from "lucide-react";

export default function OpenLabHomePage() {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-emerald-800/30">
        <div className="relative z-10 max-w-3xl space-y-6">
          <FadeIn duration={0.6}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/50 text-emerald-300 border border-emerald-700/50 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI 증강 오픈이노베이션 수퍼플랫폼</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white mt-4">
              지역과 현장의 문제를<br />
              <span className="text-emerald-400">AI와 전문가의 다층 검토</span>로 해결합니다
            </h1>

            <p className="text-emerald-100/80 text-base sm:text-lg leading-relaxed max-w-2xl">
              WELLB OPENLAB은 아이디어의 발굴부터 구조화, AI 코칭, 다층 평가 및 실증(Proof) 단계까지 투명하고 원활하게 이끄는 열린 혁신 공간입니다.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={safeRoute("/challenges")}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 !text-slate-950 font-black text-sm h-12 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                style={{ color: "#020617" }}
              >
                <Compass className="w-4 h-4" style={{ color: "#020617" }} />
                <span className="font-black" style={{ color: "#020617" }}>챌린지 둘러보기</span>
              </Link>
              <Link
                href={safeRoute("/company")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 !text-white font-bold text-sm h-12 px-6 rounded-xl border border-white/30 backdrop-blur-xs transition-all"
                style={{ color: "#ffffff" }}
              >
                <span style={{ color: "#ffffff" }}>WellB Company 소개</span>
                <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966915_1px,transparent_1px),linear-gradient(to_bottom,#05966915_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </section>

      {/* Trust & Invariant Pillars (Naver Style Professional Grid) */}
      <section className="space-y-8">
        <ScrollReveal direction="up" className="text-center max-w-xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700">Platform Core Principles</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            OPENLAB이 지키는 3대 불변 원칙
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal direction="up" delay={0.1} className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">제출자 권리 100% 보장</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              제출된 모든 아이디어의 지식재산권은 원칙적으로 작성자 본인에게 소유권이 있으며, 무단 소유권 이전이 발생하지 않습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2} className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">AI 코칭 및 보조 지원</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI는 사용자의 제안을 구조화하고 보조할 뿐, 사용자 승인 없이 원본 데이터를 임의 변경하거나 자동 탈락시키지 않습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900">투명한 3단계 평가 시스템</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI 사전 검토(25%), 심사자 비교(25%), 현장 전문가 정성 검토(50%)를 정량 및 정성 종합 평가 모델로 공정하게 수행합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Action CTA */}
      <section className="bg-emerald-50/70 border border-emerald-100 p-8 sm:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2 justify-center sm:justify-start">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>지금 바로 혁신 챌린지에 참여하세요</span>
          </h3>
          <p className="text-sm text-emerald-800/80">
            도민, 소상공인, 전문가 누구나 아이디어를 등록하고 실증 지원을 받을 수 있습니다.
          </p>
        </div>
        <Link
          href={safeRoute("/challenges")}
          className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 !text-white font-extrabold text-xs h-11 px-5 rounded-lg shadow-xs transition-all whitespace-nowrap"
          style={{ color: "#ffffff" }}
        >
          <span className="font-extrabold" style={{ color: "#ffffff" }}>챌린지 참여하기</span>
          <CheckCircle2 className="w-4 h-4" style={{ color: "#ffffff" }} />
        </Link>
      </section>
    </div>
  );
}
