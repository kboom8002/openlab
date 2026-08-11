'use client';

import { motion } from 'motion/react';
import { ShieldCheck, FileCheck, Layers } from 'lucide-react';

export function EvidenceModelDiagram() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-emerald-800/30 shadow-xl">
      <div className="max-w-2xl mb-10 space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Governance & Trust Mechanism</span>
        <h3 className="text-2xl sm:text-3xl font-black text-white">EVIDENCE MODEL</h3>
        <p className="text-sm text-emerald-200/80 leading-relaxed">
          과장된 성과 약속을 배제하고, 명확한 Claim, 검증된 Evidence, 투명한 Status를 공개합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">1. Claim (목표)</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            프로젝트가 해결하려는 명확한 지역·기업 문제와 추구하는 구체적 해결 목표를 분명하게 정의합니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">2. Evidence (근거)</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            현재 실제로 존재하는 서비스, 실제 교육 산출물, 공공 파트너십 및 실증(Proof) 데이터를 직접 공개합니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-bold text-white">3. Status (상태)</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            운영·고도화 중, 시범 운영 중, 준비 중, 그리고 추진 제안 단계(JDC 포럼 등)를 명확히 구별하여 제공합니다.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
