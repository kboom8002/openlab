import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { ArrowRight, CheckCircle2, Target, Zap, ShieldCheck, HeartHandshake, Building2 } from "lucide-react";

const values = [
  {
    title: "1. 현장의 문제에서 시작합니다",
    desc: "기술의 화려함보다 실제 해결해야 할 현장 문제와 사용자의 상황을 먼저 정교하게 이해합니다.",
    icon: Target,
  },
  {
    title: "2. 작은 실행으로 빠르게 검증합니다",
    desc: "거대한 시스템 설계보다 필요한 범위의 시제품과 실증(Proof)으로 가능성을 즉시 확인합니다.",
    icon: Zap,
  },
  {
    title: "3. 사실과 근거로 설명합니다",
    desc: "검증된 산출물과 현재 상태를 있는 그대로 투명하게 공개하고, 과장된 성과 약속을 배제합니다.",
    icon: ShieldCheck,
  },
  {
    title: "4. 사업과 임팩트를 함께 만듭니다",
    desc: "기업과 지역의 성장 과정에서 AI 역량, 지역 일자리, 디지털 포용이 함께 확대되도록 설계합니다.",
    icon: HeartHandshake,
  },
];

export default function CompanyAboutPage() {
  return (
    <main className="py-16 space-y-20">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <span>Home</span>
            <span>/</span>
            <span>About WellB Company</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] pt-1">
            ABOUT WELLB COMPANY
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            웰비컴퍼니는 Jeju-to-global을 중심으로 기업과 기관의 AX를 실행하고, 제주의 지역 자산을 AI와 더 넓은 시장에 연결하는 제주 기반 소셜 임팩트 AX 기업입니다.
          </p>
        </FadeIn>
      </section>

      {/* Mission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-800/40 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">OUR MISSION</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            "기술의 효율을 넘어, 사람이 배우고 일하며 참여하는 변화를 만듭니다"
          </h2>
          <p className="text-sm text-emerald-200/80 leading-relaxed max-w-3xl">
            지역을 이해하는 전략, 직접 구축하는 기술, 현장에서 검증하는 실행력을 유기적으로 연결하여 지속가능한 성장을 추구합니다.
          </p>
        </div>
      </section>

      {/* 4 Core Values Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Core Principles</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">4대 실행 가치 (OUR VALUES)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, idx) => {
            const IconComp = v.icon;
            return (
              <ScrollReveal
                key={v.title}
                delay={idx * 0.1}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-md">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{v.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Brand Identity & Color System */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Brand Identity</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">COLOR SYSTEM</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#344a2c] text-white space-y-2 shadow-md">
            <span className="text-xs font-mono font-bold text-emerald-300">MAIN COLOR</span>
            <h4 className="text-xl font-bold">Forest Green (#344a2c)</h4>
            <p className="text-xs text-emerald-100/80">지역에 뿌리내린 신뢰와 지속가능한 실행력을 의미합니다.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#a9b99f] text-gray-900 space-y-2 shadow-md">
            <span className="text-xs font-mono font-bold text-emerald-950">SUB COLOR</span>
            <h4 className="text-xl font-bold">Sage (#a9b99f)</h4>
            <p className="text-xs text-gray-800">기술과 사람 사이의 포용적 연결과 따뜻한 균형을 표현합니다.</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#b89555] text-white space-y-2 shadow-md">
            <span className="text-xs font-mono font-bold text-amber-200">ACCENT COLOR</span>
            <h4 className="text-xl font-bold">Warm Gold (#b89555)</h4>
            <p className="text-xs text-amber-100/90">검증된 핵심 가치와 혁신적 임팩트의 결실을 상징합니다.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
