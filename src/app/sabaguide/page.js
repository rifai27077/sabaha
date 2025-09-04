"use client";

import Image from "next/image";
import Header from "@/components/Header";
import BottomNav from "@/app/components/BottomNav";
import {
  Search,
  Percent,
  MapPin,
  Star,
  ChevronRight,
  Bookmark,
  Mountain,
  Sun,
  Waves,
  Tent,
  Camera,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SabaGuidePage() {
  // Banner auto-rotate just to keep the page lively
  const [active, setActive] = useState(0);

  // Track bookmarked "Most Visited" items by title
  const [bookmarked, setBookmarked] = useState(new Set());

  const featured = [
    {
      title: "Jabal Uhud",
      country: "Madina, Saudi Arabia",
      image: "/images/sabaguide/banner1.jpeg",
    },
    {
      title: "Arafah",
      country: "Makkah, Saudi Arabia",
      image: "/images/sabaguide/banner2.jpg",
    },
    {
      title: "Masjidil Haram",
      country: "Saudi Arabia",
      image: "/images/sabaguide/banner3.jpg",
    },
  ];

  const mostVisited = [
    {
      title: "Jabal Uhud",
      country: "Saudi Arabia",
      rating: 4.8,
      price: 30,
      image: "/images/sabaguide/jabal-uhud.png",
    },
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

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % featured.length);
    }, 4500);
    return () => clearInterval(id);
  }, [featured.length]);

  const categories = [
    { label: "Mountains", Icon: Mountain },
    { label: "Desert", Icon: Sun },
    { label: "Lakes", Icon: Waves },
    { label: "Camp", Icon: Tent },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header location="Pullman Hotel Zam-Zam Tower" showChat />

      {/* TOP/HERO */}
      <section className="relative bg-gradient-to-t from-[#103051] via-[#103051]/100 to-white/0 pb-6">
        {/* Safe gradient overlay similar to the mock */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#103051] via-[##FFFFFF]/85 to-transparent [50%] sm:h-[55%] md:h-[60%]" />
                
        {/* Search */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
          <div className="flex items-center bg-white rounded-full px-3 py-2 sm:px-4 sm:py-3 shadow-md max-w-lg mx-auto lg:max-w-xl">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Which Place Do You Like?"
              className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-600 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Headline */}
        <div className="px-6 mt-5 relative z-10">
          <h1 className="text-white font-bold leading-tight text-[20px] sm:text-4xl md:text-5xl drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]">
            <span className="text-[#FFC043]">Explore</span>{" "}
            The{" "}
            <span className="text-[#FFC043]">Holy Land</span>{" "}
            With Trusted Guide!
          </h1>
        </div>

        {/* Featured horizontal cards (two visible like screenshot) */}
        <div className="mt-4 px-6 relative z-10">
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {featured.map((item, i) => (
              <FeaturedCard
                key={i}
                {...item}
                active={active === i}
              />
            ))}
          </div>

          {/* little pager under carousel */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {featured.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? "w-6 bg-[#FFC043]" : "w-2 bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SHEET */}
      <section className="-mt-4 bg-white rounded-t-3xl pt-6 pb-28 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] relative z-20">
        {/* handle */}
        <div className="flex justify-center mb-4">
          <span className="block w-24 h-1.5 rounded-full bg-gray-200" />
        </div>

        {/* Categories */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-lg">
              Categories
            </h2>
            <a href="" className="text-sm text-[#DD8E23] font-medium ">
              See All <ChevronRight className="inline-block w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {categories.map(({ label, Icon }) => (
              <Category key={label} label={label} Icon={Icon} />
            ))}
          </div>
        </div>

        {/* Most Visited */}
        <div className="px-6 mt-6">
          <h2 className="font-semibold text-gray-900 text-lg mb-2">
            Most Visited
          </h2>

          <div className="flex flex-col gap-2">
            {mostVisited.map((p, i) => (
              <MostVisitedCard
                key={i}
                {...p}
                bookmarked={bookmarked.has(p.title)}
                onToggle={() =>
                  setBookmarked((prev) => {
                    const next = new Set(prev);
                    if (next.has(p.title)) next.delete(p.title);
                    else next.add(p.title);
                    return next;
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>
      <BottomNav />
    </div>
  );
}

/* Components */

function Category({ Icon, label }) {
  return (
    <button className="flex flex-col items-center bg-white rounded-xl p-3 shadow-sm cursor-pointer active:scale-[0.98] transition-transform border border-gray-100">
      <div className="p-2.5 rounded-xl bg-orange-50 text-[#DD8E23] mb-1">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[11px] font-medium text-gray-700 text-center">
        {label}
      </span>
    </button>
  );
}

function FeaturedCard({ title, country, rating, image, active }) {
  return (
    <div className="relative snap-start flex-shrink-0 w-[68%] sm:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 68vw, 320px"
      />

      {/* top-right small tools */}
      <div className="absolute top-2 right-2 flex gap-1 bg-white rounded-full p-1 shadow">
       <Bookmark className="w-4 h-4 text-[#F75D37]" />
      </div>

      {/* bottom info */}
      <div className="absolute inset-x-0 bottom-0 p-3 text-white bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="font-semibold text-base leading-tight drop-shadow">
          {title}
        </h3>
        <div className="text-[13px] flex items-center gap-2 mt-0.5">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {country}
          </span>
        </div>
      </div>

      {/* subtle active ring */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl ring-2 transition-opacity ${
          active ? "ring-[#FFC043]/60 opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function MostVisitedCard({ title, country, rating, price, image, bookmarked, onToggle }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md flex gap-2 mb-3 items-center">
      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex-1">
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
