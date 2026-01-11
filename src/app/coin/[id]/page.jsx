// src/app/coin/[id]/page.jsx
import CoinDetail from "@/components/CoinDetail";
import { Header } from "@/components/layout/Header";


async function getCoin(id) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=false`,
     { cache: "no-store" }
  );
   if (!res.ok) {
    console.error(await res.text()); // debugging ke liye
    throw new Error("Failed to fetch coin");
  }
  return res.json();
}
async function getCoinChart(id, days) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
     { cache: "no-store" } 
  );
  if (!res.ok) throw new Error("Failed to fetch chart");
  return res.json();
}

export default async function CoinPage({ params }) {
  const { id } = await params;

  // Initial coin info
  const coin = await getCoin(id);

  // Initial chart (1 year default)
  const chart = await getCoinChart(id, 365);

  const chartData = chart.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString(),
    price,
  }));

  // fetch a list of coins (top 250) to compute prev/next
const listRes = await fetch(
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`,
  { next: { revalidate: 60 } }
);
const coinList = listRes.ok ? await listRes.json() : [];

// find index of current coin id in coinList
const idx = coinList.findIndex((c) => c.id === id);

// compute prev and next (safe wrap-around and safe fallback)
let relatedCoins = [];
if (idx !== -1 && coinList.length > 1) {
  const prevIdx = (idx - 1 + coinList.length) % coinList.length;
  const nextIdx = (idx + 1) % coinList.length;
  // only include minimal fields to pass to client
  relatedCoins = [
    {
      id: coinList[prevIdx].id,
      name: coinList[prevIdx].name,
      symbol: coinList[prevIdx].symbol,
      image: coinList[prevIdx].image,
    },
    {
      id: coinList[nextIdx].id,
      name: coinList[nextIdx].name,
      symbol: coinList[nextIdx].symbol,
      image: coinList[nextIdx].image,
    },
  ];
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <Header />
      <CoinDetail
  coin={coin}
  chartData={chartData}
  coinId={id}
  relatedCoins={relatedCoins}
/>
    </div>
  );
}
