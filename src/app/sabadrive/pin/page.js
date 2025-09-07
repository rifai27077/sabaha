"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

export default function PinPage() {
  const [pin, setPin] = useState("")
  const router = useRouter()

  const correctPin = "123456";

  const handleNumberClick = (num) => {
    if (pin.length < 6) {
      setPin(String(pin) + String(num))
    }
  }


const handleConfirm = () => {
  if (pin.length === 6) {
    if (pin === correctPin) {
      router.replace("/sabadrive/find?loading=true&next=/sabadrive/payment")
    } else {
      alert("PIN incorrect! ❌")
      setPin("")
    }
  } else {
    alert("PIN not complete! ❌")
  }
}


  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "next"]

  return (
    <div className="flex flex-col min-h-screen bg-[#153e68]">
      <Header variant="logo" />


<main className="flex-1 flex items-start justify-center mt-20 pb-6">
  <div className="w-full bg-white rounded-t-3xl shadow-lg p-6">
    <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

    <h2 className="text-center text-lg font-semibold text-gray-800">
      Enter PIN
    </h2>

    {/* PIN Dots */}
    <div className="flex justify-center gap-4 mt-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`w-3.5 h-3.5 rounded-full ${
            i < pin.length ? "bg-[#103051]" : "bg-gray-200"
          }`}
        />
      ))}
    </div>

    {/* divider */}
    <div className="h-px bg-gray-100 my-6" />

    {/* Numpad */}
    <div className="grid grid-cols-3 gap-4 px-6 mb-36">
      {keys.map((item, idx) => {
        const isNext = item === "next"
        return (
          <button
            key={idx}
            type="button"
            aria-label={isNext ? "Confirm PIN" : `Key ${item}`}
            onClick={() => {
              if (isNext) handleConfirm()
              else if (item === ".") return
              else handleNumberClick(item)
            }}
            className={`h-16 rounded-lg flex items-center justify-center text-xl font-semibold shadow-md ${
              isNext
                ? "bg-[#103051] text-white"
                : "bg-white text-gray-900"
            }`}
          >
            {isNext ? <ArrowRight className="w-6 h-6" /> : item}
          </button>
        )
      })}
    </div>
  </div>
</main>


      <Navigation />
    </div>
  )
}
