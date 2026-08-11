import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "WELLB", template: "%s | WELLB" },
  description: "WellB Company — AI 증강 오픈이노베이션 & 소셜 임팩트 AX",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="skip-link" href="#main">
          본문으로 바로가기
        </a>
        {children}
      </body>
    </html>
  );
}
