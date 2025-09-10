"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { ChevronDown, Wallet, QrCode, Banknote } from "lucide-react"

function ConfirmPartnerContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedType = searchParams.get("type") || "Umroh Set"

  const dates = useMemo(
    () => [
      { day: "Tue", date: 13 },
      { day: "Wed", date: 14 },
      { day: "Thu", date: 15 },
      { day: "Fri", date: 16 },
      { day: "Sat", date: 17 },
    ],
    []
  )

  const timeSlots = useMemo(
    () => ["Fajr Pray", "Dhuhr Pray", "Ashr Pray", "Maghrib Pray", "Isya Pray"],
    []
  )

  const [activeDate, setActiveDate] = useState(0)
  const [activeTime, setActiveTime] = useState(0)
  const [groups, setGroups] = useState("1 Person")
  const [gender, setGender] = useState("Male")
  const [payment, setPayment] = useState("")

  const payments = [
    { key: "wallet", title: "My Wallet", subtitle: "SAR 200.00", icon: Wallet },
    { key: "qris", title: "QRIS", subtitle: "All Payment Systems", icon: QrCode },
    { key: "cash", title: "CASH", subtitle: "Only Exact Amount of Money", icon: Banknote },
  ]

  const handleNext = () => {
    if (payment === "wallet") {
      router.push("/sabapray/muthowwif/confirm/confirmpin")
    } else if (payment === "qris") {
      router.push("/sabapray/muthowwif/confirm/qrcode")
    } else {
      router.push("/sabapray/muthowwif/payment-success")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat showSettings />

      <section className="-mt-1 bg-white rounded-t-3xl pt-4 px-4 flex-1 shadow-md">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-4 mt-2">
            {/* Title */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-1.5 bg-gray-200 rounded-full mb-3" />
              <h2 className="text-[#0f2f51] font-semibold text-base">
                Choose Slot & Confirm Details
              </h2>
            </div>

            {/* Dates */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {dates.map((d, idx) => (
                <button
                  key={`${d.day}-${d.date}`}
                  onClick={() => setActiveDate(idx)}
                  className={`flex flex-col items-center rounded-xl border py-2 ${
                    activeDate === idx
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-800"
                  }`}
                >
                  <span className="text-xs">{d.day}</span>
                  <span className="text-sm font-semibold">{d.date}</span>
                </button>
              ))}
            </div>

            {/* Time slots */}
            <div className="mt-3 grid grid-cols-5 gap-2">
              {timeSlots.map((t, idx) => (
                <button
                  key={t}
                  onClick={() => setActiveTime(idx)}
                  className={`rounded-xl border px-2 py-2 text-xs font-medium text-center whitespace-nowrap ${
                    activeTime === idx
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Groups */}
            <div className="mt-4">
              <label className="block text-[13px] text-gray-700 mb-1">Number of Groups</label>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
                onClick={() =>
                  setGroups((g) => (g === "1 Person" ? "2 Persons" : "1 Person"))
                }
              >
                <span>{groups}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Gender */}
            <div className="mt-3">
              <label className="block text-[13px] text-gray-700 mb-1">Gender</label>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
                onClick={() => setGender((g) => (g === "Male" ? "Female" : "Male"))}
              >
                <span>{gender}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Payments */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-700">Select payment method</span>
                <button type="button" className="text-[12px] text-amber-600 font-medium">
                  View All
                </button>
              </div>

              <div className="mt-2 grid gap-2">
                {payments.map((p) => {
                  const Icon = p.icon
                  const active = payment === p.key
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setPayment(p.key)}
                      className={`w-full flex items-center gap-3 rounded-xl border px-3 py-2 text-left ${
                        active
                          ? "border-amber-400 bg-amber-50"
                          : "border-amber-300 bg-white"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{p.title}</div>
                        <div className="text-[12px] text-gray-600">{p.subtitle}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-4">
              <div className="text-[13px] text-gray-700 mb-2">Order Summary</div>
              <div className="rounded-xl border border-gray-200 divide-y">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[13px] text-gray-600">Type</span>
                  <span className="text-[13px] font-medium text-gray-900">{selectedType}</span>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-[13px] text-gray-600">Payment</span>
                  <span className="text-[13px] font-medium text-gray-900">
                    {payment ? payments.find((p) => p.key === payment)?.title : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Next button */}
            <div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#1e4d7b] text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.99]"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="h-28" />
      </section>

      <Navigation active="home" />
    </div>
  )
}

export default function ConfirmPartnerPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ConfirmPartnerContent />
    </Suspense>
  )
}
