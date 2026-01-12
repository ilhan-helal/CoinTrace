"use client";
import "./PricingCard.css";
import { SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";


export default function PricingCard({
  title,
  price,
  description,
  features,
  button,
  highlight,
  isAnnual,
   onComingSoon
}) {
  return (
    <div className={`pricing-card ${highlight ? "highlight" : ""}`}>
      {highlight && (
        <div className="badge-container">
          <span className="badge">Most Popular ★</span>
          <div className="badge-glow"></div>
        </div>
      )}

      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <div className="price-container">
          <span className="card-price">{price}</span>
          <span className="card-duration">/{isAnnual ? 'year' : 'month'}</span>
        </div>
        {isAnnual && title !== "Free" && (
          <p className="annual-savings">Save 17% with annual billing</p>
        )}
      </div>

      <ul className="features-list">
        {features.map((feature, idx) => (
          <li key={idx} className="feature-item">
            <span className="checkmark">✓</span>
            <span className="feature-text">{feature}</span>
          </li>
        ))}
      </ul>

     {/* FREE PLAN */}
{title === "Free" && (
  <>
    <SignedOut>
      <SignUpButton mode="modal">
        <button className="card-button btn-default">
          Get Started
          <span className="button-glow"></span>
        </button>
      </SignUpButton>
    </SignedOut>

    <SignedIn>
      <button className="card-button btn-disabled" disabled>
        ✓ Current Plan
      </button>
    </SignedIn>
  </>
)}

{/* PREMIUM & PRO */}
{title !== "Free" && (
  <button
  disabled={title === "Pro"}
  onClick={() => {
    if (title !== "Pro" && onComingSoon) {
      onComingSoon(title);
    }
  }}
  className={`card-button ${
    title === "Pro"
      ? "btn-disabled"
      : highlight
      ? "btn-highlight"
      : "btn-default"
  }`}
>
  {title === "Pro" ? "Coming Soon" : button}
  <span className="button-glow"></span>
</button>

)}


      {/* Animated background elements */}
      <div className="card-bg-elements">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
      </div>
    </div>
  );
}