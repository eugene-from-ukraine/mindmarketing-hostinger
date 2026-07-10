/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "../articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} — mindmarketing`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <main>
      <header className="site-header shell">
        <a className="wordmark" href="/" aria-label="mindmarketing — на головну">
          mindmarketing<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Головна навігація">
          <a href="/#services">Послуги</a>
          <a href="/blog">Блог</a>
          <a href="/#approach">Підхід</a>
        </nav>
        <a className="header-cta" href="/#contact">
          Обговорити проєкт <span aria-hidden="true">↗</span>
        </a>
      </header>

      <article>
        <header className="article-hero shell">
          <a className="back-link" href="/blog">← Усі статті</a>
          <div className="article-meta">
            <span>{article.category}</span>
            <span>{article.publishedAt}</span>
            <span>{article.readingTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-intro">{article.intro}</p>
        </header>

        <div className="article-body shell">
          <aside aria-label="Зміст статті">
            <span>{article.accent}</span>
            <p>У цьому матеріалі</p>
            <ol>
              {article.sections.map((section) => (
                <li key={section.heading}>{section.heading}</li>
              ))}
            </ol>
          </aside>
          <div className="article-content">
            {article.sections.map((section, index) => (
              <section key={section.heading}>
                <span className="section-number">0{index + 1}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul>
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      <section className="related shell section-pad">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-number">Далі в блозі</p>
            <h2>Інші матеріали</h2>
          </div>
          <a className="text-link" href="/blog">Переглянути всі →</a>
        </div>
        <div className="related-grid">
          {related.map((item) => (
            <a href={`/blog/${item.slug}`} key={item.slug}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.readingTime} · Читати →</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="shell footer">
        <a className="wordmark" href="/">mindmarketing<span>.</span></a>
        <p>Performance-маркетинг для e-commerce</p>
        <a href="/blog">До блогу ↑</a>
      </footer>
    </main>
  );
}
