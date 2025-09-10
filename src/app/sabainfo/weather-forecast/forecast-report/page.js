
"use client";

import { ArrowLeft, Cloud, Sun, CloudRain, CloudLightning } from "lucide-react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function WeatherForecastPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat showSettings />

      <div className="flex-1 p-4">
        <div className="flex items-center justify-between text-white mb-4">
          <button 
          onClick={() => router.back()}
          className="p-2 cursor-pointer">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold">Weather Forecast</h2>
          <span>Sep, 12</span>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-4 text-white">
          <h3 className="text-md font-semibold mb-2">Today</h3>
          <div className="flex justify-between items-center mb-4">
            {[29, 26, 24, 23, 22].map((temp, index) => (
              <div key={index} className="flex flex-col items-center">
                {index === 2 ? (
                  <div className="p-2 bg-white/30 rounded-full">
                    <Cloud className="w-6 h-6" />
                  </div>
                ) : (
                  <Sun className="w-6 h-6" />
                )}
                <span>{temp}°C</span>
                <span>{15 + index}:00</span>
              </div>
            ))}
          </div>

          <h3 className="text-md font-semibold mb-2">Next Forecast</h3>
          <div className="space-y-2">
            {[
              { day: "Sep, 13", icon: <CloudLightning />, temp: 21 },
              { day: "Sep, 14", icon: <Cloud />, temp: 22 },
              { day: "Sep, 15", icon: <Sun />, temp: 34 },
              { day: "Sep, 16", icon: <Cloud />, temp: 27 },
              { day: "Sep, 17", icon: <CloudRain />, temp: 32 },
            ].map((forecast, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{forecast.day}</span>
                <div className="flex items-center">
                  {forecast.icon}
                  <span className="ml-2">{forecast.temp}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation active="home" />
    </div>
  );
}