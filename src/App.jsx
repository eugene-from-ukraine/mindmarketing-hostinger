import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  FileChartColumn,
  FileText,
  Flag,
  Mail,
  Menu,
  MessageCircle,
  PanelTop,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CONTACTS = {
  telegram: "https://t.me/digital_eugene",
  phoneHref: "tel:+380972412972",
  phoneLabel: "+380 97 241 29 72",
  emailHref: "mailto:info@mindmarketing.com.ua",
  email: "info@mindmarketing.com.ua",
};

const withBase = (path) => {
  if (!path?.startsWith("/")) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
};

const caseValueData = [
  { label: "Витрати", value: 27261.88, fill: "#11120f" },
  { label: "Дохід", value: 244111.14, fill: "#b9ff2c" },
];

const homepageCaseSlides = [
  {
    label: "GOOGLE ADS · ECOMMERCE",
    title: "Тактичне спорядження",
    metrics: [
      ["895%", "ROAS у найкращий місяць"],
      ["₴27 261", "витрат на рекламу"],
      ["₴244 111", "доходу з реклами"],
      ["60", "зафіксованих конверсій"],
    ],
    bullets: [
      "Оптимізовано товарний фід та атрибути",
      "Налаштовано коректне відстеження доходу в GA4",
      "Запущено Performance Max з фокусом на ROAS",
      "Регулярна оптимізація за товарами та прибутковістю",
    ],
    note:
      "Google Ads став основним джерелом замовлень із сайту. Враховані лише покупки, зафіксовані рекламною аналітикою.",
    href: "/cases/google-ads-tactical-gear",
    linkLabel: "Повний кейс",
    visual: "performance",
  },
  {
    label: "КОМПЛЕКСНИЙ АУДИТ GOOGLE ADS",
    title: "Освітлення та електротовари",
    metrics: [
      ["202/314", "підсумкова оцінка"],
      ["64%", "готовність системи"],
      ["29", "критичних прогалин"],
      ["22", "пункти для покращення"],
    ],
    bullets: [
      "Перевірено Google Ads, GA4, GTM і конверсії",
      "Проаналізовано Merchant Center та товарний фід",
      "Оцінено first-party аудиторії й Smart Bidding",
      "Сформовано пріоритетний план на 90 днів",
    ],
    note:
      "Аудит показав системні обмеження до масштабування та перетворив розрізнені правки на послідовний план розвитку.",
    href: "/cases/google-ads-audit-lighting",
    linkLabel: "Повний кейс аудиту",
    visual: "audit",
  },
];

const mainFaq = [
  {
    q: "Скільки часу потрібно, щоб побачити результат?",
    a: "Перші технічні й структурні покращення зазвичай видно упродовж 2–4 тижнів. Для стабільних висновків щодо прибутковості потрібен повний цикл даних — найчастіше 6–12 тижнів.",
  },
  {
    q: "З якими бюджетами ви працюєте?",
    a: "Фокус — інтернет-магазини з рекламним бюджетом від 30 000 грн на місяць. Такий рівень дає достатньо даних для коректних рішень та оптимізації.",
  },
  {
    q: "Що входить у ведення реклами?",
    a: "Стратегія, структура кампаній, Shopping і Performance Max, Merchant Center, товарний фід, конверсії, аналітика, оптимізація бюджетів і регулярна звітність.",
  },
  {
    q: "Чи працюєте ви з Performance Max?",
    a: "Так. Але PMax запускається не ізольовано: спочатку перевіряються фід, конверсії, бізнес-сигнали, структура акаунта й цілі за прибутковістю.",
  },
  {
    q: "Як відбувається оплата?",
    a: "Умови залежать від формату: разовий аудит, запуск або постійне ведення. Після короткої розмови ви отримуєте чіткий обсяг, строки й вартість.",
  },
  {
    q: "Чи є мінімальний термін співпраці?",
    a: "Для ведення рекомендую щонайменше три місяці: цього достатньо, щоб налаштувати систему, накопичити дані та зробити обґрунтовані висновки.",
  },
];

const auditFaq = [
  {
    q: "Скільки часу триває аудит?",
    a: "До 7 календарних днів після отримання всіх потрібних доступів і короткого брифу.",
  },
  {
    q: "Які доступи потрібні?",
    a: "Режим перегляду в Google Ads, Merchant Center, GA4 і GTM. Якщо частини системи немає — це теж буде зафіксовано у висновках.",
  },
  {
    q: "Чи змінюєте ви щось під час аудиту?",
    a: "Ні. Аудит — це безпечна діагностика без змін в акаунті. Усі рекомендації спочатку потрапляють у документ і план.",
  },
  {
    q: "У якому форматі буде звіт?",
    a: "Структурований документ із доказами, картою втрат, пріоритетами та планом 30/60/90. За потреби проводимо зустріч для розбору.",
  },
  {
    q: "Чи проводить аудит лише Google Ads?",
    a: "Ні. Перевіряю всю систему, від якої залежить реклама: фід, Merchant Center, конверсії, GA4/GTM і якість бізнес-сигналів.",
  },
  {
    q: "Що буде після аудиту?",
    a: "Ви можете впровадити рекомендації самостійно або домовитися зі мною про запуск і постійний супровід.",
  },
];

function Logo() {
  return (
    <a className="logo" href={withBase("/")} aria-label="Mindmarketing — на головну">
      mindmarketing<span>.</span>
    </a>
  );
}

function Header({ auditPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const base = auditPage ? withBase("/") : "";
  const links = [
    ["Послуги", `${base}#services`],
    ["Кейси", `${base}#cases`],
    ["Підхід", `${base}#approach`],
    ["Для кого", `${base}#for-whom`],
    ["Про мене", `${base}#about`],
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Основна навігація">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          {!auditPage && (
            <a href={withBase("/audit-google-ads-ecommerce")} className="nav-audit-link" onClick={() => setMenuOpen(false)}>
              Аудит
            </a>
          )}
          {auditPage ? (
            <a href={withBase("/")} className="mobile-only-link" onClick={() => setMenuOpen(false)}>
              Реклама для магазинів
            </a>
          ) : null}
        </nav>
        <a className="button button-dark header-cta" href="#contact">
          Обговорити рекламу <ArrowRight size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function SectionLabel({ children }) {
  return <div className="section-label">{children}</div>;
}

function ButtonLink({ href, children, dark = false, secondary = false, target }) {
  return (
    <a
      className={`button ${dark ? "button-dark" : ""} ${secondary ? "button-secondary" : ""}`}
      href={withBase(href)}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
    >
      {children}
      <ArrowRight size={17} />
    </a>
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

function MetricRail() {
  return (
    <div className="metric-rail" aria-label="Ключові факти">
      <div>
        <strong>7+</strong>
        <span>років досвіду</span>
      </div>
      <div>
        <strong>50+</strong>
        <span>рекламних акаунтів</span>
      </div>
      <div className="partner-inline">
        <img src={withBase("/assets/google-partner.svg")} alt="Google Partner" />
      </div>
      <div>
        <strong>до 5</strong>
        <span>проєктів у супроводі</span>
      </div>
    </div>
  );
}

function CaseChart({ compact = false, dark = false }) {
  const shouldRender = useMediaQuery(compact ? "(min-width: 1101px)" : "(min-width: 561px)");

  return (
    <div className={`chart-wrap ${compact ? "chart-compact" : ""} ${dark ? "chart-dark" : ""}`}>
      {shouldRender ? (
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={caseValueData} margin={{ top: 14, right: 10, left: compact ? -32 : 8, bottom: 0 }}>
          <CartesianGrid stroke={dark ? "#34362f" : "#d8d5cd"} vertical={false} strokeDasharray="2 2" />
          {!compact && (
            <YAxis
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `${Math.round(value / 1000)} тис.`}
              axisLine={false}
              tickLine={false}
            />
          )}
          <XAxis dataKey="label" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(17,18,15,.04)" }}
            contentStyle={{
              background: dark ? "#11120f" : "#f5f2e9",
              border: `1px solid ${dark ? "#34362f" : "#b8b5ad"}`,
              borderRadius: 0,
              fontFamily: "Manrope",
              fontSize: 12,
            }}
            formatter={(value) => [`₴${Math.round(value).toLocaleString("uk-UA")}`, "Сума"]}
          />
          <Bar dataKey="value" isAnimationActive={false} maxBarSize={compact ? 46 : 72}>
            {caseValueData.map((entry) => (
              <Cell key={entry.label} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

function CaseBarChart({ mobileHidden = false }) {
  const isMobile = useMediaQuery("(max-width: 560px)");

  return (
    <div className="chart-wrap chart-bars">
      {!mobileHidden || !isMobile ? (
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={caseValueData} margin={{ top: 20, right: 16, left: 8, bottom: 6 }}>
          <CartesianGrid stroke="#d8d5cd" vertical={false} strokeDasharray="2 2" />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => `${Math.round(value / 1000)} тис.`}
            axisLine={false}
            tickLine={false}
          />
          <XAxis dataKey="label" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: "rgba(17,18,15,.04)" }}
            contentStyle={{
              background: "#f5f2e9",
              border: "1px solid #b8b5ad",
              borderRadius: 0,
              fontFamily: "Manrope",
              fontSize: 12,
            }}
            formatter={(value) => [`₴${Math.round(value).toLocaleString("uk-UA")}`, "Сума"]}
          />
          <Bar dataKey="value" isAnimationActive={false} maxBarSize={72}>
            {caseValueData.map((entry) => (
              <Cell key={entry.label} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-grid">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : index)}>
              <span>{item.q}</span>
              <ChevronDown size={18} />
            </button>
            <div className="faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FounderBand() {
  return (
    <section className="founder-band" id="about">
      <div className="shell founder-grid">
        <div className="founder-copy">
          <SectionLabel>ПРО МЕНЕ</SectionLabel>
          <h2>Євген Кичурчак</h2>
          <p>
            Google Ads — моя основна спеціалізація з 2017 року. Працюю напряму, без менеджерів і передачі задач, щоб
            бути максимально залученим у результат кожного проєкту.
          </p>
          <div className="founder-stats">
            <div>
              <strong>7+</strong>
              <span>років у Google Ads</span>
            </div>
            <div>
              <strong>50+</strong>
              <span>рекламних акаунтів</span>
            </div>
            <div>
              <strong>до 5</strong>
              <span>проєктів одночасно</span>
            </div>
          </div>
          <a className="text-link inverse" href="https://www.linkedin.com/in/eugenekychurchak/" target="_blank" rel="noreferrer">
            Профіль у LinkedIn <ArrowRight size={15} />
          </a>
        </div>
        <div className="founder-proof">
          <div className="partner-card">
            <img src={withBase("/assets/google-partner.svg")} alt="Google Partner" />
          </div>
          <div>
            <SectionLabel>ПРАЦЮЮ З</SectionLabel>
            <ul>
              <li>Інтернет-магазинами</li>
              <li>E-commerce брендами</li>
              <li>D2C виробниками</li>
              <li>Оптовими компаніями</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand({ audit = false }) {
  return (
    <section className="contact-band" id="contact">
      <div className="shell contact-grid">
        <div>
          <SectionLabel>{audit ? "ГОТОВІ ПОБАЧИТИ ПОВНУ КАРТИНУ?" : "ГОТОВІ ЗРОСТАТИ?"}</SectionLabel>
          <h2>{audit ? "Замовте аудит вашої рекламної системи" : "Обговоримо вашу рекламу та цілі"}</h2>
        </div>
        <div className="contact-methods">
          <a href={CONTACTS.telegram} target="_blank" rel="noreferrer">
            <Send size={20} />
            <span>
              <small>Telegram</small>
              @digital_eugene
            </span>
          </a>
          <a href={CONTACTS.phoneHref}>
            <Phone size={20} />
            <span>
              <small>Телефон</small>
              {CONTACTS.phoneLabel}
            </span>
          </a>
          <a href={CONTACTS.emailHref}>
            <Mail size={20} />
            <span>
              <small>Email</small>
              {CONTACTS.email}
            </span>
          </a>
        </div>
        <ButtonLink href={CONTACTS.telegram} dark target="_blank">
          Написати в Telegram
        </ButtonLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Logo />
        <span>Performance-маркетинг для e-commerce</span>
        <div>
          <a href={withBase("/#cases")}>Кейси</a>
          <a href={withBase("/audit-google-ads-ecommerce")}>Аудит</a>
          <a href={CONTACTS.emailHref}>Контакти</a>
        </div>
        <span>© 2026</span>
      </div>
    </footer>
  );
}

function HomePage() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const caseTouchStart = useRef(null);
  const activeCase = homepageCaseSlides[activeCaseIndex];
  const showCase = (index) => {
    const count = homepageCaseSlides.length;
    setActiveCaseIndex((index + count) % count);
  };

  const system = [
    {
      number: "01",
      icon: Target,
      title: "Кампанії в Google Ads",
      bullets: ["Пошук, Shopping, Performance Max", "Структура, ставки, аудиторії, бюджет", "Фокус на прибутку, а не на кліках"],
    },
    {
      number: "02",
      icon: PanelTop,
      title: "Merchant Center & feed",
      bullets: ["Оптимізація оцінки під вимоги Google", "Атрибути, GTIN, категорії, зображення", "Більше показів — вищий потенціал продажів"],
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Конверсійна вимірюваність",
      bullets: ["GA4 + Enhanced Conversions", "Точне відстеження доходу та маржі", "Правильні сигнали для алгоритмів"],
    },
    {
      number: "04",
      icon: RefreshCw,
      title: "Постійна оптимізація",
      bullets: ["Аналіз даних та інсайтів", "Перерозподіл бюджетів", "Тести креативів, фіду та структури"],
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <SectionLabel>GOOGLE ADS · SHOPPING · PERFORMANCE MAX</SectionLabel>
              <h1>Реклама в Google для інтернет-магазинів — від кліку до оплаченого замовлення</h1>
              <p>
                Налаштовую та веду Google Ads, Merchant Center, товарний фід і аналітику як одну систему. Щоб реклама
                отримувала коректні сигнали, а ви розуміли, які товари, кампанії та бюджети створюють реальні продажі.
              </p>
              <div className="hero-actions">
                <ButtonLink href="#contact">Обговорити рекламу</ButtonLink>
                <ButtonLink href="#cases" secondary>
                  Переглянути кейси
                </ButtonLink>
              </div>
              <MetricRail />
            </div>
            <div className="hero-case" aria-label="Кейс магазину тактичного спорядження">
              <div className="case-topline">
                <SectionLabel>КЕЙС</SectionLabel>
                <span>Тактичне спорядження</span>
              </div>
              <div className="case-metrics">
                <div className="roas-block">
                  <strong>895%</strong>
                  <span>ROAS у найкращий місяць</span>
                </div>
                <div>
                  <strong>₴27 261</strong>
                  <span>витрат на рекламу</span>
                </div>
                <div>
                  <strong>₴244 111</strong>
                  <span>доходу з реклами</span>
                </div>
              </div>
              <div className="case-chart-title">ВИТРАТИ ТА ДОХІД У НАЙКРАЩИЙ МІСЯЦЬ</div>
              <CaseChart />
              <p className="case-note">Окремий результат конкретного проєкту, а не гарантія майбутніх показників.</p>
            </div>
          </div>
        </section>

        <section className="problem-section" id="for-whom">
          <div className="shell problem-grid">
            <div>
              <SectionLabel>У БАГАТЬОХ МАГАЗИНІВ СХОЖА ПРОБЛЕМА</SectionLabel>
              <h2>Кліки є. Але чи бачить Google реальні продажі?</h2>
            </div>
            <div className="problem-copy">
              <p>
                Без правильної системи даних реклама працює навпомацки. Алгоритми отримують хибні сигнали, бюджет
                витрачається неефективно, а ви не маєте чіткої картини, що насправді продається і приносить прибуток.
              </p>
              <ul className="lime-list">
                <li>Конверсії не налаштовані або дублюються</li>
                <li>Товарний фід має помилки та втрачає покази</li>
                <li>Merchant Center працює нестабільно</li>
                <li>Немає зрозумілої аналітики та окупності</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="system-section" id="services">
          <div className="shell">
            <SectionLabel>МОЯ СИСТЕМА РОБОТИ</SectionLabel>
            <h2>Одна система. Чотири опори зростання продажів</h2>
            <div className="system-grid">
              {system.map(({ number, icon: Icon, title, bullets }) => (
                <article className="system-column" key={title}>
                  <span className="system-number">{number}</span>
                  <Icon size={32} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <ul>
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="system-result">
              <Sparkles size={20} aria-hidden="true" />
              <p>Результат: алгоритми бачать реальні продажі → витрати працюють ефективніше → зростає прибуток.</p>
            </div>
          </div>
        </section>

        <section className="formats-section" id="approach">
          <div className="shell">
            <SectionLabel>ФОРМАТИ СПІВПРАЦІ</SectionLabel>
            <h2>Оберіть формат, який підходить зараз</h2>
            <div className="formats-grid">
              <article>
                <MessageCircle size={28} strokeWidth={1.5} />
                <h3>Супровід реклами</h3>
                <p>Повний цикл ведення реклами та аналітики під результат. Основний формат співпраці.</p>
                <a className="text-link" href="#contact">
                  Обговорити <ArrowRight size={15} />
                </a>
              </article>
              <article>
                <CircleDot size={28} strokeWidth={1.5} />
                <h3>Разовий аудит</h3>
                <p>Глибока діагностика системи та план зростання до 7 днів.</p>
                <a className="text-link" href={withBase("/audit-google-ads-ecommerce")}>
                  Детальніше <ArrowRight size={15} />
                </a>
              </article>
              <article>
                <ClipboardCheck size={28} strokeWidth={1.5} />
                <h3>Запуск або консультація</h3>
                <p>Рішення конкретних питань або запуск нової рекламної системи.</p>
                <a className="text-link" href="#contact">
                  Обговорити <ArrowRight size={15} />
                </a>
              </article>
              <div className="format-chart">
                <CaseChart compact />
              </div>
            </div>
          </div>
        </section>

        <section className="featured-case" id="cases">
          <div className="shell">
            <div className="cases-slider-heading">
              <div>
                <SectionLabel>РЕЗУЛЬТАТИ НА ПРАКТИЦІ</SectionLabel>
                <h2>Кейси eCommerce</h2>
              </div>
              <div className="cases-slider-controls" aria-label="Навігація між кейсами">
                <span>
                  <strong>{String(activeCaseIndex + 1).padStart(2, "0")}</strong> /{" "}
                  {String(homepageCaseSlides.length).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => showCase(activeCaseIndex - 1)} aria-label="Попередній кейс">
                  <ArrowLeft size={20} />
                </button>
                <button type="button" onClick={() => showCase(activeCaseIndex + 1)} aria-label="Наступний кейс">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div
              className="case-slider"
              tabIndex={0}
              aria-label="Слайдер кейсів"
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") showCase(activeCaseIndex - 1);
                if (event.key === "ArrowRight") showCase(activeCaseIndex + 1);
              }}
              onTouchStart={(event) => {
                caseTouchStart.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                if (caseTouchStart.current === null) return;
                const distance = event.changedTouches[0].clientX - caseTouchStart.current;
                if (Math.abs(distance) > 48) showCase(activeCaseIndex + (distance < 0 ? 1 : -1));
                caseTouchStart.current = null;
              }}
            >
              <article className="case-slide" key={activeCase.href} aria-live="polite">
                <div className="case-summary">
                  <SectionLabel>{activeCase.label}</SectionLabel>
                  <h3>{activeCase.title}</h3>
                  <div className="stacked-metrics">
                    {activeCase.metrics.map(([value, label]) => (
                      <div key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="case-details">
                  <ul className="checked-list">
                    {activeCase.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <p className="case-brief">{activeCase.note}</p>
                  <a className="text-link" href={withBase(activeCase.href)}>
                    {activeCase.linkLabel} <ArrowRight size={15} />
                  </a>
                </div>

                {activeCase.visual === "performance" ? (
                  <div className="case-chart-large slider-case-visual">
                    <CaseBarChart mobileHidden />
                  </div>
                ) : (
                  <div className="slider-case-visual audit-case-visual" aria-label="Результати аудиту">
                    <span>АУДИТ-ОЦІНКА</span>
                    <strong>
                      202<span>/314</span>
                    </strong>
                    <em>64%</em>
                    <div>
                      <p>
                        <b>29</b> критичних прогалин
                      </p>
                      <p>
                        <b>22</b> пункти для покращення
                      </p>
                    </div>
                  </div>
                )}
              </article>
            </div>

            <div className="case-slider-dots" aria-label="Вибір кейсу">
              {homepageCaseSlides.map((caseItem, index) => (
                <button
                  type="button"
                  key={caseItem.href}
                  className={index === activeCaseIndex ? "active" : ""}
                  onClick={() => showCase(index)}
                  aria-label={`Показати кейс ${index + 1}: ${caseItem.title}`}
                  aria-current={index === activeCaseIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="shell">
            <SectionLabel>ПРОЦЕС РОБОТИ</SectionLabel>
            <h2>Як ми працюємо разом</h2>
            <div className="process-grid" tabIndex={0} aria-label="П’ять етапів роботи. На телефоні прокручуйте горизонтально.">
              {[
                ["01", "Знайомство та аналіз", "Обговорюємо цілі, бізнес та поточну ситуацію. Аналізую дані."],
                ["02", "Аудит та план", "Проводжу аудит системи та формую план дій і пріоритетів."],
                ["03", "Налаштування", "Налаштовую кампанії, фід, конверсії та аналітику."],
                ["04", "Оптимізація", "Постійно аналізую дані, тестую та покращую результати."],
                ["05", "Звітність та рішення", "Прозорі звіти та спільні рішення для зростання продажів."],
              ].map(([number, title, copy]) => (
                <article key={number}>
                  <div className="process-number">
                    <strong>{number}</strong>
                    <ArrowRight size={18} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="audit-promo">
          <div className="shell audit-promo-grid">
            <div>
              <SectionLabel>РАЗОВА ПОСЛУГА</SectionLabel>
              <h2>Системний аудит за 7 днів</h2>
              <ul className="lime-list">
                <li>Перевірка рекламних акаунтів та налаштувань</li>
                <li>Аналіз Merchant Center та товарного фіду</li>
                <li>Карта втрат та точки зростання</li>
                <li>Пріоритети та план на 30/60/90 днів</li>
              </ul>
              <div className="audit-price-row">
                <strong>від $100</strong>
                <ButtonLink href="/audit-google-ads-ecommerce">Замовити аудит</ButtonLink>
              </div>
            </div>
            <img src={withBase("/assets/audit-report-stack.png")} alt="Приклад документів системного аудиту Google Ads" />
          </div>
        </section>

        <FounderBand />

        <section className="faq-section">
          <div className="shell">
            <SectionLabel>ПОШИРЕНІ ЗАПИТАННЯ</SectionLabel>
            <h2>Відповіді на часті питання</h2>
            <Faq items={mainFaq} />
          </div>
        </section>
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

function CaseStudyPage({ type }) {
  const isAudit = type === "audit";

  useEffect(() => {
    document.title = isAudit
      ? "Кейс аудиту Google Ads для магазину освітлення | Mindmarketing"
      : "Кейс Google Ads для магазину тактичного спорядження | Mindmarketing";
  }, [isAudit]);

  const tacticalMetrics = [
    ["895%", "ROAS у найкращий місяць"],
    ["₴27 261,88", "витрати на рекламу"],
    ["₴244 111,14", "дохід із реклами"],
    ["60", "зафіксованих конверсій"],
  ];

  const auditMetrics = [
    ["202/314", "підсумкова оцінка"],
    ["64%", "готовність рекламної системи"],
    ["29", "критичних прогалин"],
    ["22", "пункти для покращення"],
  ];

  const auditFindings = [
    {
      number: "01",
      title: "Дані та трекінг",
      text: "GA4 і Google tag передавали сигнал покупки неузгоджено. Це могло давати Smart Bidding суперечливі дані.",
      action:
        "Google tag purchase — Primary; імпорт GA4 purchase — Secondary. Наступний етап — server-side tracking і передача цінності нових клієнтів.",
    },
    {
      number: "02",
      title: "Товарний фід",
      text: "Бракувало GTIN, брендів, частини товарних атрибутів, коректної структури категорій та якісних зображень.",
      action:
        "Додати GTIN і brand, структурувати product_type та google_product_category, покращити назви, описи й зображення.",
    },
    {
      number: "03",
      title: "First-party аудиторії",
      text: "Customer Match, ремаркетинг і сегменти реальних клієнтів майже не використовувалися в кампаніях.",
      action:
        "Створити сегменти переглядів, кошика, покупців і повторних клієнтів та передати їх у релевантні кампанії.",
    },
    {
      number: "04",
      title: "Бізнес-цілі для ставок",
      text: "Цільові CPA та ROAS не були зафіксовані, тому кампанії не могли системно оптимізуватися під потрібну прибутковість.",
      action: "Розрахувати цільові показники з урахуванням маржі та підключати Target ROAS/CPA після стабілізації даних.",
    },
    {
      number: "05",
      title: "Посадкові сторінки",
      text: "На сторінках бракувало соціальних доказів, FAQ, гарантій і відповідей на типові заперечення покупців.",
      action: "Посилити довіру: відгуки, доставка й повернення, FAQ, переваги товарів і зрозумілі заклики до дії.",
    },
  ];

  const auditRoadmap = [
    ["Тижні 1–2", "Конверсії, сезонність, аналітика нових і повторних клієнтів", "Коректні сигнали для оптимізації"],
    ["Тижні 2–4", "Target ROAS/CPA, server-side tracking, ремаркетинг", "Робота кампаній під бізнес-цілі"],
    ["Тижні 4–6", "Product Ratings, Shop Quality, аудиторні сигнали", "Вищий CTR і якісніший трафік"],
    ["Тижні 6–10", "Посадкові сторінки, офлайн-дані, customer value", "Краща конверсія та оцінка цінності клієнта"],
  ];

  return (
    <>
      <Header auditPage />
      <main className="case-study-page">
        <section className="case-study-hero">
          <div className="shell">
            <a className="case-back-link" href={withBase("/#cases")}>
              ← Усі кейси
            </a>
            <div className="case-study-hero-grid">
              <div>
                <SectionLabel>{isAudit ? "КОМПЛЕКСНИЙ АУДИТ GOOGLE ADS" : "GOOGLE ADS · ECOMMERCE"}</SectionLabel>
                <h1>
                  {isAudit
                    ? "Як аудит виявив 29 критичних прогалин у рекламній системі"
                    : "Google Ads з нуля для магазину тактичного спорядження"}
                </h1>
                <p>
                  {isAudit
                    ? "Магазин освітлення вже мав рекламу та продажі, але система не була готова до контрольованого масштабування. Перевірили не окрему кампанію, а весь шлях даних — від фіду й конверсій до ставок і посадкових сторінок."
                    : "Запустили рекламу без попередньої історії в акаунті та побудували керований канал продажів: аналітика, конверсії, товарний фід, Shopping, Performance Max і регулярна оптимізація."}
                </p>
                <div className="case-study-meta">
                  <span>{isAudit ? "Ніша: освітлення та електротовари" : "Ніша: тактичне спорядження"}</span>
                  <span>{isAudit ? "Період: травень–червень 2026" : "Середній бюджет: 35 000 грн/міс без ПДВ"}</span>
                  <span>Клієнт анонімізований</span>
                </div>
              </div>
              <div className="case-study-score">
                <span>{isAudit ? "АУДИТ-ОЦІНКА" : "НАЙКРАЩИЙ МІСЯЦЬ"}</span>
                <strong>{isAudit ? "64%" : "895%"}</strong>
                <p>{isAudit ? "202 із 314 балів" : "повернення рекламних витрат"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study-metrics">
          <div className="shell case-study-metrics-grid">
            {(isAudit ? auditMetrics : tacticalMetrics).map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {isAudit ? (
          <>
            <section className="case-study-intro">
              <div className="shell case-study-two-columns">
                <div>
                  <SectionLabel>ЗАДАЧА</SectionLabel>
                  <h2>Знайти системні обмеження до масштабування</h2>
                </div>
                <div className="case-study-body">
                  <p>
                    Реклама працювала, але частково некоректні конверсійні сигнали, слабкий фід, відсутність повноцінної
                    роботи з first-party аудиторіями та незафіксовані бізнес-цілі стримували ефективність.
                  </p>
                  <ul className="checked-list">
                    <li>Google Ads і структура кампаній</li>
                    <li>GA4, GTM, конверсії та атрибуція</li>
                    <li>Merchant Center і товарний фід</li>
                    <li>Аудиторії, ремаркетинг і Customer Match</li>
                    <li>Посадкові сторінки та юніт-економіка</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="case-findings">
              <div className="shell">
                <SectionLabel>КЛЮЧОВІ ВИСНОВКИ</SectionLabel>
                <h2>Що саме стримувало рекламну систему</h2>
                <div className="case-findings-list">
                  {auditFindings.map((finding) => (
                    <article key={finding.number}>
                      <span className="finding-number">{finding.number}</span>
                      <h3>{finding.title}</h3>
                      <p>{finding.text}</p>
                      <div>
                        <strong>Рекомендація</strong>
                        <p>{finding.action}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="case-implemented">
              <div className="shell case-study-two-columns">
                <div>
                  <SectionLabel>ПЕРШИЙ ЕТАП</SectionLabel>
                  <h2>Що вже виправлено після аудиту</h2>
                </div>
                <ul className="checked-list">
                  <li>Google tag purchase встановлено як Primary-конверсію</li>
                  <li>GA4 purchase переведено в Secondary</li>
                  <li>Налаштовано імпорт даних кошика в конверсії</li>
                  <li>Додано GTIN, brand, атрибути та структуру категорій у фід</li>
                  <li>Оптимізовано зображення, назви й описи товарів</li>
                  <li>Завантажено Customer Match і оформлено Merchant Center</li>
                </ul>
              </div>
            </section>

            <section className="case-roadmap">
              <div className="shell">
                <SectionLabel>ПЛАН НА 90 ДНІВ</SectionLabel>
                <h2>Пріоритети після аудиту</h2>
                <div className="case-roadmap-table">
                  <div className="case-roadmap-head">
                    <span>Етап</span>
                    <span>Фокус</span>
                    <span>Очікуваний ефект</span>
                  </div>
                  {auditRoadmap.map(([stage, focus, impact]) => (
                    <div className="case-roadmap-row" key={stage}>
                      <strong>{stage}</strong>
                      <span>{focus}</span>
                      <span>{impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="case-result">
              <div className="shell case-result-grid">
                <SectionLabel>РЕЗУЛЬТАТ РОБОТИ</SectionLabel>
                <h2>Не перелік правок, а керована система розвитку</h2>
                <p>
                  Магазин отримав пріоритизований план: що виправляти першим, який очікуваний ефект і як оцінювати
                  результат. Це створило основу для масштабування бюджету без втрати контролю над ефективністю.
                </p>
                <ButtonLink href="/audit-google-ads-ecommerce">Замовити аудит</ButtonLink>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="case-study-intro">
              <div className="shell case-study-two-columns">
                <div>
                  <SectionLabel>ЗАДАЧА</SectionLabel>
                  <h2>Перетворити новий рекламний акаунт на канал продажів</h2>
                </div>
                <div className="case-study-body">
                  <p>
                    До старту не було історії Google Ads. Тому почали не з масштабування, а з фундаменту: правильних
                    конверсій, аналітики, фіду та структури кампаній.
                  </p>
                  <ul className="checked-list">
                    <li>Запустити Google Ads для eCommerce з нуля</li>
                    <li>Налаштувати покупки та ключові події</li>
                    <li>Підготувати фід для Shopping і Performance Max</li>
                    <li>Оптимізувати рекламу за продажами, а не трафіком</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="case-work">
              <div className="shell">
                <SectionLabel>ЩО ЗРОБИЛИ</SectionLabel>
                <h2>Три рівні рекламної системи</h2>
                <div className="case-work-grid">
                  {[
                    [
                      "01",
                      "Аналітика та відстеження",
                      ["Налаштували GA4 і Consent Mode", "Передали конверсії та ключові події через GTM", "Додали Facebook Pixel для додаткової аналітики"],
                    ],
                    [
                      "02",
                      "Google Ads",
                      ["Запустили пошукові й товарні кампанії", "Підключили Performance Max", "Налаштували динамічний ремаркетинг"],
                    ],
                    [
                      "03",
                      "eCommerce-основа",
                      ["Опрацювали товарний фід", "Аналізували запити, товари й аудиторії", "Пов’язали звітність із доходом"],
                    ],
                  ].map(([number, title, items]) => (
                    <article key={number}>
                      <span>{number}</span>
                      <h3>{title}</h3>
                      <ul>
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="case-proof">
              <div className="shell case-proof-grid">
                <div>
                  <SectionLabel>ПІДТВЕРДЖЕНІ ДАНІ</SectionLabel>
                  <h2>Витрати та дохід у найкращий місяць</h2>
                  <p>
                    Усі суми взяті з рекламної аналітики. Телефонні замовлення не відстежувалися, тому фактичний вплив
                    Google Ads міг бути вищим.
                  </p>
                </div>
                <CaseBarChart />
              </div>
            </section>

            <section className="case-result">
              <div className="shell case-result-grid">
                <SectionLabel>РЕЗУЛЬТАТ ДЛЯ БІЗНЕСУ</SectionLabel>
                <h2>Google Ads став основним джерелом замовлень із сайту</h2>
                <p>
                  Клієнт отримав не набір окремих кампаній, а керовану систему з аналітикою, фідом, структурою,
                  регулярною оптимізацією та зрозумілою звітністю.
                </p>
                <ButtonLink href="#contact">Обговорити рекламу</ButtonLink>
              </div>
            </section>
          </>
        )}

        <section className="case-disclaimer">
          <div className="shell">
            <p>
              Результати конкретного проєкту не є гарантією аналогічних показників. Ефективність залежить від ніші,
              асортименту, маржі, сайту, бюджету, попиту та якості даних.
            </p>
          </div>
        </section>

        <ContactBand audit={isAudit} />
      </main>
      <Footer />
    </>
  );
}

function AuditPage() {
  const checks = [
    {
      icon: Target,
      title: "Кампанії та PMax",
      bullets: ["Структура акаунта і типи кампаній", "Налаштування PMax і feed-only", "Сигнали аудиторій та стратегії ставок"],
    },
    {
      icon: PanelTop,
      title: "Merchant Center і товарний фід",
      bullets: ["Статус акаунта Merchant Center", "Якість атрибутів і категорій", "Відповідність політикам Google"],
    },
    {
      icon: BarChart3,
      title: "Конверсії та аналітика",
      bullets: ["GA4, GTM і передача покупок", "Точність revenue та Enhanced Conversions", "Події, тригери й дублікати"],
    },
    {
      icon: RefreshCw,
      title: "Бюджет, структура й бізнес-сигнали",
      bullets: ["Розподіл бюджету та пріоритети", "Сегментація товарів і маржинальність", "Лендінги, офери та сигнали"],
    },
  ];

  return (
    <>
      <Header auditPage />
      <main className="audit-page">
        <section className="audit-hero">
          <div className="shell audit-hero-grid">
            <div>
              <SectionLabel>СИСТЕМНИЙ АУДИТ GOOGLE ADS ДЛЯ E-COMMERCE</SectionLabel>
              <h1>Знайдемо, де реклама втрачає гроші — і що виправити першочергово</h1>
              <p>
                За 7 днів перевірю кампанії, Merchant Center, товарний фід, конверсії та аналітику. Ви отримаєте
                документ із висновками, картою втрат, пріоритетами й планом дій на 30/60/90 днів.
              </p>
              <div className="hero-actions">
                <ButtonLink href="#contact">Замовити аудит</ButtonLink>
                <strong className="price-inline">від $100</strong>
              </div>
              <div className="audit-facts">
                <div>
                  <ClipboardCheck size={23} />
                  <span>
                    <strong>до 7 днів</strong>
                    термін виконання
                  </span>
                </div>
                <div>
                  <FileText size={23} />
                  <span>
                    <strong>документ + план</strong>
                    чіткі висновки та кроки
                  </span>
                </div>
                <div>
                  <MessageCircle size={23} />
                  <span>
                    <strong>зустріч за потреби</strong>
                    розбір результатів
                  </span>
                </div>
              </div>
            </div>
            <img src={withBase("/assets/audit-report-stack.png")} alt="Документи аудиту Google Ads для e-commerce" />
          </div>
        </section>

        <section className="audit-fit">
          <div className="shell">
            <h2>Кому підійде аудит</h2>
            <div className="fit-grid">
              {[
                "Інтернет-магазинам на Shopify, OpenCart, WooCommerce, Prom, Хорошоп та інших платформах",
                "Є витрати на рекламу в Google Ads від ₴30 000 на місяць",
                "Є товари в Merchant Center і ви вже рекламуєтеся у Google",
                "Хочете зрозуміти, чому реклама не масштабується і де саме губиться прибуток",
              ].map((text) => (
                <div key={text}>
                  <Check size={18} />
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="audit-checks">
          <div className="shell">
            <h2>Що саме перевіряю</h2>
            <div className="system-grid">
              {checks.map(({ icon: Icon, title, bullets }) => (
                <article className="system-column" key={title}>
                  <Icon size={32} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <ul>
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="deliverables">
          <div className="shell">
            <h2>Що ви отримаєте</h2>
            <div className="deliverables-grid">
              {[
                [FileText, "Документ з висновками", "Структурований аудит у PDF або Google Docs із чіткими знахідками та поясненнями."],
                [FileChartColumn, "Карта втрат", "Де зараз губляться гроші та які проблеми мають найбільший фінансовий вплив."],
                [Flag, "Пріоритети та рішення", "Список конкретних змін: що виправити спочатку, а що може зачекати."],
                [BarChart3, "План дій на 30/60/90 днів", "Покроковий план з очікуваним ефектом, метриками й пріоритетами."],
              ].map(([Icon, title, copy]) => (
                <article key={title}>
                  <Icon size={28} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="audit-evidence" id="audit-case">
          <div className="shell">
            <h2>Приклад результату аудиту</h2>
            <p className="section-intro">Інтернет-магазин освітлення</p>
            <div className="audit-score-grid">
              <div className="score-main">
                <SectionLabel>АУДИТ-ОЦІНКА</SectionLabel>
                <strong>202<span>/314</span></strong>
                <em>64%</em>
                <p>загальний рівень ефективності акаунта Google Ads</p>
              </div>
              <div className="score-stat critical">
                <strong>29</strong>
                <span>критичних прогалин</span>
                <p>Проблеми, які прямо зараз впливають на витрати та конверсії.</p>
              </div>
              <div className="score-stat improve">
                <strong>22</strong>
                <span>пункти для покращення</span>
                <p>Можливості для зростання кампаній, фіду, таргетингу й ставок.</p>
              </div>
              <div className="score-link">
                <FileChartColumn size={42} strokeWidth={1.2} />
                <a
                  className="text-link"
                  href={withBase("/cases/google-ads-audit-lighting")}
                >
                  Деталі кейсу <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="audit-process">
          <div className="shell">
            <h2>Як проходить аудит</h2>
            <div className="process-grid process-four">
              {[
                ["01", "Бриф та доступи", "Короткий бриф і доступи до Ads, Merchant Center, GA4 та GTM."],
                ["02", "Аналіз і перевірка", "Глибоко аналізую всі джерела даних і рекламну систему."],
                ["03", "Документ та план", "Готую звіт, карту втрат, пріоритети й план 30/60/90."],
                ["04", "Презентація", "Обговорюємо результати й відповіді на запитання за потреби."],
              ].map(([number, title, copy]) => (
                <article key={number}>
                  <div className="process-number">
                    <strong>{number}</strong>
                    <ArrowRight size={18} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="after-audit">
          <div className="shell">
            <h2>Що далі після аудиту?</h2>
            <div className="after-grid">
              <article>
                <CheckCircle2 size={34} strokeWidth={1.5} />
                <div>
                  <h3>Впровадити самостійно</h3>
                  <p>Ви отримуєте зрозумілий план і всі рекомендації, щоб ваша команда чи фрилансер могли реалізувати зміни.</p>
                </div>
              </article>
              <article>
                <MessageCircle size={34} strokeWidth={1.5} />
                <div>
                  <h3>Домовитися про супровід</h3>
                  <p>Реалізую пріоритетні зміни та веду рекламу на системній основі з прозорою звітністю та KPI.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <FounderBand />

        <section className="faq-section">
          <div className="shell">
            <SectionLabel>ПОШИРЕНІ ЗАПИТАННЯ</SectionLabel>
            <h2>Відповіді на часті питання</h2>
            <Faq items={auditFaq} />
          </div>
        </section>

        <ContactBand audit />
      </main>
      <Footer />
    </>
  );
}

export function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const browserPath = basePath && window.location.pathname.startsWith(basePath)
    ? window.location.pathname.slice(basePath.length) || "/"
    : window.location.pathname;
  const path = browserPath.replace(/\/+$/, "") || "/";
  if (path === "/audit-google-ads-ecommerce") return <AuditPage />;
  if (path === "/cases/google-ads-tactical-gear") return <CaseStudyPage type="tactical" />;
  if (path === "/cases/google-ads-audit-lighting") return <CaseStudyPage type="audit" />;
  return <HomePage />;
}
