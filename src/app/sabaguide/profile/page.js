"use client";

import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, MessageCircle, Settings, Search, MapPin, Star, Bookmark, Share2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [bookmarked, setBookmarked] = useState(false);

  const place = {
    title: "Jabal Uhud",
    country: "Saudi Arabia",
    rating: 4.8,
    image: "/images/sabaguide/jabal-uhud.png",
  };

  // Local bookmark state for the list below
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());

  // Keep the other places visible under the detail, like the mock
  const mostVisited = [
    {
      title: "Arafah",
      country: "Saudi Arabia",
      rating: 4.7,
      price: 15,
      image: "/images/sabaguide/arafah.jpg",
    },
    {
      title: "AL Ula",
      country: "Saudi Arabia",
      rating: 5.0,
      price: 120,
      image: "/images/sabaguide/al-ula.jpg",
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-t from-[#103051] via-[#103051]/100 to-white/0 pb-6 flex flex-col">
      <TopNavAndSearch />

      <section className="rounded-t-3xl pt-28 pb-28 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">

      <div className="">
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-md">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Which Place Do You Like?"
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="px-2 bg-white rounded-2xl mt-5">

        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 ring-1 ring-gray-100" style={{ animation: 'slideUp 320ms ease-out both' }}>
          <div className="relative w-full aspect-[16/10]">
            <Image src={place.image} alt={place.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="mt-4 text-center" style={{ animation: 'fadeIn 360ms ease-out both', animationDelay: '60ms' }}>
          <h1 className="text-2xl font-semibold text-gray-900">{place.title}</h1>
          <p className="text-gray-600 mt-0.5 inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {place.country}
          </p>
          <div className="mt-1 flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-orange-400 fill-current" />
            <span className="text-gray-800 font-medium">{place.rating.toFixed(1)}</span>
          </div>
        </div>

        <article
          className="mt-4 space-y-4 text-[15px] leading-relaxed text-gray-700"
          style={{ animation: 'fadeIn 380ms ease-out both', animationDelay: '100ms' }}
        >
          <p>
            <span className="text-[#0B63D8] hover:underline">Welcome to Jabal Uhud</span>, one of the must-visit
            historical destinations in Madinah. This mountain, rising over 1,000 meters high, not only offers the
            beauty of its distinctive red rocks but also holds great significance in Islamic history. It was here
            that the Battle of Uhud took place, a crucial encounter between the Muslims and the Quraysh of Makkah.
          </p>
          <p>
            During your visit, you can see the Graves of the Uhud Martyrs, where 70 companions of the Prophet are
            buried, including Hamzah ibn Abdul Muttalib, the beloved uncle of Prophet Muhammad (peace be upon him).
            You will also find the Sayyid al-Shuhada Mosque, built to honor these heroes of Islam. From the foot of
            the mountain, visitors can experience both a spiritual atmosphere and the scenic beauty of Madinah.
          </p>
          <p>
            For travelers, Jabal Uhud is not merely a site of pilgrimage but also a place to reflect on the values of
            struggle, sacrifice, and steadfast faith. It is no wonder that this location is visited daily by pilgrims
            from all over the world performing Hajj and Umrah.
          </p>
        </article>

        {/* Inline CTA like in mock */}
        <div className="mt-4 flex justify-center">
          <button className="px-4 py-2 rounded-full bg-[#DD8E23] text-white text-sm shadow hover:brightness-95 active:scale-[0.98]">
            Book Now
          </button>
        </div>

        {/* Keep the list visible below the detail card */}
        <section className="mt-6">
          <h2 className="font-semibold text-gray-900 text-lg mb-2">Most Visited</h2>
          <div className="flex flex-col gap-2">
            {mostVisited.map((p, i) => (
              <MostVisitedCard
                key={i}
                {...p}
                bookmarked={bookmarkedSet.has(p.title)}
                onToggle={() =>
                  setBookmarkedSet((prev) => {
                    const next = new Set(prev);
                    if (next.has(p.title)) next.delete(p.title);
                    else next.add(p.title);
                    return next;
                  })
                }
              />
            ))}
          </div>
        </section>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}

function TopNavAndSearch() {
  const router = useRouter();

  return (
    <section className="relative bg-white pb-4">
      {/* Nav bar */}
      <div className=" px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-white/10 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#103051]" />
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

      {/* Search */}
      
    </section>
  );
}

function IconBubble({ children, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`bg-white/95 backdrop-blur p-2 rounded-full shadow ${active ? "ring-1 ring-[#103051]" : ""}`}
      title={label}
    >
      {children}
    </button>
  );
}


function MostVisitedCard({ title, country, rating, price, image, bookmarked, onToggle }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md border border-gray-200 ring-1 ring-gray-100 flex gap-2 items-start w-full h-30 break-words">
      <div className="relative w-20 h-30 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
        <Image src={image} alt={title} fill className="object-cover" sizes="80px" />
      </div>

      <div className="flex-1 pl-1 pr-3 py-2">
        <h4 className="font-semibold text-gray-900 leading-snug">{title}</h4>
        <div className="mt-0.5 text-sm text-gray-700">
          <span className="inline-flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-400 fill-current" />
            {rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-0.5 text-sm text-gray-700">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {country}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-[#103051] font-bold">{"$" + price}</span>
          <button className="px-3 py-1.5 rounded-xl bg-[#DD8E23] text-[#FFFFFF] text-sm shadow hover:brightness-95">
            Book Now
          </button>
        </div>
      </div>

      {/* save */}
      <button
        onClick={onToggle}
        className="absolute top-3 right-3 bg-white/95 p-1.5 rounded-full shadow transition-colors"
        aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        aria-pressed={bookmarked}
        title={bookmarked ? "Bookmarked" : "Bookmark"}
      >
        <Bookmark className={`w-5 h-5 ${bookmarked ? "text-[#103051]" : "text-gray-400"}`} />
      </button>
    </div>
  );
}
