"use client";

import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { Search, ArrowLeft, MessageCircle, Settings } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * SabaGuide - Order List / Booking Guide
 * Target look: public/images/sabaguide/sabaguide-orderlist.png
 */
export default function OrderListPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [interests, setInterests] = useState("");
  const [groups, setGroups] = useState("");

  const [gender, setGender] = useState("man");
  const [additionalDrivers, setAdditionalDrivers] = useState(false);

  // Selection states for clickable day and time
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNav />

      {/* HERO WITH SEARCH + HEADLINE */}
      <section className="relative w-full">
        {/* Background image */}
        <div className="relative h-[220px] w-full">
          <Image
            src="/images/sabaguide/jabal-uhud.png"
            alt="Jabal Uhud"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* subtle gradient like mock */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#103051]/80 via-[#103051]/20 to-transparent" />
        </div>

        {/* Search field floating near top */}
        <div className="absolute left-0 right-0 top-4 px-5">
          <div className="mx-auto max-w-md">
            <div className="flex items-center bg-white rounded-full shadow-md px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="What would you want to wash?"
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Headline text over image */}
        <div className="absolute left-0 right-0 top-20 px-6">
          <h1 className="text-white font-bold leading-tight text-[22px] drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]">
            Graceful Support for a
            <br />
            Seamless Spiritual Journey
          </h1>
        </div>
      </section>

      {/* BOOKING GUIDE CARD */}
      <section className="-mt-8 pb-28 px-4 relative z-0">
        <div className="mx-auto max-w-md rounded-3xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.12)] border border-gray-100">
          {/* top-rounded backdrop like a sheet handle */}
          <div className="px-5 pt-4 pb-2 flex justify-center">
            <span className="block w-24 h-1.5 rounded-full bg-gray-200" />
          </div>

          <div className="px-5 pb-5">
            <h2 className="text-[#DD8E23] text-lg font-semibold text-center mb-3">
              Booking Guide
            </h2>

            <div className="space-y-3">
              <FieldRow label="Name">
                <PillInput
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FieldRow>

              <FieldRow label="Travel interests">
                <PillInput
                  placeholder="E.g. historical, city tour"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </FieldRow>

              <FieldRow label="Number of groups">
                <PillInput
                  type="number"
                  placeholder="0"
                  inputMode="numeric"
                  value={groups}
                  onChange={(e) => setGroups(e.target.value)}
                />
              </FieldRow>

              <FieldRow label="Guide tour">
                <div className="flex items-center gap-4">
                  <RadioPill
                    label="Man"
                    checked={gender === "man"}
                    onChange={() => setGender("man")}
                  />
                  <RadioPill
                    label="Woman"
                    checked={gender === "woman"}
                    onChange={() => setGender("woman")}
                  />
                </div>
              </FieldRow>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  className="text-[13px] font-medium text-[#DD8E23] active:opacity-80"
                  onClick={() => setAdditionalDrivers((v) => !v)}
                >
                  Additional drivers
                </button>

                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={additionalDrivers}
                    onChange={(e) => setAdditionalDrivers(e.target.checked)}
                  />
                  <span className="w-5 h-5 rounded-[6px] border border-[#DD8E23] grid place-content-center peer-checked:bg-[#DD8E23] transition-colors">
                    {/* check icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className={`w-3.5 h-3.5 text-white transition-opacity ${
                        additionalDrivers ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <path
                        fill="currentColor"
                        d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 pb-24">
        <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-3xl">
          <DateStrip selected={selectedDay} onSelect={setSelectedDay} />
          <TimeSlots selected={selectedSlot} onSelect={setSelectedSlot} />
          <PaymentSummary />
        </div>
      </div>
    </div>
  );
}

/* UI bits */
function FieldRow({ label, children }) {
  return (
    <div className="grid grid-cols-12 items-center gap-3">
      <label className="col-span-6 sm:col-span-5 text-[13px] text-gray-600">
        {label}
      </label>
      <div className="col-span-6 sm:col-span-7">{children}</div>
    </div>
  );
}

function PillInput({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={
        "w-full h-8 rounded-full border border-gray-300 bg-white px-3 text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#DD8E23] focus:ring-2 focus:ring-[#DD8E23]/20 " +
        className
      }
    />
  );
}

function RadioPill({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`h-8 px-4 rounded-full text-[13px] border transition-colors ${
        checked
          ? "bg-[#DD8E23] text-white border-[#DD8E23]"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

/* Top navbar — exactly as requested snippet */
function TopNav() {
  const router = useRouter();

  return (
    <section className="relative bg-white pb-4">
      {/* Nav bar */}
      <div className=" px-4 py-2 flex items-center justify-between">
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
          <button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="Chat">
            <MessageCircle className="w-5 h-5 text-[#103051]" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition" aria-label="Settings">
            <Settings className="w-5 h-5 text-[#103051]" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* Dates row below the form (Wed 13 Mar ... Sun 17 Mar) */
function DateStrip({ selected, onSelect }) {
  const dates = [
    { day: "Wed", date: "13", month: "Mar" },
    { day: "Thu", date: "14", month: "Mar" },
    { day: "Fri", date: "15", month: "Mar" },
    { day: "Sat", date: "16", month: "Mar" },
    { day: "Sun", date: "17", month: "Mar" },
  ];

  return (
    <div className="bg-white rounded-[6px] border border-gray-300 overflow-hidden">
      <div className="grid grid-cols-5 md:grid-cols-5">
        {dates.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect?.(i)}
            aria-pressed={selected === i}
            className={`px-3 py-2 text-center outline-none transition-colors cursor-pointer hover:bg-gray-50 active:scale-[0.99] ${
              i < dates.length - 1 ? "border-r border-gray-300" : ""
            } ${selected === i ? "bg-gray-50" : "bg-white"}`}
          >
            <div className="text-gray-700 text-sm font-medium">{d.day}</div>
            <div className={`text-2xl font-semibold leading-tight ${selected === i ? "text-[#DD8E23]" : "text-black"}`}>{d.date}</div>
            <div className="text-gray-600 text-xs">{d.month}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Time slots grid (two rows, three columns) */
function TimeSlots({ selected, onSelect }) {
  const slots = [
    "10:00 - 11:30 AM",
    "11:30 - 1:00 PM",
    "1:00 - 2:30 PM",
    "2:30 - 4:00 PM",
    "4:00 - 5:30 PM",
    "5:30 - 7:00 PM",
  ];

  const splitSuffix = (s) => {
    const m = s.match(/\s(AM|PM)$/);
    return m ? [s.replace(/\s(AM|PM)$/, ""), m[1]] : [s, ""];
  };

  return (
    <div className="mt-3 grid grid-cols-3 md:grid-cols-6 gap-2">
      {slots.map((s, i) => {
        const [main, suffix] = splitSuffix(s);
        const isActive = selected === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect?.(i)}
            aria-pressed={isActive}
            className={`rounded-[6px] py-3 text-center transition-colors border cursor-pointer hover:bg-gray-50 active:scale-[0.99] ${
              isActive ? "bg-gray-50 border-[#103051] ring-1 ring-[#103051]" : "bg-white border-gray-300"
            }`}
          >
            <div className="text-gray-900 text-[13px] font-medium">{main}</div>
            {suffix && <div className="text-gray-700 text-[11px] mt-0.5">{suffix}</div>}
          </button>
        );
      })}
    </div>
  );
}

function KVRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <span className={`text-gray-800 ${valueClass}`}>{value}</span>
    </div>
  );
}

/* Payment summary card + CTA button */
function PaymentSummary() {
  const router = useRouter();

  return (
    <div className="mt-3 rounded-[18px] bg-white shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-gray-200 px-4 py-4">
      <h3 className="text-gray-800 font-semibold">Payment Summary</h3>

      <div className="mt-3 space-y-2">
        <KVRow label="SabaGuide" value="SR 30.0" />
        <KVRow label="Item Discount" value="-₹15.0" valueClass="text-green-600" />
        <KVRow label="Service Fee" value="₹5" />
      </div>

      <div className="mt-3 border-t border-gray-200 pt-3 flex items-center justify-between">
        <span className="font-semibold text-gray-800">Grand Total</span>
        <span className="font-bold text-gray-900">SR 20,0</span>
      </div>

      <button
        type="button"
        onClick={() => router.push("/sabaguide/orderlist/payment")}
        className="mt-3 w-full rounded-[10px] bg-[#DFF3E2] ring-1 ring-[#CFE8D3] text-[#2E7D32] font-semibold uppercase tracking-wide text-[12px] py-2.5 cursor-pointer hover:bg-[#CFE8D3] hover:ring-[#B9DBBE] hover:shadow-sm transition-colors transition-shadow active:scale-[0.99]"
      >
        BOOKING GUIDE NOW!
      </button>
      <BottomNav />
    </div>
    
  );
}