"use client"

import { X, MessageCircle, Info, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Header({
  variant = "location", // "location" | "logo"
  location = "Unknown Location",
  showChat = true,
  showSettings = true,
  showInfo = false,
}) {
  const router = useRouter()

  if (variant === "logo") {
    return (
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-lg">
        {/* left: back button */}
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* center: logo */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="SAHABA"
            width={130}
            height={40}
            className="object-contain"
          />
        </div>

        {/* right: actions */}
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
        </div>
      </header>
    )
  }

  // default: location
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-lg">
      {/* left: back + location */}
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

      {/* right: actions */}
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
