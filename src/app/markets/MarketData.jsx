// app/markets/MarketData.jsx - UPDATED
"use client";
import React from "react"; // ← useEffect and useState REMOVE
import { useCurrency } from "@/contexts/CurrencyContext";
import "./MarketData.css";

const MarketData = ({ marketData, trendingCoins, topGainers }) => {
  const { currency, currencySymbol } = useCurrency();

  // --- Utility functions ---
  const formatCurrency = (value) => {
    if (value == null) return "N/A";
    return `${currencySymbol}${Number(value || 0).toLocaleString("en-US")}`;
  };

  const formatPercentage = (value) => {
    if (value == null) return "N/A";
    return `${value >= 0 ? "▲" : "▼"} ${Math.abs(value).toFixed(1)}%`;
  };

  const formatSmallCurrency = (value) => {
    if (value == null) return "N/A";
    const num = Number(value || 0);
return num < 1
  ? `${currencySymbol}${num.toFixed(4)}`
  : `${currencySymbol}${num.toFixed(2)}`;
  };

  // --- Safe data wrappers ---
  const safeMarketData = marketData || {};
  const safeTrendingCoins = Array.isArray(trendingCoins) ? trendingCoins : [];
  const safeTopGainers = Array.isArray(topGainers) ? topGainers : [];

  return (
    <div className="market-data-container">
      {/* Global Market Stats */}
      <div className="market-stats">
        <div className="market-stat">
          <div className="stat-label">Market Cap</div>
          <div className="stat-value">
  <span className="stat-number">
    {safeMarketData.total_market_cap
      ? formatCurrency(safeMarketData.total_market_cap[currency])
      : "N/A"}
  </span>

  {typeof safeMarketData.market_cap_change_percentage_24h_usd === "number" && (
    <span
      className={`stat-change ${
        safeMarketData.market_cap_change_percentage_24h_usd >= 0
          ? "up"
          : "down"
      }`}
    >
      {formatPercentage(
        safeMarketData.market_cap_change_percentage_24h_usd
      )}
    </span>
  )}
</div>
        </div>

        <div className="market-stat">
          <div className="stat-label">24h Trading Volume</div>
          <div className="stat-value">
            {safeMarketData.total_volume
              ? formatCurrency(safeMarketData.total_volume[currency])
              : "N/A"}
          </div>
        </div>
      </div>

      {/* Trending & Top Gainers */}
      <div className="market-sections">
        {/* Trending */}
        <div className="market-section">
          <h2>🔥 Trending</h2>
          <div className="coins-list">
            {safeTrendingCoins.length > 0 ? (
              safeTrendingCoins.map((coin, index) => (
                <div key={index} className="coin-item">
  <a
    href={`/coin/${coin.item?.id}?currency=${currency}`}
    className="flex justify-between w-full hover:text-pink-400 transition"
  >
    <div className="coin-name">{coin.item?.name || "Unknown"}</div>
    <div className="coin-price">
      {coin.converted_price ? formatSmallCurrency(coin.converted_price) : "N/A"}
    </div>
  </a>
</div>

              ))
            ) : (
              <div className="text-gray-400 text-sm">
                No trending data available
              </div>
            )}
          </div>
        </div>

        {/* Top Gainers */}
        <div className="market-section">
          <h2>🔝 Top Gainers</h2>
          <div className="coins-list">
            {safeTopGainers.length > 0 ? (
              safeTopGainers.map((coin, index) => (
                <div key={index} className="coin-item">
  <a
    href={`/coin/${coin.id}?currency=${currency}`}
    className="flex justify-between w-full hover:text-pink-400 transition"
  >
    <div className="coin-name">{coin.name || "Unknown"}</div>
    <div className="coin-price">
      <span className="price-value">
        {formatSmallCurrency(coin.current_price || 0)}
      </span>
      <span
        className={`price-change ${
          coin.price_change_percentage_24h >= 0 ? "up" : "down"
        }`}
      >
        {formatPercentage(coin.price_change_percentage_24h || 0)}
      </span>
    </div>
  </a>
</div>

              ))
            ) : (
              <div className="text-gray-400 text-sm">
                No gainers data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;