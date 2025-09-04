"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import {
  Search,
  WashingMachine,
  Shirt,
  Droplet,
  Star,
    Icon,
  MapPin,
  Clock,
} from "lucide-react"
import { ironingBoard } from '@lucide/lab';
import Image from "next/image"
import { useState, useEffect } from "react"

export default function SabaWashPage() {
  const [activeBanner, setActiveBanner] = useState(0)

  const banners = [
    "/images/sabawash/banner1.png",
    "/images/sabawash/banner2.png",
    "/images/sabawash/banner3.png",
  ]

  const laundries = [
    {
      id: "sofwah-laundry",
      name: "Sofwah Laundry",
      rating: 4.8,
      time: "Max. 3 Hours",
      distance: "1.0 km",
      reviews: 190,
      img: "/images/sabawash/laundry1.jpg",
    },
    {
      id: "bihl-laundry",
      name: "Bihl Laundry",
      rating: 4.9,
      time: "Max. 2.5 Hours",
      distance: "0.9 km",
      reviews: 90,
      img: "/images/sabawash/laundry2.jpg",
    },
    {
      id: "champion-cleaners",
      name: "Champion Cleaners",
      rating: 4.7,
      time: "Max. 2 Hours",
      distance: "1.5 km",
      reviews: 183,
      img: "/images/sabawash/laundry3.jpg",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [banners.length])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat />

      <section className="relative bg-gradient-to-t from-[#103051] via-[#103051]/100 to-white/0 pb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[#103051] via-[#103051]/85 to-transparent h-[50%]" />

        <div className="container mx-auto px-4 mt-6 relative z-10">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md max-w-lg mx-auto">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="What would you want to wash?"
              className="flex-1 bg-transparent outline-none text-sm text-gray-500"
            />
          </div>
        </div>

        <div className="px-6 mt-4 relative z-10">
          <p className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] text-left md:text-center md:my-10 lg:whitespace-nowrap">
            Find The Closest Your <span className="text-[#1DA1F2]">Laundry</span>!
          </p>
        </div>

        <div className="pb-8 mt-4 md:pb-12 relative z-10">
          <div className="relative">
            <Image
              src={banners[activeBanner]}
              alt="SabaWash Promo"
              width={1200}
              height={600}
              className="rounded-2xl w-full max-w-[95%] mx-auto object-cover shadow-lg transition-all duration-700 ease-in-out"
            />

            <div className="absolute -bottom-6 w-full flex justify-center space-x-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`w-2 h-2 rounded-full ${
                    activeBanner === i ? "bg-blue-500" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-5 bg-white rounded-t-3xl pt-8 flex-1 shadow-lg relative z-20">
        <div className="px-6">
          <h2 className="font-semibold text-gray-800 mb-4 text-lg">
            Our Services For You
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <Shortcut icon={<WashingMachine className="w-6 h-6" />} label="Simply" />
            <Shortcut icon={<Droplet className="w-6 h-6" />} label="Clean" />
            <Shortcut icon={<Shirt className="w-6 h-6" />} label="Wash" />
            <Shortcut icon={<Icon iconNode={ironingBoard} className="w-6 h-6" />} label="Iron" />
          </div>
        </div>

        <div className="px-6 mt-8 mb-24">
          <h2 className="font-semibold text-gray-800 mb-3 text-lg">
            Recommendation Menu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {laundries.map((laundry) => (
              <LaundryCard key={laundry.id} {...laundry} />
            ))}
          </div>
        </div>
      </section>

      <Navigation active="home" />
    </div>
  )
}

function Shortcut({ icon, label }) {
  return (
    <button className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm cursor-pointer">
      <div className="p-2 rounded-full bg-[#DD8E23] text-white mb-1">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  )
}

function LaundryCard({ id, name, rating, time, distance, reviews, img }) {
  return (
    <Link href={`/home/sabawash/laundry/${id}`} className="block">
      <div className="w-full text-left flex items-center space-x-3 mb-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition">
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          className="rounded-lg object-cover w-24 h-24"
        />
        <div className="flex flex-col flex-1">
          <h3 className="font-semibold text-base text-gray-800">{name}</h3>
          <div className="mt-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {time} • {distance}
          </div>
        </div>
      </div>
    </Link>
  )
}
