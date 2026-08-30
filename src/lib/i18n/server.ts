import { cookies, headers } from "next/headers";
import { locales, defaultLocale, type Locale } from "./config";
import { getCompanyDictionary, type CompanyDictionary } from "./dictionary";

export async function getCurrentLocale(searchParamsLang?: string): Promise<Locale> {
  if (searchParamsLang && locales.includes(searchParamsLang as Locale)) {
    return searchParamsLang as Locale;
  }

  try {
    const headerStore = await headers();
    const headerLocale = headerStore.get("x-wellb-locale");
    if (headerLocale && locales.includes(headerLocale as Locale)) {
      return headerLocale as Locale;
    }
  } catch {
    // headers() might not be available in some execution contexts
  }

  try {
    const cookieStore = await cookies();
    const cookieLocale =
      cookieStore.get("NEXT_LOCALE")?.value || cookieStore.get("wellb_locale")?.value;
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
      return cookieLocale as Locale;
    }
  } catch {
    // If called in a context where cookies() is unavailable, fallback to default
  }

  return defaultLocale;
}

export async function getServerDictionary(searchParamsLang?: string): Promise<{
  locale: Locale;
  dict: CompanyDictionary;
}> {
  const locale = await getCurrentLocale(searchParamsLang);
  const dict = getCompanyDictionary(locale);
  return { locale, dict };
}
