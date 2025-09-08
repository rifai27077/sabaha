"use client";

import Image from "next/image";
import Navigation from "@/components/Navigation";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  Settings,
  Navigation2,
  Phone,
  MessageSquare,
} from "lucide-react";

/**
 * Guide screen after payment success
 * Restyled to match the same visual style as profile/[slug] page:
 * - Gradient background
 * - TopNavAndSearch header
 * - White rounded container with image card + details
 * - Intro card, calendar strip, time slots, and footer action buttons
 */
export default function GuideAfterSuccessPage() {
  const title = "Jabal Uhud";
  const country = "Saudi Arabia";
  const rating = 4.8;

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#103051] to-[#1e4d7b] flex flex-col mb-5">
      <TopNavAndSearch />

      {/* Search bar (matches the referenced page style) */}
      <div className="relative w-full aspect-[16/10]">
              <Image
                src="/images/sabaguide/jabal-uhud.png"
                alt={title}
                fill
                className=""
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]">
                {title}
              </h1>
      </div>

      <section className="rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.08)] object-cover bg-white mt-[-24px] pt-6 flex-1 overflow-y-auto">
        <div className="px-2 p-2 bg-white rounded-2xl pb-28">
          {/* Image card */}
          <div
            className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 ring-1 ring-gray-100"
            style={{ animation: "slideUp 320ms ease-out both" }}
          >
          </div>

          {/* Title + meta */}
          {/* Title is now inside the photo; location and rating removed as requested */}
          <div className="mt-3" />

          {/* Intro guide card */}
          <IntroCard />

          {/* Calendar and time slots */}
          <CalendarStrip />
          <TimeSlots />

          {/* Footer quick actions + back */}
          <FooterActions />
        </div>
      </section>

      <Navigation />

      {/* small keyframes used above (same easing vibe as reference) */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
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
      `}</style>
    </div>
  );
}

/* Header styled like the referenced page */
function TopNavAndSearch() {
  const router = useRouter();

  return (
    <section className="relative bg-white pb-4">
      {/* Nav bar */}
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

function IntroCard() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 mt-5">
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-start gap-3">
          {/* Avatar from asset */}
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-white">
            <Image
              src="/images/sabaguide/tour%20guide.jpg"
              alt="Tour Guide"
              width={48}
              height={48}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-xl leading-snug">
              Hello! I'm Fatah
              <br />
              our tour guide.
            </h3>
            <p className="mt-2 text-[13px] text-gray-700 leading-relaxed">
              My name is Fatah, a professional tour guide with extensive experience in leading
              religious journeys as well as historical tours across the Arab region. With a strong
              background in Arab geography, I am able to provide deep insights into the natural
              landscapes, history, and culture that have developed in the holy lands and their
              surroundings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarStrip() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
      <div className="grid grid-cols-5 text-center">
        <Day selected day="Wed" date="13" mon="Mar" />
        <Day day="Thu" date="14" mon="Mar" />
        <Day day="Fri" date="15" mon="Mar" />
        <Day day="Sat" date="16" mon="Mar" />
        <Day day="Sun" date="17" mon="Mar" />
      </div>
    </div>
  );
}

function Day({ day, date, mon, selected = false }) {
  if (selected) {
    return (
      <div className="bg-[#DD8E23] text-white py-3">
        <div className="text-xs font-medium">{day}</div>
        <div className="text-xl font-bold -mt-0.5">{date}</div>
        <div className="text-xs mt-0.5">{mon}</div>
      </div>
    );
  }
  return (
    <div className="bg-white py-3 border-l border-gray-200">
      <div className="text-gray-700 text-xs font-medium">{day}</div>
      <div className="text-gray-900 text-xl font-bold -mt-0.5">{date}</div>
      <div className="text-gray-600 text-xs mt-0.5">{mon}</div>
    </div>
  );
}

function TimeSlots() {
  return (
    <div className="mt-3 rounded-2xl border border-gray-200 overflow-hidden">
      {/* row 1 */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        <Slot text="10:00 - 11:30" suffix="AM" />
        <Slot text="11:30 - 1:00" suffix="PM" />
      </div>
      {/* row 2 */}
      <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
        <Slot text="1:00 - 2:30" suffix="PM" />
        <Slot text="2:30 - 4:00" suffix="PM" />
      </div>
      {/* row 3 */}
      <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
        <Slot text="4:00 - 5:30" suffix="PM" active />
        <Slot text="5:30 - 7:00" suffix="PM" />
      </div>
    </div>
  );
}

function Slot({ text, suffix, active = false }) {
  if (active) {
    return (
      <div className="relative px-3 py-3 text-center bg-[#DD8E23] text-white">
        <div className="text-[13px] font-medium">{text}</div>
        <div className="text-[11px] mt-0.5">{" "}</div>
        {/* Bottom center suffix badge */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-1">
          <span className="inline-block rounded-full bg-[#DD8E23] text-white text-[10px] px-2 py-0.5 leading-none">
            {suffix}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-3 text-center bg-white">
      <div className="text-[13px] font-medium text-gray-900">{text}</div>
      <div className="text-[11px] mt-0.5 text-gray-600">{suffix}</div>
    </div>
  );
}

function FooterActions() {
  return (
    <div className="mt-6 mb-4">
      {/* 3 circular action icons */}
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <button className="w-14 h-14 rounded-full bg-[#DD8E23] grid place-content-center shadow">
            <Navigation2 className="w-6 h-6 text-white" />
          </button>
          <span className="text-[13px] text-gray-900">Location</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button className="w-14 h-14 rounded-full bg-[#DD8E23] grid place-content-center shadow">
            <Phone className="w-6 h-6 text-white" />
          </button>
          <span className="text-[13px] text-gray-900">Call</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button className="w-14 h-14 rounded-full bg-[#DD8E23] grid place-content-center shadow">
            <MessageSquare className="w-6 h-6 text-white" />
          </button>
          <span className="text-[13px] text-gray-900">Massage</span>
        </div>
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mt-5 mx-auto block w-44 rounded-full bg-[#DD8E23] text-white font-semibold py-2.5 shadow active:scale-[0.99]"
      >
        Back
      </button>
    </div>
  );
}