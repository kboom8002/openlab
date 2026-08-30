import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dict } = await getServerDictionary();
  return {
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
    openGraph: {
      title: dict.privacy.metaTitle,
      description: dict.privacy.metaDescription,
      url: "https://wellbcompany.ai/company/privacy",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 개인정보처리방침",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function Privacy() {
  const { dict } = await getServerDictionary();

  return (
    <main id="main">
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "linear-gradient(180deg, var(--company-mist), #fff)",
        }}
      >
        <div style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 1.25rem" }}>
          <div
            style={{
              color: "var(--company-muted)",
              fontSize: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            <Link
              href={safeRoute("/company")}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {dict.common.breadcrumb.home}
            </Link>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--company-ink)" }}>{dict.privacy.breadcrumb}</span>
          </div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--company-ink)",
              marginBottom: "1.5rem",
              wordBreak: "keep-all",
            }}
          >
            {dict.privacy.title}
          </h1>
          <div
            style={{
              background: "#eaf2ee",
              color: "var(--company-forest)",
              padding: "0.75rem 1.25rem",
              borderRadius: "0.5rem",
              display: "inline-block",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            {dict.privacy.badge}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 1.25rem" }}>
          <div style={{ color: "var(--company-muted)", lineHeight: 1.8 }}>
            <p style={{ fontSize: "1rem", color: "var(--company-ink)", marginBottom: "2rem" }}>
              {dict.privacy.lead}
            </p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--company-ink)",
                marginTop: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              {dict.privacy.sec1Title}
            </h3>
            <p>{dict.privacy.sec1Desc}</p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--company-ink)",
                marginTop: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              {dict.privacy.sec2Title}
            </h3>
            <p>{dict.privacy.sec2Desc}</p>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--company-ink)",
                marginTop: "2rem",
                marginBottom: "0.75rem",
              }}
            >
              {dict.privacy.sec3Title}
            </h3>
            <p>{dict.privacy.sec3Desc}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
