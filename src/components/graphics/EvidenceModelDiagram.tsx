'use client';

import { motion } from 'motion/react';
import { ShieldCheck, FileCheck, Layers } from 'lucide-react';
import type { CompanyDictionary } from '@/lib/i18n';

interface EvidenceModelDiagramProps {
  dict: CompanyDictionary['projects']['evidenceModel'];
}

export function EvidenceModelDiagram({ dict }: EvidenceModelDiagramProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-emerald-800/30 shadow-xl">
      <div className="max-w-2xl mb-10 space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
          {dict.eyebrow}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white">{dict.title}</h3>
        <p className="text-sm text-emerald-200/80 leading-relaxed">
          {dict.desc}
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
          <h4 className="text-lg font-bold text-white">{dict.claimTitle}</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {dict.claimDesc}
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
          <h4 className="text-lg font-bold text-white">{dict.evidenceTitle}</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {dict.evidenceDesc}
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
          <h4 className="text-lg font-bold text-white">{dict.statusTitle}</h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {dict.statusDesc}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
