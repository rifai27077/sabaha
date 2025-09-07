"use client"

import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import { ArrowLeft, Star, CheckCircle2, X } from "lucide-react"
import { useState, useEffect } from "react"
import Header from "@/components/Header"

export default function RideStatusPage() {
  const router = useRouter()
  const [selectedTip, setSelectedTip] = useState(null)
  const [customTip, setCustomTip] = useState("")
  const [rating, setRating] = useState(4)
  const [showModal, setShowModal] = useState(false)

  const tips = [1, 2, 5, 10, 20]
  const ratingText = ["Poor", "Fair", "Good", "Very Good", "Excellent"]

  // disable background scroll when modal open
  useEffect(() => {
    if (showModal) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [showModal])

  // close modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowModal(false)
    }
    if (showModal) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showModal])

  return (
    <div className="relative min-h-screen w-full">
      {/* MAP */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=106.79,-6.40,106.81,-6.37&layer=mapnik&marker=-6.3883,106.8000"
        className="absolute inset-0 w-full h-full border-0 pt-14"
        allowFullScreen
      />

    <Header variant="logo" />

      {/* Bottom Sheet */}
      <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-30 p-6 space-y-6 max-h-[65vh] overflow-y-auto">
        {/* Header Back */}
        <div className="flex items-center pb-3 border-b">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-700 font-medium text-sm sm:text-base"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
        </div>

        {/* Rating Section */}
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                role="button"
                tabIndex={0}
                key={star}
                onClick={() => setRating(star)}
                onKeyDown={(e) => e.key === "Enter" && setRating(star)}
                className={`w-6 h-6 sm:w-7 sm:h-7 cursor-pointer ${
                  rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
                aria-hidden={false}
              />
            ))}
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-800">
            {ratingText[rating - 1]}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">You rated Sergio Ramasis {rating} star</p>
        </div>

        {/* Tips Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center">
            Give some tips to Sergio Ramasis
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {tips.map((tip) => (
              <button
                key={tip}
                onClick={() => {
                  setSelectedTip(tip)
                  setCustomTip("")
                }}
                className={`py-2 rounded-lg border text-sm sm:text-base font-medium ${
                  selectedTip === tip
                    ? "border-yellow-500 bg-yellow-50 text-yellow-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                ${tip}
              </button>
            ))}
          </div>

          {/* Custom Tip */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-yellow-600 mb-1">Enter other amount</p>
            <input
              type="number"
              value={customTip}
              onChange={(e) => {
                setCustomTip(e.target.value)
                setSelectedTip(null)
              }}
              placeholder="Custom amount"
              className="w-full border text-gray-500 rounded-lg px-3 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Custom tip amount"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full mb-6 bg-[#103051] hover:bg-[#0f2d4a] text-white py-3 rounded-xl font-semibold mt-4"
        >
          Submit
        </button>
      </div>

      {/* Modal ala Figma */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowModal(false)} // klik overlay -> close
          aria-modal="true"
          role="dialog"
        >
          <div
            className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md text-center"
            onClick={(e) => e.stopPropagation()} // mencegah overlay click dari bubbling
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)} // <-- perbaikan: sekarang menutup modal
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-green-500" />
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Thank you</h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Thank you for your valuable feedback and tip
            </p>

            {/* Button */}
            <button
              onClick={() => {
                setShowModal(false)
                router.push("/sabadrive")
              }}
              className="mt-6 w-full bg-[#103051] text-white py-3 rounded-xl font-medium shadow-md hover:bg-[#001a3d] transition"
            >
              Back Home
            </button>
          </div>
        </div>
      )}

      <Navigation active="home" />
    </div>
  )
}
