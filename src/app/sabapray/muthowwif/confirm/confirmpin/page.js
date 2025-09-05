
"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { Delete } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ConfirmPinPage() {
  const router = useRouter()
  const [pin, setPin] = useState("")

  const handlePress = (num) => {
    if (pin.length < 6) {
      setPin(pin + num)
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const handleSubmit = () => {
    if (pin.length === 6) {
      router.push("/sabapray/muthowwif/confirm/success") // Navigate to success page
    }
  }

  const buttons = ["1","2","3","4","5","6","7","8","9",".","0"]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="SabaDrive" />

      <section className="flex-1 flex flex-col items-center justify-start mt-10 px-6">
        <h2 className="text-lg font-semibold text-black mb-6">Enter PIN</h2>

        {/* PIN dots */}
        <div className="flex gap-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border ${
                pin.length > i ? "bg-[#1e4d7b]" : "bg-transparent"
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-6">
          {buttons.map((b) => (
            <button
              key={b}
              onClick={() => handlePress(b)}
              className="py-4 text-lg text-black font-semibold bg-gray-100 rounded-xl active:scale-95"
            >
              {b}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="py-4 bg-gray-200 rounded-xl flex items-center justify-center active:scale-95"
          >
            <Delete className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={handleSubmit}
            className="py-4 bg-[#1e4d7b] text-white font-semibold rounded-xl active:scale-95 col-span-2"
          >
            ➝
          </button>
        </div>
      </section>

      <Navigation active="home" />
    </div>
  )
}