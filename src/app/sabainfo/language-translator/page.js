
"use client";

import { useState } from "react";
import { Mic, Camera, Repeat } from "lucide-react";
import Navigation from "@/components/Navigation";
import TopNavAndSearch from "@/components/TopNavAndSearch";
import Link from "next/link";
import Image from "next/image";

export default function TranslatePage() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavAndSearch location="Translate Language" showChat={false} showSettings />

      <div className="flex-1 p-4">
        <h2 className="text-center text-lg font-semibold mb-4 text-black">Translate Language</h2>
        
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image src="/images/sabainfo/arab flag.jpeg" alt="US Flag" width={48} height={48} className="w-6 h-6 rounded-full" />
              <span className="text-black">Arabic</span>
            </div>
            <Repeat className="w-6 h-6 text-gray-500" />
            <div className="flex items-center gap-2">
              <Image src="/images/sabainfo/indonesia flag.jpeg" alt="Indonesian Flag" width={48} height={48} className="w-6 h-6 rounded-full" />
              <span className="text-black">Indonesian</span>
            </div>
          </div>

          <div className="relative bg-gray-100 rounded-xl p-4 mb-4">
            <span className="block text-gray-600 mb-2 font-medium">Arabic</span>
            <textarea
              className="w-full bg-transparent outline-none resize-none text-gray-500"
              rows="4"
              placeholder="Enter text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="absolute top-2 right-2 text-gray-500">
              &times;
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Link href="/sabainfo/language-translator/microphone-translator" className="p-2 bg-blue-500 text-white rounded-full hover:scale-105">
                  <Mic className="w-5 h-5" />
              </Link>
              <Link href="/sabainfo/language-translator/camera-translator" className="p-2 bg-blue-500 text-white rounded-full hover:scale-105">
                  <Camera className="w-5 h-5" />
              </Link>
            </div>
            <button className="bg-amber-500 text-white py-2 px-4 rounded-full">
              Translate
            </button>
          </div>
        </div>
      </div>

      <Navigation active="home" />
    </div>
  );
}