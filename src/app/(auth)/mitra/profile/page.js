"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    User,
    Calendar,
    FileText,
    Upload,
    Phone,
    MapPin,
    Home,
    ChevronLeft,
} from "lucide-react"

export default function MitraProfile() {
    const router = useRouter()
    const [form, setForm] = useState({
        fullName: "",
        gender: "",
        placeOfBirth: "",
        dateOfBirth: "",
        passportNumber: "",
        passportPhoto: null,
        visaNumber: "",
        visaPhoto: null,
        iqamaNumber: "",
        saudiIdNumber: "",
        saudiAddress: "",
    })

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        setForm((prev) => ({ ...prev, [name]: type === "file" ? files[0] : value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.passportPhoto) {
        alert("Foto Paspor wajib diunggah")
        return
        }
        router.push("/mitra/job")
    }

    const RightIcon = ({ children }) => (
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-md p-2">
        <div className="w-4 h-4 text-gray-500">{children}</div>
        </div>
    )

    // 🔹 Reusable UploadInput
    function UploadInput({ label, name, file, onChange }) {
        return (
        <div className="space-y-1">
            {label && (
            <p className="text-xs sm:text-sm text-gray-700">{label}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
            <label className="flex-1">
                <div className="w-full h-11 sm:h-12 bg-gray-100 rounded-xl px-4 flex items-center justify-between text-sm cursor-pointer">
                <span
                    className={`truncate ${file ? "text-gray-800" : "text-gray-400"}`}
                >
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
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 py-6 flex justify-center">
            <div className="w-full max-w-lg">
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f2f51]">
                            Data Diri Mitra
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 leading-snug">
                            Lengkapi Data Diri DIbawah <br /> Untuk Mitra SAHABA
                        </p>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#103051] text-white mb-6 hover:bg-[#0c243d] transition"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nama Lengkap (Sesuai Paspor)"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                form.fullName ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <User className="w-4 h-4" />
                        </RightIcon>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                                className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                form.gender ? "text-gray-800" : "text-gray-400"
                                }`}
                            >
                                <option value="">Jenis Kelamin</option>
                                <option value="male">Laki-laki</option>
                                <option value="female">Perempuan</option>
                            </select>
                            <RightIcon>
                                <User className="w-4 h-4" />
                            </RightIcon>
                        </div>

                        <div className="relative">
                        <input
                            type="text"
                            name="placeOfBirth"
                            placeholder="Tempat Lahir"
                            value={form.placeOfBirth}
                            onChange={handleChange}
                            required
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            form.placeOfBirth ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <MapPin className="w-4 h-4" />
                        </RightIcon>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            required
                            className="w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <RightIcon>
                            <Calendar className="w-4 h-4" />
                        </RightIcon>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="passportNumber"
                            placeholder="Nomor Paspor"
                            value={form.passportNumber}
                            onChange={handleChange}
                            required
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                form.passportNumber ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <FileText className="w-4 h-4" />
                        </RightIcon>
                    </div>

                    <UploadInput
                        label="Foto Paspor"
                        name="passportPhoto"
                        file={form.passportPhoto}
                        onChange={handleChange}
                    />

                    <div className="relative">
                        <input
                            type="text"
                            name="visaNumber"
                            placeholder="Nomor Visa (Hanya Pekerja)"
                            value={form.visaNumber}
                            onChange={handleChange}
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                form.visaNumber ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <FileText className="w-4 h-4" />
                        </RightIcon>
                    </div>

                    <UploadInput
                        label="Foto/File Visa"
                        name="visaPhoto"
                        file={form.visaPhoto}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                        <input
                            type="text"
                            name="iqamaNumber"
                            placeholder="Nomor Iqama"
                            value={form.iqamaNumber}
                            onChange={handleChange}
                            required
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            form.iqamaNumber ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <FileText className="w-4 h-4" />
                        </RightIcon>
                        </div>

                        <div className="relative">
                        <input
                            type="text"
                            name="saudiIdNumber"
                            placeholder="Nomor Arab Saudi"
                            value={form.saudiIdNumber}
                            onChange={handleChange}
                            required
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            form.saudiIdNumber ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <Phone className="w-4 h-4" />
                        </RightIcon>
                        </div>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="saudiAddress"
                            placeholder="Alamat Tinggal di Arab Saudi"
                            value={form.saudiAddress}
                            onChange={handleChange}
                            required
                            className={`w-full h-11 sm:h-12 bg-gray-100 rounded-xl pl-4 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                form.saudiAddress ? "text-gray-800" : "text-gray-400"
                            }`}
                        />
                        <RightIcon>
                            <Home className="w-4 h-4" />
                        </RightIcon>
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
