"use client";

import Image from "next/image";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, Settings, CreditCard, Banknote } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Payment Options screen
 * Replicates the provided mock: sections UPI, Cards, Cash -> each has radio option(s),
 * and a bottom Proceed button. Top bar with back, logo center, chat + settings on right.
 */
export default function PaymentOptionsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const to = setTimeout(() => {
      router.push("/sabaguide/orderlist/payment/success");
    }, 10_000);

    const iv = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1_000);

    return () => {
      clearTimeout(to);
      clearInterval(iv);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav />

      <main className="px-4 pt-2 pb-28">
        <div className="mx-auto w-full max-w-md">
          {/* Auto-redirect info */}
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-[13px] px-3 py-2">
            Halaman pembayaran akan ditutup otomatis dalam{" "}
            <span className="font-semibold">{secondsLeft}s</span> dan Anda akan diarahkan ke halaman konfirmasi.
          </div>
          {/* UPI */}
          <SectionTitle>UPI</SectionTitle>
          <div className="space-y-3">
            <OptionRow
              name="payment"
              value="upi:paytm"
              label="Paytm UPI"
              checked={selected === "upi:paytm"}
              onChange={() => setSelected("upi:paytm")}
              RightIcon={() => (
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-500">
                  <UPIBadge />
                </span>
              )}
            />
            <OptionRow
              name="payment"
              value="upi:phonepe"
              label="PhonePe"
              checked={selected === "upi:phonepe"}
              onChange={() => setSelected("upi:phonepe")}
              RightIcon={() => <PhonePeIcon />}
            />
            <OptionRow
              name="payment"
              value="upi:gpay"
              label="GPay"
              checked={selected === "upi:gpay"}
              onChange={() => setSelected("upi:gpay")}
              RightIcon={() => <GPayIcon />}
            />
          </div>

          {/* Cards */}
          <SectionTitle className="mt-6">Cards</SectionTitle>
          <div className="space-y-3">
            <OptionRow
              name="payment"
              value="card:mc"
              label={
                <span className="inline-flex items-center gap-2">
                  <MastercardMark />
                  <span className="tracking-wider">************2575</span>
                </span>
              }
              checked={selected === "card:mc"}
              onChange={() => setSelected("card:mc")}
              RightIcon={() => <CreditCard className="w-5 h-5 text-gray-700" />}
            />
          </div>

          {/* Cash */}
          <SectionTitle className="mt-6">Cash</SectionTitle>
          <div className="space-y-3">
            <OptionRow
              name="payment"
              value="cash"
              label={
                <span className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span>Cash</span>
                </span>
              }
              checked={selected === "cash"}
              onChange={() => setSelected("cash")}
              RightIcon={() => <Banknote className="w-5 h-5 text-gray-700" />}
            />
          </div>

          {/* Proceed button */}
          <button
            type="button"
            disabled={!selected}
            onClick={() => selected && router.push("/sabaguide/orderlist/payment/success")}
            className={`mt-8 w-full rounded-xl py-3 text-base font-medium shadow-sm transition-colors transition-shadow active:scale-[0.99] ${
              selected
                ? "bg-[#DD8E23] text-white cursor-pointer hover:bg-[#C97E1E] hover:shadow-md"
                : "bg-gray-300 text-white opacity-70 cursor-not-allowed"
            }`}
          >
            Proceed
          </button>
        </div>
      </main>

      <Navigation />
    </div>
  );
}

/* Top bar matching the mock layout */
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
          <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Chat">
            <MessageCircle className="w-5 h-5 text-[#103051]" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Settings">
            <Settings className="w-5 h-5 text-[#103051]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h3 className={`text-[13px] font-semibold text-gray-800 mb-2 ${className}`}>{children}</h3>
  );
}

/* Generic option row with custom radio on the left and an icon on the right */
function OptionRow({ name, value, label, checked, onChange, RightIcon }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-gray-300 px-3 py-3 cursor-pointer active:scale-[0.997] transition">
      <div className="flex items-center gap-3">
        <span
          className={`relative w-4 h-4 rounded-full border ${
            checked ? "border-[#103051]" : "border-gray-400"
          } grid place-content-center`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              checked ? "bg-[#103051]" : "bg-transparent"
            }`}
          />
        </span>

        <input
          type="radio"
          className="sr-only"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className="text-gray-900 text-[15px]">{label}</span>
      </div>

      <div className="pl-3">
        {RightIcon ? <RightIcon /> : null}
      </div>
    </label>
  );
}

/* Small right-side icons to mimic the mock without external assets */

/* "UPI" badge */
function UPIBadge() {
  return (
    <span className="inline-flex items-center rounded-md border border-gray-300 px-1.5 py-0.5">
      <span className="text-[10px] font-semibold tracking-wide text-gray-700">UPI</span>
    </span>
  );
}

/* PhonePe-like circular purple glyph with P */
function PhonePeIcon() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#5F259F]">
      <span className="text-[10px] leading-none text-white font-bold">P</span>
    </span>
  );
}

/* Simplified GPay mark using Google "G" from local image if available, else colored G */
function GPayIcon() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white border border-gray-300 overflow-hidden">
        <Image
          src="/images/google-logo.png"
          alt="G"
          width={12}
          height={12}
          className="object-contain"
        />
      </span>
    </span>
  );
}

/* Mastercard overlapping circles */
function MastercardMark() {
  return (
    <span className="relative inline-flex items-center w-7 h-5">
      <span className="absolute left-0.5 w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
      <span className="absolute right-0.5 w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
    </span>
  );
}