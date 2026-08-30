'use client';

import { motion } from 'motion/react';
import { Target, Cpu, Compass, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { CompanyDictionary } from '@/lib/i18n';

interface DiscoverConnectPipelineProps {
  dict: CompanyDictionary['home']['pipeline'];
}

export function DiscoverConnectPipeline({ dict }: DiscoverConnectPipelineProps) {
  const steps = [
    {
      id: 'discover',
      num: '01',
      title: dict.steps.discover.title,
      subtitle: dict.steps.discover.subtitle,
      desc: dict.steps.discover.desc,
      kpi: dict.steps.discover.kpi,
      bullets: [
        dict.steps.discover.b1,
        dict.steps.discover.b2,
        dict.steps.discover.b3,
      ],
      icon: Target,
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      cardBg: 'bg-gradient-to-b from-emerald-50/80 to-white border-emerald-200/90',
      iconBg: 'bg-emerald-700 text-white',
    },
    {
      id: 'structure',
      num: '02',
      title: dict.steps.structure.title,
      subtitle: dict.steps.structure.subtitle,
      desc: dict.steps.structure.desc,
      kpi: dict.steps.structure.kpi,
      bullets: [
        dict.steps.structure.b1,
        dict.steps.structure.b2,
        dict.steps.structure.b3,
      ],
      icon: Cpu,
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      cardBg: 'bg-gradient-to-b from-amber-50/80 to-white border-amber-200/90',
      iconBg: 'bg-amber-600 text-white',
    },
    {
      id: 'connect',
      num: '03',
      title: dict.steps.connect.title,
      subtitle: dict.steps.connect.subtitle,
      desc: dict.steps.connect.desc,
      kpi: dict.steps.connect.kpi,
      bullets: [
        dict.steps.connect.b1,
        dict.steps.connect.b2,
        dict.steps.connect.b3,
      ],
      icon: Compass,
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-300',
      cardBg: 'bg-gradient-to-b from-blue-50/80 to-white border-blue-200/90',
      iconBg: 'bg-blue-700 text-white',
    },
    {
      id: 'impact',
      num: '04',
      title: dict.steps.impact.title,
      subtitle: dict.steps.impact.subtitle,
      desc: dict.steps.impact.desc,
      kpi: dict.steps.impact.kpi,
      bullets: [
        dict.steps.impact.b1,
        dict.steps.impact.b2,
        dict.steps.impact.b3,
      ],
      icon: Award,
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
      cardBg: 'bg-gradient-to-b from-purple-50/80 to-white border-purple-200/90',
      iconBg: 'bg-purple-700 text-white',
    },
  ];

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
          <span>{dict.flowInput}</span>
          <span>{dict.flowCenter}</span>
          <span>{dict.flowOutput}</span>
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
