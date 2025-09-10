"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Image from "next/image"
import { Users } from "lucide-react"
import { useRide } from "@/context/RideContext"
import { useRouter } from "next/navigation"

export default function RideOptionsPage() {
  const [selectedRide, setSelectedRide] = useState(1)
  const { setRideData } = useRide()
  const router = useRouter()

  const rides = [
    {
      id: 1,
      name: "Saba Car",
      seats: 4,
      time: "2 mins away",
      eta: "15:24",
      desc: "Affordable, compact rides",
      price: 193.2,
      image: "/images/sabadrive/order/car.png",
    },
    {
      id: 2,
      name: "Saba Ride",
      seats: 1,
      time: "3 mins away",
      eta: "15:24",
      desc: "Affordable motorcycle rides",
      price: 65.17,
      image: "/images/sabadrive/order/bike.png",
    },
    {
      id: 3,
      name: "Premier",
      seats: 4,
      time: "4 mins away",
      eta: "15:25",
      desc: "Comfortable sedans, top-quality drivers",
      price: 193.2,
      image: "/images/sabadrive/order/car.png",
    },
    {
      id: 4,
      name: "Luxury XL",
      seats: 6,
      time: "5 mins away",
      eta: "15:27",
      desc: "Spacious rides for groups",
      price: 300,
      image: "/images/sabadrive/order/car.png",
    },
  ]

    const handleConfirm = () => {
    const ride = rides.find((r) => r.id === selectedRide)
    setRideData(ride)
    router.push("/sabadrive/find")
  }

  const lat = -6.3883589583213976
  const lng = 106.80006703131984

  return (
    <div className="relative min-h-screen w-full">
      <iframe
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${
          lng - 0.01
        },${lat - 0.02},${lng + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lng}`}
        className="absolute inset-0 w-full h-full border-0 pt-14"
        allowFullScreen
      ></iframe>


      <Header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md" />

      <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-30">
        <div className="p-4 space-y-4 max-h-72 md:max-h-96 overflow-y-auto scrollbar-thin">
          {rides.map((ride) => (
            <div
              key={ride.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedRide(ride.id)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedRide(ride.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition active:scale-95 ${
                selectedRide === ride.id
                  ? "border-black shadow-lg bg-gray-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={ride.image}
                  alt={ride.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-1">
                    {ride.name}
                    <Users className="w-4 h-4 inline-block ml-1" /> {ride.seats}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {ride.time} • {ride.eta}
                  </p>
                  <p className="text-sm text-gray-400">{ride.desc}</p>
                </div>
              </div>
                <p className="font-medium text-black text-lg">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "SAR",
                    currencyDisplay: "code",
                    minimumFractionDigits: 0,
                  }).format(ride.price)}
                </p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t mb-5">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#103051] text-white py-3 rounded-xl font-semibold shadow active:scale-95 transition"
          >
            Confirm & Continue
          </button>
        </div>
      </div>

      <Navigation active="home" />
    </div>
  )
}
