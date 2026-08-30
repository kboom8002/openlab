import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { EvidenceModelDiagram } from "@/components/graphics";
import { ExternalLink } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getServerDictionary();
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    openGraph: {
      title: dict.projects.metaTitle,
      description: dict.projects.metaDescription,
      url: "https://wellbcompany.ai/company/projects",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 프로젝트 & 실증",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function CompanyProjectsPage() {
  const { dict } = await getServerDictionary();

  return (
    <main className="py-16 space-y-16">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <Link href={safeRoute("/company")} className="hover:underline">
              {dict.common.breadcrumb.home}
            </Link>
            <span>/</span>
            <span>{dict.projects.breadcrumb}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            {dict.projects.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {dict.projects.lead}
          </p>
        </FadeIn>
      </section>

      {/* Projects List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {dict.projects.activeBadge}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {dict.projects.activeProjectTag}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{dict.projects.p1.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {dict.projects.p1.desc}
            </p>
            <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <p>• {dict.projects.p1.deliverables}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {dict.projects.activeBadge}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {dict.projects.activeProjectTag}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{dict.projects.p2.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {dict.projects.p2.desc}
            </p>
            <div className="pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <p>• {dict.projects.p2.deliverables}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-4 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                {dict.projects.proposalBadge}
              </span>
              <span className="text-xs font-mono text-gray-400">
                {dict.projects.proposalTag}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{dict.projects.p3.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {dict.projects.p3.desc}
            </p>
            <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
              {dict.projects.p3.disclaimer}
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
            <h3 className="text-2xl font-bold">{dict.projects.ctaTitle}</h3>
            <p className="text-emerald-200/80 text-sm">
              {dict.projects.ctaDesc}
            </p>
          </div>
          <Link
            href={safeRoute("/")}
            className="inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm h-12 px-6 rounded-xl transition-all whitespace-nowrap"
          >
            <span>{dict.projects.ctaButton}</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
