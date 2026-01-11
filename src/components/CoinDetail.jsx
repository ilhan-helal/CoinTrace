"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PieChart, Pie, Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import { Footer } from "@/components/layout/Footer";
import "./CoinDetail.css";



// Static news for now
const staticNews = [
  { title: "Crypto Market Update", link: "#", date: "2025-09-14" },
  { title: "New Regulations in Asia", link: "#", date: "2025-09-13" },
  { title: "BNB Price Prediction 2025", link: "#", date: "2025-09-12" },
];

// Fetch chart data (all keys: prices, market_caps, total_volumes)
async function fetchChartData(coinId, days) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  return await res.json(); // full data
}

export default function CoinDetail({ coin, chartData, coinId, relatedCoins = [] }) {
  const [selectedDays, setSelectedDays] = useState(365); // default 1Y
  const [chartType, setChartType] = useState("line"); // "line" | "bar"
  const [selectedDataKey, setSelectedDataKey] = useState("prices"); // prices | market_caps | total_volumes
  const [dynamicChartData, setDynamicChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const timeframes = [
    { label: "1H", value: 1 / 24 },
    { label: "24H", value: 1 },
    { label: "7D", value: 7 },
    { label: "1M", value: 30 },
    { label: "1Y", value: 365 },
  ];

  const dataTypes = [
    { label: "PRICE", key: "prices" },
    { label: "MARKET CAP", key: "market_caps" },
    { label: "VOLUME", key: "total_volumes" }, // trading view style
  ];

  // Performance data
  const pieData = [
    {
      name: "1h",
      value: coin.market_data.price_change_percentage_1h_in_currency.usd ?? 0,
    },
    {
      name: "24h",
      value: coin.market_data.price_change_percentage_24h_in_currency.usd ?? 0,
    },
    {
      name: "7d",
      value: coin.market_data.price_change_percentage_7d_in_currency.usd ?? 0,
    },
    {
      name: "30d",
      value: coin.market_data.price_change_percentage_30d_in_currency.usd ?? 0,
    },
    {
      name: "1y",
      value: coin.market_data.price_change_percentage_1y_in_currency.usd ?? 0,
    },
  ];

  // Fetch chart data whenever selection changes
  useEffect(() => {
    setLoading(true);
    fetchChartData(coinId, selectedDays).then((fullData) => {
      const arr = fullData[selectedDataKey] || [];
      const mapped = arr.map(([timestamp, value]) => ({
        time: new Date(timestamp).toLocaleDateString(),
        value,
      }));
      setDynamicChartData(mapped);
      setLoading(false);
    });
  }, [coinId, selectedDays, selectedDataKey]);

  return (
    <>
      <div className="coin-detail-container">
        {/* LEFT SIDE */}
        <div className="coin-left">
          <div className="coin-info card">
            <h1>
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>
            <p>Price: ${coin.market_data.current_price.usd.toLocaleString()}</p>
            <p>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</p>
            <p>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </p>
            <p>
              Circulating:{" "}
              {coin.market_data.circulating_supply?.toLocaleString()}
            </p>
            <p>
              Max Supply:{" "}
              {coin.market_data.max_supply?.toLocaleString() || "N/A"}
            </p>
          </div>

          <div className="performance card">
            <h2>Performance %</h2>
            <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={120}
      label
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
          </div>

          <div className="related card">
  <h2>Related Coins</h2>

  {relatedCoins && relatedCoins.length > 0 ? (
    <ul>
      {relatedCoins.slice(0, 2).map((rc) => (
        <li key={rc.id} className="related-item">
  <Link
    href={`/coin/${rc.id}`}
    className="flex items-center gap-4"
  >
    <img
      src={rc.image || `/fallback-coin.png`}
      alt={rc.name}
      className="related-img"
      width={40}
      height={40}
    />
    <div>
      <div className="font-semibold">{rc.name}</div>
      <div className="text-sm text-gray-400 uppercase">{rc.symbol}</div>
    </div>
  </Link>
</li>

      ))}
    </ul>
  ) : (
    <div className="text-gray-400">No related coins found</div>
  )}
</div>

        </div>

        {/* RIGHT SIDE */}
        <div className="coin-right">
          <div className="chart-header">
            {/* Timeframes */}
            <div className="tf-buttons">
              {timeframes.map((tf) => (
                <button
                  key={tf.label}
                  className={
                    tf.value === selectedDays ? "tf-button selected" : "tf-button"
                  }
                  onClick={() => setSelectedDays(tf.value)}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Data Type (price / market cap / volume) */}
            <div className="chart-data-buttons">
              {dataTypes.map((dt) => (
                <button
                  key={dt.key}
                  className={
                    selectedDataKey === dt.key ? "chart-type selected" : "chart-type"
                  }
                  onClick={() => setSelectedDataKey(dt.key)}
                >
                  {dt.label}
                </button>
              ))}
            </div>

            {/* Chart Type */}
            <div className="chart-type-buttons">
              <button
                className={chartType === "line" ? "chart-type selected" : "chart-type"}
                onClick={() => setChartType("line")}
              >
                Line
              </button>
              <button
                className={chartType === "bar" ? "chart-type selected" : "chart-type"}
                onClick={() => setChartType("bar")}
              >
                Bar
              </button>
            </div>
          </div>

          <div className="chart-area card">
            {loading ? (
              <p>Loading chart...</p>
            ) : (
              <>
                {/* Mountain Line Chart */}
                {chartType === "line" && (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={dynamicChartData}>
      <XAxis dataKey="time" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip />

      {/* Gradient for Mountain Effect */}
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4800c4" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#2700c4" stopOpacity={0} />
        </linearGradient>
      </defs>

      <Area
        type="monotone"
        dataKey="value"
        stroke="#7900c4"
        strokeWidth={2}
        fill="url(#colorValue)"
      />
    </AreaChart>
  </ResponsiveContainer>
)}


                {/* Bar Chart with green/red */}
                {chartType === "bar" && (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dynamicChartData}>
                      <XAxis dataKey="time" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip />
                      <Bar dataKey="value">
                        {dynamicChartData.map((entry, index) => {
                          let color = "#00C49F"; // green
                          if (
                            index > 0 &&
                            entry.value < dynamicChartData[index - 1].value
                          ) {
                            color = "#dc2626"; // red
                          }
                          return <Cell key={`cell-${index}`} fill={color} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </>
            )}
          </div>

          <div className="about card">
            <h2>About {coin.name}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: coin.description.en || "No description available.",
              }}
            />
          </div>
        </div>
      </div>

      {/* NEWS SECTION */}
      <div className="news-section">
        <h2>Latest News</h2>
        <div className="news-cards">
          {staticNews.map((n, i) => (
            <div key={i} className="news-card">
              <h3>{n.title}</h3>
              <p>{n.date}</p>
              <a href={n.link} className="read-more">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
