
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-white relative flex flex-col items-center justify-center px-6">
            <button
                onClick={() => router.back()}
                aria-label="Back"
                className="absolute left-6 top-6 h-12 w-12 rounded-full bg-neutral-900 text-white grid place-items-center shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="mb-8">
                <Image
                    src="/images/illustrations/404.png"
                    alt="404 illustration"
                    width={420}
                    height={420}
                    priority
                    className="mx-auto h-auto w-[260px] sm:w-[340px] md:w-[380px]"
                />
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#163A5B]">
                Coming Soon!
            </h1>
            <p className="mt-3 max-w-[28rem] text-center text-gray-500 text-base sm:text-lg">
                This page is currently under maintenance.
                <br />
                Come back to the homepage
            </p>

            <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold text-white shadow-lg
                        bg-gradient-to-b from-[#2E6AA2] to-[#113B64]
                        hover:opacity-95 active:scale-[0.99]
                        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
                Back to Homepage
            </Link>
        </main>
    )
}
