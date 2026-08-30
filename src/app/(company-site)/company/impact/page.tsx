import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Briefcase,
  HeartHandshake,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getServerDictionary();
  return {
    title: dict.impact.metaTitle,
    description: dict.impact.metaDescription,
    openGraph: {
      title: dict.impact.metaTitle,
      description: dict.impact.metaDescription,
      url: "https://wellbcompany.ai/company/impact",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 소셜 임팩트",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function ImpactPage() {
  const { dict } = await getServerDictionary();

  const pillars = [
    {
      id: "learn",
      title: dict.impact.p1.title,
      subtitle: dict.impact.p1.subtitle,
      desc: dict.impact.p1.desc,
      icon: BookOpen,
      badge: dict.impact.p1.badge,
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      bullets: [
        dict.impact.p1.b1,
        dict.impact.p1.b2,
        dict.impact.p1.b3,
      ],
    },
    {
      id: "work",
      title: dict.impact.p2.title,
      subtitle: dict.impact.p2.subtitle,
      desc: dict.impact.p2.desc,
      icon: Briefcase,
      badge: dict.impact.p2.badge,
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      bullets: [
        dict.impact.p2.b1,
        dict.impact.p2.b2,
        dict.impact.p2.b3,
      ],
    },
    {
      id: "benefit",
      title: dict.impact.p3.title,
      subtitle: dict.impact.p3.subtitle,
      desc: dict.impact.p3.desc,
      icon: HeartHandshake,
      badge: dict.impact.p3.badge,
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      bullets: [
        dict.impact.p3.b1,
        dict.impact.p3.b2,
        dict.impact.p3.b3,
      ],
    },
  ];

  const forumParts = [
    { name: dict.impact.forum.f1.name, title: dict.impact.forum.f1.title, desc: dict.impact.forum.f1.desc },
    { name: dict.impact.forum.f2.name, title: dict.impact.forum.f2.title, desc: dict.impact.forum.f2.desc },
    { name: dict.impact.forum.f3.name, title: dict.impact.forum.f3.title, desc: dict.impact.forum.f3.desc },
    { name: dict.impact.forum.f4.name, title: dict.impact.forum.f4.title, desc: dict.impact.forum.f4.desc },
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
            <span>{dict.impact.breadcrumb}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] pt-1">
            {dict.impact.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {dict.impact.lead}
          </p>
        </FadeIn>
      </section>

      {/* Three Pillars - Infographic Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.impact.pillarsEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {dict.impact.pillarsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.id}
                delay={idx * 0.1}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold shadow-md">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border ${pillar.badgeColor}`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{pillar.title}</h3>
                    <p className="text-xs font-semibold text-emerald-800 font-mono mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed border-b border-gray-100 pb-4">
                    {pillar.desc}
                  </p>

                  <ul className="space-y-2 text-xs text-gray-700 font-medium">
                    {pillar.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Forum Components */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.impact.forumEyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
            {dict.impact.forumTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {forumParts.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2 hover:border-emerald-700/40 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase">
                {f.name}
              </span>
              <h4 className="text-lg font-bold text-gray-900">{f.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold">{dict.impact.ctaTitle}</h3>
            <p className="text-emerald-200/80 text-sm">
              {dict.impact.ctaDesc}
            </p>
          </div>
          <Link
            href={safeRoute("/company/contact")}
            className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm h-12 px-6 rounded-xl transition-all whitespace-nowrap"
          >
            <span>{dict.impact.ctaButton}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
