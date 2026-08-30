"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";
import type { Route } from "next";
import { locales, localeNames, type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({ currentLocale, className = "" }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Set cookie for persistence (1 year)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `wellb_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (newLocale === "ko") {
        params.delete("lang");
      } else {
        params.set("lang", newLocale);
      }
      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(targetUrl as Route);
      router.refresh();
    });
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <label htmlFor="company-language-select" className="sr-only">
        언어 선택 (Select Language)
      </label>
      <div className="relative flex items-center">
        <Globe className="w-3.5 h-3.5 text-[#435140] absolute left-2.5 pointer-events-none opacity-70" />
        <select
          id="company-language-select"
          aria-label="언어 선택 (Select Language)"
          value={currentLocale}
          disabled={isPending}
          onChange={(e) => handleLocaleChange(e.target.value as Locale)}
          className="appearance-none bg-white/80 hover:bg-white text-[#344a2c] font-bold text-xs pl-7 pr-6 py-1.5 rounded-lg border border-[#344a2c]/20 hover:border-[#344a2c]/40 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-emerald-700/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {locales.map((loc) => (
            <option key={loc} value={loc} className="text-gray-900 font-medium text-xs">
              {localeNames[loc]}
            </option>
          ))}
        </select>
        <span className="absolute right-2 pointer-events-none text-[10px] text-[#435140] opacity-60">
          ▼
        </span>
      </div>
    </div>
  );
}
