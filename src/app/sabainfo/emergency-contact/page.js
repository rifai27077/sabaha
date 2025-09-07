"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import TopNavAndSearch from "@/components/TopNavAndSearch";
import { Phone, AlertTriangle } from "lucide-react";

export default function EmergencyContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <TopNavAndSearch title="Emergency Contact" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-4 space-y-4 mt-4">
        {/* SOS Card */}
        <div className="w-full max-w-md">
          <div className="bg-red-500 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-lg font-bold">Are you in an emergency?</h2>
            </div>
            <p className="text-sm mb-4 opacity-90">
              Press the button below and help will get to you fast.
            </p>
            <Link href="/sabainfo/emergency-contact/sos">
              <button className="w-full bg-white text-red-600 font-bold py-2 rounded-lg shadow-sm hover:bg-red-50 transition">
                SOS
              </button>
            </Link>
          </div>
        </div>

        {/* Dial Number Card */}
        <div className="w-full max-w-md">
          <div className="bg-blue-100 text-blue-900 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Phone className="w-6 h-6" />
              <h2 className="text-lg font-bold">Emergency Dial Number</h2>
            </div>
            <Link href="/sabainfo/emergency-contact/dial">
              <button className="w-full bg-white text-blue-600 font-bold py-2 rounded-lg shadow-sm flex items-center justify-center space-x-2 hover:bg-blue-50 transition">
                <Phone className="w-5 h-5" />
                <span>Dial</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}
