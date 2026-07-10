/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Блог про Google Ads та аналітику — mindmarketing",
  description:
    "Практичні матеріали про Google Ads, маркетингову аналітику, Merchant Center і якісні сигнали для e-commerce.",
};

export default function BlogPage() {
  return (
    <main>
      <header className="site-header shell">
        <a className="wordmark" href="/" aria-label="mindmarketing — на головну">
          mindmarketing<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Головна навігація">
          <a href="/#services">Послуги</a>
          <a href="/blog" aria-current="page">Блог</a>
          <a href="/#approach">Підхід</a>
        </nav>
        <a className="header-cta" href="/#contact">
          Обговорити проєкт <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="blog-hero shell">
        <p className="eyebrow">Практика performance-маркетингу</p>
        <div className="blog-hero-grid">
          <h1>Блог про рекламу, дані та <em>рішення.</em></h1>
          <p>
            Розбираю Google Ads, аналітику й товарні системи без магічних
            кнопок. Лише логіка, перевірки та дії, що впливають на результат.
          </p>
        </div>
      </section>

      <section className="blog-list shell" aria-label="Усі статті">
        {articles.map((article) => (
          <article className="blog-card" key={article.slug}>
            <div className="blog-card-number" aria-hidden="true">{article.accent}</div>
            <div className="blog-card-copy">
              <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.publishedAt}</span>
                <span>{article.readingTime}</span>
              </div>
              <h2>
                <a href={`/blog/${article.slug}`}>{article.title}</a>
              </h2>
              <p>{article.excerpt}</p>
              <a className="article-link" href={`/blog/${article.slug}`}>
                Читати статтю <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="blog-cta">
        <div className="shell blog-cta-grid">
          <p className="section-number">Потрібен погляд на ваші дані?</p>
          <h2>Почнімо з діагностики рекламної системи.</h2>
          <a className="button button-dark" href="/#contact">
            Обговорити проєкт <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer className="shell footer">
        <a className="wordmark" href="/">mindmarketing<span>.</span></a>
        <p>Performance-маркетинг для e-commerce</p>
        <a href="/">На головну ↑</a>
      </footer>
    </main>
  );
}
