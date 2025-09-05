
"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Link from "next/link"

export default function SabaPrayServicesPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [selected, setSelected] = useState("5-times-pray")

  const services = [
    { id: "5-times-pray", name: "5 Times Pray", subtitle: "5 Times Available", priceLabel: "SAR 15", group: "Unit" },
    { id: "sunna-pray", name: "Sunna Pray", subtitle: "Custom Times", priceLabel: "SAR 10", group: "All" },
    { id: "itikaf", name: "I'tikaf", subtitle: "Custom Times", priceLabel: "SAR 25", group: "Custom" },
    { id: "others", name: "Others", subtitle: "Custom Your Pray With Us", priceLabel: "SAR 10 - 50", group: "Custom" },
  ]

  const filtered = services.filter(s => {
    if (activeTab === "All") return true
    if (activeTab === "Unit") return s.group === "Unit"
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
              <h2 className="text-[#0f2f51] font-semibold text-base">Select Partner Services</h2>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["Unit", "All", "Custom"].map(tab => (
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
                    name="service"
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

          <div className="mt-5">
            <Link
              href={{
                pathname: "/sabapray/partner/confirmdetail",
                query: { type: services.find(s => s.id === selected)?.name || "5 Times Pray" },
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