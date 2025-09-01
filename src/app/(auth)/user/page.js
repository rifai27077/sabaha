"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white relative overflow-hidden">
      {/* Bagian lingkaran/kotak biru */}
      <div
        className="
          absolute 
          -top-[35%] left-[57%] -translate-x-1/2
          w-[150%] aspect-square
          bg-[#103051] rounded-full
          flex items-center justify-center
          z-0
          transition-all duration-300

          /* Tablet */
          sm:-top-[90%] sm:w-[140%]

          /* Medium screens (iPad landscape) */
          md:-top-[160%] md:w-[160%]

          /* Large desktop */
          lg:top-0 lg:left-0 lg:translate-x-0
          lg:w-full lg:h-[45%] lg:rounded-none
        "
      >
        <Image
          src="/images/onboarding-illustration.png"
          alt="Onboarding Illustration"
          width={220}
          height={220}
          className="
            z-10
            w-[180px] h-[180px]
            sm:w-[200px] sm:h-[200px]
            md:w-[240px] md:h-[240px]
            lg:w-[260px] lg:h-[260px]
          "
        />
      </div>

      {/* Bagian teks dan tombol */}
      <div
        className="
          flex flex-col items-start px-6 text-left mt-auto
          relative z-10

          /* Phone */
          mt-[270px]

          /* Tablet */
          sm:mt-[450px]

          /* iPad / medium screen */
          md:mt-[400px]

          /* Desktop */
          lg:mt-[400px]

          /* Extra large screens */
          xl:mt-[400px]
        "
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#103051] leading-tight">
          Buat Akun Anda
          <br />
          <span className="font-bold">Sekarang!</span>
        </h1>

        <p className="text-gray-500 text-base sm:text-lg md:text-xl mt-4 mb-10 max-w-md">
          Buat profil untuk membantu anda selama di tanah suci!
        </p>

        <button
          onClick={() => router.push("/user/register")}
          className="bg-[#DD8E23] text-white w-full py-3 sm:py-4 md:py-5 rounded-full font-semibold shadow-md hover:bg-[#b8741c] transition"
        >
          Daftar Sekarang
        </button>
      </div>

      {/* Spacer bawah */}
      <div className="h-12"></div>
    </div>
  )
}
