"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft, Mail, Lock, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export default function UserLogin() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [open, setOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [animate, setAnimate] = useState(false)
    
    useEffect(() => {
        if (open) {
            setTimeout(() => setAnimate(true), 10)
        } else {
            setAnimate(false)
        }
    }, [open])

    const handleLogin = (e) => {
        e.preventDefault()
        console.log("Login dengan:", { email, password })
    }

    const accounts = [
        { name: "Rafi", email: "rafinazwan@gmail.com" },
        { name: "Andien", email: "andienbhp@gmail.com" },
    ]

    const moreAccounts = [
        { name: "Budi", email: "budi@example.com" },
        { name: "Sinta", email: "sinta@example.com" },
    ]

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
            <div className="w-full max-w-md">
                
                <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#103051] text-white mb-6 hover:bg-[#0c243d] transition"
                >
                <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex justify-center mb-8">
                <Image 
                    src="/images/logo.png" 
                    alt="Sahaba Logo" 
                    width={280} 
                    height={190} 
                    className="h-auto w-auto max-w-[280px]" 
                />
                </div>

                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <div className="relative">
                    <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 sm:h-14 bg-gray-100 text-black rounded-lg pl-4 pr-10 text-sm sm:text-base
                                focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                    required
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="relative">
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 sm:h-14 bg-gray-100 text-black rounded-lg pl-4 pr-10 text-sm sm:text-base
                                focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                    required
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#103051] text-white rounded-full py-3 sm:py-4 font-medium 
                            hover:bg-[#0c243d] transition text-sm sm:text-base cursor-pointer"
                >
                    Masuk
                </button>
                </form>

                <button
                    onClick={() => setOpen(true)}
                    className="mt-4 flex items-center justify-center w-full py-3 text-sm sm:text-base text-gray-700 transition cursor-pointer">
                    Masuk Dengan Google
                    <Image
                        src="/images/google-logo.png"
                        alt="Google Logo"
                        width={20}
                        height={20}
                        className="ml-2 w-5 h-5"
                    />
                </button>

                <p className="mt-6 text-center text-sm sm:text-base text-gray-600">
                    Belum Punya Akun?{" "}
                    <button
                        onClick={() => router.push("/user/register")}
                        className="text-blue-500 font-medium cursor-pointer"
                    >
                        Daftar
                    </button>
                </p>

                {open && (
                <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
                    <div
                        className={`bg-[#FAFAFAED] rounded-t-2xl p-6 w-full max-w-md shadow-lg transform transition-transform duration-300 ease-out ${
                            animate ? "translate-y-0" : "translate-y-full"
                        }`}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                                    alt="Google Logo"
                                    width={92}
                                    height={30}
                                    className="h-6"
                                />
                                <h2 className="text-lg font-medium text-gray-700">Pilih Akun Anda</h2>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {accounts.map((account) => (
                            <button
                                key={account.email}
                                className="bg-gray-100 w-full flex items-center justify-between py-3 px-4 border rounded-lg mb-2 hover:bg-gray-200 text-left"
                                onClick={() => console.log(`Login with ${account.email}`)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{account.name}</p>
                                        <p className="text-sm text-gray-400">{account.email}</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        ))}

                        <div className="mt-4">
                            <button
                                className="flex items-center justify-center w-full text-black text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <span>Use another account</span>
                                {showDropdown ? (
                                    <ChevronUp className="w-4 h-4 ml-2" />
                                ) : (
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                )}
                            </button>

                            {showDropdown && (
                                <div className="mt-2 space-y-2">
                                    {moreAccounts.map((account) => (
                                        <button
                                            key={account.email}
                                            className="bg-gray-100 w-full flex items-center justify-between py-3 px-4 border rounded-lg hover:bg-gray-200 text-left"
                                            onClick={() => {
                                                console.log(`Login with ${account.email}`)
                                                setShowDropdown(false)
                                            }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">{account.name}</p>
                                                    <p className="text-sm text-gray-400">{account.email}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}
