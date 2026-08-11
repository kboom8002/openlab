import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { ArrowRight, CheckCircle2, Cpu, Building2, Globe, Users, Award, ShieldCheck, Sparkles, Layers } from "lucide-react";

const serviceAreas = [
  {
    id: "enterprise",
    title: "기업 · 기관 AX",
    subtitle: "Enterprise AX Transformation",
    desc: "업무 생산성, 고객 경험 및 사내 축적 지식 활용을 대폭 개선하는 맞춤형 AI 인프라를 구축합니다.",
    icon: Building2,
    badge: "생산성 40%+ 향상",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    bullets: [
      "사내 보안 지식 RAG (Retrieval-Augmented Generation) 시스템 구축",
      "반복 업무 자동화를 위한 전용 AI 워크플로 엔진 개발",
      "부서별 데이터 결합 및 AI 기반 실시간 분석 리포트 생성",
      "임직원 역할 기반 권한 제어 및 엔터프라이즈 보안 적용",
    ],
  },
  {
    id: "public",
    title: "지역 · 공공 AX",
    subtitle: "Public & Regional Knowledge AX",
    desc: "지역 고유의 행정 정보와 공공 지식을 AI가 즉각 검색하고 활용할 수 있는 구조로 전환합니다.",
    icon: Globe,
    badge: "공공 서비스 혁신",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    bullets: [
      "복잡한 공공 행정 문서의 AI 판독형 데이터 아키텍처 변환",
      "도민 및 사용자 상황별 맞춤형 AI 민원 안내 체계",
      "지역 자원 및 공공 정책 지식의 유기적 모듈화",
      "정보 약자를 위한 쉬운 언어 AI 변환 레이어 통합",
    ],
  },
  {
    id: "brand",
    title: "소상공인 · 브랜드 AX",
    subtitle: "Local Brand AI Discovery",
    desc: "브랜드의 스토리와 고유 강점을 AI 검색 엔진(Perplexity, ChatGPT 등)이 선호하는 디지털 자산으로 전환합니다.",
    icon: Sparkles,
    badge: "AI 검색 발견율 3x",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    bullets: [
      "상황별 고객 질문과 브랜드 서비스의 조건 정교 매칭",
      "AI 검색 엔진 최적화(GEO) 디지털 프로필 구축",
      "관광·문화·웨딩·뷰티 등 상황별 추천 데이터 연결",
      "소상공인을 위한 자동 홍보·마케팅 콘텐츠 세트 생성",
    ],
  },
  {
    id: "education",
    title: "AI 역량 · 현장 정착",
    subtitle: "Workplace AI Enablement",
    desc: "단순 일회성 교육을 넘어, 실질적인 업무 산출물과 조직 내 현장 정착 가이드를 만듭니다.",
    icon: Award,
    badge: "실무 산출물 연계",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    bullets: [
      "실제 업무 과제를 직접 해결하는 산출물 중심 워크숍",
      "조직별 맞춤 프롬프트 템플릿 및 가이드라인 제정",
      "현장 정착 모니터링 및 주기적 멘토링 체계",
      "지속가능한 내부 AI 리더 육성 커리큘럼",
    ],
  },
];

const processSteps = [
  { step: "01", name: "Discover", desc: "현장 문제 및 기회 정밀 진단" },
  { step: "02", name: "Structure", desc: "업무·데이터·지식 구조화" },
  { step: "03", name: "Design", desc: "서비스 및 운영 모델 설계" },
  { step: "04", name: "Build", desc: "AI 엔진 및 워크플로 구축" },
  { step: "05", name: "Operate", desc: "현장 정착 및 실증 운영" },
  { step: "06", name: "Evolve", desc: "피드백 기반 성능 고도화" },
];

export default function AxSolutionsPage() {
  return (
    <main className="py-16 space-y-20">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <span>Home</span>
            <span>/</span>
            <span>AX Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] pt-1">
            AX SOLUTIONS
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            경영 과제 진단부터 데이터 구조화, AI 서비스 구축, 교육 및 현장 정착까지 하나의 검증된 실행 과정으로 제공합니다.
          </p>
        </FadeIn>
      </section>

      {/* Service Areas - McKinsey Style Infographic Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-gray-200 pb-4 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">Practice Framework</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">4대 서비스 핵심 영역</h2>
          </div>
          <span className="text-xs font-mono text-gray-500">END-TO-END EXECUTION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceAreas.map((area, idx) => {
            const IconComp = area.icon;
            return (
              <ScrollReveal
                key={area.id}
                delay={idx * 0.1}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${area.badgeColor}`}>
                      {area.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{area.title}</h3>
                    <p className="text-xs font-bold text-emerald-800 font-mono mt-0.5">{area.subtitle}</p>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-100 pb-4">
                    {area.desc}
                  </p>

                  {/* Deep Bullet Points */}
                  <div className="space-y-2.5 pt-1">
                    {area.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-700 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>체계적 실행 템플릿 포함</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* End-to-End Execution Timeline Diagram */}
      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Execution Process</span>
            <h2 className="text-3xl font-black text-white">END-TO-END EXECUTION WORKFLOW</h2>
            <p className="text-xs text-emerald-200/80">
              보고서로 끝나지 않고, 현장에 적용되어 직접 동작할 때까지 연속적으로 연결합니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((s) => (
              <div key={s.step} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2 relative">
                <span className="text-xs font-mono font-bold text-emerald-400">STEP {s.step}</span>
                <h4 className="text-lg font-bold text-white">{s.name}</h4>
                <p className="text-[11px] text-gray-300 leading-normal">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-emerald-950">맞춤형 AX 진단이 필요하신가요?</h3>
            <p className="text-sm text-emerald-800/80">
              귀사의 상황과 과제를 남겨주시면 최적의 AI 구현 방안을 제안해드립니다.
            </p>
          </div>
          <Link
            href={safeRoute("/company/contact")}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 !text-white font-extrabold text-sm h-12 px-6 rounded-xl shadow-md transition-all whitespace-nowrap"
            style={{ color: "#ffffff" }}
          >
            <span className="font-extrabold" style={{ color: "#ffffff" }}>상담 신청하기</span>
            <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
          </Link>
        </div>
      </section>
    </main>
  );
}
