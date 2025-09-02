"use client"

import Link from "next/link"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import {
    Search,
    Percent,
    MapPin,
    Star,
    DollarSign,
    Heart,
    ChevronRight,
} from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function HomePage() {
    const [activeBanner, setActiveBanner] = useState(0)

    const banners = [
        "/images/sabafood/banner1.png",
        "/images/sabafood/banner2.png",
        "/images/sabafood/banner3.png",
    ]

    const restaurants = [
        {
            name: "Rahwa Sofwa Tower",
            categories: "Rice, Chicken & Nugget, Beverages",
            rating: 4.9,
            delivery: "10 min",
            distance: "0.2 km",
            img: "/resto1.jpg",
        },
        {
            name: "An-Ihl Chicken",
            categories: "Rice, Chicken & Nugget, Beverages",
            rating: 4.9,
            delivery: "15 min",
            distance: "1.0 km",
            img: "/resto2.jpg",
        },
        {
            name: "Araiz Food Restaurant",
            categories: "Rice, Chicken & Nugget, Beverages",
            rating: 4.9,
            delivery: "35 min",
            distance: "1.5 km",
            img: "/resto3.jpg",
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#103051] via-[#103051]/85 to-transparent h-[50%] sm:h-[55%] md:h-[60%]" />
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
                    <div className="flex items-center bg-white rounded-full px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 shadow-md max-w-lg mx-auto lg:max-w-xl">
                        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="What would you like to eat?"
                            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-500 placeholder-gray-400"
                        />
                    </div>
                </div>
                <div className="px-6 mt-4 relative z-10">
                    <p className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] text-left md:text-center md:my-10 lg:whitespace-nowrap">
                        <span className="text-[#FFAA01]">Hungry?</span> We’re on the way!
                    </p>
                </div>
                <div className="pb-8 mt-4 md:pb-12 relative z-10">
                    <div className="relative">
                        <Image
                            src={banners[activeBanner]}
                            alt="SabaFood Promo"
                            width={1200}
                            height={600}
                            className="rounded-2xl w-full max-w-[95%] sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto object-cover shadow-lg transition-all duration-500"
                        />

                        <div className="absolute -bottom-6 w-full flex justify-center space-x-2">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveBanner(i)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        activeBanner === i ? "bg-[#f9b233]" : "bg-white/60"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-4 mb-8 md:mb-10">
                    <button className="w-full bg-white rounded-xl p-3 shadow-sm flex items-center justify-between cursor-pointer">
                        <div className="flex items-center space-x-2">
                        <Percent className="w-5 h-5 text-[#f9a23a]" />
                        <span className="text-sm font-medium text-gray-800">
                            1 promo is available
                        </span>
                        </div>
                        <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-orange-100">
                        <ChevronRight className="w-5 h-5 text-[#f9a23a]" />
                        </span>
                    </button>
                </div>
            </section>

            <section className="-mt-5 bg-white rounded-t-3xl pt-8 md:pt-10 flex-1 shadow-lg relative z-20">
                <div className="px-6">
                    <h2 className="font-semibold text-gray-800 mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Try other ways to SabaFood
                    </h2>
                    <div className="grid grid-cols-4 gap-3 md:gap-6">
                        <Shortcut icon={<MapPin className="w-6 h-6 md:w-8 md:h-8" />} label="Near Me" />
                        <Shortcut icon={<Star className="w-6 h-6 md:w-8 md:h-8" />} label="Best Sellers" />
                        <Shortcut icon={<DollarSign className="w-6 h-6 md:w-8 md:h-8" />} label="Promo" />
                        <Shortcut icon={<Heart className="w-6 h-6 md:w-8 md:h-8" />} label="Healthy" />
                    </div>
                </div>

                <div className="px-6 mt-5 mb-24">
                    <h2 className="font-semibold text-gray-800 mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Recommendation Menu
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {restaurants.map((resto, i) => (
                            <RestaurantCard key={i} {...resto} />
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
        <button className="flex flex-col items-center bg-white rounded-xl p-3 md:p-5 shadow-sm cursor-pointer active:scale-[0.98] transition-transform">
            <div className="p-2 rounded-full bg-[#DD8E23] text-white mb-1 md:mb-2">
                {icon}
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-700">{label}</span>
        </button>
    )
}

function RestaurantCard({ name, categories, rating, delivery, distance, img }) {
    return (
        <button className="w-full text-left flex items-center md:items-start space-x-3 md:space-x-4 mb-4 bg-white rounded-xl p-4 md:p-5 shadow-md cursor-pointer active:scale-[0.99]">
            <Image
                src={img}
                alt={name}
                width={100}
                height={100}
                className="rounded-lg object-cover md:w-28 md:h-28"
            />
            <div className="flex flex-col flex-1">
                <h3 className="font-semibold text-base md:text-lg text-gray-800">{name}</h3>
                <p className="text-xs md:text-sm text-gray-500">{categories}</p>
                <div className="mt-2 flex items-center gap-2">
                    <Stars />
                    <span className="text-sm md:text-base font-semibold text-gray-700">{rating}</span>
                </div>
                <div className="border-b border-gray-200 my-2" />
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                    Delivery in {delivery} <span className="mx-1">•</span> {distance}
                </div>
            </div>
        </button>
    )
}

function Stars() {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                key={i}
                className="w-3.5 h-3.5 text-orange-500 mr-0.5 fill-current"
                fill="currentColor"
            />
            ))}
        </div>
    )
}

function NavItem({ href, icon, label, active }) {
    return (
        <Link href={href} className="cursor-pointer">
            <div className="relative flex flex-col items-center text-[11px] font-medium">
                {active && (
                <span className="absolute -top-2 w-1.5 h-1.5 rounded-full bg-[#103051]" />
                )}
                <div className={active ? "text-[#103051]" : "text-gray-400"}>{icon}</div>
                <span className={active ? "text-[#103051]" : "text-gray-400"}>{label}</span>
            </div>
        </Link>
    )
}
