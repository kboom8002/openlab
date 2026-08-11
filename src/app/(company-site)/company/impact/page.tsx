import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { ArrowRight, CheckCircle2, BookOpen, Briefcase, HeartHandshake, Award, ShieldAlert, Sparkles, Building } from "lucide-react";

const pillars = [
  {
    id: "learn",
    title: "AI를 배울 기회",
    subtitle: "Opportunity to Learn AI",
    desc: "지역 도민과 소상공인, 기업 임직원이 AI의 기본 개념부터 실무 활용까지 쉽게 배우는 교육 환경을 만듭니다.",
    icon: BookOpen,
    badge: "도민 · 실무자 교육",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    bullets: [
      "산출물 중심의 차단계별 AI 역량 강화 프로그램",
      "소상공인을 위한 1:1 맞춤 디지털 도구 활용 가이드",
      "지역 공공기관 대상 업무 특화 AI 프롬프트 교육",
    ],
  },
  {
    id: "work",
    title: "AI로 일할 기회",
    subtitle: "Opportunity to Work with AI",
    desc: "지역의 문제를 해결하는 과정에서 새로운 AI 커리어 역할과 마이크로 계약 프로젝트 기회를 만듭니다.",
    icon: Briefcase,
    badge: "신규 일자리 창출",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    bullets: [
      "지역 문제 기반의 새로운 AI 직무 롤(Role) 정립",
      "프로젝트 기반 마이크로 이니셔티브 이행 모델",
      "청년 및 지역 인재 중심의 실증 프로젝트 참여",
    ],
  },
  {
    id: "benefit",
    title: "AI 혜택에 접근할 기회",
    subtitle: "Inclusive AI Accessibility",
    desc: "장애인, 고령자, 정보 약자를 포함한 모든 사용자가 설계와 실증 과정에 공동 설계자로 참여합니다.",
    icon: HeartHandshake,
    badge: "포용적 디지털 사회",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    bullets: [
      "정보 약자 참여 기반의 리빙랩(Living Lab) 실증",
      "디지털 격차 해소를 위한 모바일 저장벽 UI 설계",
      "사회적 가치 창출과 기술 혜택의 균등한 배분",
    ],
  },
];

const forumParts = [
  { name: "Academy", title: "AI 역량 아카데미", desc: "산출물 중심의 도민·기업 대상 맞춤 교육" },
  { name: "Create-a-Job", title: "AI 일자리 창출", desc: "현장 문제를 새로운 AI 직무와 연계 프로젝트로 전환" },
  { name: "Living Lab", title: "포용 리빙랩", desc: "사회적 약자를 공동 설계자로 참여시키는 실증" },
  { name: "Public Knowledge", title: "공공 지식 자산화", desc: "검증된 지역 지식을 AI 판독형 자산으로 축적" },
];

export default function ImpactPage() {
  return (
    <main className="py-16 space-y-20">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <span>Home</span>
            <span>/</span>
            <span>Impact Through AX</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] pt-1">
            IMPACT THROUGH AX
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            AI 역량, 새로운 일자리, 접근 가능한 서비스와 지역 지식을 연결해 기술의 기회가 더 넓게 이어지도록 합니다.
          </p>
        </FadeIn>
      </section>

      {/* Three Pillars - Infographic Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Social Values</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">임팩트 3대 기회 축 (Three Pillars)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.id}
                delay={idx * 0.1}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{pillar.title}</h3>
                    <p className="text-xs font-bold text-emerald-800 font-mono mt-0.5">{pillar.subtitle}</p>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-100 pb-4">
                    {pillar.desc}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {pillar.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>지속가능한 변화 모델</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Featured Social Initiative: 제주 AI 혁신포럼 Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-emerald-800/40 shadow-xl space-y-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED SOCIAL INITIATIVE</span>
            </div>
            <h3 className="text-3xl font-black text-white">제주 AI 혁신포럼 (추진 제안 단계)</h3>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              AI 역량, 지역 일자리와 포용적 AI 활용을 제주 현장에서 민간 실행 모델로 연계하기 위한 소셜 이니셔티브 포럼 구조입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {forumParts.map((part, idx) => (
              <div key={part.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400">PART 0{idx + 1} • {part.name}</span>
                <h4 className="text-lg font-bold text-white">{part.title}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">{part.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-700/50 text-xs text-amber-200 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              * JDC와의 관계는 공식 협약 전까지 <code className="bg-amber-900/80 px-1 py-0.5 rounded text-amber-200">proposal</code> 또는 <code className="bg-amber-900/80 px-1 py-0.5 rounded text-amber-200">under_discussion</code> 상태입니다. JDC의 공식 후원이나 공동주최를 의미하지 않습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-800 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold">소셜 임팩트 AX 프로젝트에 동참하세요</h3>
            <p className="text-emerald-100 text-sm">
              기업, 공공기관, 민간 단체 간의 협업 이니셔티브를 수립할 수 있습니다.
            </p>
          </div>
          <Link
            href={safeRoute("/company/contact")}
            className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm h-12 px-6 rounded-xl transition-all whitespace-nowrap"
          >
            <span>이니셔티브 문의</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
