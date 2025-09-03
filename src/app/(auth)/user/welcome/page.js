"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

export default function UserWelcomePage() {
    const router = useRouter()

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start bg-white px-6 pt-12 lg:pt-20 text-left"
            onClick={() => router.push("/home")}
        >
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        router.back()
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mb-10 lg:mb-16"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-black text-center lg:text-left">
                    Selamat Datang
                </h1>

                <div className="relative w-[300px] md:w-[330px] lg:w-[350px] h-[300px] md:h-[330px] lg:h-[350px] mx-auto">
                    <Image
                        src="/images/illustrations/welcome.png"
                        alt="Welcome illustration"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 300px, (max-width: 1024px) 330px, 350px"
                    />
                </div>


                <div className="text-center lg:text-left">
                    <p className="text-gray-700 mb-2 text-sm md:text-base lg:text-lg">
                        Kemudahan, Kenyamanan, dan Keamanan Sudah Menunggu Anda!
                    </p>
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg">
                        Sentuh Layar Untuk Lanjut Ke Beranda.
                    </p>
                </div>
            </div>
        </div>
    )
}
