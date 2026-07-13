import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLine,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";

const courseLinks = [
  ["課程總覽", "https://orangeapple.co/courses"],
  ["玩創啟蒙｜1–3 年級", "https://orangeapple.co/courses/kids-coding-foundations"],
  ["菁英程式｜4–12 年級", "https://orangeapple.co/courses"],
  ["駭客學程｜證照與檢定", "https://orangeapple.co/courses/expert"],
  ["AI 思維課程", "https://orangeapple.co/courses/ai-thinking/"],
  ["寒暑假營隊", "https://orangeapple.co/camps"],
];

const parentLinks = [
  ["免費課程諮詢", "https://orangeapple.co/contact"],
  ["教學據點", "https://orangeapple.co/classroom"],
  ["常見問題", "https://orangeapple.co/faq"],
  ["學員作品與成果", "https://orangeapple.co/projects"],
  ["查看完整客服時段", "https://orangeapple.co/contact"],
];

const aboutLinks = [
  ["品牌故事", "https://orangeapple.co/about/"],
  ["橘蘋觀點", "https://orangeapple.co/articles"],
  ["學校夥伴", "https://orangeapple.co/partners"],
  ["合作機會", "https://orangeapple.co/cooperation"],
  ["師資招募", "https://orangeapple.co/jobs"],
  ["社會責任", "https://orangeapple.co/csr"],
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/OrangeAppleTW",
    icon: <FaFacebookF aria-hidden="true" />,
    className: "facebook",
  },
  {
    label: "LINE 官方帳號",
    href: "https://line.me/R/ti/p/@291npklp",
    icon: <FaLine aria-hidden="true" />,
    className: "line",
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
  return (
    <details className="footer-group">
      <summary>
        <span>
          <small>{eyebrow}</small>
          <strong>{title}</strong>
        </span>
        <span className="summary-icon" aria-hidden="true" />
      </summary>
      <ul>
        {links.map(([label, href]) => (
          <li key={`${title}-${label}`}>
            <a href={href}>{label}</a>
          </li>
        ))}
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
              <a className="line-button" href="https://line.me/R/ti/p/@291npklp" target="_blank" rel="noopener noreferrer">
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
          </section>

          <nav className="footer-navigation" aria-label="頁尾導覽">
            <FooterGroup eyebrow="EXPLORE" title="找適合的課程" links={courseLinks} />
            <FooterGroup eyebrow="FOR PARENTS" title="家長服務" links={parentLinks} />
            <FooterGroup eyebrow="ABOUT US" title="關於橘蘋" links={aboutLinks} />
          </nav>
        </div>

        <div className="footer-container footer-bottom">
          <p>© {year} 橘子蘋果程式學苑</p>
          <p className="footer-footnote">全台 12 縣市直營・線上覆蓋 22 縣市</p>
          <nav aria-label="法律資訊">
            <a href="https://orangeapple.co/privacy">隱私權政策</a>
            <a href="https://orangeapple.co/terms">上課條款</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
