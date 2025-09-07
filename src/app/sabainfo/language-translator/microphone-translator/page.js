
"use client";

import { Mic, Repeat } from "lucide-react";
import Navigation from "@/components/Navigation";
import TopNavAndSearch from "@/components/TopNavAndSearch";

export default function VoiceConversationPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavAndSearch location="SabaInfo" showChat={false} showSettings />

      <div className="flex-1 p-4">
        <h2 className="text-center text-black text-lg font-semibold mb-4">Voice Conversation</h2>
        
        <div className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button className="p-2 bg-blue-500 text-white rounded-full">
                <Mic className="w-5 h-5" />
              </button>
              <span className="text-black">English</span>
            </div>
            <Repeat className="w-6 h-6 text-gray-500" />
            <div className="flex items-center gap-2">
              <span className="text-black">Spanish</span>
              <button className="p-2 bg-orange-500 text-white rounded-full">
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-black">Hello how are you?</p>
              <p className="text-orange-500">¿Hola como estas?</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-black">Hola</p>
              <p className="text-orange-500">Hello</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="p-4 bg-orange-500 text-white rounded-full">
            <Mic className="w-10 h-10" />
          </button>
        </div>
        <p className="text-center mt-2 text-gray-500">Tap To Speak</p>
      </div>

      <Navigation active="home" />
    </div>
  );
}