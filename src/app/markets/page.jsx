// app/markets/page.jsx
import MarketsTable from "./MarketTable";
import MarketData from "./MarketData";
import { Header } from "@/components/layout/Header";

export default async function MarketsPage({ searchParams }) {
  const { currency = "usd" } = await searchParams;

  try {
    // Initial server-side fetch (for first load only)
    const [tableRes, globalRes, trendingRes, gainersRes] = await Promise.all([
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
        { next: { revalidate: 60 } }
      ),
      fetch("https://api.coingecko.com/api/v3/global", {
        next: { revalidate: 60 },
      }),
      fetch("https://api.coingecko.com/api/v3/search/trending", {
        next: { revalidate: 60 },
      }),
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=price_change_percentage_24h_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`,
        { next: { revalidate: 60 } }
      ),
    ]);

    if (!tableRes.ok || !globalRes.ok || !trendingRes.ok || !gainersRes.ok) {
      throw new Error("Failed to fetch data from API");
    }

    const [tableData, globalData, trendingData, allCoins] = await Promise.all([
      tableRes.json(),
      globalRes.json(),
      trendingRes.json(),
      gainersRes.json(),
    ]);

    // Top Gainers
    const topGainers = Array.isArray(allCoins)
      ? allCoins
          .filter((coin) => coin.price_change_percentage_24h != null)
          .sort(
            (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
          )
          .slice(0, 3)
      : [];

    // Trending Coins (convert BTC → current currency)
    let trendingCoinsProcessed = [];
    if (trendingData.coins && Array.isArray(trendingData.coins)) {
      const btcResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`,
        { next: { revalidate: 60 } }
      );

      if (btcResponse.ok) {
        const btcData = await btcResponse.json();
        const btcPrice = btcData.bitcoin?.[currency] || 0;

        trendingCoinsProcessed = trendingData.coins.slice(0, 3).map((coin) => ({
          ...coin,
          converted_price: (coin.item?.price_btc || 0) * btcPrice,
        }));
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <Header />
        <div className="page-container px-4 py-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center">
            Cryptocurrency Markets
          </h1>

          {/* MarketData + MarketsTable will re-fetch on currency change */}
          + <MarketData
   marketData={globalData?.data || {}}
   trendingCoins={trendingCoinsProcessed}
   topGainers={topGainers}
 />

          <MarketsTable initialData={tableData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-white text-center text-xl">
            Error loading market data. Please try again later.
          </div>
        </div>
      </div>
    );
  }
}
