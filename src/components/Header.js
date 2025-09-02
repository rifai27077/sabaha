"use client"

import { X, MessageCircle, Info, User, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Header({
  location = "Unknown Location",
  showLogo = false,
  showChat = true,
  showSettings = true,
  showProfile = true,
  showInfo = false,
}) {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-lg">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] text-gray-500">Your Location</span>
          <span className="text-sm font-semibold text-[#0f2f51] line-clamp-1 max-w-[260px]">
          {location}
        </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {showChat && (
          <IconButton>
            <MessageCircle className="w-5 h-5 text-gray-700" />
          </IconButton>
        )}
        {showInfo && (
          <IconButton>
            <Info className="w-5 h-5 text-gray-700" />
          </IconButton>
        )}
        {showSettings && (
          <IconButton>
            <Settings className="w-5 h-5 text-gray-700" />
          </IconButton>
        )}
        {showLogo && (
          <div className="ml-1 h-6 w-auto">
            <Image
              src="/sahaba-logo.png"
              alt="SAHABA"
              width={80}
              height={24}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </header>
  )
}

function IconButton({ children }) {
  return (
    <button className="p-2 rounded-full hover:bg-gray-100 transition">
      {children}
    </button>
  )
}
