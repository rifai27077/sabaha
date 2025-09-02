"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, Wallet, Clock, User } from "lucide-react"

function NavItem({ href, icon, label, active }) {
  return (
    <Link href={href} className="cursor-pointer flex-1">
      <div className="relative flex flex-col items-center text-[11px] font-medium transition-colors">
        <div className={active ? "text-[#103051]" : "text-gray-400"}>
          {icon}
        </div>
        <span
          className={
            active
              ? "text-[#103051] font-semibold"
              : "text-gray-400 font-normal"
          }
        >
          {label}
        </span>

        {/* Titik indikator */}
        {active && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#103051] mt-0.5" />
        )}
      </div>
    </Link>
  )
}


export default function Navigation({ active = "home" }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t flex items-center justify-between px-6 pt-1 pb-4 z-[999] shadow-md pb-[env(safe-area-inset-bottom)]">
      <NavItem
        href="/"
        icon={<Home className="w-6 h-6" />}
        label="Home"
        active={active === "home"}
      />
      <NavItem
        href="/saldo"
        icon={<Wallet className="w-6 h-6" />}
        label="Saldo"
        active={active === "saldo"}
      />

      {/* FAB SAHABA */}
      <div className="relative -translate-y-4 flex flex-col items-center">
  <button
    onClick={() => {}}
    className="bg-[#103051] border-4 border-white text-white p-3 rounded-full shadow-xl cursor-pointer transition-transform hover:scale-105"
    aria-label="SAHABA"
  >
    <Image
      src="/images/sahaba-logo.png"
      alt="SAHABA"
      width={35}
      height={35}
    />
  </button>
  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-black">
    SAHABA
  </div>
</div>

      <NavItem
        href="/history"
        icon={<Clock className="w-6 h-6" />}
        label="History"
        active={active === "history"}
      />
      <NavItem
        href="/akun"
        icon={<User className="w-6 h-6" />}
        label="Akun"
        active={active === "akun"}
      />
    </nav>
  )
}
