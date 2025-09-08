"use client"

import { Mail, LogOut, Plus, History, Eye, Utensils, Shirt, Badge, Moon, Star, Flag, Car, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Link from "next/link"
import Image from "next/image";
import { useState } from "react";

const services = [
  { name: "SabaFood", icon: <Utensils className="w-10 h-10 text-amber-500" />, href: "/sabafood" },
  { name: "SabaWash", icon: <Shirt className="w-10 h-10 text-amber-500" />, href: "/sabawash" },

  // Custom kombinasi untuk SabaPray
  { 
    name: "SabaPray",
    href: "/sabapray",
    icon: (
      <div className="relative w-10 h-10 flex items-center justify-center">
        <Badge className="w-10 h-10 text-amber-500" fill="currentColor" />

        <Moon 
          className="absolute w-6 h-6 text-white left-2 " 
          fill="currentColor" 
          stroke="none" 
        />
        <Star 
          className="absolute w-3 h-3 text-white right-1.5 top-1.5" 
          fill="currentColor" 
          stroke="none" 
        />
      </div>
    ),
  },

  { name: "SabaGuide", href: "/sabaguide", icon: <Flag className="w-10 h-10 text-amber-500" /> },
  { name: "SabaDrive", href: "/sabadrive", icon: <Car className="w-10 h-10 text-amber-500" /> },
  { name: "SabaInfo",  href: "/sabainfo",  icon: <Info className="w-10 h-10 text-amber-500" /> },
];

const cards = [
  {
    title: "Keutamaan Shalat di Masjidil Haram dan Masjid Nabawi",
    desc: "Pahala berlipat dalam satu rakaat. Kenali keistimewaan dua masjid suci ini dan adab saat beribadah di dalamnya.",
    img: "/images/card-informasi-1.png",
    category: "Ibadah"
  },
  {
    title: "Tips Sehat dan Aman Selama Ibadah Umrah di Musim Panas",
    desc: "Musim panas di Arab Saudi bisa mencapai 45°C. Berikut panduan agar jamaah tetap sehat dan nyaman saat beribadah.",
    img: "/images/card-informasi-2.png",
    category: "Jama'ah"
  },
  {
    title: "Barang Bawaan yang Dilarang Masuk ke Area Masjidil Haram dan Nabawi",
    desc: "Agar tidak tertahan di gerbang, kenali barang yang tidak diperbolehkan saat memasuki dua masjid suci.",
    img: "/images/card-informasi-3.jpg",
    category: "Aturan"
  },
  {
    title: "Gunakan Layanan Sahaba untuk Kebutuhan Harian Jamaah di Tanah Suci",
    desc: "Dari antar makanan hingga panduan ibadah, Sahaba hadir sebagai sahabat setia jamaah Indonesia di Makkah & Madinah.",
    img: "/images/card-informasi-4.jpg",
    category: "Layanan"
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Semua");

  const filteredCards = activeTab === "Semua"
    ? cards
    : cards.filter((card) => card.category === activeTab);

  return (
     <div className="bg-gradient-to-b from-[#103051] to-[#1e4d7b] min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between text-white py-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* tambahkan width/height agar next/image tidak error */}
          <Image src="/images/logo2.png" alt="Sahaba Logo" width={120} height={36} className="object-contain" />
        </div>

         {/* Navigation */}
        <nav className="flex items-center gap-4 md:gap-8 text-sm md:text-base">
          <Link href="" className="flex flex-col items-center gap-1 md:gap-2 text-white no-underline hover:text-gray-200">
            <Mail size={25} className="md:w-5 md:h-5" /><span className="text-sm md:text-lg lg:text-xl">Pesan</span>
          </Link>

          <Link href="/user/login" className="flex flex-col items-center gap-1 md:gap-2 text-white no-underline hover:text-gray-200">
            <LogOut size={25} className="md:w-5 md:h-5" /><span className="text-sm md:text-lg lg:text-xl">Keluar</span>
          </Link>
        </nav> 
      </header>

      {/* Main Content Area */}
      <main className="max-w-full mx-auto mt-4 px-4">

        {/* Saldo Card */}
        <section className="py-2">

            {/* Card putih utama */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-4">

                {/* Atas: Foto + Status */}
                <div className="flex items-center justify-between">

                    {/* Kiri: Foto + Sapaan */}
                    <div className="flex items-center gap-2">
                        {/* remote image: gunakan <img> bila belum menambahkan domain di next.config.js */}
                        <img src="/images/profile.png" alt="Profil" className="w-12 h-12 rounded-full object-cover"/>

                        <div>
                            <div className="font-light text-black text-lg">
                                Assalamualaikum, Rafi!
                            </div>

                            <a href="#" className="flex text-[#2B93FEC2] text-sm hover:underline">Profil &gt;</a>
                        </div>
                    </div>

                    {/* Kanan: Status */}
                    <div className="grid flex-col items-end">
                        <span className="text-black font-medium">Status</span>
                        <div className="flex items-center gap-2">
                        <span className="text-[#103051] font-bold">Aktif</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"></span>
                        </div>
                    </div>
                </div>

                {/* Card saldo di dalam card putih */}
                <div className="bg-[#103051] text-white rounded-2xl p-4 mt-4 shadow-xl">
                    <div className="flex items-center justify-between">
                        {/* Kiri: Saldo + Detail */}
                        <div>
                            <div className="font-medium text-sm">Saldo Anda</div>
                            <div className="flex items-center text-2xl font-bold"> SR 400,00
                                <button className="ml-2"><Eye size={25} color="#FFAA01" /></button>
                            </div>
                            <a href="#" className="text-[#FFAA01] text-sm mt-1 inline-block hover:text-[#FFAA01]"> Buka Detail &gt; </a>
                        </div>

                        {/* Kanan: Tombol sejajar */}
                        <div className="flex gap-3">
                            <div className="grid grid-cols-1 gap-1 text-center">
                                <button className="bg-white text-[#103051] rounded-xl px-4 py-2 font-semibold hover:bg-gray-100"><Plus size={20} /></button>
                                <span>Top Up</span>
                            </div>

                            <div className="grid grid-cols-1 gap-1 text-center">
                                <button className="bg-white text-[#103051] rounded-xl px-4 py-2 font-semibold hover:bg-gray-100"><History size={20} /></button>
                                <span>History</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* Fitur Utama */}
       <section className="-mx-4 bg-white rounded-t-4xl shadow-md p-6 mb-8">

        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-bold text-lg text-gray-900">Fitur Utama Anda</h2>
          <div className="flex-1 border-t-2 border-amber-500"></div>
        </div>

        <div className="flex items-center justify-center bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
            {services.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-6 hover:shadow-lg active:scale-[0.98] transition w-full h-32 focus:outline-none"
                aria-label={item.name}
              >
                {item.icon}
                <span className="mt-2 text-sm font-medium text-gray-700 text-center group-hover:text-[#103051]">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

       <div className="mb-6 mt-6">
            <h2 className="font-bold text-lg text-gray-900 mb-3">Informasi Tanah Suci</h2>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {['Semua', 'Ibadah', "Jama'ah", 'Aturan', 'Layanan'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full border font-medium text-base transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

         {/* Card Informasi */}
          <div className="flex flex-col gap-4">
            {filteredCards.map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-4">
                <Image src={item.img} alt={item.title} width={80} height={80} className="rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">{item.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">{item.desc}</p>
                </div>
                <a href="#" className="text-blue-500 text-sm font-medium whitespace-nowrap">Lihat &gt;</a>
              </div>
            ))}
          </div>
        </section>
        <Navigation active="home" />
      </main>
    </div>
  );
}