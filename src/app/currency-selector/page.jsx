'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { useRouter } from 'next/navigation';

const popularCurrencies = [
  { id: 'usd', symbol: '$', name: 'US Dollar' },
  { id: 'eur', symbol: '€', name: 'Euro' },
  { id: 'gbp', symbol: '£', name: 'British Pound' },
  { id: 'jpy', symbol: '¥', name: 'Japanese Yen' },
  { id: 'inr', symbol: '₹', name: 'Indian Rupee' },
  { id: 'aed', symbol: 'د.إ', name: 'Dirham' },
  { id: 'aud', symbol: 'A$', name: 'Australian Dollar' },
  { id: 'cad', symbol: 'C$', name: 'Canadian Dollar' },
  { id: 'chf', symbol: 'Fr', name: 'Swiss Franc' },
  { id: 'cny', symbol: '¥', name: 'Chinese Yuan' },
  { id: 'btc', symbol: '₿', name: 'Bitcoin' },
  { id: 'eth', symbol: 'Ξ', name: 'Ethereum' },
];

export default function CurrencySelector() {
  const { currency, updateCurrency } = useCurrency();
  const router = useRouter();

  const handleCurrencyChange = (newCurrency, symbol) => {
    updateCurrency(newCurrency, symbol);
    
    // Add a small delay before going back to ensure state updates
    setTimeout(() => {
      router.back();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Select Currency
          </h1>
          
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
            <div className="space-y-3">
              {popularCurrencies.map((curr) => (
                <button
                  key={curr.id}
                  onClick={() => handleCurrencyChange(curr.id, curr.symbol)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    currency === curr.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{curr.name}</div>
                      <div className="text-sm opacity-70">{curr.id.toUpperCase()}</div>
                    </div>
                    <div className="text-lg font-bold">{curr.symbol}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}