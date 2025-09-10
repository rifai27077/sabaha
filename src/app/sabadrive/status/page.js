"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Image from "next/image"
import { Phone, MessageSquare } from "lucide-react"
import { useRide } from "@/context/RideContext"

function RideStatusContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { rideData } = useRide()

  // Ambil data ride dari query
  const ride = {
    name: searchParams.get("ride"),
    price: parseFloat(searchParams.get("price")) || 0,
    pickup: searchParams.get("pickup"),
    destination: searchParams.get("destination"),
    paymentMethod: searchParams.get("payment"),
  }

  // Driver dummy data
  const driver = {
    name: "Andiniswari Nur",
    distance: "900m (5mins away)",
    rating: 4.6,
    reviews: 52,
    image: "/driver.jpg",
    carImage: "/car.png",
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* MAP */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=106.79,-6.40,106.81,-6.37&layer=mapnik&marker=-6.3883,106.8000"
        className="absolute inset-0 w-full h-full border-0 pt-16"
        allowFullScreen
      ></iframe>

      <Header variant="logo" />

      {/* Bottom Sheet */}
      <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-30 p-6 space-y-5 max-h-[60vh] overflow-y-auto">
        {/* Timer */}
        <p className="text-gray-700 font-medium">
          Your driver is coming in <span className="font-semibold">3:35</span>
        </p>

        {/* Driver Info */}
        <div className="flex items-center justify-between p-3 border rounded-xl bg-gray-50">
          <div className="flex items-center gap-3">
            <Image
              src={driver.image}
              alt={driver.name}
              width={50}
              height={50}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{driver.name}</h3>
              <p className="text-sm text-gray-500">{driver.distance}</p>
              <p className="text-xs text-yellow-600">
                ⭐ {driver.rating} ({driver.reviews} reviews)
              </p>
            </div>
          </div>
          <Image
            src={driver.carImage}
            alt="Car"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Ride Info */}
        <div className="space-y-2">
          <h4 className="text-gray-600 font-medium">Trip Details</h4>
          <div className="bg-gray-50 border p-3 rounded-xl">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">From:</span> {rideData.pickup}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">To:</span> {rideData.destination}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <h4 className="text-gray-600 font-medium">Payment Method</h4>
          <div className="bg-yellow-100/80 border border-amber-500 p-3 rounded-xl flex items-center justify-between">
            <span className="text-gray-800 font-semibold capitalize">
              {rideData.payment}
            </span>
            <span className="text-xl font-bold text-gray-900">
              SAR {rideData.price}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t pt-4 gap-3 mb-3">
          <button
            onClick={() => router.push("/sabadrive/call")}
            className="flex flex-col items-center text-[#103051] w-16"
          >
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-xs">Call</span>
          </button>

          <button
            onClick={() => router.push("/sabadrive/chat")}
            className="flex flex-col items-center text-[#103051] w-16"
          >
            <MessageSquare className="w-6 h-6 mb-1" />
            <span className="text-xs">Message</span>
          </button>

          <button
            onClick={() => router.push("/sabadrive/cancel")}
            className="flex-1 bg-[#103051] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#001a3d] transition"
          >
            Cancel Ride
          </button>
        </div>
      </div>

      <Navigation active="home" />
    </div>
  )
}

export default function RideStatusPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <RideStatusContent />
    </Suspense>
  )
}
