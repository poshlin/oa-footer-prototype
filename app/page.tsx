"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FaBuilding,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLaptop,
  FaLine,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";

// 先依最低適用年級排序，讓家長能快速從年級找到對應課程。
const courseLinks = [
  ["全部課程總覽", "https://orangeapple.co/courses"],
  ["1–3 年級：玩創程式啟蒙", "https://orangeapple.co/courses/kids-coding-foundations"],
  ["1–6 年級：麥思數學", "https://orangeapple.co/courses/math"],
  ["1–12 年級：寒暑假營隊", "https://orangeapple.co/camps"],
  ["4–12 年級：菁英程式課程", "https://orangeapple.co/courses"],
  ["5 年級以上：進階程式學程", "https://orangeapple.co/courses/expert"],
  ["5 年級以上：AI 思維實戰", "https://orangeapple.co/courses/ai-thinking/"],
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

const onlineLine = {
  label: "線上課程專屬 LINE",
  account: "@oaonline",
  href: "https://oaoa.fun/6qhv3g",
};

const lineGroups = [
  {
    title: "雙北・基隆",
    items: [
      { label: "古亭", account: "@234rcqlb", href: "https://oaoa.fun/6qgmv4" },
      { label: "東湖・港墘・基隆・天母", account: "@673zaoef", href: "https://oaoa.fun/6qgmvy" },
      { label: "松山・新店・三峽・民權", account: "@336rhsya", href: "https://oaoa.fun/6qgmww" },
      { label: "蘆洲・林口・新莊・樹林", account: "@674swuur", href: "https://oaoa.fun/6qgmy7" },
      { label: "板橋・江翠・永和・土城", account: "@082rmpbn", href: "https://oaoa.fun/6qgmzf" },
    ],
  },
  {
    title: "桃竹・中部",
    items: [
      { label: "桃園區", locations: "中壢・桃園・南崁・青埔", account: "@vcm4747v", href: "https://oaoa.fun/6qgn26" },
      { label: "新竹區", locations: "新竹・竹北", account: "@249sysoe", href: "https://oaoa.fun/6qgn39" },
      { label: "台中區", locations: "北屯・南屯・大里・頭份", account: "@vtk2005q", href: "https://oaoa.fun/6qgn4t" },
    ],
  },
  {
    title: "嘉南・高屏",
    items: [
      { label: "嘉南區", locations: "台南復興・永康・嘉義・台南北區・台南南科・台南東區", account: "@iwk2198o", href: "https://oaoa.fun/6qgn5r" },
      { label: "高屏區", locations: "左營・東光・五甲・文山・楠梓・屏東", account: "@ihk7130i", href: "https://oaoa.fun/6qgn6r" },
    ],
  },
  {
    title: "其他課程",
    items: [
      { label: "寒暑假營隊", account: "@586kgezv", href: "https://oaoa.fun/6qgmu6" },
    ],
  },
];

const serviceSchedules = [
  {
    id: "onsite",
    title: "實體課程",
    subtitle: "教室與實體班客服",
    icon: <FaBuilding aria-hidden="true" />,
    channels: [
      {
        type: "phone",
        label: "專線電話",
        rows: [
          ["週一", "12:00–18:00"],
          ["週二至週五", "12:00–21:00"],
          ["週六", "09:30–21:00"],
          ["週日", "09:30–17:00"],
        ],
      },
      {
        type: "line",
        label: "實體課程 LINE（依教室）",
        rows: [["週二至週六", "12:00–21:00"]],
      },
    ],
  },
  {
    id: "online",
    title: "線上課程",
    subtitle: "線上班與遠距學習客服",
    icon: <FaLaptop aria-hidden="true" />,
    channels: [
      {
        type: "phone",
        label: "專線電話",
        rows: [
          ["週一至週五", "13:00–21:00"],
          ["週六、週日", "10:00–17:00"],
        ],
      },
      {
        type: "line",
        label: "線上課程專屬 LINE",
        rows: [
          ["週一至週五", "13:00–21:00"],
          ["週六、週日", "13:00–17:00"],
        ],
      },
    ],
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
  const [lineDirectoryMode, setLineDirectoryMode] = useState<"physical" | "all">("physical");
  const serviceDialogRef = useRef<HTMLDialogElement>(null);
  const serviceHoursTriggerRef = useRef<HTMLButtonElement>(null);
  const lineDialogRef = useRef<HTMLDialogElement>(null);
  const lineDirectoryTriggerRef = useRef<HTMLButtonElement>(null);

  const openServiceHours = () => serviceDialogRef.current?.showModal();
  const closeServiceHours = () => serviceDialogRef.current?.close();
  const openPhysicalLineDirectory = () => {
    setLineDirectoryMode("physical");
    requestAnimationFrame(() => lineDialogRef.current?.showModal());
  };
  const closeLineRouting = () => lineDialogRef.current?.close();
  const openLineDirectoryFromService = (mode: "physical" | "all") => {
    setLineDirectoryMode(mode);
    serviceDialogRef.current?.close();
    requestAnimationFrame(() => lineDialogRef.current?.showModal());
  };

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
              <a className="line-button" href="https://lin.ee/ZAqUzzy" target="_blank" rel="noopener noreferrer" aria-label="加入橘子蘋果官方 LINE @qcr5001z">
                <FaLine aria-hidden="true" />
                <span>官方 LINE 諮詢</span>
              </a>
              <a className="phone-link" href="tel:0277098229" aria-label="撥打電話 (02) 7709-8229">
                <FaPhoneAlt aria-hidden="true" />
                <span>(02) 7709-8229</span>
              </a>
            </div>

            <nav className="footer-tools" aria-label="客服快速連結">
              <button ref={lineDirectoryTriggerRef} type="button" onClick={openPhysicalLineDirectory} aria-haspopup="dialog">
                <FaMapMarkerAlt aria-hidden="true" />
                查找各教室 LINE
              </button>
              <button ref={serviceHoursTriggerRef} type="button" onClick={openServiceHours} aria-haspopup="dialog">
                <FaClock aria-hidden="true" />
                查看客服時間
              </button>
            </nav>

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

        <dialog
          ref={serviceDialogRef}
          className="service-dialog"
          aria-labelledby="service-dialog-title"
          aria-describedby="service-dialog-description"
          onClose={() => serviceHoursTriggerRef.current?.focus()}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeServiceHours();
          }}
        >
          <div className="service-dialog__panel">
            <header className="service-dialog__header">
              <div>
                <span className="service-dialog__eyebrow">SERVICE HOURS</span>
                <h2 id="service-dialog-title">客服服務時間</h2>
                <p id="service-dialog-description">請依課程類型與聯絡方式查看服務時段</p>
              </div>
              <button className="dialog-close" type="button" onClick={closeServiceHours} aria-label="關閉客服服務時間">
                <FaTimes aria-hidden="true" />
              </button>
            </header>

            <div className="service-card-grid">
              {serviceSchedules.map((service) => (
                <section key={service.id} className={`service-card service-card--${service.id}`}>
                  <div className="service-card__heading">
                    <span className="service-card__icon">{service.icon}</span>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.subtitle}</p>
                    </div>
                  </div>

                  <div className="service-card__channels">
                    {service.channels.map((channel) => (
                      <section key={`${service.id}-${channel.type}`} className="service-channel">
                        <h4 className={`service-channel__title service-channel__title--${channel.type}`}>
                          {channel.type === "phone" ? <FaPhoneAlt aria-hidden="true" /> : <FaLine aria-hidden="true" />}
                          {channel.label}
                          {channel.type === "line" && service.id === "online" && <span className="service-channel__badge">線上專用</span>}
                        </h4>
                        <dl className="schedule-list">
                          {channel.rows.map(([days, hours]) => (
                            <div key={`${days}-${hours}`}>
                              <dt>{days}</dt>
                              <dd>{hours}</dd>
                            </div>
                          ))}
                        </dl>
                        {channel.type === "line" && service.id === "onsite" && (
                          <button className="service-channel__action" type="button" onClick={() => openLineDirectoryFromService("physical")}>
                            選擇上課地區 LINE <span aria-hidden="true">→</span>
                          </button>
                        )}
                        {channel.type === "line" && service.id === "online" && (
                          <a className="service-channel__action" href={onlineLine.href} target="_blank" rel="noopener noreferrer">
                            加入 {onlineLine.account} <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </section>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="service-dialog__actions">
              <a className="dialog-action dialog-action--phone" href="tel:0277098229" aria-label="撥打電話 (02) 7709-8229">
                <FaPhoneAlt aria-hidden="true" />
                (02) 7709-8229
              </a>
              <button className="dialog-action dialog-action--line" type="button" onClick={() => openLineDirectoryFromService("all")}>
                <FaLine aria-hidden="true" />
                查找對應 LINE
              </button>
            </div>
          </div>
        </dialog>

        <dialog
          ref={lineDialogRef}
          className="service-dialog line-routing-dialog"
          aria-labelledby="line-dialog-title"
          aria-describedby="line-dialog-description"
          onClose={() => lineDirectoryTriggerRef.current?.focus()}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLineRouting();
          }}
        >
          <div className="service-dialog__panel">
            <header className="service-dialog__header">
              <div>
                <span className="service-dialog__eyebrow">LINE DIRECTORY</span>
                <h2 id="line-dialog-title">{lineDirectoryMode === "physical" ? "查找教室 LINE" : "選擇 LINE 諮詢管道"}</h2>
                <p id="line-dialog-description">
                  {lineDirectoryMode === "physical" ? "請依孩子預計上課的地區選擇" : "依課程類型或上課地區，直接加入正確的客服帳號"}
                </p>
              </div>
              <button className="dialog-close" type="button" onClick={closeLineRouting} aria-label="關閉 LINE 諮詢管道">
                <FaTimes aria-hidden="true" />
              </button>
            </header>

            {lineDirectoryMode === "all" && (
              <a className="online-line-card" href={onlineLine.href} target="_blank" rel="noopener noreferrer">
                <span className="online-line-card__icon"><FaLine aria-hidden="true" /></span>
                <span className="online-line-card__copy">
                  <span><strong>{onlineLine.label}</strong><small>線上專用</small></span>
                  <span>不限地區・{onlineLine.account}</span>
                </span>
                <span className="online-line-card__arrow" aria-hidden="true">→</span>
              </a>
            )}

            <div className="line-route-intro">
              <h3>實體課程 LINE</h3>
              <p>請依孩子預計上課的地區選擇</p>
            </div>

            <div className="line-route-groups">
              {lineGroups.map((group) => (
                <section className="line-route-group" key={group.title}>
                  <h4>{group.title}</h4>
                  <div className="line-route-list">
                    {group.items.map((item) => (
                      <a
                        className="line-route-link"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={`${group.title}-${item.label}`}
                        aria-label={`加入 ${item.label} LINE ${item.account}`}
                      >
                        <FaLine aria-hidden="true" />
                        <span className="line-route-link__copy">
                          <strong>{item.label}</strong>
                          {item.locations && <small>{item.locations}</small>}
                        </span>
                        <span className="line-route-link__account">{item.account}</span>
                        <span className="line-route-link__arrow" aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </dialog>
      </footer>
    </main>
  );
}
