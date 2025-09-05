"use client"

import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, Users, LifeBuoy, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export default function SabaPrayPage() {
  const [activeBanner, setActiveBanner] = useState(0)
  const banners = [
    "/images/sabapray/sabapray1.jpg",
    "/images/sabapray/sabapray2.jpg",
    "/images/sabapray/sabapray3.png",
  ]

  useEffect(() => {
    const id = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(id)
  }, [banners.length])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat showSettings={false} showInfo={false} />

      <section className="relative bg-gradient-to-t from-[#103051] via-[#103051]/100 to-white/0 pb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[#103051] via-[#103051]/85 to-transparent h-[55%]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-md max-w-lg mx-auto lg:max-w-xl">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Do You Want Umrah?"
              className="flex-1 bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="pb-6 mt-4 relative z-10">
          <div className="relative w-full flex justify-center">
            <Image
              src={banners[activeBanner]}
              alt="SabaPray"
              width={1200}
              height={800}
              className="rounded-2xl w-[90%] max-w-md sm:max-w-2xl object-cover shadow-lg"
            />
            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col space-y-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to banner ${i + 1}`}
                  onClick={() => setActiveBanner(i)}
                  className={`w-2 h-2 rounded-full ${activeBanner === i ? "bg-[#f9b233]" : "bg-white/60"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 mt-2 relative z-10">
          <p className="text-white font-extrabold leading-tight text-3xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
            Discover <span className="text-[#FFAA01]">Prayer</span> <span className="text-[#FFAA01]">Services</span> Near You!
          </p>
        </div>
      </section>

      <section className="-mt-4 bg-white rounded-t-3xl pt-6 flex-1 shadow-lg relative z-20">
        <div className="px-6">
          <div className="text-center">
            <h3 className="text-gray-800 font-semibold">Your Spiritual Journey Starts Here</h3>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <FeatureCard label="Muthowwif" variant="sparkles" href="/sabapray/muthowwif" />
            <FeatureCard label="Partner" variant="users" href="/sabapray/partner"/>
            <FeatureCard label="Support" variant="lifebuoy" />
          </div>
        </div>

        <div className="h-28" />
      </section>

      <Navigation active="home" />
    </div>
  )
}

function FeatureCard({ label, variant = "sparkles", href }) {
  const Icon = variant === "users" ? Users : variant === "lifebuoy" ? LifeBuoy : Sparkles

  const Wrapper = ({ children }) =>
    href ? (
      <Link
        href={href}
        aria-label={label}
        className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-md active:scale-[0.98] transition"
      >
        {children}
      </Link>
    ) : (
      <button
        type="button"
        className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-md active:scale-[0.98] transition"
      >
        {children}
      </button>
    )

  return (
    <Wrapper>
      <div className="p-3 rounded-xl bg-[#DD8E23] text-white shadow-sm mb-2">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </Wrapper>
  )
}