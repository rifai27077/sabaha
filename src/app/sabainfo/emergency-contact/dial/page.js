"use client";

import { useState } from "react";
import { Phone, Delete, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DialerPage() {
  const [number, setNumber] = useState("+20");
  const router = useRouter();

  const handleButtonClick = (value) => {
    if (number.length < 15) {
      setNumber((prev) => prev + value);
    }
  };

  const handleBackspace = () => {
    if (number.length > 3) {
      // jangan hapus prefix "+20"
      setNumber((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black items-center justify-center p-6 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back("/sabainfo/emergency-contact")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow hover:bg-gray-200 active:scale-95 transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Display */}
      <div className="w-full max-w-xs bg-gray-100 rounded-lg p-4 text-center text-2xl font-bold mb-8 tracking-wide shadow-sm">
        {number}
      </div>

      {/* Dial Pad */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((item) => (
          <button
            key={item}
            onClick={() => handleButtonClick(item)}
            className="w-20 h-20 flex items-center justify-center text-2xl font-bold bg-gray-100 rounded-full shadow hover:bg-gray-200 active:scale-95 transition"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Call and Backspace Buttons */}
      <div className="flex space-x-6">
        {/* Call Button */}
        <button className="w-16 h-16 flex items-center justify-center bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 active:scale-95 transition">
          <Phone className="w-7 h-7" />
        </button>

        {/* Backspace Button */}
        <button
          onClick={handleBackspace}
          className="w-16 h-16 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 active:scale-95 transition"
        >
          <Delete className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
