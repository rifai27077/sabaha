"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, ChevronLeft } from "lucide-react"

export default function OtpVerification() {
    const router = useRouter()
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const [timer, setTimer] = useState(30)

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(countdown)
        }
    }, [timer])

    const handleChange = (value, index) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            if (value && index < otp.length - 1) {
                document.getElementById(`otp-${index + 1}`).focus()
            }
        }
    }

    const handleVerify = (e) => {
        e.preventDefault()
        console.log("Kode OTP:", otp.join(""))
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-white px-6 pt-12">
            <div className="w-full max-w-md">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mb-14"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="items-start text-left">
                    <h1 className="text-xl font-medium mb-5 text-black">Verifikasi Kode OTP</h1>
                    <p className="text-sm text-gray-600">
                        Masukan code 6-digit yang sudah dikirimkan ke email{" "}
                        <span className="font-medium text-black">hemmyhtec@gmail.com</span>{" "}
                        for verification.
                    </p>
                </div>

                <form
                    onSubmit={handleVerify}
                    className="w-full flex flex-col items-center mt-8 space-y-6"
                >
                    <div className="flex gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                value={digit}
                                maxLength={1}
                                onChange={(e) => handleChange(e.target.value, index)}
                                className="w-10 h-12 border border-gray-200 rounded-lg text-center text-lg font-medium text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#103051] text-white rounded-full py-3 font-medium hover:bg-[#0c243d] transition"
                    >
                        VERIFY
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Didn’t receive any code?</p>
                    <p className="text-gray-500 opacity-70">
                        Request new code in{" "}
                        <span className="font-medium">{`00:${timer}s`}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
