"use client";

import { Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import MapWithMarker from "@/components/MapWithMarker";
import Header from "@/components/Header";

export default function LocalMapsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
    <Header/>    
      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-md">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Where are you going to?"
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapWithMarker />
      </div>

      {/* Navigation */}
      <Navigation active="home" />
    </div>
  );
}
