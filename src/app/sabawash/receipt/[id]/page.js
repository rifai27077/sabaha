"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/context/SabawashCheckout";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Check } from "lucide-react";

export default function ReceiptPage() {
  const { id } = useParams();
  const router = useRouter();
  const { order } = useOrder();
  const [loading, setLoading] = useState(false);
  const [isDoneEnabled, setIsDoneEnabled] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!order || String(order.receiptId) !== String(id)) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>No receipt found.</p>
    </div>
  );
}

// format label payment
const formatPaymentMethod = (pm) => {
  if (!pm) return "-";
  if (pm.startsWith("upi_")) return pm.replace("upi_", "").toUpperCase() + " UPI";
  if (pm.startsWith("card_")) return "Card •••• " + pm.slice(-4);
  return pm.charAt(0).toUpperCase() + pm.slice(1);
};


  // format angka
  const formatSR = (n) =>
    new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(n);

  // Tanggal & waktu
  const now = new Date();
  const payDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const payTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const handleDone = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header variant="logo" showChat showSettings />

      <main className="w-full flex-1 flex justify-center px-4 sm:px-6 md:px-8 pt-20 pb-36">
        {!showSuccess ? (
          // 🔹 Tampilan Receipt
          <section
            className="
              w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl
              bg-white rounded-3xl p-6 md:p-10
              shadow-[0_12px_40px_rgba(0,0,0,0.08)]
            "
          >
            <div className="flex flex-col items-center -mt-20 mb-2">
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#E6EBFF] opacity-75 animate-ping"></span>
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#283891] ring-8 ring-[#E6EBFF] flex items-center justify-center shadow-md">
                  <Check className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={3} />
                </div>
              </div>

              <p className="mt-8 text-[#283891] font-medium text-lg md:text-xl">Great</p>
              <h2 className="mt-2 text-[22px] md:text-2xl leading-tight font-extrabold text-gray-900">
                Payment Success
              </h2>
            </div>

            <div className="mt-7 space-y-4 text-[15px] md:text-base">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Payment Mode</span>
                <span className="font-medium text-gray-900">{order?.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Amount</span>
                <span className="font-semibold text-[#283891]">
                  SR {formatSR(order?.total)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Pay Date</span>
                <span className="font-medium text-gray-900">{payDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Pay Time</span>
                <span className="font-medium text-gray-900">{payTime}</span>
              </div>
            </div>

            {/* Dotted line */}
            <div className="relative my-7">
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
              <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
              <div
                className="h-[2px] w-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(209,213,219,1) 1.2px, transparent 1.2px)",
                  backgroundSize: "10px 2px",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "left center",
                }}
              />
            </div>

            <div className="text-center">
              <div className="text-gray-500">Total Pay</div>
              <div className="mt-1 text-2xl md:text-3xl font-extrabold text-[#283891] tracking-wide">
                SR {formatSR(order?.total || 0)}
              </div>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                onClick={handleDone}
                disabled={!isDoneEnabled}
                className={`w-full rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition ${
                  isDoneEnabled
                    ? "bg-[#283891] text-white hover:bg-[#25588f]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Done"
                )}
              </button>
            </div>
          </section>
        ) : (
          // 🔹 Tampilan Booking Successful
          <section className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              Booking Successful!
            </h2>
            <p className="text-gray-600">
              Dear {order?.name || "User"}, you have successfully scheduled booking
              of Simply Laundry for the upcoming date{" "}
              <span className="font-semibold">13 March 2025</span>. <br />
              Our service provider will contact you soon.
            </p>
            <button
              onClick={() => router.push("/sabawash")}
              className="w-full bg-[#283891] text-white py-3 rounded-xl font-semibold hover:bg-[#25588f] transition"
            >
              Done
            </button>
          </section>
        )}
      </main>

      <Navigation active="home" />
    </div>
  );
}
