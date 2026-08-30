import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { safeRoute } from "@/lib/routes";
import { localeToHtmlLang } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Cpu,
  Users,
  Layers,
  Building2,
  ShieldCheck,
  Mail,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://wellbcompany.ai"),
  title: { default: "웰비컴퍼니", template: "%s | 웰비컴퍼니" },
  description:
    "(주)웰비컴퍼니 — 제주의 자산을 AI로 전환하고, 더 넓은 기회와 연결합니다. 소셜 임팩트 AX 서비스",
  openGraph: {
    title: "웰비컴퍼니",
    description:
      "(주)웰비컴퍼니 — 제주의 자산을 AI로 전환하고, 더 넓은 기회와 연결합니다. 소셜 임팩트 AX 서비스",
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
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "웰비컴퍼니",
    description:
      "(주)웰비컴퍼니 — 제주의 자산을 AI로 전환하고, 더 넓은 기회와 연결합니다. 소셜 임팩트 AX 서비스",
    images: ["/images/company_og.png"],
  },
  verification: {
    google: "45_E_Ze6g2xEPxInkgETD67rub7X3pcPqe1Y-9ok-GU",
    other: {
      "naver-site-verification": ["244ba5532918c38dff360b94d2851fc87bca92c8"],
    },
  },
};

/* JSON-LD Organization structured data for rich search results */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "(주)웰비컴퍼니",
  alternateName: ["WellB Company", "웰비컴퍼니", "wellbcompany"],
  url: "https://wellbcompany.ai",
  logo: "https://wellbcompany.ai/images/wellb_logo.png",
  description:
    "제주의 자산을 AI로 전환하고, 더 넓은 기회와 연결하는 소셜 임팩트 AX 기업",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    streetAddress: "연삼로 716, 1층 102호",
    addressLocality: "제주시",
    addressRegion: "제주특별자치도",
    addressCountry: "KR",
  },
  telephone: "064-787-9912",
  email: "wellb.offical@gmail.com",
  taxID: "609-86-28551",
  sameAs: ["https://wellb-openlab.vercel.app"],
  founder: {
    "@type": "Person",
    name: "김연진",
    jobTitle: "대표이사 (CEO)",
  },
  member: [
    {
      "@type": "Person",
      name: "김연진",
      jobTitle: "대표이사 (CEO)",
    },
    {
      "@type": "Person",
      name: "이상은",
      jobTitle: "최고기술책임자 (CTO)",
    },
  ],
};

export default async function CompanySiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale, dict } = await getServerDictionary();

  return (
    <div
      lang={localeToHtmlLang[locale]}
      className="min-h-screen flex flex-col bg-[#fbfdfa] text-[var(--color-company-ink)] font-sans antialiased selection:bg-[#46613b]/20 selection:text-[#152014]"
    >
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Top tier Glassmorphism Header */}
      <header className="sticky top-0 z-50 h-20 bg-white/90 backdrop-blur-md border-b border-[#344a2c]/10 transition-all duration-300">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
          <Link
            href={safeRoute("/company")}
            className="flex items-center gap-2 group shrink-0 text-decoration-none py-1"
          >
            <Image
              src="/images/wellb_logo.png"
              alt="WellB Company"
              width={240}
              height={66}
              className="h-14 sm:h-[3.625rem] w-auto object-contain group-hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          <nav
            aria-label="운영사 메인 메뉴"
            className="hidden md:flex items-center gap-4 lg:gap-7 shrink-0 flex-nowrap"
          >
            <Link
              href={safeRoute("/company/jeju-to-global")}
              className="text-xs lg:text-sm font-semibold text-[#435140] hover:text-[var(--color-company-forest)] transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Globe className="w-4 h-4 opacity-70 shrink-0" />
              <span>{dict.common.nav.jejuToGlobal}</span>
            </Link>
            <Link
              href={safeRoute("/company/ax-solutions")}
              className="text-xs lg:text-sm font-semibold text-[#435140] hover:text-[var(--color-company-forest)] transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Cpu className="w-4 h-4 opacity-70 shrink-0" />
              <span>{dict.common.nav.axSolutions}</span>
            </Link>
            <Link
              href={safeRoute("/company/impact")}
              className="text-xs lg:text-sm font-semibold text-[#435140] hover:text-[var(--color-company-forest)] transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Users className="w-4 h-4 opacity-70 shrink-0" />
              <span>{dict.common.nav.impact}</span>
            </Link>
            <Link
              href={safeRoute("/company/projects")}
              className="text-xs lg:text-sm font-semibold text-[#435140] hover:text-[var(--color-company-forest)] transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Layers className="w-4 h-4 opacity-70 shrink-0" />
              <span>{dict.common.nav.projects}</span>
            </Link>
            <Link
              href={safeRoute("/company/leadership")}
              className="text-xs lg:text-sm font-semibold text-[#435140] hover:text-[var(--color-company-forest)] transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <UserCheck className="w-4 h-4 opacity-70 shrink-0" />
              <span>{dict.common.nav.leadership}</span>
            </Link>
            <Link
              href={safeRoute("/company/about")}
              className="text-xs lg:text-sm font-semibold text-[#435140] hover:text-[var(--color-company-forest)] transition-colors py-2 flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Building2 className="w-4 h-4 opacity-70 shrink-0" />
              <span>{dict.common.nav.company}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <Suspense fallback={<div className="w-20 h-8 rounded-lg bg-gray-100/50 animate-pulse" />}>
              <LanguageSwitcher currentLocale={locale} />
            </Suspense>

            <Link
              href={safeRoute("/company/contact")}
              className="hidden sm:inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-[var(--color-company-forest)] hover:bg-[#344a2c]/5 px-3 py-2 rounded-lg transition-colors border border-[var(--color-company-forest)]/20 whitespace-nowrap shrink-0"
            >
              {dict.common.nav.contact}
            </Link>
            <a
              href="https://wellb-openlab.vercel.app/"
              className="inline-flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm tracking-wide rounded-xl h-9 sm:h-10 px-3.5 sm:px-4 bg-emerald-800 hover:bg-emerald-700 border border-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 text-decoration-none"
              style={{ color: "#ffffff" }}
            >
              <span className="font-extrabold" style={{ color: "#ffffff" }}>
                {dict.common.nav.openlab}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#ffffff" }} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* McKinsey / BCG Tier Corporate Footer */}
      <footer className="bg-[#141e12] text-white pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/wellb_logo_white.png"
                  alt="WellB Company"
                  width={220}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <p className="text-xs text-[#a4b49e] leading-relaxed max-w-md">
                {dict.common.footer.disclaimer}
              </p>

              <div className="text-xs text-[#bdcab8] space-y-1 pt-2 leading-relaxed">
                <p className="font-bold text-white text-sm">
                  {dict.common.footer.companyName}
                </p>
                <p>
                  {dict.common.footer.ceo} | {dict.common.footer.bizNo}
                </p>
                <p>{dict.common.footer.address}</p>
                <p>{dict.common.footer.phone}</p>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs text-[#82957b]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />{" "}
                  {dict.common.footer.evidenceTrust}
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />{" "}
                  {dict.common.footer.aiExecution}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#a4b49e] uppercase mb-4">
                {dict.common.footer.axServicesTitle}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href={safeRoute("/company/jeju-to-global")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    Jeju-to-global
                  </Link>
                </li>
                <li>
                  <Link
                    href={safeRoute("/company/ax-solutions")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    AX Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href={safeRoute("/company/impact")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    Social Impact
                  </Link>
                </li>
                <li>
                  <Link
                    href={safeRoute("/company/projects")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    Projects & Evidence
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-widest text-[#a4b49e] uppercase mb-4">
                {dict.common.footer.corporateTitle}
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href={safeRoute("/company/about")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    {dict.common.footer.aboutLink}
                  </Link>
                </li>
                <li>
                  <Link
                    href={safeRoute("/company/leadership")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    {dict.common.footer.leadershipLink}
                  </Link>
                </li>
                <li>
                  <Link
                    href={safeRoute("/company/contact")}
                    className="text-[#c1d0bb] hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Mail className="w-3.5 h-3.5" /> {dict.common.footer.contactLink}
                  </Link>
                </li>
                <li>
                  <Link
                    href={safeRoute("/company/privacy")}
                    className="text-[#c1d0bb] hover:text-white transition-colors whitespace-nowrap"
                  >
                    {dict.common.footer.privacyLink}
                  </Link>
                </li>
                <li className="pt-2">
                  <a
                    href="https://wellb-openlab.vercel.app/"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold text-xs transition-colors whitespace-nowrap"
                  >
                    {dict.common.footer.openlabPlatform}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#73856d]">
            <span>{dict.common.footer.copyright}</span>
            <span>{dict.common.footer.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
