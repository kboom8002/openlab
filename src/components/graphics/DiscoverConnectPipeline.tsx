'use client';

import { motion } from 'motion/react';
import { Target, Cpu, Compass, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 'discover',
    num: '01',
    title: '1. Discover',
    subtitle: '문제 및 지식 발굴',
    desc: '현장의 해결 과제와 지역 자산을 AI가 쉽게 이해하는 질문과 구조로 수집합니다.',
    kpi: '현장 과제 수집률 100%',
    bullets: ['상황별 고객 질문 구조화', '지역 자산 팩트 데이터 변환', '공공 지식 AI 판독형 정리'],
    icon: Target,
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    cardBg: 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-200/90',
    iconBg: 'bg-emerald-700 text-white',
  },
  {
    id: 'structure',
    num: '02',
    title: '2. Structure',
    subtitle: 'AI 데이터 패브릭화',
    desc: '비구조화된 현장 데이터와 공공 지식을 AI 검색 및 추천 가능한 구조로 전환합니다.',
    kpi: 'AI 검색 발견 가능성 극대화',
    bullets: ['RAG 지식 베이스 구축', '멀티모달 맥락 연계', 'AI 가이드 디지털 프로필'],
    icon: Cpu,
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    cardBg: 'bg-gradient-to-b from-amber-50/80 to-white border-amber-200/90',
    iconBg: 'bg-amber-600 text-white',
  },
  {
    id: 'connect',
    num: '03',
    title: '3. Connect',
    subtitle: '비즈니스 및 파트너 매칭',
    desc: 'AI가 판독한 가치를 방문, 문의, 거래 및 글로벌 파트너십과 즉각 연결합니다.',
    kpi: '글로벌 파트너십 유기적 연결',
    bullets: ['상황별 서비스 조건 매칭', '마이크로 거래 파트너십', '글로벌 AI 매칭 채널'],
    icon: Compass,
    badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
    cardBg: 'bg-gradient-to-b from-blue-50/80 to-white border-blue-200/90',
    iconBg: 'bg-blue-700 text-white',
  },
  {
    id: 'impact',
    num: '04',
    title: '4. Impact',
    subtitle: '소셜 임팩트 확산',
    desc: '기술 효율을 넘어 도민 AI 역량 강화 및 지속가능한 지역 일자리로 확장합니다.',
    kpi: '포용적 AI 생태계 구축',
    bullets: ['산출물 중심 도민 교육', '지역 AI 직무 창출', '약자 참여 포용 실증'],
    icon: Award,
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    cardBg: 'bg-gradient-to-b from-purple-50/80 to-white border-purple-200/90',
    iconBg: 'bg-purple-700 text-white',
  },
];

export function DiscoverConnectPipeline() {
  return (
    <div className="space-y-10 overflow-visible">
      {/* McKinsey Style Pipeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative overflow-visible">
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`p-7 rounded-3xl border ${step.cardBg} transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 relative group flex flex-col justify-between overflow-hidden`}
            >
              {/* Background Number Watermark */}
              <span className="absolute -right-2 -bottom-4 text-7xl font-black text-gray-900/5 select-none pointer-events-none font-mono">
                {step.num}
              </span>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${step.iconBg} flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border ${step.badgeBg}`}>
                    PHASE {step.num}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-black text-gray-900 leading-snug">{step.title}</h4>
                  <p className="text-xs font-bold text-emerald-800 mt-0.5">{step.subtitle}</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed pt-1">{step.desc}</p>

                {/* McKinsey Style Deep Bullets */}
                <div className="pt-3 border-t border-gray-200/60 space-y-1.5">
                  {step.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom KPI Tag */}
              <div className="mt-6 pt-3 border-t border-gray-200/80 flex items-center justify-between text-[11px] font-bold text-gray-800 relative z-10">
                <span className="text-emerald-900">{step.kpi}</span>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-gray-300 bg-white rounded-full p-1 border border-gray-200 shadow-xs">
                  <ArrowRight className="w-4 h-4 text-emerald-700" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Animated Flow Line */}
      <div className="hidden lg:block bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 p-6 rounded-2xl text-white shadow-xl border border-emerald-800/40">
        <div className="flex items-center justify-between text-xs font-mono text-emerald-300 mb-2 font-bold">
          <span>INPUT: REAL WORLD PROBLEMS</span>
          <span>WELLB AX EXECUTION FRAMEWORK</span>
          <span>OUTPUT: SUSTAINABLE IMPACT</span>
        </div>
        <div className="h-2.5 w-full bg-emerald-950 rounded-full overflow-hidden relative border border-emerald-800/50">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
