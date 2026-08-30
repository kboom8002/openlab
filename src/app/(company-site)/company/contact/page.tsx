import type { Metadata } from "next";
import Link from "next/link";
import { safeRoute } from "@/lib/routes";
import { localeToOgLocale } from "@/lib/i18n";
import { getServerDictionary } from "@/lib/i18n/server";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const sp = searchParams ? await searchParams : undefined;
  const { locale, dict } = await getServerDictionary(sp?.lang);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    openGraph: {
      title: dict.contact.metaTitle,
      description: dict.contact.metaDescription,
      url: "https://wellbcompany.ai/company/contact",
      siteName: "웰비컴퍼니",
      images: [
        {
          url: "/images/company_og.png",
          width: 1200,
          height: 630,
          alt: "웰비컴퍼니 문의하기",
        },
      ],
      locale: localeToOgLocale[locale],
      type: "website",
    },
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const { dict } = await getServerDictionary(sp?.lang);

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
            <span style={{ color: "var(--company-ink)" }}>{dict.contact.breadcrumb}</span>
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
            {dict.contact.title}
          </h1>
          <p style={{ color: "var(--company-muted)", fontSize: "1.125rem" }}>
            {dict.contact.lead}
          </p>
        </div>
      </section>

      <section style={{ padding: "2rem 0 6rem", background: "#fff" }}>
        <div style={{ maxWidth: "76rem", margin: "0 auto", padding: "0 1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            <div>
              <h2
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--company-ink)",
                  marginBottom: "1.5rem",
                }}
              >
                {dict.contact.topicsTitle}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 3rem 0" }}>
                {[
                  dict.contact.topic1,
                  dict.contact.topic2,
                  dict.contact.topic3,
                  dict.contact.topic4,
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      padding: "1rem 0",
                      borderBottom: "1px solid var(--company-line)",
                      color: "var(--company-ink)",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <p style={{ color: "var(--company-muted)", marginBottom: "0.5rem" }}>
                  {dict.contact.emailLabel}
                </p>
                <p
                  style={{
                    fontWeight: 600,
                    color: "var(--company-ink)",
                    fontSize: "1.125rem",
                  }}
                >
                  contact@wellb.company
                </p>
              </div>
            </div>

            <div
              style={{
                background: "var(--company-mist)",
                padding: "2.5rem",
                borderRadius: "var(--company-radius)",
              }}
            >
              <ContactForm dict={dict.contact} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
