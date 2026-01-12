"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Toptracker from "./Toptracker";
import FAQ from "./FAQ";
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

export function Hero() {
  return (
    <section className="py-12 px-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-700 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 mb-12">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Track Your <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                <Typewriter
                  words={["Crypto Wealth", "Digital Assets", "Token Portfolio"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
              <br /> in Real-Time
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 md:mb-12 leading-relaxed">
              Advanced portfolio analytics, real-time market data, and
              professional trading insights - all wrapped in a beautiful,
              intuitive interface.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-stretch sm:items-center mb-12 md:mb-16">
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
              <button className="px-10 py-4 border-2 border-pink-400/50 text-white rounded-xl text-lg font-semibold hover:bg-pink-900/30 transition-all duration-300 transform hover:scale-105">
                📊 Live Demo
              </button>
            </div>
          </div>
          {/* RIGHT IMAGE */}
          <div className="flex flex-col justify-center lg:justify-end gap-3 sm:gap-4 mt-2 sm:mt-4 lg:mt-0 ml-0 lg:ml-auto">
            <img
              src="./ctim2.jpg"
              alt="Crypto Illustration 1"
              className="max-w-sm sm:max-w-md lg:max-w-lg w-full rounded-2xl shadow-2xl mx-auto"
            />
            <img
              src="./ctim.jpg"
              alt="Crypto Illustration 2"
              className="max-w-sm sm:max-w-md lg:max-w-lg w-full rounded-2xl shadow-2xl mx-auto"
            />
          </div>
        </div>

        <Toptracker />

        <FAQ />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 text-center">
          {[
            { number: "5K+", label: "Active Users" },
            { number: "500+", label: "Crypto Currencies" },
            { number: "24/7", label: "Real-time Data" },
          ].map((stat, index) => (
            <div key={index} className="p-2 sm:p-4">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
