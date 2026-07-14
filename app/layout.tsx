import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "橘子蘋果｜全站導覽與 Footer 改版原型",
  description: "橘子蘋果程式學苑 BMW 式雙狀態全站導覽與高品質 Footer 響應式設計原型。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
