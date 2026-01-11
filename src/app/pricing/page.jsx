"use client";
import PricingCard from "@/components/PricingCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import Link from 'next/link';
import { SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

function WelcomeUser() {
  const { user } = useUser();
  return (
    <div className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/30">
      👋 Welcome, {user.firstName}
    </div>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      title: "Free",
      monthlyPrice: "$0",
      annualPrice: "$0",
      description: "Forever",
      features: [
        "Track up to 100 coins",
        "7 days historical chart",
        "Basic portfolio (manual entry)",
        "Real-time price updates",
        "Basic market data",
        "Ads supported"
      ],
      button: "Get Started",
      highlight: false
    },
    {
      title: "Premium",
      monthlyPrice: "$9.99",
      annualPrice: "$99",
      description: "per month",
      features: [
        "Unlimited coins tracking",
        "1 year historical data",
        "Custom price alerts",
        "Advanced portfolio analytics",
        "Multi-currency support",
        "Ad-free experience",
        "Standard support",
        "Export to CSV",
        "Technical indicators"
      ],
      button: "Upgrade Now",
      highlight: true
    },
    {
      title: "Pro",
      monthlyPrice: "$19.99",
      annualPrice: "$199",
      description: "per month",
      features: [
        "Everything in Premium",
        "Unlimited historical data",
        "Exchange & wallet sync",
        "API access & webhooks",
        "AI-powered alerts & signals",
        "Custom dashboards",
        "Priority 24/7 support",
        "Tax reporting tools",
        "Advanced charting tools",
        "Whitelabel options"
      ],
      button: "Go Pro",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white font-sans selection:bg-pink-500 selection:text-white overflow-hidden">
      <Header hideCurrency={true} />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-10 animate-bounce"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            Choose Your Plan
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Start tracking your crypto portfolio like a pro. Select the plan that fits your needs and take control of your investments.
          </p>

          {/* Toggle Billing */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-semibold ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-1 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${isAnnual ? 'transform translate-x-8' : 'transform translate-x-0'}`}></div>
            </button>
            <span className={`text-lg font-semibold ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual <span className="text-green-400 text-sm">(Save 17%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.title} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <PricingCard
                {...plan}
                price={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                isAnnual={isAnnual}
              />
            </div>
          ))}
        </div>
      </section>

     {/* Feature Comparison */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up">
            Feature Comparison
          </h2>
          <p className="text-xl text-gray-200">See how our plans stack up against each other</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-3xl border border-purple-500/30 p-8 overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base table-fixed min-w-[600px]">
            <thead className="text-purple-300 text-sm uppercase tracking-wider">
              <tr>
                <th className="py-3">Features</th>
                <th className="py-3 text-center">Free</th>
                <th className="py-3 text-center text-pink-400">Premium</th>
                <th className="py-3 text-center text-green-500">Pro</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 divide-y divide-gray-700/40">
              {[
                ["Coin Tracking Limit", "100 coins", "Unlimited", "Unlimited+"],
                ["Historical Data", "✓", "✓", "✓"],
                ["Price Alerts", "✓", "✓", "✓"],
                ["Portfolio Analytics", "✓", "✓", "✓"],
                ["Ad-free", "✗", "✓", "✓"],
                ["Support", "Community", "Standard", "Priority 24/7"],
                ["Export Tools", "✗", "CSV", "Advanced"],
                ["API Access", "✗", "✗", "✓"]
              ].map(([feature, free, premium, pro], index) => (
                <tr key={index}>
                  <td className="py-3">{feature}</td>
                  <td className="text-center">{free}</td>
                  <td className="text-center text-pink-400">{premium}</td>
                  <td className="text-center text-green-400">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              question: "Can I change my plan later?",
              answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
            },
            {
              question: "Is there a free trial?",
              answer: "All plans start with a 14-day free trial. No credit card required for the Free plan."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept credit cards, PayPal, and even cryptocurrency payments (BTC, ETH, USDT)."
            },
            {
              question: "Can I cancel anytime?",
              answer: "Absolutely! You can cancel your subscription anytime with no cancellation fees."
            },
            {
              question: "Do you offer discounts for teams?",
              answer: "Yes! We offer special enterprise pricing for teams of 5+ users. Contact our sales team."
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/30 p-8 hover:border-pink-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-3">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-pink-500/20 rounded-3xl p-12 backdrop-blur-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of investors who trust CoinTrace for their portfolio management
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <SignedOut>
                              <SignUpButton mode="modal">
                                <button className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/30">
                                  🚀 Start Free Trial
                                </button>
                              </SignUpButton>
                            </SignedOut>
              
                            {/* ---------- SIGNED IN (Show Welcome) ---------- */}
                            <SignedIn>
                               <WelcomeUser />
                            </SignedIn>
              <Link href="/contact">
              <button className="px-8 py-4 border-2 border-pink-400/30 text-white rounded-2xl font-semibold text-lg hover:bg-pink-900/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500">
                📞 Contact Sales
              </button>
               </Link>
            </div>
            <p className="text-gray-400 mt-6 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
}