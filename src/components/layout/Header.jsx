"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const currencyOptions = [
  { id: "usd", symbol: "$", name: "USD" },
  { id: "inr", symbol: "₹", name: "INR" },
  { id: "eur", symbol: "€", name: "EUR" },
  { id: "aed", symbol: "د.إ", name: "AED" },
  { id: "jpy", symbol: "¥", name: "JPY" },
];

export function Header({ hideCurrency = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { currency, currencySymbol, updateCurrency } = useCurrency();

  return (
    <header className="bg-black/40  backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
      <div className="page-container px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">𝕮𝓣</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              CoinTrace
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-20 items-center">
          {/* Features Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-gray-300 hover:text-pink-400 transition-all duration-300 font-bold">
              Features
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 border border-purple-600 text-gray-300">
              <DropdownMenuItem className="hover:bg-pink-500/30 cursor-pointer">
                <Link href="/features/portfolio" className="w-full">
                  Portfolio Tracking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-pink-500/30 cursor-pointer">
                <Link href="/features/watchlist" className="w-full">
                  Watchlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-pink-500/30 cursor-pointer">
                <Link href="/features/news" className="w-full">
                  News Report
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-pink-500/30 cursor-pointer">
                <Link href="/features/converter" className="w-full">
                  Converter
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/markets"
            className="text-gray-300 hover:text-pink-400 transition-all duration-300 font-bold"
          >
            Markets
          </Link>
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-pink-400 transition-all duration-300 font-bold"
          >
            Pricing
          </Link>

          {/* Currency Dropdown */}
          {!hideCurrency && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-black text-white border-pink-500/30 flex items-center space-x-2"
                >
                  <span className="font-medium">{currencySymbol}</span>
                  <span>{currency.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-black/90 border border-purple-600 text-gray-300 w-48">
                {currencyOptions.map((curr) => (
                  <DropdownMenuItem
                    key={curr.id}
                    onClick={() => updateCurrency(curr.id, curr.symbol)}
                    className="hover:bg-pink-500/30 cursor-pointer flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-medium">{curr.symbol}</span>
                      <span className="font-medium">{curr.name}</span>
                    </div>
                    {currency === curr.id && (
                      <span className="text-pink-400">✓</span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Auth Buttons - Desktop */}
          <div className="flex items-center space-x-3">
            {/* <Link
              href="/auth/login"
              className="px-5 py-2.5 text-gray-300 hover:text-pink-400 transition-all duration-300 font-medium"
            >
              Login
            </Link> */}
            {/* <Link
              href="/auth/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 font-semibold"
            >
              Get Started
            </Link> */}

            <SignedOut>
              <SignInButton>
                <p className="px-5 py-2.5 cursor-pointer text-gray-300 hover:text-pink-400 transition-all duration-300 font-medium">
                  Login
                </p>
              </SignInButton>
              <SignUpButton>
                <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 cursor-pointer font-semibold">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col space-y-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-pink-400 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-purple-400 transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-pink-400 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-purple-500/30 px-6 py-6 space-y-6 absolute w-full left-0 top-full z-50">
          {/* Features Accordion */}
          <div className="border-b border-purple-700/50 pb-4">
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              className="flex justify-between items-center w-full text-left text-gray-200 hover:text-pink-400 transition-colors duration-300 font-medium text-lg"
            >
              <span>Features</span>
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  featuresOpen ? "rotate-180" : ""
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
            </button>
            {featuresOpen && (
              <div className="pl-4 mt-3 space-y-3 animate-fadeIn">
                <Link
                  href="/features/portfolio"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 py-2"
                >
                  Portfolio Tracking
                </Link>
                <Link
                  href="/features/watchlist"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 py-2"
                >
                  Watchlist
                </Link>
                <Link
                  href="/features/news"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 py-2"
                >
                 News
                </Link>
                <Link
                  href="/features/converter"
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-400 hover:text-pink-400 transition-colors duration-300 py-2"
                >
                  Converter
                </Link>
              </div>
            )}
          </div>

          {/* Markets */}
          <div className="border-b border-purple-700/50 pb-4">
            <Link
              href="/markets"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 hover:text-pink-400 transition-colors duration-300 font-medium text-lg py-2"
            >
              Markets
            </Link>
          </div>

          {/* Pricing */}
          <div className="border-b border-purple-700/50 pb-4">
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 hover:text-pink-400 transition-colors duration-300 font-medium text-lg py-2"
            >
              Pricing
            </Link>
          </div>

          {/* Currency Accordion */}
          {!hideCurrency && (
            <div className="border-b border-purple-700/50 pb-4">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex justify-between items-center w-full text-left text-gray-200 hover:text-pink-400 transition-colors duration-300 font-medium text-lg"
              >
                <span>Currency ({currency.toUpperCase()})</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    currencyOpen ? "rotate-180" : ""
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
              </button>
              {currencyOpen && (
                <div className="pl-4 mt-3 space-y-3 animate-fadeIn">
                  {currencyOptions.map((curr) => (
                    <button
                      key={curr.id}
                      onClick={() => {
                        updateCurrency(curr.id, curr.symbol);
                        setMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full py-2 px-3 rounded-lg transition-all duration-300 text-left ${
                        currency === curr.id
                          ? "bg-pink-500/30 text-white"
                          : "text-gray-400 hover:text-pink-400 hover:bg-purple-800/30"
                      }`}
                    >
                      <span>
                        {curr.symbol} {curr.name}
                      </span>
                      {currency === curr.id && (
                        <span className="text-pink-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth Buttons */}
          <div className="pt-4 space-y-4 border-t border-purple-700/50">
            <SignedOut>
              <SignInButton>
                <p className="px-5 py-2.5 cursor-pointer text-gray-300 hover:text-pink-400 transition-all duration-300 font-medium">
                  Login
                </p>
              </SignInButton>
              <SignUpButton>
                <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 cursor-pointer font-semibold">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
