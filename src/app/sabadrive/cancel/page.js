"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, X } from "lucide-react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Image from "next/image"

export default function CancelRidePage() {
  const router = useRouter()

  const [selectedReason, setSelectedReason] = useState("")
  const [otherReason, setOtherReason] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)

  const reasons = [
    "Waiting for long time",
    "Unable to contact driver",
    "Driver denied to go to destination",
    "Driver denied to come to pickup",
    "Wrong address shown",
    "The price is not reasonable",
  ]

  const handleSubmit = () => {
    const finalReason = selectedReason || otherReason
    if (!finalReason) {
      alert("Please select or enter a reason for cancellation.")
      return
    }

    // tampilkan modal confirm
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    console.log("Ride cancelled because:", selectedReason || otherReason)
    setShowConfirm(false)
    router.push("/sabadrive") // balik ke home/riwayat ride
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#153e68]">
      <Header variant="logo" />

      <main className="flex-1 bg-white rounded-t-3xl shadow-lg mt-4 flex flex-col">
        {/* drag handle */}
        <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mt-2 mb-2" />

        {/* Header Cancel */}
        <div className="flex items-center px-4 py-3 border-b">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-700 font-medium text-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 max-w-2xl w-full mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
            Cancel Taxi
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center">
            Please select the reason of cancellation.
          </p>

          {/* Reason List */}
          <div className="space-y-3">
            {reasons.map((reason, idx) => (
              <label
                key={idx}
                className={`flex items-center border rounded-xl px-3 py-3 cursor-pointer transition ${
                  selectedReason === reason
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="mr-3 w-5 h-5 accent-yellow-500"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  {reason}
                </span>
              </label>
            ))}

            {/* Other Reason */}
            <div className="border rounded-xl px-3 py-2">
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Other..."
                className="w-full text-sm sm:text-base text-gray-700 bg-transparent outline-none resize-none"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="p-4 border-t mb-20">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#103051] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#001a3d] transition"
          >
            Submit
          </button>
        </div>

        <Navigation active="home" />
      </main>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 sm:w-[400px] text-center relative">
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-6xl mb-4">😓</div>
            <h3 className="text-lg font-semibold text-gray-800">
              We&apos;re so sad about your cancellation
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              We will continue to improve our service & satisfy you on the next trip.
            </p>

            <button
              onClick={handleConfirm}
              className="mt-6 w-full bg-[#103051] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#001a3d] transition"
            >
              Back Home
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
