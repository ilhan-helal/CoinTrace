// contexts/CurrencyContext.jsx - UPDATED
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('usd');
  const [currencySymbol, setCurrencySymbol] = useState('$');

  function getSymbolFromCurrency(curr) {
  switch (curr) {
    case "inr": return "₹";
    case "eur": return "€";
    case "gbp": return "£";
    case "jpy": return "¥";
    case "aed": return "د.إ";
    case "aud": return "A$";
    case "cad": return "C$";
    case "chf": return "Fr";
    case "cny": return "¥";
    case "btc": return "₿";
    case "eth": return "Ξ";
    default: return "$"; // usd default
  }
}

  // Load from localStorage on initial render
  useEffect(() => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const urlCurrency = url.searchParams.get("currency");

    const savedCurrency = localStorage.getItem('preferredCurrency');
    const savedSymbol = localStorage.getItem('currencySymbol');

    if (urlCurrency) {
      // URL param wins
      setCurrency(urlCurrency);
      setCurrencySymbol(getSymbolFromCurrency(urlCurrency));
    } else if (savedCurrency && savedSymbol) {
      // fallback to localStorage
      setCurrency(savedCurrency);
      setCurrencySymbol(savedSymbol);
    } else {
      // final fallback → USD
      setCurrency("usd");
      setCurrencySymbol("$");
    }
  }
}, []);

  const updateCurrency = (newCurrency, symbol) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredCurrency', newCurrency);
      localStorage.setItem('currencySymbol', symbol);
    }
    
    // Update URL and reload page - YEH LINE CHANGE HUI HAI
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('currency', newCurrency);
      window.location.href = url.toString(); // ← FULL PAGE RELOAD
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, currencySymbol, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}