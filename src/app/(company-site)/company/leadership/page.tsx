import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ScrollReveal, FadeIn } from "@/components/motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Globe,
  Briefcase,
  GraduationCap,
  Layers,
  HeartHandshake,
  Mail,
  Award,
  Terminal,
} from "lucide-react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const sp = searchParams ? await searchParams : undefined;
  const { locale, dict } = await getServerDictionary(sp?.lang);
  return {
    title: dict.leadership.metaTitle,
    description: dict.leadership.metaDescription,
    openGraph: {
      title: dict.leadership.metaTitle,
      description: dict.leadership.metaDescription,
      url: "https://wellbcompany.ai/company/leadership",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 리더십 & 경영진 소개",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

const ceoCareersKo = [
  "서울여자대학교 영양학과 학사·석사",
  "대웅제약 CGBIO 해외 클리닉 사업부장",
  "대웅제약 이지메디투어 총괄실장",
  "중국 중한국제의원(成都·청두) 대표",
  "중국커리어미용의원(심천) 이사",
  "메디피아재단 메디피움의원 센터장·이사",
  "차의료재단 차움병원 매니저",
  "코스메틱코리아 마리프랑스바디라인 센터장",
  "한올메디투어 이사",
];

const ceoCareersEn = [
  "Seoul Women's University (B.S. & M.S. in Nutritional Science)",
  "Daewoong Pharmaceutical CGBIO Head of Global Clinics",
  "Daewoong Pharmaceutical EZ Meditour General Manager",
  "Sino-Korean International Medical Center (Chengdu, China) Representative",
  "Career Aesthetic Medical Center (Shenzhen, China) Director",
  "Medipia Foundation Medipium Medical Center Director",
  "CHA Medical Group Chaum Hospital Manager",
  "Cosmetic Korea Marie France Bodyline Center Director",
  "Hanol Meditour Director",
];

const ceoCareersJa = [
  "ソウル女子大学校 栄養学科 学士・修士",
  "大熊製薬(デウン製薬) CGBIO 海外クリニック事業部長",
  "大熊製薬 イージーメディツアー 統括室長",
  "中国 中韓国際医院 (成都) 代表",
  "中国 キャリア美容医院 (深セン) 理事",
  "メディピア財団 メディピウム医院 センター長・理事",
  "チャ医療財団 チャウム病院 マネージャー",
  "コスメティックコリア マリーフランス・ボディライン センター長",
  "ハンオル・メディツアー 理事",
];

const ceoCareersZh = [
  "首尔女子大学 营养学学士·硕士",
  "大熊制药 CGBIO 海外诊所事业部总监",
  "大熊制药 EZ Meditour 统括室长",
  "中国 中韩国际医美医院（成都）代表",
  "中国 佳丽医美医院（深圳）董事",
  "Medipia医疗财团 Medipium医疗中心 院长·理事",
  "CHA医疗集团 CHAUM抗衰老医疗中心 经理",
  "Cosmetic Korea 玛丽法国纤体中心 院长",
  "Hanol Meditour 董事",
];

const ctoCareersKo = [
  "서울대학교 자연과학대학 물리학과 학사·석사",
  "㈜코네스, ㈜디지토 (설립, 이사)",
  "㈜미래랩 (설립, 부사장)",
  "서울신문NTN (설립, 부사장)",
  "㈜에이아이네이션 (설립, 부사장)",
  "前 숙명여자대학교 문화관광외식학부 겸임교수",
  "前 보험연수원 AI기획위원회 위원장",
  "前 부산광역시 AI 위원회 위원",
];

const ctoCareersEn = [
  "Seoul National University (B.S. & M.S. in Physics)",
  "Kones Inc., Digito Inc. (Co-founder, Director)",
  "Mirae Lab Inc. (Co-founder, VP)",
  "Seoul Shinmun NTN (Co-founder, VP)",
  "AI Nation Inc. (Co-founder, VP)",
  "Former Adjunct Professor, Sookmyung Women's University",
  "Former Chairman, Insurance Training Institute AI Planning Committee",
  "Former Member, Busan Metropolitan City AI Committee",
];

const ctoCareersJa = [
  "ソウル大学校 自然科学大学 物理学科 学士・修士",
  "株式会社コネス、株式会社ディジト (設立、理事)",
  "株式会社未来ラボ (設立、副社長)",
  "ソウル新聞NTN (設立、副社長)",
  "株式会社AI Nation (設立、副社長)",
  "前 淑明女子大学校 文化観光外食学部 兼任教授",
  "前 保険研修院 AI企画委員会 委員長",
  "前 釜山広域市 AI委員会 委員",
];

const ctoCareersZh = [
  "首尔大学 自然科学学院 物理学学士·硕士",
  "（株）KONES、（株）Digito（联合创始人，董事）",
  "（株）未来实验室（联合创始人，副总裁）",
  "首尔新闻NTN（联合创始人，副总裁）",
  "（株）AI Nation（联合创始人，副总裁）",
  "前 淑明女子大学 文化观光餐饮学部 兼职教授",
  "前 韩国保险研修院 AI规划委员会 主任委员",
  "前 釜山广域市 AI委员会 委员",
];

export default async function CompanyLeadershipPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const { locale, dict } = await getServerDictionary(sp?.lang);

  const ceoCareers =
    locale === "en"
      ? ceoCareersEn
      : locale === "ja"
      ? ceoCareersJa
      : locale === "zh"
      ? ceoCareersZh
      : ceoCareersKo;

  const ctoCareers =
    locale === "en"
      ? ctoCareersEn
      : locale === "ja"
      ? ctoCareersJa
      : locale === "zh"
      ? ctoCareersZh
      : ctoCareersKo;

  const synergyPillars = [
    {
      step: "01",
      role: dict.leadership.synergy.p1Role,
      lead: dict.leadership.synergy.p1Lead,
      title: dict.leadership.synergy.p1Title,
      desc: dict.leadership.synergy.p1Desc,
      icon: Globe,
      badgeBg: "bg-amber-100 text-amber-900",
    },
    {
      step: "02",
      role: dict.leadership.synergy.p2Role,
      lead: dict.leadership.synergy.p2Lead,
      title: dict.leadership.synergy.p2Title,
      desc: dict.leadership.synergy.p2Desc,
      icon: Cpu,
      badgeBg: "bg-emerald-100 text-emerald-900",
    },
    {
      step: "03",
      role: dict.leadership.synergy.p3Role,
      lead: dict.leadership.synergy.p3Lead,
      title: dict.leadership.synergy.p3Title,
      desc: dict.leadership.synergy.p3Desc,
      icon: ShieldCheck,
      badgeBg: "bg-slate-100 text-slate-900",
    },
  ];

  const commitments = [
    {
      title: dict.leadership.trust.c1Title,
      desc: dict.leadership.trust.c1Desc,
      icon: ShieldCheck,
    },
    {
      title: dict.leadership.trust.c2Title,
      desc: dict.leadership.trust.c2Desc,
      icon: Sparkles,
    },
    {
      title: dict.leadership.trust.c3Title,
      desc: dict.leadership.trust.c3Desc,
      icon: HeartHandshake,
    },
  ];

  return (
    <main className="py-16 space-y-24">
      {/* 1. Page Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wider uppercase">
            <Link href={safeRoute("/company")} className="hover:underline">
              {dict.common.breadcrumb.home}
            </Link>
            <span>/</span>
            <span>{dict.leadership.breadcrumb}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.25]">
            {dict.leadership.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed pt-1">
            {dict.leadership.subtitle}
          </p>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl">
            {dict.leadership.lead}
          </p>
        </FadeIn>
      </section>

      {/* 2. Executive Profile Grid (2-Column Symmetry) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          {/* CEO Card */}
          <ScrollReveal
            direction="up"
            delay={0.1}
            className="flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-100/60 via-amber-50/20 to-transparent rounded-bl-full pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-36 h-48 sm:w-32 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-[#344a2c]/20 shrink-0 bg-slate-100">
                  <Image
                    src="/images/company/ceo_kim_yeonjin.png"
                    alt={`${dict.leadership.ceo.name} - ${dict.leadership.ceo.role}`}
                    fill
                    sizes="(max-width: 640px) 144px, 128px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-black uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{dict.leadership.ceo.badge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {dict.leadership.ceo.name}
                  </h2>
                  <p className="text-sm font-bold text-[#344a2c]">{dict.leadership.ceo.role}</p>
                  <p className="text-xs text-gray-500 font-medium">{dict.leadership.ceo.company}</p>
                </div>
              </div>

              {/* CEO Philosophy Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-600 text-gray-800 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 block">
                  {dict.leadership.ceo.philosophyTitle}
                </span>
                <p className="text-sm sm:text-base font-semibold leading-snug italic">
                  {dict.leadership.ceo.philosophy}
                </p>
              </div>

              {/* Core Focus Areas */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#344a2c]" />
                  <span>{dict.leadership.ceo.focusTitle}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{dict.leadership.ceo.focus1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{dict.leadership.ceo.focus2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{dict.leadership.ceo.focus3}</span>
                  </li>
                </ul>
              </div>

              {/* Career Highlights */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#344a2c]" />
                  <span>{dict.leadership.ceo.careerTitle}</span>
                </h3>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {ceoCareers.map((text, i) => (
                    <div key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-amber-700 font-bold shrink-0">•</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{dict.leadership.ceo.tag}</span>
              <span className="text-amber-800 font-mono font-bold">
                {dict.leadership.ceo.subtag}
              </span>
            </div>
          </ScrollReveal>

          {/* CTO Card */}
          <ScrollReveal
            direction="up"
            delay={0.2}
            className="flex flex-col justify-between bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-100/60 via-emerald-50/20 to-transparent rounded-bl-full pointer-events-none" />

            <div className="space-y-8 relative z-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-36 h-48 sm:w-32 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-900/20 shrink-0 bg-slate-100">
                  <Image
                    src="/images/company/cto_lee_sangeun.png"
                    alt={`${dict.leadership.cto.name} - ${dict.leadership.cto.role}`}
                    fill
                    sizes="(max-width: 640px) 144px, 128px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-black uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{dict.leadership.cto.badge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {dict.leadership.cto.name}
                  </h2>
                  <p className="text-sm font-bold text-emerald-800">{dict.leadership.cto.role}</p>
                  <p className="text-xs text-gray-500 font-medium">{dict.leadership.cto.company}</p>
                </div>
              </div>

              {/* CTO Philosophy Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border-l-4 border-emerald-700 text-gray-800 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 block">
                  {dict.leadership.cto.philosophyTitle}
                </span>
                <p className="text-sm sm:text-base font-semibold leading-snug italic">
                  {dict.leadership.cto.philosophy}
                </p>
              </div>

              {/* Core Focus Areas */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{dict.leadership.cto.focusTitle}</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{dict.leadership.cto.focus1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{dict.leadership.cto.focus2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{dict.leadership.cto.focus3}</span>
                  </li>
                </ul>
              </div>

              {/* Career Highlights */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{dict.leadership.cto.careerTitle}</span>
                </h3>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {ctoCareers.map((text, i) => (
                    <div key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-700 font-bold shrink-0">•</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{dict.leadership.cto.tag}</span>
              <span className="text-emerald-800 font-mono font-bold">
                {dict.leadership.cto.subtag}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Leadership Synergy & 3-Pillar Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
            {dict.leadership.synergy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {dict.leadership.synergy.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {dict.leadership.synergy.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {synergyPillars.map((p) => {
            const Icon = p.icon;
            return (
              <ScrollReveal
                key={p.step}
                className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-gray-200 font-mono">{p.step}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.badgeBg}`}>
                      {p.role}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 text-xs font-bold text-gray-500">
                  <span>리더십: </span>
                  <span className="text-gray-800">{p.lead}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. Governance & Trust Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#1b2b18] to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-emerald-800/40 space-y-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
              {dict.leadership.trust.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {dict.leadership.trust.title}
            </h2>
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              {dict.leadership.trust.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {commitments.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 backdrop-blur-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{c.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Direct Contact CTA Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
              {dict.leadership.cta.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {dict.leadership.cta.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{dict.leadership.cta.desc}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              href={safeRoute("/company/contact")}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 !text-white font-extrabold text-sm h-12 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              style={{ color: "#ffffff" }}
            >
              <Mail className="w-4 h-4" style={{ color: "#ffffff" }} />
              <span className="font-extrabold" style={{ color: "#ffffff" }}>
                {dict.leadership.cta.contactButton}
              </span>
              <ArrowRight className="w-4 h-4" style={{ color: "#ffffff" }} />
            </Link>
            <Link
              href={safeRoute("/company/about")}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm h-12 px-6 rounded-xl transition-all"
            >
              <span>{dict.leadership.cta.aboutButton}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
