
"use client"

import Image from "next/image"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Sahaba" />

      <section className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-24 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 animate-slideUp" />
          <Image
            src="/images/sabapray/checkmark.png"
            alt="Success"
            width={80}
            height={80}
            className="mx-auto mb-6 animate-pop"
          />
          <h2 className="text-lg font-semibold text-black mb-2 animate-fadeIn">Thank you</h2>
          <p className="text-sm text-gray-600 mb-6 animate-fadeIn">
            Your booking has been placed sent to Md. Sharif Ahmed
          </p>

          <button
            className="w-full bg-[#1e4d7b] text-white font-semibold py-3 rounded-xl shadow-md active:scale-[0.99] animate-fadeIn"
          >
            Check My Order
          </button>
        </div>
      </section>

      <Navigation active="home" />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 500ms ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 500ms ease-out forwards;
        }
        .animate-pop {
          animation: pop 500ms ease-out forwards;
        }
      `}</style>
    </div>
  )
}