"use client";

import { useEffect, useRef } from "react";
import { Mic, Repeat } from "lucide-react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import TopNavAndSearch from "@/components/TopNavAndSearch";

export default function CameraAccessPage() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const pathname = usePathname();

useEffect(() => {
  async function enableCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }

  enableCamera();

  // ✅ Simpan reference ke variable lokal
  const videoElement = videoRef.current;

  return () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoElement) {
      videoElement.srcObject = null;
    }
  };
}, [pathname]);


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavAndSearch location="Voice Conversation" showChat={false} showSettings />

      <div className="flex-1 flex flex-col items-center p-4">
        <h2 className="text-lg text-black font-semibold mb-4">
          Voice Conversation
        </h2>

        <div className="flex items-center space-x-4 mb-6">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full">
            <span>English</span>
          </button>
          <Repeat className="text-xl" />
          <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-full">
            <span>Spanish</span>
          </button>
        </div>

        <div className="w-full max-w-md bg-black rounded-xl overflow-hidden">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full" />
        </div>

        <div className="mt-4 flex flex-col items-center">
          <button className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <Mic className="w-8 h-8" />
          </button>
          <p className="text-gray-500 mt-2">Tap To Speak</p>
        </div>
      </div>

      <Navigation active="home" />
    </div>
  );
}
