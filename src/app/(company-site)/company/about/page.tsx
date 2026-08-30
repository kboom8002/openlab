import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import {
  ArrowRight,
  Target,
  Zap,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const sp = searchParams ? await searchParams : undefined;
  const { locale, dict } = await getServerDictionary(sp?.lang);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    openGraph: {
      title: dict.about.metaTitle,
      description: dict.about.metaDescription,
      url: "https://wellbcompany.ai/company/about",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 회사 소개",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function CompanyAboutPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const { dict } = await getServerDictionary(sp?.lang);

  const values = [
    {
      title: dict.about.val1Title,
      desc: dict.about.val1Desc,
      icon: Target,
    },
    {
      title: dict.about.val2Title,
      desc: dict.about.val2Desc,
      icon: Zap,
    },
    {
      title: dict.about.val3Title,
      desc: dict.about.val3Desc,
      icon: ShieldCheck,
    },
    {
      title: dict.about.val4Title,
      desc: dict.about.val4Desc,
      icon: HeartHandshake,
    },
  ];

  return (
    <main className="py-16 space-y-20">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <Link href={safeRoute("/company")} className="hover:underline">
              {dict.common.breadcrumb.home}
            </Link>
            <span>/</span>
            <span>{dict.about.breadcrumb}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] pt-1">
            {dict.about.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {dict.about.lead}
          </p>
        </FadeIn>
      </section>

      {/* Mission Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-800/40 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
            {dict.about.missionEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {dict.about.missionTitle}
          </h2>
          <p className="text-sm text-emerald-200/80 leading-relaxed max-w-3xl">
            {dict.about.missionLead}
          </p>
        </div>
      </section>

      {/* 4 Core Values Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.about.valuesEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {dict.about.valuesTitle}
          </h2>
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
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.about.colorEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {dict.about.colorTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#344a2c] text-white space-y-2 shadow-md">
            <span className="text-xs font-mono font-bold text-emerald-300">MAIN COLOR</span>
            <h4 className="text-xl font-bold">{dict.about.colorMain}</h4>
            <p className="text-xs text-emerald-100/80">{dict.about.colorMainDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#a9b99f] text-gray-900 space-y-2 shadow-md">
            <span className="text-xs font-mono font-bold text-emerald-950">SUB COLOR</span>
            <h4 className="text-xl font-bold">{dict.about.colorSub}</h4>
            <p className="text-xs text-gray-800">{dict.about.colorSubDesc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#b89555] text-white space-y-2 shadow-md">
            <span className="text-xs font-mono font-bold text-amber-200">ACCENT COLOR</span>
            <h4 className="text-xl font-bold">{dict.about.colorAccent}</h4>
            <p className="text-xs text-amber-100/90">{dict.about.colorAccentDesc}</p>
          </div>
        </div>
      </section>

      {/* Navigation to Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
              {dict.about.leadershipCtaEyebrow}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              {dict.about.leadershipCtaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {dict.about.leadershipCtaDesc}
            </p>
          </div>
          <Link
            href={safeRoute("/company/leadership")}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 !text-white font-extrabold text-xs sm:text-sm h-11 px-5 rounded-xl shadow-md hover:shadow-lg transition-all shrink-0"
            style={{ color: "#ffffff" }}
          >
            <span className="font-extrabold" style={{ color: "#ffffff" }}>
              {dict.about.leadershipCtaButton}
            </span>
            <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
          </Link>
        </div>
      </section>
    </main>
  );
}
