import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "橘子蘋果｜全站導覽與 Footer 改版原型",
  description: "橘子蘋果程式學苑 BMW 式雙狀態全站導覽與高品質 Footer 響應式設計原型。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  // 這是內部設計提案頁，外觀與官網高度相似。被搜尋引擎收錄會與 orangeapple.co
  // 互相競爭同一批關鍵字，是實質的 SEO 傷害，所以全站 noindex。
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
