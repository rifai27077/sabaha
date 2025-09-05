// src/app/sabawash/clean/page.js
"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    Search,
    Droplet,
    Icon,
    WashingMachine,
    Shirt
} from "lucide-react"
import { ironingBoard } from "@lucide/lab"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { useOrder } from "@/context/SabawashCheckout"

export default function SimplyPage() {
    const router = useRouter()
    const { setOrder } = useOrder()

    const [owner, setOwner] = useState("")
    const [weight, setWeight] = useState("")
    const [activeBanner, setActiveBanner] = useState(0)
    const [activeDate, setActiveDate] = useState(null)
    const [activeTimeSlot, setActiveTimeSlot] = useState(null)
    const [selectedService, setSelectedService] = useState(null)

    const banners = [
        "/images/sabawash/banner1.png",
        "/images/sabawash/banner2.png",
        "/images/sabawash/banner3.png",
    ]

    const dates = [
        { day: "Wed", date: 13, month: "Mar" },
        { day: "Thu", date: 14, month: "Mar" },
        { day: "Fri", date: 15, month: "Mar" },
        { day: "Sat", date: 16, month: "Mar" },
        { day: "Sun", date: 17, month: "Mar" },
    ]

    const time = [
        { range: "2:30 - 4:00", label: "PM" },
        { range: "4:00 - 5:30", label: "PM" },
        { range: "5:30 - 7:00", label: "PM" },
    ]

    const services = [
        {
            id: 1,
            name: "Jacket Suit",
            desc: "Clean, Fresh and Extra Treatment",
            img: "/images/sabawash/add1.jpg",
            eta: "Delivery in 15 min",
        },
        {
            id: 2,
            name: "Blanket",
            desc: "Clean, Fresh and Extra Treatment",
            img: "/images/sabawash/add2.jpg",
            eta: "Delivery in 15 min",
        },
        {
            id: 3,
            name: "Shoes",
            desc: "Clean, Fresh and Extra Treatment",
            img: "/images/sabawash/add3.jpg",
            eta: "Delivery in 15 min",
        },
    ]

    useEffect(() => {
        const t = setInterval(() => {
            setActiveBanner((p) => (p + 1) % banners.length)
        }, 4000)
        return () => clearInterval(t)
    }, [])

    const handleCheckout = () => {
        if (!owner || !weight || activeDate === null || activeTimeSlot === null || !selectedService) {
            alert("Please complete all fields before checkout.")
            return
        }

        setOrder({
            serviceKey: "simply",
            service: selectedService?.name || "Simply",
            weight: `${weight} Kg`,
            date: `${dates[activeDate].day}, ${dates[activeDate].date} ${dates[activeDate].month}`,
            time: time[activeTimeSlot].range,
            pickup: "Pickup",
            itemTotal: 100.5,
            discount: 15,
            serviceFee: 5,
            owner,
        })

        router.push("/sabawash/checkout")
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <Header variant="logo" showChat showSettings />

            {/* Search + Hero */}
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

                {/* Hero text */}
                <div className="px-6 mt-6 relative z-10">
                    <p className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] text-left md:text-center md:my-10 lg:whitespace-nowrap">
                        Making Laundry Simple and Fresh{" "}
                        <span className="text-[#1DA1F2]">Every Day</span>!
                    </p>
                </div>

                {/* Banner */}
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
                                    className={`w-2 h-2 rounded-full ${activeBanner === i ? "bg-blue-500" : "bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Order Item card */}
            <div className="-mt-5 px-4 bg-white rounded-t-3xl pt-8 flex-1 relative z-20">
                <div className="max-w-4xl mx-auto -mt-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Order Item</h3>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 md:p-6">
                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-[#fff7ec] flex flex-col items-center justify-center">
                                <Shirt className="w-5 h-5 text-[#DD8E23]" />
                                <span className="text-[11px] text-[#DD8E23] font-semibold mt-1">
                                    Simply
                                </span>
                            </div>
                            <div className="flex-1 grid gap-3 md:grid-cols-2">
                                <input
                                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#103051]/20"
                                    placeholder="Owner"
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                />
                                <input
                                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#103051]/20"
                                    placeholder="Weight (kg)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date & Time slots */}
            <div className="px-2 mt-6">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Date */}
                    <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-5 no-scrollbar px-2">
                        {dates.map((d, idx) => {
                            const active = idx === activeDate
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveDate(idx)}
                                    className={`min-w-[82px] text-left rounded-lg border 
                        ${active ? "bg-[#FF8A00] text-white" : "bg-white text-gray-800"} 
                        px-4 py-3 shadow-sm`}
                                >
                                    <div className="text-xs">{d.day}</div>
                                    <div className="text-lg font-bold leading-tight">{d.date}</div>
                                    <div className="text-xs opacity-80">{d.month}</div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Time */}
                    <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-3 no-scrollbar px-2">
                        {time.map((ts, idx) => {
                            const active = idx === activeTimeSlot
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTimeSlot(idx)}
                                    className={[
                                        "min-w-[120px] rounded-lg border px-4 py-3 text-center shadow-sm",
                                        active
                                            ? "bg-[#FF8A00] text-white border-[#FF8A00]"
                                            : "bg-white text-gray-900 border-gray-200",
                                    ].join(" ")}
                                >
                                    <div className="text-sm font-semibold leading-tight">
                                        {ts.range}
                                    </div>
                                    <div
                                        className={`text-xs mt-1 ${active ? "text-white/90" : "text-gray-500"
                                            }`}
                                    >
                                        {ts.label}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Additional list */}
            <section className="px-4 mt-8 flex-1">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Additional</h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s) => (
                            <div
                                key={s.id}
                                onClick={() => setSelectedService(s)}
                                className={`cursor-pointer bg-white rounded-xl border shadow-sm p-4 flex items-center gap-4 transition ${selectedService?.id === s.id
                                    ? "border-[#FF8A00] ring-2 ring-[#FF8A00]/50"
                                    : "border-gray-200"
                                    }`}
                            >
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={s.img}
                                        alt={s.name}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{s.name}</h4>
                                    <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                                    <div className="border-t border-gray-200 mt-3 pt-2">
                                        <div className="text-xs text-gray-500">{s.eta} • 1.0 km</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checkout button */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
                <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-[#103051] text-white rounded-lg font-semibold hover:bg-[#0c243e] transition"
                >
                    Proceed to Checkout
                </button>
            </div>

            <div className="h-28" />

            <Navigation active="home" />
        </div>
    )
}
