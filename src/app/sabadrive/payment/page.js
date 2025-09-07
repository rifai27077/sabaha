"use client"

import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useRide } from "@/context/RideContext"

export default function PaymentPage() {
    const router = useRouter();
    const { rideData, setRideData} = useRide();

  return (
    <div className="flex flex-col min-h-screen bg-[#153e68]">
      <Header variant="logo" />

      <main className="flex-1 bg-white rounded-t-3xl shadow-lg p-6 mt-20 flex flex-col">
        {/* drag handle */}
        <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

        {/* title */}
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
          Scan This QR Code To Payment
        </h2>

        {/* QR Code */}
        <div className="flex justify-center mb-6 p-5">
          <Image
            src="/images/sabadrive/payment/qris.png"
            alt="QR Code"
            width={240}
            height={240}
            className="rounded-xl border border-gray-200 shadow-md"
          />
        </div>

        {/* instructions */}
        <div className="grid grid-cols-3 gap-6 text-center mb-6">
            <div>
            <div className="flex justify-center mb-2">
                <Image src="/images/sabadrive/payment/qr1.png" alt="camera" width={28} height={28} />
            </div>
            <p className="text-xs text-gray-600">
                Open the Camera<br />on Your Smartphone
            </p>
            </div>
            <div>
            <div className="flex justify-center mb-2">
                <Image src="/images/sabadrive/payment/qr2.png" alt="qrcode" width={28} height={28} />
            </div>
            <p className="text-xs text-gray-600">
                Scan the QR<br />Code Above
            </p>
            </div>
            <div>
            <div className="flex justify-center mb-2">
                <Image src="/images/sabadrive/payment/qr3.png" alt="order" width={28} height={28} />
            </div>
            <p className="text-xs text-gray-600">
                Start Your Order<br />with Luckycharm
            </p>
            </div>
        </div>

        <button
            onClick={() => {
                setRideData({ payment: "qris" })
                router.replace("/sabadrive/success")
            }}
            className="w-full mt-auto mb-20 bg-[#103051] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#001a3d] transition"
        >
            Confirm Payment
        </button>


      </main>

      <Navigation />
    </div>
  )
}
