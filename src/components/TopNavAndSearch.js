"use client";

import Image from "next/image";
import { ArrowLeft, MessageCircle, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="relative bg-white pb-4 top-0 z-50">
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
    </header>
  );
}
