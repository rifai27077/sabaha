"use client";

import Navigation from "@/components/Navigation";
import TopNavAndSearch from "@/components/TopNavAndSearch";
import { MapPin, Cloud, Phone, RefreshCw, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SabaInfoPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#103051] to-[#1e4d7b] pb-6 flex flex-col">
      {/* Bagian header biru */}
      <div className="mb-28">
        <TopNavAndSearch />
      </div>

      {/* Bagian putih mulai dari bawah header */}
      <div className="bg-white flex-1 w-full rounded-t-3xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-center text-black mb-6">
          Extra Services
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard icon={<MapPin className="w-8 h-8 text-[#DD8E23]" />} label="Offline Maps" href="/sabainfo/offline-maps" />
          <ServiceCard icon={<Cloud className="w-8 h-8 text-[#DD8E23]" />} label="Weather Forecast" href="/sabainfo/weather-forecast" />
          <ServiceCard icon={<Globe className="w-8 h-8 text-[#DD8E23]" />} label="Language Translator" href="/sabainfo/language-translator" />
          <ServiceCard icon={<Phone className="w-8 h-8 text-[#DD8E23]" />} label="Emergency Contacts" href="/sabainfo/emergency-contact" />
          <ServiceCard icon={<RefreshCw className="w-8 h-8 text-[#DD8E23]" />} label="Currency Converter" href="/sabainfo/currency-converter" />
        </div>
      </div>

      <Navigation active="home" />
    </div>
  );
}

function ServiceCard({ icon, label, href }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center hover:bg-gray-100 hover:scale-105 transition"
    >
      {icon}
      <p className="text-sm font-medium text-gray-700 mt-2">{label}</p>
    </button>
  );
}
