
"use client"

import Image from "next/image"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { useRouter } from "next/navigation"

export default function QRCodePaymentPage() {
  const router = useRouter();

  const handlePaymentSuccess = () => {
    router.push("/sabapray/confirm/success");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Sahaba" />

      <section className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-24 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-black mb-6">
            Scan This QR Code To Payment
          </h2>

          <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <Image
              src="/images/sabapray/qrcode.png" 
              alt="QR Code"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>

          <div className="flex justify-around mb-6">
            <div className="flex flex-col items-center">
              <Image
                src="/images/sabapray/camera-icon.png" 
                alt="Camera"
                width={24}
                height={24}
              />
              <p className="text-xs text-gray-600 mt-2">Open the Camera on Your Smartphone</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/sabapray/qr-icon.png" 
                alt="QR"
                width={24}
                height={24}
              />
              <p className="text-xs text-gray-600 mt-2">Scan the QR Code Above</p>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src="/images/sabapray/luckycharm-icon.png" 
                alt="Luckycharm"
                width={24}
                height={24}
              />
              <p className="text-xs text-gray-600 mt-2">Start Your Order with Luckycharm</p>
            </div>
          </div>

          <button
            onClick={handlePaymentSuccess}
            className="w-full bg-[#1e4d7b] text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.99]"
          >
            Confirm Payment
          </button>
        </div>
      </section>

      <Navigation active="home" />
    </div>
  )
}