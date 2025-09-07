"use client"; 
import Header from "@/components/Header";
import Link from "next/link";

export default function WeatherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e4d7b] to-[#103051] flex flex-col items-center">
      {/* Header */}
      <div className="w-full mb-6">
         <Header />
     </div>
      {/* Weather Card */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="flex-1 flex items-center justify-center w-full">
            <div className="bg-white/20 backdrop-blur-lg w-[90%] h-[85%] rounded-3xl shadow-xl p-6 text-white text-center flex flex-col justify-center">
                <h2 className="text-md font-semibold mb-4">Weather Forecast</h2>

                {/* Sun with Glow */}
                <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-yellow-400 shadow-[0_0_80px_rgba(255,223,0,0.7)] mb-4"></div>
                <p className="text-sm opacity-90">Today, 12 September</p>
                <p className="text-7xl font-bold drop-shadow-lg">34°</p>
                <p className="text-xl font-medium">Sunny</p>
                </div>

                {/* Wind & Humidity */}
                <div className="flex justify-around text-base mt-8">
                <div className="flex flex-col items-center">
                    <span className="text-2xl">💨</span>
                    <p className="mt-1">15 km/h</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-2xl">💧</span>
                    <p className="mt-1">26%</p>
                </div>
                </div>
            </div>
         </div>
      </div>
        <Link href="/sabainfo/weather-forecast/forecast-report"  className="mb-6 px-6 py-3 bg-white/30 backdrop-blur-lg rounded-full text-white font-medium hover:bg-white/40 transition">
          Forecast Report
      </Link>
    </div>
  );
}   