/* eslint-disable @next/next/no-html-link-for-pages */
import BriefForm from "./brief-form";
import { articles } from "./blog/articles";

const services = [
  {
    short: "Аудит Google Ads",
    title: "Аудит, після якого зрозуміло, що робити",
    text: "Перевіряю структуру, ставки, пошукові запити, PMax, Shopping, фід, конверсії та розподіл бюджету. На виході — пріоритетний план дій, а не список дрібних зауважень.",
    result: "Карта втрат → точки росту → план на 30/60/90 днів",
  },
  {
    short: "Кампанії та супровід",
    title: "Google Ads як керована система продажів",
    text: "Налаштовую або перебудовую Search, Shopping і Performance Max. Керую бюджетом, тестами, запитами та товарними групами з фокусом на бізнес-результат.",
    result: "Стратегія → запуск → оптимізація → масштабування",
  },
  {
    short: "Якісні сигнали",
    title: "Алгоритми навчаються на правильних даних",
    text: "Будую передачу покупок, вартості, прибутку, статусів замовлень та enhanced conversions через GA4, GTM, CRM і офлайн-конверсії.",
    result: "Менше шуму в даних. Більше сигналів, що ведуть до прибутку",
  },
  {
    short: "Merchant Center",
    title: "Повертаю товари в Google Shopping",
    text: "Діагностую причину блокування, перевіряю сайт, політики, фід і бізнес-дані, формую технічне завдання та супроводжую повторну перевірку.",
    result: "Причина → виправлення → повторна перевірка",
  },
  {
    short: "Аналітика e-commerce",
    title: "Цифри, з яких можна ухвалювати рішення",
    text: "Зводжу рекламу, GA4, замовлення та маржу в зрозумілу систему. Показую не просто ROAS, а де бізнес заробляє, втрачає і може масштабуватися.",
    result: "Єдині метрики → прозорий звіт → рішення",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a className="wordmark" href="#top" aria-label="mindmarketing — на головну">
          mindmarketing<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Головна навігація">
          <a href="#services">Послуги</a>
          <a href="#approach">Підхід</a>
          <a href="#fit">Для кого</a>
          <a href="/blog">Блог</a>
        </nav>
        <a className="header-cta" href="#contact">
          Обговорити проєкт <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Performance-маркетинг для e-commerce</p>
          <h1>
            Google Ads,<br />
            що працює на даних — <em>не на здогадках.</em>
          </h1>
          <p className="hero-lead">
            Будую прибуткові рекламні системи для інтернет-магазинів: від
            аудиту й точних сигналів до аналітики та масштабування.
          </p>
          <div className="hero-actions">
            <a className="button button-lime" href="#contact">
              Отримати аудит <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#services">
              Переглянути послуги <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="solo-note"><span>✦</span> Соло-експертиза. Пряма робота зі спеціалістом.</p>
        </div>

        <div className="signal-art" aria-label="Схема маркетингової системи: від даних до рішень">
          <div className="art-grid" aria-hidden="true" />
          <div className="metric-label">
            <span>01</span>
            <small>signal system</small>
            <strong>5 → 1</strong>
            <small>п’ять напрямів · одна система</small>
          </div>
          <div className="lime-signal" aria-hidden="true" />
          <div className="signal-line line-a" aria-hidden="true" />
          <div className="signal-line line-b" aria-hidden="true" />
          <div className="signal-line line-c" aria-hidden="true" />
          <div className="node node-a" aria-hidden="true" />
          <div className="node node-b" aria-hidden="true" />
          <div className="node node-c" aria-hidden="true" />
          <div className="node node-d" aria-hidden="true" />
          <div className="signal-caption cap-a">DATA</div>
          <div className="signal-caption cap-b">SIGNALS</div>
          <div className="signal-caption cap-c">DECISIONS</div>
        </div>
      </section>

      <section className="service-rail shell" id="services" aria-label="Послуги mindmarketing">
        {services.map((service, index) => (
          <a href={`#service-${index + 1}`} key={service.short}>
            <span>0{index + 1}</span>
            {service.short}
          </a>
        ))}
      </section>

      <section className="diagnosis shell section-pad">
        <div className="section-kicker">Не проблема реклами. Проблема системи.</div>
        <div className="diagnosis-grid">
          <h2>Коли Google бачить шум, бізнес платить за нього.</h2>
          <div className="diagnosis-copy">
            <p>
              Кампанії можуть виглядати активними, ROAS — прийнятним, а звіт —
              переконливим. Але якщо конверсії дублюються, прибуток не
              передається, фід містить помилки, а бюджети розподілені без
              пріоритетів — алгоритм оптимізує не те, що важливо бізнесу.
            </p>
            <div className="symptom-list">
              <span>Бюджет витрачається, а причина змін неясна</span>
              <span>GA4, Ads і CRM показують різні цифри</span>
              <span>PMax масштабує обсяг, але не прибуток</span>
              <span>Merchant Center зупинив товарну рекламу</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section shell section-pad" aria-labelledby="services-title">
        <div className="section-heading">
          <div>
            <p className="section-number">02 / Послуги</p>
            <h2 id="services-title">П’ять напрямів.<br />Одна логіка росту.</h2>
          </div>
          <p>Кожна послуга вирішує окреме завдання. Разом вони створюють систему, в якій реклама отримує якісні дані, а бізнес — зрозумілі рішення.</p>
        </div>
        <div className="services-list">
          {services.map((service, index) => (
            <article className="service-row" id={`service-${index + 1}`} key={service.short}>
              <span className="service-index">0{index + 1}</span>
              <div>
                <p className="service-label">{service.short}</p>
                <h3>{service.title}</h3>
              </div>
              <div className="service-detail">
                <p>{service.text}</p>
                <strong>{service.result}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach" id="approach">
        <div className="shell section-pad">
          <div className="approach-head">
            <p className="section-number">03 / Підхід</p>
            <h2>Від рекламного кабінету — до цілісної performance-системи.</h2>
          </div>
          <div className="approach-grid">
            <article><span>01</span><h3>Діагностую</h3><p>Знаходжу реальне вузьке місце: кампанії, дані, сайт, фід чи економіка.</p></article>
            <article><span>02</span><h3>Проєктую</h3><p>Формую архітектуру кампаній, вимірювання та пріоритетів до початку змін.</p></article>
            <article><span>03</span><h3>Впроваджую</h3><p>Налаштовую рекламу й передачу сигналів без хаотичних експериментів.</p></article>
            <article><span>04</span><h3>Покращую</h3><p>Перевіряю гіпотези, пояснюю зміни та масштабую те, що створює прибуток.</p></article>
          </div>
          <div className="signal-flow" aria-label="Процес роботи">
            <span>Бізнес-ціль</span><i>→</i><span>Дані</span><i>→</i><span>Сигнали</span><i>→</i><span>Google Ads</span><i>→</i><span>Продажі</span>
          </div>
        </div>
      </section>

      <section className="fit shell section-pad" id="fit">
        <div className="fit-title">
          <p className="section-number">04 / Для кого</p>
          <h2>mindmarketing підходить, якщо ви хочете керувати зростанням, а не спостерігати за звітами.</h2>
        </div>
        <div className="fit-grid">
          <div><span>✓</span><p>Інтернет-магазин уже інвестує в Google Ads і хоче підвищити якість результату.</p></div>
          <div><span>✓</span><p>Потрібна прозора аналітика від рекламного кліку до реального замовлення.</p></div>
          <div><span>✓</span><p>Ви готуєтесь масштабувати бюджет і хочете спершу навести лад у даних.</p></div>
          <div><span>✓</span><p>Merchant Center заблоковано або товари регулярно відхиляються.</p></div>
        </div>
      </section>

      <section className="solo shell section-pad">
        <div className="solo-mark" aria-hidden="true">m.</div>
        <div className="solo-copy">
          <p className="section-number">05 / Соло-агенція</p>
          <h2>Експертиза агенції.<br />Контакт напряму.</h2>
          <p>Ви працюєте безпосередньо зі спеціалістом, який аналізує, налаштовує й відповідає за логіку рішень. Без передачі проєкту між sales, account і junior-командою.</p>
          <div className="solo-points">
            <span>Одна точка відповідальності</span>
            <span>Рішення з поясненням «чому»</span>
            <span>Фокус на обмеженій кількості проєктів</span>
          </div>
        </div>
      </section>

      <section className="faq shell section-pad">
        <div>
          <p className="section-number">06 / FAQ</p>
          <h2>Питання до старту</h2>
        </div>
        <div className="faq-list">
          <details><summary>З чого починається робота?<span>+</span></summary><p>З короткого знайомства, доступів лише для перегляду та діагностики. Я уточнюю бізнес-цілі, економіку й поточні обмеження, після чого пропоную формат роботи.</p></details>
          <details><summary>Чи можна замовити лише аудит?<span>+</span></summary><p>Так. Аудит — самостійний продукт із пріоритетами та планом впровадження. Ви можете реалізувати рекомендації своєю командою або продовжити роботу зі мною.</p></details>
          <details><summary>Ви працюєте тільки з інтернет-магазинами?<span>+</span></summary><p>Основний фокус mindmarketing — e-commerce, де реклама, товарні дані й аналітика найбільш тісно пов’язані. Інші проєкти розглядаю, якщо завдання відповідає експертизі.</p></details>
          <details><summary>Чи гарантуєте розблокування Merchant Center?<span>+</span></summary><p>Рішення завжди приймає Google, тому чесної стовідсоткової гарантії не існує. Я діагностую порушення, готую конкретні виправлення й супроводжую повторну перевірку.</p></details>
          <details><summary>Який рекламний бюджет потрібен?<span>+</span></summary><p>Універсального мінімуму немає. Важливіше, чи достатньо бюджету для вашої ніші, маржинальності та цілей. Це оцінюється до початку співпраці.</p></details>
        </div>
      </section>

      <section className="home-blog shell section-pad" aria-labelledby="home-blog-title">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-number">07 / Блог</p>
            <h2 id="home-blog-title">Практика без магічних кнопок.</h2>
          </div>
          <div className="home-blog-intro">
            <p>Розбираю Google Ads, маркетингові сигнали й аналітику так, щоб після читання було зрозуміло, що перевірити та зробити.</p>
            <a className="text-link" href="/blog">Усі матеріали →</a>
          </div>
        </div>
        <div className="home-blog-grid">
          {articles.map((article) => (
            <article key={article.slug}>
              <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.readingTime}</span>
              </div>
              <h3><a href={`/blog/${article.slug}`}>{article.title}</a></h3>
              <p>{article.excerpt}</p>
              <a className="article-link" href={`/blog/${article.slug}`}>Читати <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="shell contact-grid">
          <div>
            <p className="section-number">08 / Старт</p>
            <h2>Почнімо з того,<br />де зараз втрачається результат.</h2>
            <p className="contact-lead">Залиште URL магазину й коротко опишіть задачу. Підготую текст заявки, який можна одразу надіслати у ваш звичний канал.</p>
          </div>
          <BriefForm />
        </div>
      </section>

      <footer className="shell footer">
        <a className="wordmark" href="#top">mindmarketing<span>.</span></a>
        <p>Performance-маркетинг для e-commerce</p>
        <div className="footer-links"><a href="/blog">Блог</a><a href="#top">На початок ↑</a></div>
      </footer>
    </main>
  );
}
