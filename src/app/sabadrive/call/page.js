"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, Phone, Video, Mic, MoreHorizontal, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

export default function CallPage() {
  const router = useRouter()

  const [callStatus, setCallStatus] = useState("Calling...")
  const [isOngoing, setIsOngoing] = useState(false)

  const driver = {
    name: "Sergio Ramasis",
    image: "/images/sabadrive/driver.png",
  }

  // Simulasi driver mengangkat setelah 3 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus("Ongoing Call")
      setIsOngoing(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleEndCall = () => {
    setCallStatus("Call Ended")
    setIsOngoing(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-700 font-medium text-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-28 h-28 rounded-full border-4 border-yellow-300 overflow-hidden mb-4">
          <Image
            src={driver.image}
            alt={driver.name}
            width={112}
            height={112}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{driver.name}</h2>
        <p
          className={`mt-1 ${
            callStatus === "Call Ended" ? "text-red-500" : "text-gray-500"
          }`}
        >
          {callStatus}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 pb-10">
        <button className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
          <ImageIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
          <Mic className="w-6 h-6 text-gray-700" />
        </button>

        {/* Call Button */}
        <button
          onClick={handleEndCall}
          className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition ${
            isOngoing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <Phone className="w-7 h-7 text-white" />
        </button>

        <button className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
          <Video className="w-6 h-6 text-gray-700" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full">
          <MoreHorizontal className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  )
}
