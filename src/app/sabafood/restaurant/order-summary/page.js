"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import {
    Minus,
    Plus,
    ShoppingCart,
    Truck,
    CreditCard,
    MapPin,
    Tag,
    ChevronRight,
} from "lucide-react"
import { useBasket } from "@/context/BasketContext"
import Header from "@/components/Header"

export default function OrderSummary() {
    const router = useRouter()
    const params = useParams()
    const restaurantId = params.id

    const { basket, addToBasket, removeFromBasket, totalItems, totalPrice, clearBasket } = useBasket()

    const deliveryOptions = [
        { id: "economic", label: "Economic - 24 mins", price: 123 },
        { id: "priority", label: "Priority - 12 mins", price: 0 },
    ]

    const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState("card")

    const shippingFee = deliveryOptions[selectedDeliveryIndex].price
    const discount = 0
        const subtotal = basket.length > 0 ? totalPrice : 0
        const total = subtotal + shippingFee - discount

    return (
        <div className="min-h-screen bg-gray-50 pb-40">
        <Header location="Al - Baik Zam-Zam Tower" showChat />

        <div className="px-4 mt-3 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold text-gray-900">Order summary</h1>
                <button
                    onClick={() => router.push(`/sabafood/restaurant/${restaurantId}`)}
                    className="text-sm font-medium text-blue-600 cursor-pointer"
                >
                    Add items
                </button>
            </div>

            {basket.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                    Your basket is empty.
                </div>
            ) : (
            <>
                {basket.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden ring-1 ring-black/5">
                                <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900 leading-snug">
                                {item.name}
                                </span>
                                <span className="text-xs text-gray-500">Meal</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => removeFromBasket(item.id)}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            >
                                <Minus className="w-4 h-4 text-black" />
                            </button>
                                <div className="w-7 h-7 rounded-full border border-[#F59E0B] text-[#F59E0B] flex items-center justify-center text-sm font-semibold">
                                    {item.quantity}
                                </div>
                            <button
                                onClick={() => addToBasket(item)}
                                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            >
                                <Plus className="w-4 h-4 text-black" />
                            </button>
                        </div>
                    </div>
                ))}

                <div className="bg-white rounded-xl p-4 shadow-sm border">
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Subtotal (Include tax)</span>
                        <span className="font-medium text-gray-900">
                            {subtotal.toFixed(2)} SR
                        </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                        <span>Shipping fee</span>
                        <span className="font-medium text-gray-900">
                            {shippingFee.toFixed(2)} SR
                        </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                        <span>Discount</span>
                        <span className="font-medium text-gray-900">
                            -{discount.toFixed(2)} SR
                        </span>
                    </div>
                </div>
            </>
            )}
        </div>

        <div className="px-4 mt-5 space-y-3">
            <div className="flex justify-center">
                <div className="bg-[#103051] text-white rounded-full px-6 py-2 text-sm font-medium">
                    Delivery
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3 border">
                <div className="w-3 h-3 rounded-full bg-[#DD8E23] mt-1" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-black">
                                Pullman Hotel Zam-Zam Tower
                            </p>
                            <p className="text-xs text-gray-500">
                                Abraj Albait Complex, Mecca, SA
                            </p>
                        </div>
                        <button className="text-sm text-blue-600 cursor-pointer">Add</button>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <input
                            className="flex-1 border border-gray-200 text-gray-500 rounded-md px-3 py-2 text-sm"
                            placeholder="Floor / unit no."
                        />
                        <div className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                            Helps with delivery
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-4 mt-4">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-[#FDECD3]">
                    <Truck className="w-5 h-5 text-[#DD8E23]" />
                </div>
                <div>
                    <p className="text-sm font-medium text-black">Delivery options</p>
                    <p className="text-xs text-gray-500">Distance from you: 1.2 km</p>
                </div>
            </div>

            <div className="mt-3 space-y-2">
                {deliveryOptions.map((opt, idx) => {
                    const selected = idx === selectedDeliveryIndex
                    return (
                        <button
                            key={opt.id}
                            onClick={() => setSelectedDeliveryIndex(idx)}
                            className={`w-full text-left flex items-center justify-between rounded-xl p-3 border transition cursor-pointer ${
                            selected
                                ? "border-[#103051] bg-white"
                                : "border-gray-200 bg-white"
                            }`}
                        >
                            <div>
                                <p
                                    className={`text-sm font-medium ${
                                    selected ? "text-gray-900" : "text-gray-800"
                                    }`}
                                >
                                    {opt.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {selected ? "Selected" : "Estimated time & price"}
                                </p>
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                                {opt.price.toFixed(2)} SR
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>

        <div className="px-4 mt-4 space-y-2">
            <p className="text-sm font-medium text-black">Payment details</p>
            <div className="bg-white rounded-xl p-3 shadow-sm border">
                <button
                    onClick={() => setPaymentMethod("card")}
                    className="w-full flex items-center justify-between py-3 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#FDECD3]">
                            <CreditCard className="w-5 h-5 text-[#DD8E23]" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Cards (Recommended)</p>
                    </div>
                    {paymentMethod === "card" && (
                        <span className="text-xs text-gray-500">Selected</span>
                    )}
                </button>

                <div className="border-t border-gray-300 my-1" />

                <button
                    onClick={() => setPaymentMethod("cash")}
                    className="w-full flex items-center justify-between py-3 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#FDECD3]">
                            <MapPin className="w-5 h-5 text-[#DD8E23]" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">Cash</p>
                    </div>
                    {paymentMethod === "cash" && (
                        <span className="inline-block w-3 h-3 rounded-full bg-emerald-400"></span>
                    )}
                </button>
            </div>
        </div>

            <div className="px-4 mt-4 space-y-2">
                <p className="text-sm font-medium text-black">Offers</p>
                <div className="bg-white rounded-xl p-3 shadow-sm flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FDECD3] flex items-center justify-center">
                            <Tag className="w-4 h-4 text-[#DD8E23]" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                            Use offers or promo code
                        </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                </div>
            </div>

            {basket.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 pb-4 pt-3 shadow-lg">
                    <button
                        onClick={() => {
                            alert("Order placed successfully!")
                            clearBasket()
                            router.push("/sabafood/");
                        }}
                        className="w-full bg-[#103051] text-white py-3 rounded-full flex items-center justify-center gap-2 hover:bg-[#0c2742] transition-colors cursor-pointer"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="uppercase text-sm font-medium">ORDER NOW</span>
                        <span className="ml-2">{total.toFixed(2)} SR (Include Tax)</span>
                    </button>
                </div>
            )}
        </div>
    )
}
