// src/app/api/coin/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get("currency") || "inr";

  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`;

    const response = await fetch(url);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data" }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
