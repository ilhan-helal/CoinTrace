// app/markets/MarketTable.jsx - COMPLETE UPDATED CODE
"use client";

import { useState, useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import Link from "next/link";

export default function MarketsTable({ initialData }) {
  const [data, setData] = useState(
    Array.isArray(initialData) ? initialData : []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });
  const [refreshCount, setRefreshCount] = useState(0); // ← YEH NAYA LINE ADD KARO

  const { currency, currencySymbol } = useCurrency();

  // Listen for currency changes - YEH NAYA USEEFFECT ADD KARO
  useEffect(() => {
    const handleCurrencyChange = () => {
      setRefreshCount((prev) => prev + 1); // Force re-render
    };

    window.addEventListener("currencyChanged", handleCurrencyChange);
    return () =>
      window.removeEventListener("currencyChanged", handleCurrencyChange);
  }, []);

  // Sorting function
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }

    setSortConfig({ key, direction });

    if (direction === null) {
      setData(Array.isArray(initialData) ? initialData : []);
      return;
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  // Search filter
  const filteredData = data.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sparkline function
  const renderSparkline = (prices) => {
    if (!prices || !prices.length) return null;

    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const range = max - min || 1;
const normalized = prices.map(
  (price) => ((price - min) / range) * 30
);

    return (
      <svg width="120" height="30" className="w-28 h-8">
        <polyline
          className="animate-[drawLine_1.5s_ease-in-out_infinite_alternate]"
          fill="none"
          stroke={
            prices[prices.length - 1] >= prices[0] ? "#34d399" : "#f87171"
          }
          strokeWidth="2"
          points={normalized
            .map((val, i) => `${i * (80 / normalized.length)},${30 - val}`)
            .join(" ")}
        />
      </svg>
    );
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-purple-500/30 mt-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white 
             placeholder-gray-400 focus:outline-none 
             focus:ring-2 focus:ring-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.4)] 
             transition-all duration-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {[
                { key: "market_cap_rank", label: "Rank" },
                { key: "name", label: "Name" },
                { key: "current_price", label: "Price" },
                {
                  key: "price_change_percentage_1h_in_currency",
                  label: "1h %",
                },
                { key: "price_change_percentage_24h", label: "24h %" },
                {
                  key: "price_change_percentage_7d_in_currency",
                  label: "7d %",
                },
                { key: "total_volume", label: "Volume" },
                { key: "market_cap", label: "Market Cap" },
                { key: "sparkline_in_7d", label: "Price Graph" },
              ].map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-pink-400"
                  onClick={() => handleSort(header.key)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {sortConfig.key === header.key && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc"
                          ? "↑"
                          : sortConfig.direction === "desc"
                          ? "↓"
                          : ""}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredData.map((coin) => (
              <tr
                key={coin.id}
                className="group hover:bg-gradient-to-r hover:from-pink-500/10 hover:to-purple-500/10 transition-all duration-300 ease-in-out"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-200">
                    {coin.market_cap_rank}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
  <a
    href={`/coin/${coin.id}?currency=${currency}`}
    className="flex items-center hover:text-pink-400 transition"
  >
    <img
      src={coin.image}
      alt={coin.name}
      className="w-8 h-8 rounded-full mr-3"
    />
    <div>
      <div className="text-sm font-medium text-white">{coin.name}</div>
      <div className="text-sm text-gray-400 uppercase">{coin.symbol}</div>
    </div>
  </a>
</td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {currencySymbol}
                    {Number(coin.current_price || 0).toLocaleString("en-US")}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium ${
                      coin.price_change_percentage_1h_in_currency >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {Number(coin.price_change_percentage_1h_in_currency || 0).toFixed(2)}%
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      coin.price_change_percentage_24h >= 0
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {Number(coin.price_change_percentage_24h || 0).toFixed(2)}%
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm font-medium ${
                      coin.price_change_percentage_7d_in_currency >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {Number(coin.price_change_percentage_7d_in_currency || 0).toFixed(2)}%
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">
                    {currencySymbol}
                    {Number(coin.total_volume || 0).toLocaleString("en-US")}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-200">
                    {currencySymbol}
                    {Number(coin.market_cap || 0).toLocaleString("en-US")}
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  {renderSparkline(coin.sparkline_in_7d?.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No cryptocurrencies found matching your search.
        </div>
      )}
    </div>
  );
}
