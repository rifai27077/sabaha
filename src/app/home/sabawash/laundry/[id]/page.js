// src/app/sabawash/laundry/[id]/page.js
"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  Search,
  Eye,
  Plus,
  History,
  Clock,
  Star,
  MapPin,
  Phone,
  Heart,
  ChevronRight,
  DollarSign,
} from "lucide-react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

export default function LaundryDetailPage() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname?.split("/").pop() || "unknown"

  // sample data — ganti dengan fetch API / server data sesuai id
  const [laundry, setLaundry] = useState({
    id,
    name: "Bihl Laundry",
    img: "/images/sabawash/laundry2.jpg",
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
      { key: "wash", label: "Wash", price: "SR 8", time: "1-2 hrs" },
      { key: "iron", label: "Iron", price: "SR 5", time: "Same Day" },
    ],
  })

  const [fav, setFav] = useState(false)
  const [activeService, setActiveService] = useState(laundry.services[0].key)
  const [showMore, setShowMore] = useState(false)

  // keep hero search focus clickable but not submit
  const handleSearchClick = (e) => {
    e.stopPropagation()
    // route to search if needed
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header uses router.back() inside */}
      <Header location="Pullman Hotel Zam-Zam Tower" showChat />

      {/* HERO */}
      <div className="relative">
        {/* hero image */}
        <div className="relative h-[300px] sm:h-[360px] md:h-[420px]">
          <Image
            src={laundry.img}
            alt={laundry.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        </div>

        {/* search pill floating on hero (center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-6 z-40 w-[92%] max-w-3xl">
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center gap-3 bg-white/95 shadow-md rounded-full px-4 py-3"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-500 text-sm">What would you want to wash?</span>
          </button>
        </div>

        {/* hero title big, positioned lower */}
        <div className="absolute left-6 right-6 bottom-4 z-40">
          <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl drop-shadow-lg">
            {laundry.name}
          </h2>
        </div>
      </div>

      {/* BIG OVERLAPPING CARD (profil + saldo) */}
      <section className="py-2">

        {/* Card putih utama */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-4">

                {/* Atas: Foto + Status */}
                <div className="flex items-center justify-between">

                    {/* Kiri: Foto + Sapaan */}
                    <div className="flex items-center gap-2">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profil" className="w-12 h-12 rounded-full"/>

                        <div>
                            <div className="font-light text-black text-lg">
                                Assalamualaikum, Rafi!
                            </div>

                            <a href="#" className="flex text-[#2B93FEC2] text-sm hover:underline">Profil &gt;</a>
                        </div>
                    </div>

                    {/* Kanan: Status */}
                    <div className="grid flex-col items-end">
                        <span className="text-black font-medium">Status</span>
                        <div className="flex items-center gap-2">
                        <span className="text-[#103051] font-bold">Aktif</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"></span>
                        </div>
                    </div>
                </div>

                {/* Card saldo di dalam card putih */}
                <div className="bg-[#103051] text-white rounded-2xl p-4 mt-4 shadow-xl">
                    <div className="flex items-center justify-between">
                        {/* Kiri: Saldo + Detail */}
                        <div>
                            <div className="font-medium text-sm">Saldo Anda</div>
                            <div className="flex items-center text-2xl font-bold"> SR 400,00
                                <button className="ml-2"><Eye size={25} color="#FFAA01" /></button>
                            </div>
                            <a href="#" className="text-[#FFAA01] text-sm mt-1 inline-block hover:text-[#FFAA01]"> Buka Detail &gt; </a>
                        </div>

                        {/* Kanan: Tombol sejajar */}
                        <div className="flex gap-3">
                            <div className="grid grid-cols-1 gap-1 text-center">
                                <button className="bg-white text-[#103051] rounded-xl px-4 py-2 font-semibold hover:bg-gray-100"><Plus size={20} /></button>
                                <span>Top Up</span>
                            </div>

                            <div className="grid grid-cols-1 gap-1 text-center">
                                <button className="bg-white text-[#103051] rounded-xl px-4 py-2 font-semibold hover:bg-gray-100"><History size={20} /></button>
                                <span>History</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      {/* oval placeholders row (three big rounded rectangles) */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 h-12 rounded-full border border-gray-200" />
          <div className="flex-1 h-12 rounded-full border border-gray-200" />
          <div className="flex-1 h-12 rounded-full border border-gray-200" />
        </div>
      </div>

      {/* Services section */}
      <div className="px-6 mt-8">
        <h3 className="text-2xl font-extrabold text-gray-900 text-center">Our Services For You</h3>

        <div className="mt-6 grid grid-cols-3 gap-6 justify-items-center">
          {/* each shortcut */}
          <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-xl">
            <div className="p-3 rounded-lg bg-white shadow-md">
              {/* replace svg with icon */}
              <div className="p-3 rounded-full bg-[#DD8E23] text-white inline-block"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v18H3z"/></svg></div>
            </div>
            <span className="mt-3 text-sm text-gray-700">Simply</span>
          </div>

          <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-xl">
            <div className="p-3 rounded-lg bg-white shadow-md">
              <div className="p-3 rounded-full bg-[#DD8E23] text-white inline-block"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/></svg></div>
            </div>
            <span className="mt-3 text-sm text-gray-700">Clean</span>
          </div>

          <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-xl">
            <div className="p-3 rounded-lg bg-white shadow-md">
              <div className="p-3 rounded-full bg-[#DD8E23] text-white inline-block"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="16"/></svg></div>
            </div>
            <span className="mt-3 text-sm text-gray-700">Iron</span>
          </div>
        </div>
      </div>

      {/* small spacer for styles */}
      <div className="h-32" />

      {/* bottom sticky nav */}
      <Navigation active="home" />
    </div>
  )
}
