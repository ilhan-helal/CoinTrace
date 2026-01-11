"use client";
import React from "react";
import { useState } from "react";
import "./Converter.css";

export default function Converter({ coinData }) {
  const coins = [
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "binancecoin", name: "BNB" },
    { id: "ripple", name: "XRP" },
    { id: "solana", name: "Solana" },
  ];

  const currencies = ["usd", "inr", "eur", "aed", "jpy"];

  const [amount, setAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

const conversionRate = coinData[selectedCoin]?.[selectedCurrency] ?? 0;

const convertedValue =
  amount !== "" && !isNaN(amount)
    ? (parseFloat(amount) * conversionRate).toFixed(2)
    : "0.00";

  return (
    <div className="converter-container">
      {/* Background Elements */}
      <div className="converter-bg-elements">
        <div className="bg-orb-1"></div>
        <div className="bg-orb-2"></div>
      </div>

      <h1 className="converter-title">Crypto Converter</h1>

      {/* Amount Input */}
      <div className="converter-input-group">
        <label className="converter-label">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            setAmount(val === "" ? "" : parseFloat(val));
          }}
          className="converter-input"
          placeholder="Enter amount"
          min="0"
          step="0.01"
        />
      </div>

      {/* Coin Dropdown */}
      <div className="converter-input-group">
        <label className="converter-label">Select Coin</label>
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="converter-select"
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </select>
      </div>

      {/* Currency Dropdown */}
      <div className="converter-input-group">
        <label className="converter-label">Select Currency</label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="converter-select"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Converted Result */}
      <div className="converter-result">
        <div className="converter-result-text">
          {amount} {selectedCoin.toUpperCase()} = {convertedValue}{" "}
          {selectedCurrency.toUpperCase()}
        </div>

        <div className="converter-currency-display">
          <span className="currency-icon">
            {selectedCoin.slice(0, 2).toUpperCase()}
          </span>
          <span>→</span>
          <span className="currency-icon">
            {selectedCurrency.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
