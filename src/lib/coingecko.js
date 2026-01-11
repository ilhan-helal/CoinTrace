// src/lib/coingecko.js
const BASE = "https://api.coingecko.com/api/v3";

async function fetchFromCoinGecko(path, params = {}, fetchOptions = {}) {
  const url = new URL(`${BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });

  // Next.js app-router friendly fetch options (server-side caching/revalidate)
  const defaultOpts = { next: { revalidate: 60 } };
  const res = await fetch(url.toString(), { ...defaultOpts, ...fetchOptions });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`CoinGecko fetch failed: ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }

  return res.json();
}

// get full coin metadata (description, market_data, supply, links, etc.)
export async function getCoin(id, vs_currency = "usd") {
  return fetchFromCoinGecko(`/coins/${encodeURIComponent(id)}`, {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: true,
    developer_data: false,
    sparkline: false,
  });
}

// market chart for given days (1, 7, 30, 365). CoinGecko returns [timestamp, price]
export async function getCoinChart(id, vs_currency = "usd", days = 30) {
  return fetchFromCoinGecko(`/coins/${encodeURIComponent(id)}/market_chart`, {
    vs_currency,
    days,
  });
}

// optional: range chart (from & to are unix timestamps)
export async function getCoinChartRange(id, vs_currency = "usd", from, to) {
  return fetchFromCoinGecko(`/coins/${encodeURIComponent(id)}/market_chart/range`, {
    vs_currency,
    from,
    to,
  });
}

// related coins by category (fallback to nearby market caps if category not present)
export async function getCoinsByCategory(category, vs_currency = "usd", per_page = 10, page = 1) {
  return fetchFromCoinGecko(`/coins/markets`, {
    vs_currency,
    category,
    order: "market_cap_desc",
    per_page,
    page,
    sparkline: false,
  });
}

// quick markets list (useful fallback to pick 'related' by rank)
export async function getTopMarkets(vs_currency = "usd", per_page = 100, page = 1) {
  return fetchFromCoinGecko(`/coins/markets`, {
    vs_currency,
    order: "market_cap_desc",
    per_page,
    page,
    sparkline: false,
    price_change_percentage: "1h,24h,7d,30d,1y",
  });
}

export async function getTrending() {
  return fetchFromCoinGecko(`/search/trending`);
}
