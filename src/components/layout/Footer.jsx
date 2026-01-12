export function Footer() {
  return (
    <footer className="relative mt-24 bg-black/40 backdrop-blur-md border-t border-purple-500/30">
      {/* Top ambient glow */}
      <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center md:text-left">

          {/* BRAND */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">𝕮𝓣</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                CoinTrace
              </span>
            </div>

            <p className="text-gray-400 max-w-sm leading-relaxed text-sm md:text-base">
              Track markets, analyze assets, and stay ahead in crypto with
              real-time data and professional-grade insights.
            </p>
          </div>

          {/* PRODUCT LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Product
            </h4>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              {[
                ["Markets", "/markets"],
                ["Portfolio Tracker", "/features/portfolio"],
                ["Watchlist", "/features/watchlist"],
                ["Crypto Converter", "/features/converter"],
                ["News", "/features/alerts"],
                ["Pricing", "/pricing"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-pink-400 transition-colors duration-300 inline-block"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* TRUST & TECH */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Platform
            </h4>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>📊</span>
                <span>Live market analytics</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>🔐</span>
                <span>Secure auth via Clerk</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>⚡</span>
                <span>Real-time price updates</span>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* DISCLAIMER */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            ⚠️ <span className="text-gray-400 font-medium">Disclaimer:</span>{" "}
            Cryptocurrency prices are highly volatile. CoinTrace does not provide
            financial advice. All data is for informational purposes only.
            Always do your own research before investing.
          </p>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} CoinTrace — Real-time crypto tracking & analytics
        </div>
      </div>
    </footer>
  );
}
