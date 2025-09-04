// src/app/sabawash/clean/page.js
"use client"

import Image from "next/image"
import { Search, Calendar, ChevronLeft } from "lucide-react"
import { useState } from "react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

export default function CleanPage() {
  const [owner, setOwner] = useState("")
  const [weight, setWeight] = useState("")

  const dates = [
    { day: "Mon", date: "2" },
    { day: "Tue", date: "3" },
    { day: "Wed", date: "4" },
    { day: "Thu", date: "5" },
    { day: "Fri", date: "6" },
    { day: "Sat", date: "7" },
    { day: "Sun", date: "8" },
  ]

  const services = [
    {
      id: 1,
      name: "Hand Wash",
      desc: "Delicate care for your clothes",
      img: "/images/sabawash/clean.png",
    },
    {
      id: 2,
      name: "Dry Cleaning",
      desc: "Premium clean with expert touch",
      img: "/images/sabawash/clean.png",
    },
    {
      id: 3,
      name: "Express Wash",
      desc: "Fast service within hours",
      img: "/images/sabawash/clean.png",
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <Header location="Clean Service" showChat />

      {/* SEARCH BAR */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search laundry service..."
            className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* HERO */}
      <section className="px-4 mt-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#103051]">
          Premium Clean Service
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Fresh and professional care for your clothes
        </p>

        <div className="relative mt-6 h-40 md:h-52 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/sabawash/clean.png"
            alt="Clean Service"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ORDER FORM */}
      <section className="px-4 mt-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h3 className="font-bold text-gray-900 text-lg">Order Details</h3>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Owner Name"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-[#103051]"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 text-sm focus:outline-[#103051]"
            />
          </div>
        </div>
      </section>

      {/* DATE PICKER */}
      <section className="px-4 mt-6">
        <h3 className="font-bold text-gray-900 text-lg mb-3">Pick a Date</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {dates.map((d, i) => (
            <div
              key={i}
              className="min-w-[64px] bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center py-3 hover:bg-[#103051] hover:text-white cursor-pointer transition"
            >
              <span className="text-sm font-medium">{d.day}</span>
              <span className="text-lg font-bold">{d.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="px-4 mt-8 flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-4">
          Additional Services
        </h3>
        <div className="space-y-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 bg-white border rounded-2xl shadow-sm p-4"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{s.name}</h4>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPACER */}
      <div className="h-28" />

      {/* BOTTOM NAV */}
      <Navigation active="home" />
    </div>
  )
}
