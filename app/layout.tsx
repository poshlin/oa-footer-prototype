import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "橘子蘋果｜Footer 改版原型",
  description: "橘子蘋果程式學苑全站 Footer 的桌機與手機響應式設計原型。",
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
