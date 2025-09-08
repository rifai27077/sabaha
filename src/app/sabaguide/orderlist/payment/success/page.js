"use client";

import Image from "next/image";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, Settings } from "lucide-react";
import { useEffect } from "react";

/* metadata handled by parent layout; keep page as client-only */

export default function PaymentSuccessPage() {
  const router = useRouter();

  // After showing the success animation briefly, navigate to the guide screen
  useEffect(() => {
    const t = setTimeout(() => {
      router.push("/sabaguide/orderlist/payment/success/guide");
    }, 1500); // 1.5s to let the check animation play
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav />

      <main className="px-4 pt-12 pb-28">
        <div className="mx-auto w-full max-w-md text-center">
          {/* Success icon with animation */}
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500 grid place-content-center shadow-sm success-pop">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 13l4 4L19 7"
                className="check-path"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 className="mt-5 text-green-600 font-semibold text-lg fade-up">
            Booking Successful !
          </h2>

          <p className="mt-3 text-gray-700 text-sm leading-relaxed fade-up delay-150">
            Thank you
            <br />
            Your booking has been placed sent to
            <br />
            Md.Fatah
          </p>
        </div>
      </main>

      <Navigation />

      {/* Animations */}
      <style jsx>{`
        .success-pop {
          animation: pop 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .check-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: draw 650ms ease-out 180ms forwards;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(6px);
          animation: fadeUp 520ms ease-out 220ms forwards;
        }
        .fade-up.delay-150 {
          animation-delay: 370ms;
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
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* Top bar matching theme */
function TopNav() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="SAHABA"
            width={120}
            height={24}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Chat"
          >
            <MessageCircle className="w-5 h-5 text-[#103051]" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-[#103051]" />
          </button>
        </div>
      </div>
    </header>
  );
}