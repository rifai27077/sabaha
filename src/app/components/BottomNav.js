"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Wallet, History, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const menus = [
    { name: "Home", href: "/user/homepage", icon: House },
    { name: "Saldo", href: "/saldo", icon: Wallet },
    { name: "History", href: "/history", icon: History },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg">
      <div className="flex justify-around items-center h-16 relative">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className="flex flex-col items-center"
            >
              <div
                className={`flex items-center justify-center transition-colors ${
                  isActive ? "text-blue-900" : "text-gray-500"
                }`}
              >
                <Icon size={24} />
              </div>

              {/* Kalau aktif → titik bulat, kalau tidak → teks */}
              {isActive ? (
                <span className="w-2 h-2 rounded-full bg-blue-900 mt-1"></span>
              ) : (
                <span className="text-xs mt-1 text-gray-500">{menu.name}</span>
              )}
            </Link>
          );
        })}

        {/* Logo Tengah (floating) */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-900 w-14 h-14 rounded-full flex items-center justify-center shadow-md">
          <img src="/images/logo3.png" alt="Logo" className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
