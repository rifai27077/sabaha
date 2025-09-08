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
          z-0
          transition-all duration-300
          pointer-events-none

          /* Tablet */
          sm:-top-[90%] sm:w-[140%]

          /* Medium screens (iPad landscape) */
          md:-top-[160%] md:w-[160%]

          /* Large desktop */
          lg:top-0 lg:left-0 lg:translate-x-0
          lg:w-full lg:h-[60%] lg:rounded-none
        "
      ></div>

      {/* Foto berada di bawah background biru */}
      <div
        className="
          flex justify-center 
          mt-40 sm:mt-48 md:mt-56 lg:mt-64
          relative z-10
        "
      >
        <Image
          src="/images/illustrations/register.png"
          alt="register Illustration"
          width={320}
          height={320}
          className="
            w-[180px] h-[180px]
            sm:w-[200px] sm:h-[200px]
            md:w-[240px] md:h-[240px]
            lg:w-[280px] lg:h-[280px]
            xl:w-[320px] xl:h-[320px]
          "
        />
      </div>

      {/* Bagian teks dan tombol */}
      <div
        className="
          flex flex-col items-start px-6 text-left mt-auto
          relative z-10
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
