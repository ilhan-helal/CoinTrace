'use client';

import { useState } from 'react';
import Link from 'next/link';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is CoinTrace?",
      answer: " CoinTrace is a comprehensive cryptocurrency portfolio tracker and analytics platform that helps you monitor your digital assets in real-time. It offers advanced features like portfolio performance tracking, market analytics, and tax reporting to help you make informed investment decisions."
    },
    {
      question: "How does CoinTrace track my portfolio?",
      answer: "CoinTrace connects to your exchange accounts via secure API connections or allows manual entry of your holdings. We use real-time market data from multiple sources to provide accurate portfolio valuation and performance metrics."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes! We use bank-level security encryption and never store your API keys on our servers. All data is encrypted in transit and at rest. We also offer read-only API access for enhanced security."
    },
    {
      question: "Which exchanges do you support?",
      answer: "We support all major exchanges including Binance, Coinbase, Kraken, FTX, and 50+ others. You can also manually add transactions from any exchange or wallet."
    },
    {
      question: "How much does CoinTrace cost?",
      answer: "We offer a free plan with basic features and premium plans starting at $9.99/month for advanced analytics, tax reporting, and priority support."
    },
    {
      question: "Do you offer mobile apps?",
      answer: "Not now, but we are working on mobile apps for iOS and Android. In the meantime, our web platform is fully responsive and works great on mobile browsers."
    },
    {
      question: "Can I generate tax reports?",
      answer: "Absolutely! Our premium plans include comprehensive tax reporting features that help you generate capital gains reports, transaction history, and other tax documents for your accountant."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-700 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about CoinTrace. Can't find the answer you're looking for? 
            Contact our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-pink-400/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              <div
                className={`px-6 pb-5 transition-all duration-300 ${
                  openIndex === index
                    ? 'opacity-100 max-h-96'
                    : 'opacity-0 max-h-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA at bottom */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6">
              Our support team is here to help you get started and answer any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <button  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">               
                📤 Contact Support
              </button>
               </Link>
              <button className="px-8 py-3 border-2 border-pink-400/30 text-white rounded-xl font-semibold hover:bg-pink-900/30 transition-all duration-300">
                👁️‍🗨️ Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;