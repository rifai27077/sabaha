"use client"

import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Image from "next/image"
import { MapPin, Car, CreditCard, Wallet } from "lucide-react"
import { useState } from "react"

export default function TripSummaryPage() {
  const searchParams = useSearchParams()

  // Ambil data dari query (ride, pickup, destination, price)
  const ride = {
    name: searchParams.get("ride"),
    seats: searchParams.get("seats"),
    price: Number(searchParams.get("price")),
    image: searchParams.get("image"),
  }

  const pickup = searchParams.get("pickup") || "Pullman Hotel Zam-Zam Tower"
  const destination = searchParams.get("destination") || "Abraj Market"

  // Dummy charge
  const vat = ride.price * 0.1
  const total = ride.price + vat

  // Payment state
  const [payment, setPayment] = useState("wallet")

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        location="Trip Summary"
        className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm"
      />

      {/* Map */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=39.823%2C21.420%2C39.830%2C21.425&layer=mapnik"
        className="w-full h-52 border-0 mt-14"
      ></iframe>

      {/* Content */}
      <div className="p-5 space-y-6">
        <h2 className="font-bold text-gray-800 text-lg">You're Summary Trip</h2>

        {/* Request for trip */}
        <div className="space-y-3 bg-white rounded-xl p-4 shadow">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="font-medium text-gray-900">{pickup}</p>
              <p className="text-sm text-gray-500">Makkah, Saudi Arabia</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">{destination}</p>
              <p className="text-sm text-gray-500">Makkah, Saudi Arabia</p>
            </div>
          </div>
        </div>

        {/* Ride info */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow">
          <div>
            <h3 className="font-semibold text-gray-800">{ride.name}</h3>
            <p className="text-sm text-gray-500">Seats: {ride.seats}</p>
          </div>
          <Image
            src={ride.image || "/images/sabadrive/order/car.png"}
            alt={ride.name}
            width={70}
            height={70}
          />
        </div>

        {/* Charges */}
        <div className="bg-white rounded-xl p-4 shadow space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Standard Price</span>
            <span className="font-medium">SAR {ride.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Vat (10%)</span>
            <span className="font-medium">SAR {vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-gray-900">
              SAR {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-4 shadow space-y-3">
          <h4 className="font-semibold text-gray-800">Select payment method</h4>
          <div
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
              payment === "wallet" ? "border-black bg-gray-50" : "border-gray-200"
            }`}
            onClick={() => setPayment("wallet")}
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-6 h-6 text-yellow-600" />
              <span>My Wallet • SAR 200.00</span>
            </div>
          </div>
          <div
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
              payment === "qris" ? "border-black bg-gray-50" : "border-gray-200"
            }`}
            onClick={() => setPayment("qris")}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <span>QRIS (All Payment Systems)</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={() => alert("Ride Confirmed")}
          className="w-full bg-[#103051] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#001a3d] transition"
        >
          Confirm Ride
        </button>
      </div>

      <Navigation active="home" />
    </div>
  )
}
