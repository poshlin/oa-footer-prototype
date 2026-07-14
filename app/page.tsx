"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLine,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";

const courseLinks = [
  ["全部課程總覽", "https://orangeapple.co/courses"],
  ["1–3 年級｜玩創程式啟蒙", "https://orangeapple.co/courses/kids-coding-foundations"],
  ["1–5 年級｜麥思數學", "https://orangeapple.co/courses/math"],
  ["1–12 年級｜寒暑假營隊", "https://orangeapple.co/camps"],
  ["4–12 年級｜菁英程式課程", "https://orangeapple.co/courses"],
  ["5 年級以上｜AI 思維實戰", "https://orangeapple.co/courses/ai-thinking/"],
  ["5 年級以上｜進階程式學程", "https://orangeapple.co/courses/expert"],
];

const parentLinks = [
  ["免費課程諮詢", "https://orangeapple.co/contact"],
  ["教學據點", "https://orangeapple.co/classroom"],
  ["常見問題", "https://orangeapple.co/faq"],
  ["選課前必讀指南", "https://orangeapple.co/articles/how-to-choose-kids-coding-class"],
  ["學員作品與成果", "https://orangeapple.co/projects"],
  ["家長／學員登入", "https://orangeapple.co/users/sign_in"],
];

const aboutLinks = [
  ["關於橘子蘋果", "https://orangeapple.co/about/"],
  ["橘蘋觀點", "https://orangeapple.co/articles"],
  ["社會責任", "https://orangeapple.co/csr"],
  ["學校夥伴", "https://orangeapple.co/partners"],
  ["合作機會", "https://orangeapple.co/cooperation"],
  ["加入橘蘋／師資招募", "https://orangeapple.co/jobs"],
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/OrangeAppleTW",
    icon: <FaFacebookF aria-hidden="true" />,
    className: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/orangeapple.tw",
    icon: <FaInstagram aria-hidden="true" />,
    className: "instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@OrangeAppleTW",
    icon: <FaYoutube aria-hidden="true" />,
    className: "youtube",
  },
];

type FooterGroupProps = {
  eyebrow: string;
  title: string;
  links: string[][];
};

function FooterGroup({ eyebrow, title, links }: FooterGroupProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 769px)");
    const syncWithViewport = () => setIsOpen(desktopQuery.matches);

    syncWithViewport();
    desktopQuery.addEventListener("change", syncWithViewport);
    return () => desktopQuery.removeEventListener("change", syncWithViewport);
  }, []);

  return (
    <details
      className="footer-group"
      open={isOpen}
      onToggle={(event) => {
        const desktop = window.matchMedia("(min-width: 769px)").matches;
        setIsOpen(desktop ? true : event.currentTarget.open);
      }}
    >
      <summary>
        <span>
          <small>{eyebrow}</small>
          <strong>{title}</strong>
        </span>
        <span className="summary-icon" aria-hidden="true" />
      </summary>
      <ul>
        {links.map(([label, href]) => {
          const [indexLabel, linkLabel] = label.split("｜").map((part) => part.trim());
          const isIndexedLink = Boolean(linkLabel);

          return (
            <li key={`${title}-${label}`}>
              <a href={href} className={isIndexedLink ? "indexed-link" : undefined}>
                {isIndexedLink ? (
                  <span className="indexed-link-content">
                    <span className="link-index">{indexLabel}</span>
                    <span>{linkLabel}</span>
                  </span>
                ) : label}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main>
      <section className="preview-context" aria-label="頁面結尾示意">
        <div className="preview-context__inner">
          <span className="prototype-tag">FOOTER PROTOTYPE</span>
          <p>這裡是網站內容的最後一段</p>
          <span className="preview-arrow" aria-hidden="true">↓</span>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-glow footer-glow--orange" aria-hidden="true" />
        <div className="footer-glow footer-glow--teal" aria-hidden="true" />

        <div className="footer-container footer-main">
          <section className="brand-column" aria-label="橘子蘋果聯絡資訊">
            <a className="footer-logo" href="https://orangeapple.co/" aria-label="橘子蘋果程式學苑首頁">
              <Image
                src="/logo-2023-white.svg"
                alt="橘子蘋果程式學苑"
                width={280}
                height={66}
                priority
              />
            </a>

            <p className="brand-promise">
              2012 年起，陪孩子從第一行程式，<br />
              一路走向真正成果。
            </p>

            <div className="contact-actions">
              <a className="line-button" href="https://oaoa.fun/6qhv3g" target="_blank" rel="noopener noreferrer">
                <FaLine aria-hidden="true" />
                <span>LINE 課程諮詢</span>
              </a>
              <a className="phone-link" href="tel:0277098229">
                <FaPhoneAlt aria-hidden="true" />
                <span>(02) 7709-8229</span>
              </a>
            </div>

            <p className="service-note">
              實體與線上客服時段不同，
              <a href="https://orangeapple.co/contact">查看完整時段</a>
            </p>

            <div className="social-area">
              <p className="social-heading">追蹤橘蘋</p>
              <nav className="social-links" aria-label="橘子蘋果社群平台">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    className={`social-link social-link--${social.className}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`前往橘子蘋果 ${social.label}`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </nav>
            </div>
          </section>

          <nav className="footer-navigation" aria-label="頁尾導覽">
            <FooterGroup eyebrow="COURSES" title="課程探索" links={courseLinks} />
            <FooterGroup eyebrow="FOR PARENTS" title="家長專區" links={parentLinks} />
            <FooterGroup eyebrow="ABOUT" title="認識橘蘋" links={aboutLinks} />
          </nav>
        </div>

        <div className="footer-container footer-bottom">
          <p>© {year} 橘子蘋果程式學苑</p>
          <nav className="footer-presence" aria-label="服務地區">
            <a href="https://orangeapple.co/classroom">全台 12 縣市直營｜線上課程不限地區</a>
          </nav>
          <nav aria-label="法律資訊">
            <a href="https://orangeapple.co/privacy">隱私權政策</a>
            <a href="https://orangeapple.co/terms">上課條款</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
