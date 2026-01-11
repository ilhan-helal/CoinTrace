import { Header } from "@/components/layout/Header";
import Converter from "./Converter";
import { Footer } from "@/components/layout/Footer";

export default async function Page() {
  let coinData = null;

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,solana&vs_currencies=usd,inr,eur,aed,jpy",
      {
        next: { revalidate: 60 }, // ISR (revalidates every 60 sec)
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    coinData = await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  if (!coinData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
        <p>Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white font-sans selection:bg-pink-500 selection:text-white overflow-hidden">
        <Header hideCurrency={true} />
        <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8">
      <Converter coinData={coinData} />
      </div>
      <Footer />
    </div>
  );
}
