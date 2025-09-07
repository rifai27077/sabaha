"use client"

import Header from "@/components/Header"
import Navigation from "@/components/Navigation"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-[#153e68]">
      <Header variant="logo" />

      {/* bg putih tetap full width */}
      <main className="flex-1 bg-white rounded-t-3xl shadow-lg mt-20 
                      px-6 sm:px-8 lg:px-10 
                      pt-10 sm:pt-16 
                      flex flex-col items-center justify-center text-center w-full">

        {/* konten dibatasi max width */}
        <div className="w-full max-w-2xl mx-auto -mt-20 flex flex-col items-center">
          {/* success icon with animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 
                       rounded-full bg-green-100 flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.414a1 1 0 011.414-1.414L8.5 11.793l6.793-6.793a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          {/* text */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2"
          >
            Thank you
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm sm:text-base lg:text-lg text-gray-600 mb-10"
          >
            Your booking has been placed and sent to <br />
            <span className="font-medium text-gray-800">Md. Sharif Ahmed</span>
          </motion.p>

          {/* button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={() => router.replace("/sabadrive/status")}
            className="w-full bg-[#103051] text-white 
                       py-3 sm:py-4 
                       rounded-xl font-semibold 
                       text-lg sm:text-xl 
                       shadow-md hover:bg-[#001a3d] transition"
          >
            Confirm Ride
          </motion.button>
        </div>
      </main>

      <Navigation />
    </div>
  )
}
