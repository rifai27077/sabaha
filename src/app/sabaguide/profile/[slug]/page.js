"use client";

import Image from "next/image";
import TopNavAndSearch from "@/components/TopNavAndSearch";
import Header from "@/components/Header";
import { Search, MapPin, Star, Bookmark } from "lucide-react";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";

const PLACES = {
  "jabal-uhud": {
    title: "Jabal Uhud",
    country: "Saudi Arabia",
    rating: 4.8,
    image: "/images/sabaguide/jabal-uhud.png",
    paragraphs: [
      "Welcome to Jabal Uhud, one of the must-visit historical destinations in Madinah. This mountain, rising over 1,000 meters high, not only offers the beauty of its distinctive red rocks but also holds great significance in Islamic history. It was here that the Battle of Uhud took place, a crucial encounter between the Muslims and the Quraysh of Makkah.",
      "During your visit, you can see the Graves of the Uhud Martyrs, where 70 companions of the Prophet are buried, including Hamzah ibn Abdul Muttalib, the beloved uncle of Prophet Muhammad (peace be upon him). You will also find the Sayyid al-Shuhada Mosque, built to honor these heroes of Islam. From the foot of the mountain, visitors can experience both a spiritual atmosphere and the scenic beauty of Madinah.",
      "For travelers, Jabal Uhud is not merely a site of pilgrimage but also a place to reflect on the values of struggle, sacrifice, and steadfast faith. It is no wonder that this location is visited daily by pilgrims from all over the world performing Hajj and Umrah.",
    ],
  },
  arafah: {
    title: "Arafah",
    country: "Saudi Arabia",
    rating: 4.7,
    image: "/images/sabaguide/arafah.jpg",
    paragraphs: [
      "Arafah is a vast plain located about 20 km southeast of Makkah. It is the focal point of the Hajj pilgrimage, where millions of Muslims gather for Wuquf on the 9th of Dhu al-Hijjah, a day filled with supplication and remembrance.",
      "The Mount of Mercy (Jabal Rahmah) is a well-known landmark in Arafah. Visitors can reflect on its deep spiritual significance while enjoying the expansive and serene landscape surrounding the area.",
      "Outside the Hajj season, Arafah remains a meaningful stop for pilgrims and travelers seeking to understand the spiritual journey and historical heritage of the holy sites.",
    ],
  },
  "al-ula": {
    title: "AL Ula",
    country: "Saudi Arabia",
    rating: 5.0,
    image: "/images/sabaguide/al-ula.jpg",
    paragraphs: [
      "AL Ula is a region of extraordinary natural beauty and archaeological significance in northwestern Saudi Arabia, known for its dramatic sandstone formations and ancient Nabatean heritage.",
      "The famous Hegra (Madain Saleh), a UNESCO World Heritage Site, features monumental tombs carved into rock faces, offering a glimpse into the civilizations that once flourished here.",
      "From scenic valleys to star-filled night skies, AL Ula provides an unforgettable blend of history, culture, and breathtaking desert landscapes.",
    ],
  },
};

export default function Page({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug ?? "jabal-uhud";
  const place = PLACES[slug] ?? PLACES["jabal-uhud"];
  const [bookmarkedSet, setBookmarkedSet] = useState(new Set());

  const mostVisited = Object.entries(PLACES)
    .filter(([key]) => key !== slug)
    .map(([key, value]) => ({
      slug: key,
      ...value,
      price: key === "al-ula" ? 120 : key === "arafah" ? 15 : 30,
    }));

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#103051] to-[#1e4d7b] pb-6 flex flex-col mb-5">
      <TopNavAndSearch />

      <div className="px-6 mt-5">
        <div className="flex items-center bg-white rounded-full px-3 py-2 shadow-md">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Which Place Do You Like?"
            className="flex-1 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          />
        </div>
      </div>

      <section className="rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">

      <div className="px-2 p-2 bg-white rounded-2xl mt-5">

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
          {place.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </article>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => router.push(`/sabaguide/orderlist`)}
            className="px-4 py-2 rounded-full bg-[#DD8E23] text-white text-sm shadow hover:brightness-95 active:scale-[0.98]"
          >
            Book Now
          </button>
        </div>

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
                onOpen={() => router.push(`/sabaguide/profile/[slug]`.replace("[slug]", p.slug))}
              />
            ))}
          </div>
        </section>

        </div>
      </section>
      <Navigation />
    </div>
  );
}

function MostVisitedCard({ slug, title, country, rating, price, image, bookmarked, onToggle, onOpen }) {
  return (
    <div
      onClick={onOpen}
      className="relative bg-white rounded-2xl shadow-md border border-gray-200 ring-1 ring-gray-100 flex gap-2 items-start w-full h-30 break-words cursor-pointer hover:bg-gray-50 active:scale-[0.99] transition"
    >
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen && onOpen();
            }}
            className="px-3 py-1.5 rounded-xl bg-[#DD8E23] text-[#FFFFFF] text-sm shadow hover:brightness-95"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* save */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
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