"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronLeft, ChevronDown } from "lucide-react"

export default function MitraJob() {
    const router = useRouter()
    const [location, setLocation] = useState("")
    const [services, setServices] = useState({
        sabaFood: false,
        sabaWash: false,
        sabaPray: false,
        sabaGuide: false,
        sabaDrive: false,
    })

    const handleCheckbox = (name) => {
        setServices((prev) => ({
        ...prev,
        [name]: !prev[name],
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!location) {
        alert("Lokasi operasional wajib dipilih")
        return
        }
        router.push("/mitra/documents")
    }

    return (
        <div className="min-h-screen bg-white px-6 sm:px-8 lg:px-12 py-8 flex justify-center">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f2f51]">
                            Mitra SAHABA
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 leading-snug">
                            Sesuaikan Job SAHABA Di <br /> Bawah Ini!
                        </p>
                    </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#103051] text-white mb-6 hover:bg-[#0c243d] transition"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    <div className="relative">
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={`w-full h-12 sm:h-14 bg-gray-100 rounded-xl pl-4 pr-10 text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                location ? "text-gray-800" : "text-gray-400"
                            }`}
                        >
                            <option value="">Lokasi Operasional</option>
                            <option value="makkah">Makkah</option>
                            <option value="madinah">Madinah</option>
                            <option value="jeddah">Jeddah</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
                    </div>

                    <div>
                        <p className="text-sm sm:text-base text-gray-700 mb-2 sm:mb-3">
                            Tipe Layanan
                        </p>
                        <div className="space-y-3 sm:space-y-4">
                            {[
                                { key: "sabaFood", label: "SabaFood" },
                                { key: "sabaWash", label: "SabaWash" },
                                { key: "sabaPray", label: "SabaPray" },
                                { key: "sabaGuide", label: "SabaGuide" },
                                { key: "sabaDrive", label: "SabaDrive" },
                            ].map((item) => (
                                <label
                                    key={item.key}
                                    className="flex items-center h-12 sm:h-14 bg-gray-100 rounded-xl px-4 cursor-pointer"
                                >
                                <input
                                    type="checkbox"
                                    checked={services[item.key]}
                                    onChange={() => handleCheckbox(item.key)}
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 rounded mr-3 sm:mr-4"
                                />
                                <span className="text-sm sm:text-base text-gray-800">
                                    {item.label}
                                </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full h-12 sm:h-14 rounded-full bg-[#103051] text-white text-sm sm:text-base font-medium hover:bg-[#0c243d] transition"
                    >
                        Lanjut
                    </button>
                </form>
            </div>
        </div>
    )
}
