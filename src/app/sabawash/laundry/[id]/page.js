// src/app/sabawash/laundry/[id]/page.js
"use client"

import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import {
  Search,
  Eye,
  Plus,
  History,
  WashingMachine,
  Shirt,
  Sparkles,
} from "lucide-react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

export default function LaundryDetailPage() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname?.split("/").pop() || "unknown"

  const [laundry] = useState({
    id,
    name: "Bihl Laundry",
    img: "/images/sabawash/laundry.png",
    rating: 4.9,
    reviews: 90,
    distance: "0.9 km",
    eta: "Max. 2.5 Hours",
    status: "Aktif",
    address: "Jalan Example No. 12",
    phone: "+966 5X XXX XXXX",
    startingPrice: "SR 10",
    balance: "SR 400,00",
    services: [
      { key: "simply", label: "Simply", price: "SR 10", time: "1-2 hrs" },
      { key: "clean", label: "Clean", price: "SR 15", time: "2-3 hrs" },
      { key: "iron", label: "Iron", price: "SR 5", time: "Same Day" },
    ],
  })

  function getServiceIcon(key) {
    switch (key) {
      case "simply":
        return <Shirt className="w-6 h-6" />
      case "clean":
        return <WashingMachine className="w-6 h-6" />
      case "iron":
        return <Sparkles className="w-6 h-6" />
      default:
        return <WashingMachine className="w-6 h-6" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat />

      {/* HERO */}
      <div className="relative">
        <div className="relative h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px]">
          <Image
            src={laundry.img}
            alt={laundry.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* search bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-30 w-[92%] max-w-3xl">
          <div className="flex items-center gap-3 bg-white shadow-md rounded-full px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="What would you want to wash?"
              className="flex-1 bg-transparent focus:outline-none text-sm md:text-base text-gray-700"
            />
          </div>
        </div>

        {/* hero title */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg text-center px-4">
            {laundry.name}
          </h2>
        </div>
      </div>

      {/* PROFILE & BALANCE CARD */}
      <section className="py-2 px-4 md:px-8 -mt-5 bg-white rounded-t-3xl pt-8 md:pt-10 flex-1 relative z-20">
        <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-4 border border-[#103051]/25">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* left: profile */}
            <div className="flex items-center gap-3">
              <img
                src="/images/profile.png"
                width={48}
                height={48}
                alt="Profil"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full"
              />
              <div>
                <div className="font-light text-black text-lg md:text-xl">
                  Assalamualaikum, Rafi!
                </div>
                <a
                  href="#"
                  className="flex text-[#2B93FEC2] text-sm hover:underline"
                >
                  Profil &gt;
                </a>
              </div>
            </div>

            {/* right: status */}
            <div className="grid items-end">
              <span className="text-black font-medium">Status</span>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[#103051] font-bold">Aktif</span>
                <span className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"></span>
              </div>
            </div>
          </div>

          {/* balance card */}
          <div className="bg-[#103051] text-white rounded-2xl p-4 md:p-6 mt-4 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-medium text-sm md:text-base">Saldo Anda</div>
                <div className="flex items-center text-2xl md:text-3xl font-bold">
                  SR 400,00
                  <button className="ml-2">
                    <Eye size={25} color="#FFAA01" />
                  </button>
                </div>
                <a
                  href="#"
                  className="text-[#FFAA01] text-sm mt-1 inline-block hover:text-[#FFAA01]"
                >
                  Buka Detail &gt;
                </a>
              </div>

              {/* buttons */}
              <div className="flex gap-6 md:gap-8">
                <div className="grid grid-cols-1 gap-1 text-center">
                  <button className="bg-white text-[#103051] rounded-xl px-4 py-2 font-semibold hover:bg-gray-100">
                    <Plus size={20} />
                  </button>
                  <span className="text-sm md:text-base">Top Up</span>
                </div>

                <div className="grid grid-cols-1 gap-1 text-center">
                  <button className="bg-white text-[#103051] rounded-xl px-4 py-2 font-semibold hover:bg-gray-100">
                    <History size={20} />
                  </button>
                  <span className="text-sm md:text-base">History</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* placeholders */}
      <div className="px-6 md:px-10 mt-6">
        <div className="flex items-center justify-between gap-4">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="flex-1 h-12 md:h-14 rounded-full border border-gray-400"
              />
            ))}
        </div>
      </div>

      {/* services */}
      <div className="px-6 md:px-10 mt-8">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
          Our Services For You
        </h3>

        <div
          className="
            mt-6 
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] 
            gap-6
            justify-items-center
          "
        >
          {laundry.services.map((s) => (
            <button
              onClick={() => router.push(`/sabawash/laundry/${s.key}`)}
              key={s.key}
              className="flex flex-col items-center bg-white rounded-xl p-4 shadow-xl w-full hover:scale-105 transition-transform"
            >
              <div className="p-3 md:p-4 rounded-full bg-[#DD8E23] text-white inline-block">
                {getServiceIcon(s.key)}
              </div>
              <span className="mt-3 text-sm md:text-base text-gray-700">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>


      <div className="h-32" />
      <Navigation active="home" />
    </div>
  )
}
