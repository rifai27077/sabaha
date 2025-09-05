"use client"

import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Link from "next/link"
import { useState } from "react"

export default function MuthowwifPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [selected, setSelected] = useState("umroh-set")

  const services = [
    { id: "umroh-set", name: "Umroh Set", subtitle: "3-4 Hours", priceLabel: "SAR 200", group: "Set" },
    { id: "tawaf", name: "Tawwaf", subtitle: "1 Hours", priceLabel: "SAR 95", group: "All" },
    { id: "sai", name: "Sa’i", subtitle: "1 Hours", priceLabel: "SAR 115", group: "All" },
    { id: "others", name: "Others", subtitle: "Custom Your Pray With Us", priceLabel: "SAR 15 - 100", group: "Custom" },
  ]

  const filtered = services.filter(s => {
    if (activeTab === "All") return true
    if (activeTab === "Set") return s.group === "Set"
    if (activeTab === "Custom") return s.group === "Custom"
    return true
  })

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat showSettings />
      <section className="-mt-1 bg-white rounded-t-3xl pt-4 px-4 flex-1 shadow-md">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-4 mt-2">
            <div className="flex flex-col items-center">
              <div className="w-24 h-1.5 bg-gray-200 rounded-full mb-3" />
              <h2 className="text-[#0f2f51] font-semibold text-base">Select Muthowwif Services</h2>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Set","All","Custom"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    activeTab === tab ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 divide-y">
              {filtered.map(item => (
                <label key={item.id} className="flex items-center py-3 cursor-pointer">
                  <input
                    type="radio"
                    name="muthowwif-service"
                    value={item.id}
                    checked={selected === item.id}
                    onChange={() => setSelected(item.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border ${
                      selected === item.id ? "border-blue-600" : "border-gray-300"
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${selected === item.id ? "bg-blue-600" : "bg-transparent"}`} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm font-semibold text-gray-900">{item.priceLabel}</div>
                    </div>
                    <div className="text-xs text-gray-500">{item.subtitle}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Proceed button to Choose Slot & Confirm Details */}
          <div className="mt-5">
            <Link
              href={{
                pathname: "/sabapray/muthowwif/confirm",
                query: { type: services.find(s => s.id === selected)?.name || "Umroh Set" },
              }}
              className="block w-full"
              aria-label="Next to Choose Slot & Confirm Details"
            >
              <button type="button" className="w-full bg-[#1e4d7b] text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.99]">
                Next
              </button>
            </Link>
          </div>
        </div>
        <div className="h-28" />
      </section>
      <Navigation active="home" />
    </div>
  )
}