"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import TopNavAndSearch from "@/components/TopNavAndSearch";
import Image from "next/image";

export default function CurrencyConverterPage() {
  const [sar, setSar] = useState("");
  const [idr, setIdr] = useState("");
  const [exchangeRate, setExchangeRate] = useState(4300); // default sementara

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate.host/latest?base=SAR&symbols=IDR");
        const data = await res.json();
        if (data?.rates?.IDR) {
          setExchangeRate(data.rates.IDR);
        }
      } catch (error) {
        console.error("Gagal ambil kurs:", error);
      }
    }
    fetchRate();
  }, []);

  // fungsi ketika klik tombol
  const handleConvert = () => {
    if (sar) {
      setIdr((sar * exchangeRate).toFixed(2));
    } else {
      setIdr("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavAndSearch location="SabalInfo" showChat={false} showSettings />

      <div className="flex-1 p-4">
        <h2 className="text-center text-lg font-semibold mb-2 text-black">
          Currency Converter
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Check live rates, set rate alerts, receive notifications and more.
        </p>

        <div className="bg-white shadow-md rounded-2xl p-4">
          {/* SAR Input */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image src="/images/sabainfo/arab flag.jpeg" alt="US Flag" width={24} height={24} className="w-6 h-6 rounded-full" />
              <span className="text-black">SAR</span>
            </div>
            <input
              type="number"
              value={sar}
              onChange={(e) => setSar(e.target.value)}
              className="w-30 p-1.5 border text-black border-gray-400 rounded-md text-right"
            />
          </div>

          {/* Convert Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleConvert}
              className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
            >
              Convert ⇄
            </button>
          </div>

          {/* IDR Output */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image src="/images/sabainfo/indonesia flag.jpeg" alt="Indonesian Flag" width={24} height={24} className="w-6 h-6 rounded-full" />
              <span className="text-black">IDR</span>
            </div>
            <input
              type="number"
              value={idr}
              readOnly
              className="w-30 p-1.5 border text-black border-gray-400 rounded-md text-right bg-gray-100"
            />
          </div>

          {/* Exchange Rate */}
          <p className="text-center text-sm text-gray-500">Indicative Exchange Rate</p>
          <p className="text-center text-lg font-semibold text-black">
            1 SAR = {exchangeRate} IDR
          </p>
        </div>
      </div>

      <Navigation active="home" />
    </div>
  );
}
