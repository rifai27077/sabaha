"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { useState, useEffect } from "react"
import { MapPin, X } from "lucide-react"
import Image from "next/image"
import SummaryModal from "@/components/SummarySabadriveModal"
import { useRide } from "@/context/RideContext"

export default function FindRidePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { rideData, setRideData } = useRide()
  const lat = -6.3883589583213976
  const lng = 106.80006703131984

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [activeInput, setActiveInput] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const isLoading = searchParams.get("loading")
    const next = searchParams.get("next")

    if (isLoading === "true" && next) {
      setLoading(true)
      setTimeout(() => {
        router.replace(next)
      }, 2000)
    }
  }, [searchParams, router])

  // Pickup suggestions
  const pickupSuggestions = [
    {
      name: "Pullman Hotel Zam-zam Tower",
      address: "Abraj Al Bait Complex, King Abdul Aziz - 38 Rd, Makkah 21955",
    },
    {
      name: "Sofwah Tower",
      address: "Al Safwah Hotel Tower 3, CR9G+HR8, Ajyad St, Al Haram",
    },
    {
      name: "Ajyad Crom Hotel",
      address: "4437 King Abdul Aziz - 38 Rd, Ajyad, Makkah 24231",
    },
    {
      name: "Swissôtel Hotel Makkah",
      address: "King Abdul Aziz - 38 Rd. Endowment, Ajyad Street",
    },
  ]

  // Destination suggestions
  const destinationSuggestions = [
    { name: "Masjid al-Haram", address: "Al Haram, Makkah 24231, Saudi Arabia" },
    { name: "Mina Tent City", address: "Mina, Mecca, Saudi Arabia" },
    { name: "Jamarat Bridge", address: "Mina, Mecca 24231, Saudi Arabia" },
    { name: "Mount Arafat", address: "Arafat, Mecca 24256, Saudi Arabia" },
    { name: "Kaaba", address: "Inside Masjid al-Haram, Makkah 24231" },
  ]

  const filteredPickup = pickupSuggestions.filter((s) =>
    s.name.toLowerCase().includes(pickup.toLowerCase())
  )
  const filteredDestination = destinationSuggestions.filter((s) =>
    s.name.toLowerCase().includes(destination.toLowerCase())
  )

  return (
    <div className="relative min-h-screen w-full">
      {/* MAP */}
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${
          lng - 0.01
        },${lat - 0.02},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`}
        className="absolute inset-0 w-full h-full border-0 pt-14"
        allowFullScreen
      ></iframe>

      <Header variant="logo" />

      {/* Bottom Sheet */}
      <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-30 p-6 pb-10 space-y-5">
        <h2 className="font-bold text-gray-800 text-xl">Find A Your Trip Now!</h2>

        {rideData?.name && (
        <div className="flex items-center gap-3 p-3 border rounded-xl bg-gray-50">
            <Image
            src={rideData.image}
            alt={rideData.name}
            width={56}
            height={56}
            className="w-14 h-14 object-contain"
            />
            <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{rideData.name}</h3>
            <p className="text-sm text-gray-500">{rideData.seats} seats</p>
            </div>
            <p className="font-bold text-gray-900">
            {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(rideData.price)}
            </p>
        </div>
        )}

        {/* Input lokasi */}
        <div className="relative">
          <div className="absolute left-2 top-3 bottom-3 flex flex-col items-center">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <span className="flex-1 w-px bg-gray-400"></span>
            <span className="w-2 h-2 border border-black bg-white"></span>
          </div>

          <div className="ml-6 space-y-2">
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => setActiveInput("pickup")}
              placeholder="Pick-up Location"
              className="w-full text-black bg-gray-100 rounded-lg border border-gray-200 px-3 py-3 
                         focus:outline-none text-[16px] font-normal 
                         placeholder-[#6B6B6B] focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => setActiveInput("destination")}
              placeholder="Enter your destination"
              className="w-full text-black bg-gray-100 rounded-lg border border-gray-200 px-3 py-3 
                         focus:outline-none text-[16px] font-normal 
                         placeholder-[#6B6B6B] focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
        onClick={() => {
        if (pickup && destination) {
            setRideData({ pickup, destination })
            setShowSummary(true)
        }
        }}
        className="w-full bg-[#103051] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#001a3d] transition"
        >
        Set Up
        </button>

        {/* Modal */}
        <SummaryModal
        show={showSummary}
        onClose={() => setShowSummary(false)}
        ride={rideData}
        pickup={pickup}
        destination={destination}
        />

      </div>

      {/* Modal suggestions */}
      {activeInput && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/30">
          <div className="w-full bg-white rounded-t-2xl shadow-xl p-4 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {activeInput === "pickup" ? "Select Pickup" : "Select Destination"}
              </h3>
              <button onClick={() => setActiveInput(null)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <input
              type="text"
              value={activeInput === "pickup" ? pickup : destination}
              onChange={(e) =>
                activeInput === "pickup"
                  ? setPickup(e.target.value)
                  : setDestination(e.target.value)
              }
              autoFocus
              placeholder={
                activeInput === "pickup"
                  ? "Search pickup location..."
                  : "Search destination..."
              }
              className="w-full text-black bg-gray-100 rounded-lg border border-gray-200 px-3 py-3 
                         focus:outline-none text-[16px] font-normal mb-4
                         placeholder-[#6B6B6B] focus:ring-2 focus:ring-blue-500"
            />

            <div className="space-y-2">
              {(activeInput === "pickup" ? filteredPickup : filteredDestination).map(
                (s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg"
                    onClick={() => {
                      if (activeInput === "pickup") setPickup(s.name)
                      else setDestination(s.name)
                      setActiveInput(null)
                    }}
                  >
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{s.name}</p>
                      <p className="text-sm text-gray-500">{s.address}</p>
                    </div>
                  </div>
                )
              )}
              <div
                className="flex items-center gap-3 text-blue-600 font-medium cursor-pointer hover:bg-blue-50 p-3 rounded-lg"
                onClick={() => {
                  if (activeInput === "pickup") setPickup("Set location on map")
                  else setDestination("Set location on map")
                  setActiveInput(null)
                }}
              >
                <MapPin className="w-5 h-5" />
                <span>Set location on map</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-700 font-medium">Processing...</p>
            </div>
        </div>
        )}


      <Navigation active="home" />
    </div>
  )
}

export function useLoadingNavigation(router) {
  return (to) => {
    router.replace("/sabadrive/find?loading=true&next=" + to)
  }
}
