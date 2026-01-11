"use client";
import "./portfolio.css";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PortfolioPage() {
  return (
    <div className="portfolio-page">
      <Header hideCurrency={true} />

      {/* HERO SECTION */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-bg"></div>

        <div className="portfolio-hero-content">
          <h1 className="portfolio-title">
            Track Your Crypto Portfolio <br /> Like a Pro
          </h1>

          <p className="portfolio-subtitle">
            Manage assets, analyze growth, and monitor your entire crypto
            portfolio — beautifully and effortlessly.
          </p>

          <Link href="/pricing">
            <button className="portfolio-upgrade-btn">
              🚀 Upgrade to Premium
            </button>
          </Link>
        </div>

        <div className="portfolio-hero-image">
          <img
            src="https://i0.wp.com/coinsutra.com/wp-content/uploads/2024/01/Delta-multi-crypto-portfolio-tracker-blockchain.webp?resize=1200%2C828&ssl=1"
            alt="Portfolio Illustration"
          />

          <img
            className="floating-chart"
            src="https://camo.githubusercontent.com/7f390195da46aa57e2c7ce57bc39cb9fd82fcd8ff052748cff485f0cd9c491f1/68747470733a2f2f692e6962622e636f2f4c686e4d5135522f43727970746f2d506f7274666f6c696f2d747261636b65722d676f6f676c652d7368656574732e706e67"
            alt="Crypto Chart"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="portfolio-features">
        <h2 className="section-title">Why Use Our Portfolio Tracker?</h2>

        <div className="features-grid">
          {[
            {
              title: "Real-Time Asset Overview",
              desc: "See your entire portfolio value update instantly.",
              icon: "📈",
            },
            {
              title: "Performance Tracking",
              desc: "Track growth, average buy price and P&L easily.",
              icon: "📊",
            },
            {
              title: "Unlimited Portfolios",
              desc: "Create multiple portfolios for different strategies.",
              icon: "🧩",
            },
            {
              title: "Beautiful Dashboard",
              desc: "Modern & clean UI designed for professionals.",
              icon: "✨",
            },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="portfolio-demo-image">
          <img
            src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fef9a69chjmxh666eoere.png"
            alt="Portfolio Preview"
          />
        </div>

        <Link href="/pricing">
          <button className="portfolio-premium-cta">
            Unlock Portfolio Tracker → Go Premium
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
