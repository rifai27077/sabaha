"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { X, MapPin, Wallet, CreditCard, Star } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRide } from "@/context/RideContext"

export default function SummaryModal({ show, onClose, ride, pickup, destination }) {
  const [payment, setPayment] = useState("wallet")
  const router = useRouter()
  const { rideData, setRideData } = useRide()

  const confirmRide = () => {
    setRideData({ payment: "wallet" }) // contoh default
    router.push("/sabadrive/payment")
  }

  if (!show) return null

  // Hitung VAT dan Total
  const vat = ride.price * 0.05
  const total = ride.price + vat

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="w-full max-h-[85vh] overflow-y-auto bg-white rounded-t-2xl shadow-xl p-5 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-lg">You&apos;re Summary Trip</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Request for trip */}
        <div className="space-y-3 bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold text-gray-800 mb-2">Request for Trip</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="font-medium text-gray-900">{pickup}</p>
              <p className="text-sm text-gray-500">King Abdul Aziz, Makkah, Saudi Arabia</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <p className="font-medium text-gray-900">{destination}</p>
              <p className="text-sm text-gray-500">King Abdul Aziz, Makkah, Saudi Arabia</p>
            </div>
            <span className="ml-auto text-sm font-medium text-gray-700">1.1 km</span>
          </div>
        </div>

        {/* Ride info */}
        <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow">
          <div>
            <h3 className="font-semibold text-gray-800">{ride.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9 (531 reviews)</span>
            </div>
          </div>
          <Image
            src={ride.image || "/images/sabadrive/order/car.png"}
            alt={ride?.name ? `${ride.name} image` : "Default car image"}
            width={90}
            height={60}
            className="rounded"
          />
        </div>

        {/* Charges */}
        <div className="bg-white rounded-xl p-4 shadow space-y-2 text-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Charges</h3>
          <div className="flex justify-between">
            <span className="text-gray-600">Standart Price</span>
            <span className="font-medium text-gray-500">SAR {ride.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Vat (5%)</span>
            <span className="font-medium text-gray-500">SAR {vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Promo Code</span>
            <span className="font-medium text-gray-500">SAR 0.00</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-gray-900">
              SAR {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-4 shadow space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-800">Select payment method</h4>
            <button className="text-sm font-medium text-[#103051]">View All</button>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
              payment === "wallet" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
            }`}
            onClick={() => setPayment("wallet")}
          >
            <Wallet className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-800">My Wallet</p>
              <p className="text-sm text-gray-500">SAR 200.00</p>
            </div>
          </div>

        <div
        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
            payment === "qris"
            ? "border-gray-400 bg-gray-100 text-gray-800"
            : "border-gray-200 text-gray-400"
        }`}
        onClick={() => setPayment("qris")}
        >
        <CreditCard className={`w-6 h-6 ${payment === "qris" ? "text-gray-700" : ""}`} />
        <div>
            <p className="font-medium">QRIS</p>
            <p className="text-sm">All Payment Systems</p>
        </div>
        </div>

        </div>

        {/* Confirm Button */}
        <button
          onClick={confirmRide}
          className="w-full bg-[#103051] text-white py-3 mb-20 rounded-xl font-semibold shadow hover:bg-[#001a3d] transition"
        >
          Confirm Ride
        </button>
      </div>
      
    </div>
  )
}
