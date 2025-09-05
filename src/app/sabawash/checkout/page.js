"use client";

import { useOrder } from "@/context/SabawashCheckout";
import Header from "@/components/Header";
import { Shirt, WashingMachine, Icon, Home, Clock, Pencil } from "lucide-react";
import { ironingBoard } from "@lucide/lab";
import { useRouter } from "next/navigation";
import { useState } from "react";

function getServiceStyle(key) {
    switch (key?.toLowerCase()) {
        case "simply":
            return {
                icon: <Shirt className="w-6 h-6 text-orange-500" />,
                bg: "bg-orange-50",
            };
        case "clean":
            return {
                icon: <WashingMachine className="w-6 h-6 text-orange-500" />,
                bg: "bg-orange-50",
            };
        case "iron":
            return {
                icon: <Icon iconNode={ironingBoard} className="w-6 h-6 text-orange-500" />,
                bg: "bg-orange-50",
            };
        default:
            return {
                icon: <WashingMachine className="w-6 h-6 text-orange-500" />,
                bg: "bg-orange-50",
            };
    }
}

function formatSR(value) {
    if (value == null) return "0.00";
    return (
        "SR " +
        Number(value)
        .toLocaleString(undefined, {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
        })
        .replace(".", ",")
    );
}

export default function CheckoutPage() {
    const { order, setOrder } = useOrder();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (!order) {
        return (
        <div className="min-h-screen flex items-center justify-center text-gray-300 bg-gradient-to-b from-[#103051] to-[#001a33]">
            <div className="text-center px-4">
            <p className="mb-2">No order found.</p>
            <p className="text-sm text-gray-400">
                Please go back and select a service.
            </p>
            </div>
        </div>
        );
    }

    const grandTotal =
        (order.itemTotal || 0) -
        (order.discount || 0) +
        (order.serviceFee || 0);

    const addr =
        order.address ||
        "Plot no.209, Kavuri Hills, Madhapur, Telangana 500033, Ph: +91234567890";

    const serviceKey = order.serviceKey || (order.service || "").toLowerCase();
    const { icon, bg } = getServiceStyle(serviceKey);

    const handlePlaceOrder = async () => {
        if (loading) return;
        setLoading(true);

        try {
        // contoh delay untuk request
        await new Promise((r) => setTimeout(r, 700));

        // simpan ke context (optional)
        if (setOrder) setOrder({ ...order, status: "ordered", orderedAt: new Date().toISOString() });
        router.push("/sabawash/checkout/payment");
        } catch (e) {
        console.error(e);
        alert("Failed to place order. Try again.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-white to-[#103051] text-gray-900">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-[#103051]/90 to-[#103051]" />

            <div className="relative z-10">
                <Header variant="logo" showChat showSettings />

                <main className="relative mx-auto px-4 pt-6 pb-12 z-10 max-w-md sm:max-w-2xl lg:max-w-6xl">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <div className="bg-white rounded-2xl p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100">
                                        <Home className="w-5 h-5 text-[#103051]" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">Home</p>
                                        <button className="text-gray-400 hover:text-[#103051]">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        </div>

                                        <p className="text-xs text-gray-600 mt-2 leading-snug">
                                            {addr}
                                        </p>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                <span>
                                                {order.date || "Sat, Apr 09"} -{" "}
                                                {order.time || "07:30 PM"}
                                                </span>
                                            </div>
                                            <button className="text-gray-400 hover:text-[#103051]">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-5 shadow-lg">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Selected Services
                                </h3>

                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-14 h-14 rounded-lg border flex items-center justify-center ${bg}`}
                                    >
                                        <div className="rounded-md w-10 h-10 flex items-center justify-center">
                                        {icon}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                        <p className="font-semibold text-gray-900">
                                            {order.service || "Service"}
                                        </p>
                                        </div>

                                        <p className="text-blue-600 font-bold mt-1">
                                        {order.weight || "0.0 Kg"}
                                        </p>

                                        <div className="mt-3 text-xs text-gray-500 space-y-1">
                                        <div>{order.date || "Wednesday, 13 March"}</div>
                                        <div>{order.time || "4:00 - 5:30 PM"}</div>
                                        <div>{order.pickup || "Pickup"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-lg space-y-3 lg:row-span-2">
                            <h3 className="text-sm font-semibold text-gray-700">
                                Payment Summary
                            </h3>

                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Item Total</span>
                                <span>{formatSR(order.itemTotal)}</span>
                            </div>

                            <div className="flex justify-between text-sm text-green-600">
                                <span>Item Discount</span>
                                <span>- {formatSR(order.discount)}</span>
                            </div>

                            <div className="flex justify-between text-sm text-gray-700">
                                <span>Service Fee</span>
                                <span>{formatSR(order.serviceFee)}</span>
                            </div>

                            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                <div className="text-sm font-semibold">Grand Total</div>
                                <div className="text-lg font-bold">{formatSR(grandTotal)}</div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className={`mt-3 w-full py-3 font-semibold rounded-xl shadow-sm transition ${
                                    loading ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-green-50 text-green-700 hover:bg-green-100"
                                }`}
                                aria-label="Order This Laundry"
                            >
                                {loading ? "Processing..." : "Order This Laundry"}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
