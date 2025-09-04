"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import Image from "next/image"

export default function UserWelcomePage() {
    const router = useRouter()

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-start bg-white px-6 pt-12 text-left"
            onClick={() => router.push("/homepage")}
        >
            <div className="w-full max-w-md">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        router.back()
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mb-14"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h1 className="text-2xl font-semibold mb-6 text-black">Selamat Datang</h1>

                <div className="mb-6">
                    <Image
                        src="/welcome.png"
                        alt="Welcome illustration"
                        width={220}
                        height={220}
                        className="mx-auto max-w-[220px] h-auto"
                    />
                </div>

                <p className="text-gray-700 mb-2">
                    Kemudahan, Kenyamanan, dan Keamanan Sudah Menunggu Anda!
                </p>
                <p className="text-gray-700">Sentuh Layar Untuk Lanjut Ke Beranda.</p>
            </div>
        </div>
    )
}
