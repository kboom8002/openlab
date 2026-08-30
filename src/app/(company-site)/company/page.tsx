import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import { DiscoverConnectPipeline } from "@/components/graphics";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Compass,
  ExternalLink,
  Globe,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getServerDictionary();
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    openGraph: {
      title: dict.home.metaTitle,
      description: dict.home.metaDescription,
      url: "https://wellbcompany.ai",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 - 제주의 자산을 AI로 전환하고, 더 넓은 기회와 연결합니다",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function CompanyHomePage() {
  const { dict } = await getServerDictionary();

  return (
    <main className="overflow-visible">
      {/* Top Tier McKinsey Style Hero Section */}
      <section className="relative pt-16 pb-24 bg-gradient-to-b from-[#f4f8f3] via-[#fbfdfa] to-white border-b border-[#344a2c]/10 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-visible">
            {/* Hero Text Column */}
            <FadeIn duration={0.8} yOffset={24} className="lg:col-span-7 space-y-6 overflow-visible">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#344a2c]/10 text-[var(--color-company-forest)] text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{dict.home.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-company-ink)] tracking-tight leading-[1.3] pt-2 overflow-visible">
                {dict.home.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-[var(--color-company-muted)] font-medium leading-relaxed max-w-xl">
                {dict.home.heroLead}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={safeRoute("/company/contact")}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 !text-white font-extrabold text-sm h-12 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  style={{ color: "#ffffff" }}
                >
                  <span className="font-extrabold" style={{ color: "#ffffff" }}>
                    {dict.home.ctaContact}
                  </span>
                  <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
                </Link>
                <a
                  href="https://wellb-openlab.vercel.app/"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50/50 text-[var(--color-company-forest)] font-bold text-sm h-12 px-6 rounded-xl border border-[var(--color-company-forest)]/30 shadow-2xs transition-all duration-200 text-decoration-none"
                >
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{dict.home.ctaOpenlab}</span>
                </a>
              </div>
            </FadeIn>

            {/* AI Generated Premium Visual Column */}
            <FadeIn duration={1} delay={0.2} className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-900/10 bg-gradient-to-br from-emerald-900 to-slate-900 aspect-[4/3] group">
                <Image
                  src="/images/company/company_hero_ax.jpg"
                  alt="WellB AI Transformation Concept Visual"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-xs font-semibold text-gray-800 shadow-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Jeju AX Fabric Mesh Engine
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">v3.0 VERIFIED</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Discover -> Connect Interactive SVG Pipeline Section */}
      <section className="py-24 bg-white border-b border-gray-100 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 overflow-visible">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto overflow-visible pt-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-800 mb-3">
              {dict.home.pipelineEyebrow}
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight text-gray-950 leading-[1.35] pt-1 overflow-visible">
              {dict.home.pipelineTitle}
            </p>
          </ScrollReveal>

          {/* Interactive Pipeline Component */}
          <DiscoverConnectPipeline />
        </div>
      </section>

      {/* Core Solutions Grid with AI Visual Artwork */}
      <section className="py-24 bg-[#f6f9f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <ScrollReveal direction="up" className="max-w-3xl pt-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-company-forest)]">
              {dict.home.practiceEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 leading-[1.35]">
              {dict.home.practiceTitle}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Enterprise AX Card */}
            <ScrollReveal
              direction="up"
              delay={0.1}
              className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/company/company_ax_enterprise.jpg"
                    alt="Enterprise AX Solutions Visual"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-emerald-900 shadow-2xs">
                    {dict.home.enterpriseAxBadge}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {dict.home.enterpriseAxTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dict.home.enterpriseAxDesc}
                </p>
              </div>
              <Link
                href={safeRoute("/company/ax-solutions")}
                className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-company-forest)] hover:underline pt-2"
              >
                <span>{dict.home.enterpriseAxLink}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>

            {/* Jeju to Global Card */}
            <ScrollReveal
              direction="up"
              delay={0.2}
              className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/company/company_jeju_global.jpg"
                    alt="Jeju to Global Platform Visual"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-amber-900 shadow-2xs">
                    {dict.home.jejuGlobalBadge}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {dict.home.jejuGlobalTitle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dict.home.jejuGlobalDesc}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
                <Link
                  href={safeRoute("/company/jeju-to-global")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-company-forest)] hover:underline"
                >
                  <span>{dict.home.jejuGlobalLink}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://aihompy.vercel.app/ko/ai-hub/jeju"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-emerald-800 hover:bg-emerald-700 !text-white px-3.5 py-2 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                  style={{ color: "#ffffff" }}
                >
                  <Globe className="w-3.5 h-3.5" style={{ color: "#ffffff" }} />
                  <span className="font-extrabold" style={{ color: "#ffffff" }}>
                    {dict.home.jejuGlobalDirect}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-90" style={{ color: "#ffffff" }} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#1b2b18] via-[#243a20] to-[#1b2b18] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal direction="up">
            <h2 className="text-3xl sm:text-4xl font-black">{dict.home.ctaBandTitle}</h2>
            <p className="text-emerald-200/80 text-base max-w-xl mx-auto mt-2">
              {dict.home.ctaBandDesc}
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link
                href={safeRoute("/company/contact")}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 !text-gray-950 font-black text-sm h-12 px-6 rounded-xl shadow-lg transition-all"
                style={{ color: "#030712" }}
              >
                <span className="font-extrabold" style={{ color: "#030712" }}>
                  {dict.home.ctaBandButton}
                </span>
                <CheckCircle2 className="w-4 h-4" style={{ color: "#030712" }} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
