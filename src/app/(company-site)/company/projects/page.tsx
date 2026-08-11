import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { EvidenceModelDiagram } from "@/components/graphics";
import { ArrowRight, CheckCircle2, Layers, ExternalLink } from "lucide-react";

export default function CompanyProjectsPage() {
  return (
    <main className="py-16 space-y-16">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <span>Home</span>
            <span>/</span>
            <span>Projects & Evidence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            PROJECTS & EVIDENCE
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            웰비컴퍼니가 현재 운영하거나 준비 중인 프로젝트의 목적, 진행 상태 및 확인 가능한 산출물을 투명하게 공개합니다.
          </p>
        </FadeIn>
      </section>

      {/* Projects List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                운영 · 고도화 중
              </span>
              <span className="text-xs font-mono text-gray-400">ACTIVE PROJECT</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Jeju-to-global AX</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              제주 지역 자산을 AI 검색 추천 및 디지털 자산 구조로 전환하여 글로벌 시장과 고객 기회에 연결하는 사업입니다.
            </p>
            <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <p>• 산출물: 로컬 브랜드 AI 디지털 프로필, 검색 매칭 구조</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                운영 · 고도화 중
              </span>
              <span className="text-xs font-mono text-gray-400">ACTIVE PROJECT</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">AI 역량 및 현장 정착 교육</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              도민, 기업 임직원, 소상공인을 대상으로 단순 이론이 아닌 실제 업무와 서비스에 바로 활용 가능한 산출물 중심 AI 교육을 진행합니다.
            </p>
            <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <p>• 산출물: 커리큘럼, 워크플로 템플릿, 현장 적용 레포트</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                추진 제안 단계 (Proposal)
              </span>
              <span className="text-xs font-mono text-gray-400">INITIATIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">제주 AI 혁신포럼</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI 역량, 일자리, 포용적 활용을 제주 현장에서 민간 실행 모델로 연결하기 위한 소셜 이니셔티브 포럼 제안입니다.
            </p>
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
              * JDC와의 관계는 공식 협약 전까지 <code>proposal</code> 상태입니다. JDC 공식 후원 및 공동주최를 의미하지 않습니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Evidence Model Graphic Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EvidenceModelDiagram />
      </section>

      {/* CTA to OPENLAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold">WELLB OPENLAB에서 실증 참여하기</h3>
            <p className="text-emerald-200/80 text-sm">
              아이디어를 제안하고 AI 코치와 함께 실증 프로젝트로 발전시키세요.
            </p>
          </div>
          <Link
            href={safeRoute("/")}
            className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm h-12 px-6 rounded-xl transition-all whitespace-nowrap"
          >
            <span>OPENLAB으로 이동</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
