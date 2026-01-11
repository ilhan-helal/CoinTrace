export function Footer() {
  return (
    <footer className="relative mt-24 bg-black/40 backdrop-blur-md border-t border-purple-500/30">
      {/* Top glow */}
      <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-14">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* BRAND */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">𝕮𝓣</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                CoinTrace
              </span>
            </div>

            <p className="text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
              Track markets, analyze assets, and stay ahead in crypto —
              with real-time data and professional-grade insights.
            </p>
          </div>

          {/* PRODUCT LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Product
            </h4>
            <ul className="space-y-3 text-gray-400">
              <a href="/markets"><li className="hover:text-pink-400 transition cursor-pointer">Markets</li></a>
              <a href="/features/portfolio"><li className="hover:text-pink-400 transition cursor-pointer">Portfolio Tracker</li></a>
              <a href="/features/watchlist"><li className="hover:text-pink-400 transition cursor-pointer">Watchlist</li></a>
              <a href="/features/converter"><li className="hover:text-pink-400 transition cursor-pointer">Crypto Converter</li></a>
              <a href="/features/alerts"><li className="hover:text-pink-400 transition cursor-pointer">News</li></a>
              <a href="pricing"><li className="hover:text-pink-400 transition cursor-pointer">Pricing</li></a>
            </ul>
          </div>

          {/* TRUST & TECH */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Trust & Technology
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>📊 Powered by CoinTrace</li>
              <li>🔐 Secure Authentication via Clerk</li>
              <li>⚡ Real-time Market Data</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* DISCLAIMER */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 leading-relaxed">
            ⚠️ <span className="text-gray-400 font-medium">Disclaimer:</span>{" "}
            Cryptocurrency prices are highly volatile. CoinTrace does not provide
            financial advice. All data is for informational purposes only.
            Always do your own research before making investment decisions.
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CoinTrace — Real-time crypto tracking & analytics.
        </div>
      </div>
    </footer>
  );
}
