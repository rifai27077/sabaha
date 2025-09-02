"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronLeft, Upload } from "lucide-react"

export default function MitraDocuments() {
    const router = useRouter()
    const [form, setForm] = useState({
        selfiePassport: null,
        simSaudi: null,
        muthawwif: null,
    })

    const handleChange = (e) => {
        const { name, files } = e.target
        setForm((prev) => ({ ...prev, [name]: files[0] }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.selfiePassport) {
        alert("Selfie dengan paspor wajib diunggah")
        return
        }
        router.push("/mitra/welcome")
    }

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 py-6 flex justify-center">
            <div className="w-full max-w-lg">
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f2f51]">
                            Berkas Pendukung
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 leading-snug">
                            Upload Berkas Sebagai Bukti <br /> Legalitas Mitra
                        </p>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#103051] text-white mb-6 hover:bg-[#0c243d] transition"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-700 mb-1">
                            Upload Selfie Foto Diri dengan Paspor
                        </p>
                        <UploadInput
                            name="selfiePassport"
                            file={form.selfiePassport}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <p className="text-xs sm:text-sm text-gray-700 mb-1">
                            Upload SIM Arab Saudi (Untuk SabaDrive)
                        </p>
                        <UploadInput
                            name="simSaudi"
                            file={form.simSaudi}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <p className="text-xs sm:text-sm text-gray-700 mb-1">
                        Sertifikat Muthawwif (Untuk SabaPray)
                        </p>
                        <UploadInput
                            name="muthawwif"
                            file={form.muthawwif}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full h-11 sm:h-12 rounded-full bg-[#103051] text-white text-sm sm:text-base font-medium hover:bg-[#0c243d] transition"
                    >
                        Lanjut
                    </button>
                </form>
            </div>
        </div>
    )
    }

    function UploadInput({ name, file, onChange }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
        <label className="flex-1">
            <div className="w-full h-11 sm:h-12 bg-gray-100 rounded-xl px-4 flex items-center justify-between text-sm cursor-pointer">
            <span className={`truncate ${file ? "text-gray-800" : "text-gray-400"}`}>
                {file ? file.name : "Click to Upload"}
            </span>
            <Upload className="w-5 h-5 text-gray-400" />
            </div>
            <input
            type="file"
            name={name}
            accept="image/*, application/pdf"
            onChange={onChange}
            className="hidden"
            required={!file}
            />
        </label>
        {file && (
            <button
            type="button"
            className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium cursor-pointer"
            onClick={() => window.open(URL.createObjectURL(file), "_blank")}
            >
            Lihat File
            </button>
        )}
        </div>
    )
}
