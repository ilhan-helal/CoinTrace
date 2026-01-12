// src/app/feature/news/page.jsx

export const dynamic = 'force-dynamic';

import "./news.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Crypto Market News | CryptoTracker",
  description:
    "Latest cryptocurrency and blockchain news updated in real-time.",
};

export default async function Page() {
  const API_KEY = process.env.NEWS_API_KEY;
  let articles = [];

  try {
    if (!API_KEY) {
      throw new Error("NEWS_API_KEY is missing");
    }

    const res = await fetch(
      `https://gnews.io/api/v4/search?q=crypto&lang=en&country=us&max=10&apikey=${API_KEY}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();
    articles = data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="news-page">
      <Header hideCurrency={true} />

      <section className="news-hero">
        <h1 className="news-title">Latest Crypto Market News</h1>
        <p className="news-subtitle">
          Stay updated with real-time cryptocurrency insights, market trends,
          institutional moves, and blockchain innovations.
        </p>
      </section>

      <section className="news-grid-section">
        {articles.length === 0 && (
          <div className="news-error">
            ⚠ Could not load news. Try again later.
          </div>
        )}

        <div className="news-grid">
          {articles.map((article, i) => (
            <div className="news-card" key={i}>
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="news-img"
                />
              ) : (
                <div className="news-img placeholder"></div>
              )}

              <div className="news-meta">
                <span>📰 {article.source?.name || "Unknown Source"}</span>
                <span>
                  ⏱ {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="news-content">
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-desc">
                  {article.description || "No description available."}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-btn"
                >
                  Read Full Article →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
