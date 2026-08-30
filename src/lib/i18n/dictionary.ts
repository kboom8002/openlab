import type { Locale } from "./config";
import ko from "@/messages/company/ko.json";
import en from "@/messages/company/en.json";
import ja from "@/messages/company/ja.json";
import zh from "@/messages/company/zh.json";

export type CompanyDictionary = typeof ko;

const dictionaries: Record<Locale, CompanyDictionary> = {
  ko,
  en,
  ja,
  zh,
};

export function getCompanyDictionary(locale: Locale = "ko"): CompanyDictionary {
  return dictionaries[locale] || dictionaries.ko;
}
