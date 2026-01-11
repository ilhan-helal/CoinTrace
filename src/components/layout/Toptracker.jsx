"use client";

import React, { useState, useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/* ================= Helpers ================= */

// Sparkline (simple SVG line chart)
const renderSparkline = (prices = []) => {
  if (!prices || prices.length === 0) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const points = prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * 100;
      const y = 100 - ((p - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-16"
    >
      <polyline
        fill="none"
        stroke="url(#sparkGradient)"
        strokeWidth="2"
        points={points}
      />
      <defs>
        <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Simple 6-bar volume chart
const renderVolumeBars = (totalVolume) => {
  if (!totalVolume) return null;

  const segments = 6;
  const avg = totalVolume / segments;

  const volumes = Array.from({ length: segments }, () => {
    const variation = Math.random() * 0.4 + 0.8;
    return avg * variation;
  });

  const max = Math.max(...volumes);

  return (
    <div className="flex items-end justify-between h-14 gap-1 w-full mt-2">
      {volumes.map((v, i) => {
        const height = (v / max) * 100;
        return (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-pink-500 to-purple-600 rounded-sm"
            style={{ height: `${height}%` }}
          />
        );
      })}
    </div>
  );
};

// Number formatting helper
const formatNumber = (num) => {
  if (!num) return "0";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(2);
};

/* ================= Component ================= */

function Toptracker() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, currencySymbol } = useCurrency();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);

        // Step 1: Trending coins
        const res = await fetch(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        if (!res.ok) throw new Error("Trending API failed");
        const data = await res.json();
        const trending = data.coins.slice(0, 7).map((c) => c.item);

        // Step 2: Markets API (with sparkline)
        const ids = trending.map((c) => c.id).join(",");
        const priceRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${ids}&sparkline=true&price_change_percentage=24h`
        );
        if (!priceRes.ok) throw new Error("Markets API failed");
        const priceData = await priceRes.json();

        // Merge
        const merged = trending.map((coin) => {
          const p = priceData.find((x) => x.id === coin.id) || {};
          return {
            ...coin,
            current_price: p.current_price || 0,
            price_change_percentage_24h: p.price_change_percentage_24h || 0,
            total_volume: p.total_volume || 0,
            sparkline: p.sparkline_in_7d?.price || null,
          };
        });

        setTrendingCoins(merged);
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [currency]);

  // Price format helper
  const formatPrice = (price) => {
    if (price >= 1)
      return `${currencySymbol}${price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    return `${currencySymbol}${price.toFixed(6)}`;
  };

  if (loading) {
    return (
      <div className="bg-black/40 rounded-2xl p-8 border border-purple-500/30">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
          📈 Trending Coins
        </h3>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black/40 rounded-2xl p-8 border border-purple-500/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          📈 Trending Coins
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-medium">LIVE</span>
        </div>
      </div>

      {/* Carousel */}
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {trendingCoins.map((coin, i) => {
            const change = coin.price_change_percentage_24h || 0;
            const changeFormatted =
              change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;

            return (
              <CarouselItem
                key={coin.id || i}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                    <a href={`/coin/${coin.id}?currency=${currency}`} className="block hover:opacity-90 transition">
                  <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 h-full">
                    <CardContent className="p-5 flex flex-col h-full">
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src={coin.thumb}
                          alt={coin.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span
                          className={`text-sm font-bold px-3 py-1 rounded-full ${
                            change >= 0
                              ? "bg-green-900/50 text-green-400 border border-green-400/30"
                              : "bg-red-900/50 text-red-400 border border-red-400/30"
                          }`}
                        >
                          {changeFormatted}
                        </span>
                      </div>

                      {/* Middle info */}
                      <div className="text-center mb-4">
                        <div className="font-bold text-lg text-white">
                          {coin.symbol?.toUpperCase()}
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {formatPrice(coin.current_price)}
                        </div>
                        <div className="text-sm text-gray-400">{coin.name}</div>
                      </div>

                      {/* Sparkline */}
                      {coin.sparkline && (
                        <div className="w-full mt-2">
                          {renderSparkline(coin.sparkline)}
                        </div>
                      )}

                      {/* 24h Volume Bars */}
                      <div className="w-full mt-4">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                          <span>24h Vol</span>
                          <span>
                            {coin.total_volume
                              ? `${currencySymbol}${formatNumber(
                                  coin.total_volume
                                )}`
                              : "N/A"}
                          </span>
                        </div>
                        {renderVolumeBars(coin.total_volume)}
                      </div>
                    </CardContent>
                  </Card>
                  </a>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="ml-2 bg-purple-600 border-purple-400 text-white hover:bg-purple-700" />
        <CarouselNext className="mr-2 bg-purple-600 border-purple-400 text-white hover:bg-purple-700" />
      </Carousel>
    </div>
  );
}

export default Toptracker;
