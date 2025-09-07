"use client"

import { useState, useEffect } from "react"
import { Phone, Camera, MicOff, FileText, MoreHorizontal, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function VoiceCallPage() {
  const [isEnded, setIsEnded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isEnded) {
      const timer = setTimeout(() => {
        router.push("/sabapray/check-order") // arahkan balik ke chat
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isEnded, router])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-12 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-1 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center mt-10">
        <div className="w-28 h-28 rounded-full border-4 border-yellow-400 overflow-hidden">
          <Image
            src="/images/sabapray/avatar.png" // ganti dengan avatarmu
            alt="Avatar"
            width={112}
            height={112}
            className="object-cover"
          />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Sergio Ramasis</h2>
        <p className="text-gray-400 text-sm">{isEnded ? "Call Ended" : "Calling..."}</p>
      </div>

      {/* Call Controls */}
      <div className="flex items-center justify-center space-x-6 mb-10">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100">
          <Camera className="w-5 h-5 text-gray-700" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100">
          <MicOff className="w-5 h-5 text-gray-700" />
        </button>

        {/* Call Button */}
        <button
          onClick={() => setIsEnded(true)}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md transition ${
            isEnded ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <Phone className="w-6 h-6 text-white" />
        </button>

        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100">
          <FileText className="w-5 h-5 text-gray-700" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100">
          <MoreHorizontal className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
