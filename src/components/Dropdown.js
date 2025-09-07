"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-[#0f2f51] font-medium shadow-sm"
      >
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-1 rounded-xl border border-gray-200 bg-white shadow-lg z-10">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-sm text-[#0f2f51] hover:bg-blue-50 rounded-lg"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
