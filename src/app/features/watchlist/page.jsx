// src/app/feature/watchlist/page.jsx
"use client";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./watchlist.css";

export default function WatchlistPage() {
  return (
    <div className="wt-page min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white font-sans selection:bg-pink-500 selection:text-white">
       <Header hideCurrency={true} />

      <main className="wt-container">
        {/* HERO */}
        <section className="wt-hero">
          <div className="wt-hero-left">
            <h1 className="wt-title">
              Your Watchlist — stay on top of what matters
            </h1>
            <p className="wt-sub">
              Create a personalised list of coins. Track price changes, quick stats
              and get alerts. Sync across devices when you upgrade.
            </p>

            <div className="wt-cta-row">
              <Link href="/pricing" className="wt-cta wt-cta-primary">
                Unlock Watchlist — Go Premium
              </Link>
            </div>

            <div className="wt-quick-features">
              <div className="wt-feature">
                <span className="dot">★</span>
                Save coins & sets
              </div>
              <div className="wt-feature">
                <span className="dot">🔔</span>
                Price alerts
              </div>
              <div className="wt-feature">
                <span className="dot">📊</span>
                Instant insights
              </div>
            </div>
          </div>

          <div className="wt-hero-right">
            {/* Empty state mockup */}
            <div className="wt-mockup-card">
              <div className="mockup-header">
                <div className="mockup-title">Your Watchlist</div>
                <div className="mockup-actions">
                  <button className="icon-btn">＋ Add</button>
                  <button className="icon-btn">⋯</button>
                </div>
              </div>

              <div className="mockup-empty">
                <div className="empty-illustration" />
                <div className="empty-text">Your watchlist is empty</div>
                <div className="empty-sub">
                  Add coins to quickly track prices and changes — try premium for sync.
                </div>
                <Link href="/pricing" className="wt-btn-secondary">Try Premium — Unlock Now</Link>
              </div>
            </div>

            {/* Animated sample row preview */}
            <div className="wt-preview">
              <div className="preview-row">
                <div className="coin">BTC</div>
                <div className="name">Bitcoin</div>
                <div className="price">₹ 3,24,000</div>
                <div className="chg up">+2.3%</div>
              </div>
              <div className="preview-row">
                <div className="coin">ETH</div>
                <div className="name">Ethereum</div>
                <div className="price">₹ 1,23,560</div>
                <div className="chg down">-1.1%</div>
              </div>
              <div className="preview-row dim">
                <div className="coin">SOL</div>
                <div className="name">Solana</div>
                <div className="price">₹ 4,560</div>
                <div className="chg up">+5.8%</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="wt-features">
          <h2 className="section-heading">What you get with Watchlist</h2>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Save & organise</h3>
              <p>Create multiple watchlists and coin sets for different strategies.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Smart alerts</h3>
              <p>Price thresholds, percent moves and scheduled summaries.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Quick insights</h3>
              <p>See day/week/month performance and small chart previews.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">☁️</div>
              <h3>Sync across devices</h3>
              <p>Access the same list on mobile and web (Premium).</p>
            </div>
          </div>
        </section>

        {/* DEMO TABLE PREVIEW */}
        <section className="wt-table-preview">
          <h2 className="section-heading">Watchlist preview</h2>

          <div className="table-mockup">
            <div className="table-head">
              <div>Coin</div>
              <div>Price</div>
              <div>24h</div>
              <div>Market Cap</div>
            </div>

            <div className="table-row">
              <div className="row-coin">
                <div className="row-symbol">BTC</div>
                <div className="row-name">Bitcoin</div>
              </div>
              <div className="row-price">₹ 3,24,000</div>
              <div className="row-change up">+2.3%</div>
              <div className="row-mcap">₹ 60T</div>
            </div>

            <div className="table-row">
              <div className="row-coin">
                <div className="row-symbol">ETH</div>
                <div className="row-name">Ethereum</div>
              </div>
              <div className="row-price">₹ 1,23,560</div>
              <div className="row-change down">-1.1%</div>
              <div className="row-mcap">₹ 14T</div>
            </div>

            <div className="table-row dim">
              <div className="row-coin">
                <div className="row-symbol">SOL</div>
                <div className="row-name">Solana</div>
              </div>
              <div className="row-price">₹ 4,560</div>
              <div className="row-change up">+5.8%</div>
              <div className="row-mcap">₹ 300B</div>
            </div>
          </div>

          <div className="center-cta">
            <Link href="/pricing" className="wt-cta wt-cta-primary">
              Unlock Full Watchlist Features
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
