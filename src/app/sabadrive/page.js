"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { Search, MapPin, Truck } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function SabaDrivePage() {
  const [activeBanner, setActiveBanner] = useState(0)

  const banners = [
    "/images/sabadrive/banner1.png",
    "/images/sabadrive/banner2.png",
    "/images/sabadrive/banner3.png",
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

      {/* Banner */}
      <section className="relative bg-gradient-to-t from-[#103051] via-[#103051]/100 to-white/0 pb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[#103051] via-[#103051]/85 to-transparent h-[50%] sm:h-[55%] md:h-[60%]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
          <div className="flex items-center bg-white rounded-full px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-md max-w-lg mx-auto lg:max-w-xl">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-500 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="container mx-auto px-6 mt-10 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="relative w-full max-w-[420px] h-[450px] md:max-w-[600px] md:h-[650px] lg:max-w-[700px] lg:h-[750px] flex justify-center md:justify-start md:pl-8 lg:pl-16">
            {banners.map((src, i) => {
              const offset = i - activeBanner
              const translateX =
                offset === 0
                  ? "translate-x-0"
                  : offset < 0
                  ? "-translate-x-12"
                  : "translate-x-12"
              const scale = offset === 0 ? "scale-100" : "scale-90"
              const z = offset === 0 ? "z-30" : "z-10"
              const opacity = offset === 0 ? "opacity-100" : "opacity-90"
              const rotate =
                offset === 0
                  ? "rotate-0"
                  : offset < 0
                  ? "-rotate-[5deg]"
                  : "rotate-[5deg]"

              return (
                <div
                  key={i}
                  className={`absolute top-0 transition-all duration-500 ${translateX} ${scale} ${rotate} ${z} ${opacity}`}
                >
                  <div className="rounded-3xl overflow-hidden shadow-2xl w-[273px] h-[450px] md:w-full md:h-full">
                    <Image
                      src={src}
                      alt={`banner-${i}`}
                      width={273}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mb-6 md:ml-12 text-left flex items-center self-center h-full md:-translate-y-16 lg:-translate-y-28">
            <p className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]">
              <span className="text-[#FFAA01]">Book Your Ride</span>
              <br />
              Around the Holy City!
            </p>
          </div>
        </div>
      </section>

      {/* Form setup trip */}
      <section className="-mt-5 bg-white rounded-t-3xl pt-8 md:pt-10 flex-1 shadow-lg relative z-20">
        <div className="px-6 mt-5">
          <h2 className="text-gray-800 font-bold text-2xl leading-snug mb-3">
            Set up your upcoming trip
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-base leading-snug">
              Tell us about your trip and help transport goods to everyone
            </p>
            <Truck className="w-10 h-10 text-blue-500 drop-shadow-md" />
          </div>
        </div>

        <div className="px-6 mt-4 mb-24">
          <div className="relative">
            <input
              type="text"
              placeholder="Your destination"
              className="w-full rounded-xl border border-gray-200 text-black pl-4 pr-10 py-3 focus:outline-none text-md placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <Link href="/sabadrive/ride">
            <button className="w-full bg-[#103051] text-white py-3 rounded-xl font-semibold shadow mt-5">
              Set Up
            </button>
          </Link>
        </div>
      </section>

      <Navigation active="home" />
    </div>
  )
}
