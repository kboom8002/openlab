import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Search,
  Store,
  Landmark,
  Camera,
  ExternalLink,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getServerDictionary();
  return {
    title: dict.jejuToGlobal.metaTitle,
    description: dict.jejuToGlobal.metaDescription,
    openGraph: {
      title: dict.jejuToGlobal.metaTitle,
      description: dict.jejuToGlobal.metaDescription,
      url: "https://wellbcompany.ai/company/jeju-to-global",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 Jeju-to-Global",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function JejuToGlobalPage() {
  const { dict } = await getServerDictionary();

  const targets = [
    {
      title: dict.jejuToGlobal.a1.title,
      desc: dict.jejuToGlobal.a1.desc,
      icon: Store,
      bullets: [
        dict.jejuToGlobal.a1.b1,
        dict.jejuToGlobal.a1.b2,
        dict.jejuToGlobal.a1.b3,
      ],
    },
    {
      title: dict.jejuToGlobal.a2.title,
      desc: dict.jejuToGlobal.a2.desc,
      icon: Camera,
      bullets: [
        dict.jejuToGlobal.a2.b1,
        dict.jejuToGlobal.a2.b2,
        dict.jejuToGlobal.a2.b3,
      ],
    },
    {
      title: dict.jejuToGlobal.a3.title,
      desc: dict.jejuToGlobal.a3.desc,
      icon: Landmark,
      bullets: [
        dict.jejuToGlobal.a3.b1,
        dict.jejuToGlobal.a3.b2,
        dict.jejuToGlobal.a3.b3,
      ],
    },
  ];

  return (
    <main className="py-16 space-y-20">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <Link href={safeRoute("/company")} className="hover:underline">
              {dict.common.breadcrumb.home}
            </Link>
            <span>/</span>
            <span>{dict.jejuToGlobal.breadcrumb}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-b border-gray-100 pb-4">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3]">
              {dict.jejuToGlobal.title}
            </h1>
            <a
              href="https://aihompy.vercel.app/ko/ai-hub/jeju"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold bg-emerald-800 hover:bg-emerald-700 !text-white px-4 py-2.5 rounded-xl border border-emerald-700 shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
              style={{ color: "#ffffff" }}
            >
              <Globe className="w-4 h-4" style={{ color: "#ffffff" }} />
              <span className="font-extrabold" style={{ color: "#ffffff" }}>
                {dict.jejuToGlobal.directLink}
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90" style={{ color: "#ffffff" }} />
            </a>
          </div>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed pt-1">
            {dict.jejuToGlobal.lead}
          </p>
        </FadeIn>
      </section>

      {/* Discover & Connect Core Engines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.jejuToGlobal.dualEngineEyebrow}
          </span>
          <span className="text-xs font-mono text-gray-500">
            {dict.jejuToGlobal.dualEngineBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal
            direction="up"
            delay={0.1}
            className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800/60 border border-emerald-600/40 text-emerald-300 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">{dict.jejuToGlobal.engine1.title}</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                {dict.jejuToGlobal.engine1.desc}
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dict.jejuToGlobal.engine1.b1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dict.jejuToGlobal.engine1.b2}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.2}
            className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white shadow-xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-800/60 border border-amber-600/40 text-amber-300 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">{dict.jejuToGlobal.engine2.title}</h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                {dict.jejuToGlobal.engine2.desc}
              </p>
            </div>
            <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-amber-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{dict.jejuToGlobal.engine2.b1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{dict.jejuToGlobal.engine2.b2}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Target Audiences Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.jejuToGlobal.audienceEyebrow}
          </span>
          <h2 className="text-3xl font-black text-gray-900 mt-1">
            {dict.jejuToGlobal.audienceTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((t, i) => {
            const IconComponent = t.icon;
            return (
              <ScrollReveal
                key={i}
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
            <h3 className="text-2xl font-bold">{dict.jejuToGlobal.ctaTitle}</h3>
            <p className="text-sm text-emerald-200/80">
              {dict.jejuToGlobal.ctaDesc}
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
              <span className="font-black" style={{ color: "#020617" }}>
                {dict.jejuToGlobal.directLink}
              </span>
              <ExternalLink className="w-4 h-4" style={{ color: "#020617" }} />
            </a>
            <Link
              href={safeRoute("/company/contact")}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 !text-white font-bold text-sm h-12 px-5 rounded-xl border border-white/20 transition-all whitespace-nowrap"
              style={{ color: "#ffffff" }}
            >
              <span style={{ color: "#ffffff" }}>{dict.jejuToGlobal.ctaButton}</span>
              <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
