import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Award,
  Sparkles,
} from "lucide-react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const sp = searchParams ? await searchParams : undefined;
  const { locale, dict } = await getServerDictionary(sp?.lang);
  return {
    title: dict.axSolutions.metaTitle,
    description: dict.axSolutions.metaDescription,
    openGraph: {
      title: dict.axSolutions.metaTitle,
      description: dict.axSolutions.metaDescription,
      url: "https://wellbcompany.ai/company/ax-solutions",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 AX 솔루션",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function AxSolutionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const { dict } = await getServerDictionary(sp?.lang);

  const serviceAreas = [
    {
      id: "enterprise",
      title: dict.axSolutions.areas.enterprise.title,
      subtitle: dict.axSolutions.areas.enterprise.subtitle,
      desc: dict.axSolutions.areas.enterprise.desc,
      icon: Building2,
      badge: dict.axSolutions.areas.enterprise.badge,
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      bullets: [
        dict.axSolutions.areas.enterprise.b1,
        dict.axSolutions.areas.enterprise.b2,
        dict.axSolutions.areas.enterprise.b3,
        dict.axSolutions.areas.enterprise.b4,
      ],
    },
    {
      id: "public",
      title: dict.axSolutions.areas.public.title,
      subtitle: dict.axSolutions.areas.public.subtitle,
      desc: dict.axSolutions.areas.public.desc,
      icon: Globe,
      badge: dict.axSolutions.areas.public.badge,
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      bullets: [
        dict.axSolutions.areas.public.b1,
        dict.axSolutions.areas.public.b2,
        dict.axSolutions.areas.public.b3,
        dict.axSolutions.areas.public.b4,
      ],
    },
    {
      id: "brand",
      title: dict.axSolutions.areas.brand.title,
      subtitle: dict.axSolutions.areas.brand.subtitle,
      desc: dict.axSolutions.areas.brand.desc,
      icon: Sparkles,
      badge: dict.axSolutions.areas.brand.badge,
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      bullets: [
        dict.axSolutions.areas.brand.b1,
        dict.axSolutions.areas.brand.b2,
        dict.axSolutions.areas.brand.b3,
        dict.axSolutions.areas.brand.b4,
      ],
    },
    {
      id: "education",
      title: dict.axSolutions.areas.education.title,
      subtitle: dict.axSolutions.areas.education.subtitle,
      desc: dict.axSolutions.areas.education.desc,
      icon: Award,
      badge: dict.axSolutions.areas.education.badge,
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      bullets: [
        dict.axSolutions.areas.education.b1,
        dict.axSolutions.areas.education.b2,
        dict.axSolutions.areas.education.b3,
        dict.axSolutions.areas.education.b4,
      ],
    },
  ];

  const processSteps = [
    { step: "01", name: dict.axSolutions.steps.s1.name, desc: dict.axSolutions.steps.s1.desc },
    { step: "02", name: dict.axSolutions.steps.s2.name, desc: dict.axSolutions.steps.s2.desc },
    { step: "03", name: dict.axSolutions.steps.s3.name, desc: dict.axSolutions.steps.s3.desc },
    { step: "04", name: dict.axSolutions.steps.s4.name, desc: dict.axSolutions.steps.s4.desc },
    { step: "05", name: dict.axSolutions.steps.s5.name, desc: dict.axSolutions.steps.s5.desc },
    { step: "06", name: dict.axSolutions.steps.s6.name, desc: dict.axSolutions.steps.s6.desc },
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
            <span>{dict.axSolutions.breadcrumb}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] pt-1">
            {dict.axSolutions.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {dict.axSolutions.lead}
          </p>
        </FadeIn>
      </section>

      {/* Service Areas - Infographic Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-gray-200 pb-4 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
              {dict.axSolutions.frameworkEyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
              {dict.axSolutions.frameworkTitle}
            </h2>
          </div>
          <span className="text-xs font-mono text-gray-500">
            {dict.axSolutions.frameworkBadge}
          </span>
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
                    <span
                      className={`text-xs font-extrabold px-3 py-1 rounded-full border ${area.badgeColor}`}
                    >
                      {area.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{area.title}</h3>
                    <p className="text-xs font-bold text-emerald-800 font-mono mt-0.5">
                      {area.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-100 pb-4">
                    {area.desc}
                  </p>

                  {/* Deep Bullet Points */}
                  <div className="space-y-2.5 pt-1">
                    {area.bullets.map((bullet, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs font-medium text-gray-700 leading-normal"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>{dict.axSolutions.templateIncluded}</span>
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
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              {dict.axSolutions.processEyebrow}
            </span>
            <h2 className="text-3xl font-black text-white">
              {dict.axSolutions.processTitle}
            </h2>
            <p className="text-xs text-emerald-200/80">
              {dict.axSolutions.processLead}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2 relative"
              >
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
            <h3 className="text-2xl font-bold text-emerald-950">
              {dict.axSolutions.ctaTitle}
            </h3>
            <p className="text-sm text-emerald-800/80">
              {dict.axSolutions.ctaDesc}
            </p>
          </div>
          <Link
            href={safeRoute("/company/contact")}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 !text-white font-extrabold text-sm h-12 px-6 rounded-xl shadow-md transition-all whitespace-nowrap"
            style={{ color: "#ffffff" }}
          >
            <span className="font-extrabold" style={{ color: "#ffffff" }}>
              {dict.axSolutions.ctaButton}
            </span>
            <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
          </Link>
        </div>
      </section>
    </main>
  );
}
