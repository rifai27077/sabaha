"use client";

import { useState } from "react";
import TopNavAndSearch from "@/components/TopNavAndSearch";
import Navigation from "@/components/Navigation";
import { MapPin } from "lucide-react";

export default function EmergencyPage() {
  const [isSOS, setIsSOS] = useState(true);

  const toggleState = () => {
    setIsSOS((prev) => !prev);
  };

  const handleChangeLocation = () => {
    alert("Ganti lokasi darurat di sini!");
    // nanti bisa diarahkan ke halaman map / modal input lokasi
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <TopNavAndSearch title="Emergency Contact" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* SOS / On the Way Button */}
        <div
          onClick={toggleState}
          className="relative w-60 h-60 flex items-center justify-center cursor-pointer"
        >
          {/* Outer Ring */}
          <div className="absolute w-60 h-60 rounded-full bg-red-300 animate-ping"></div>
          {/* Middle Ring */}
          <div className="absolute w-48 h-48 rounded-full bg-red-400"></div>
          {/* Inner Circle */}
          <div
            className={`absolute w-36 h-36 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all ${
              isSOS ? "bg-red-600" : "bg-orange-500"
            }`}
          >
            {isSOS ? "SOS" : "On the Way"}
          </div>
        </div>

        {/* Location Info */}
        <div className="mt-8 w-full max-w-md bg-white border rounded-xl shadow p-4 flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-pink-500" />
          </div>

          {/* Text + Button */}
          <div className="flex flex-col flex-1">
            <p className="font-semibold text-gray-900 text-sm">
              Your current Location
            </p>
            <button
              onClick={handleChangeLocation}
              className="text-blue-600 text-xs underline hover:text-blue-800 text-left"
            >
              Custom Your Location For Emergency Situation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}
