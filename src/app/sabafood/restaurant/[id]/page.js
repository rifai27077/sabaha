"use client"

import { useBasket } from "@/context/BasketContext"
import Image from "next/image"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import {
    Star,
    ShoppingCart,
    Plus,
    Minus,
} from "lucide-react"

export default function RestaurantDetail() {
    const router = useRouter()
    const { basket, addToBasket, removeFromBasket, totalItems, totalPrice } = useBasket()

    const restaurantInfo = {
        name: "Chicken Menu Recommendation",
        category: "Rice, Chicken & Nugget, Beverages",
        rating: 4.9,
        deliveryTime: "10 min",
        distance: "0.2 km",
        priceLevel: "$$$$",
    }

    const menuItems = [
        { id: 1, name: "ALBAIK 4 Piece Chicken Meal - Spicy", price: 22.0, image: "/images/sabafood/resto1.jpg" },
        { id: 2, name: "10 Piece Chicken Nugget Meal - Regular", price: 22.0, image: "/images/sabafood/resto1.jpg" },
        { id: 3, name: "ALBAIK 4 Piece Chicken Meal - Spicy", price: 22.0, image: "/images/sabafood/resto1.jpg" },
        { id: 4, name: "Fish Fillet Meal - Regular", price: 22.0, image: "/images/sabafood/resto1.jpg" },
        { id: 5, name: "10 Piece Jumbo Shrimp Meal - Spicy", price: 22.0, image: "/images/sabafood/resto1.jpg" },
        { id: 6, name: "10 Piece Jumbo Shrimp Meal - Regular", price: 22.0, image: "/images/sabafood/resto1.jpg" },
    ]

    return (
        <div className="min-h-screen bg-white">
            <Header location="Pullman Hotel Zam-Zam Tower" showChat />

            <div className="relative">
                <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-br from-red-400 to-red-500 relative overflow-hidden">
                    <Image
                        src="/images/sabafood/banner1.png"
                        alt="Restaurant Hero"
                        fill
                        className="object-cover opacity-90"
                        priority
                    />
                </div>

                <div className="absolute left-4 right-4 md:left-8 md:right-8 lg:left-16 lg:right-16 -bottom-20 bg-white rounded-2xl p-4 md:p-6 shadow-lg">
                    <div className="flex items-start gap-3 md:gap-5">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-1 ring-black/5 shrink-0 bg-white">
                        <Image
                            src="/images/sabafood/resto1.jpg"
                            alt="ALBAIK thumbnail"
                            fill
                            className="object-cover"
                        />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="font-semibold text-base md:text-xl text-gray-900 leading-tight">
                                {restaurantInfo.name}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {restaurantInfo.priceLevel} • {restaurantInfo.category}
                            </p>
                            <div className="mt-1.5 flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-4 h-4 text-orange-400 fill-current"
                                />
                                ))}
                                <span className="ml-1 text-sm font-semibold text-gray-800">
                                    {restaurantInfo.rating}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                                Delivery in {restaurantInfo.deliveryTime} •{" "}
                                {restaurantInfo.distance}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-8 lg:px-16 pb-32 mt-28">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Favorite
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        onAdd={() => addToBasket(item)}
                        quantity={basket.find((b) => b.id === item.id)?.quantity || 0}
                        onRemove={() => removeFromBasket(item.id)}
                    />
                ))}
                </div>
            </div>

            {totalItems > 0 && (
                <div
                    onClick={() => router.push("/sabafood/restaurant/order-summary")}
                    className="fixed bottom-6 left-6 right-6 md:left-1/4 md:right-1/4 lg:left-1/3 lg:right-1/3 z-[999]"
                >
                    <button className="w-full bg-[#103051] text-white py-3 md:py-4 px-6 rounded-full flex items-center justify-between shadow-lg hover:bg-[#0c2742] transition-colors">
                        <span className="flex items-center gap-2 text-sm md:text-base font-medium">
                            <ShoppingCart className="w-4 h-4" />
                            Basket - {totalItems} item{totalItems > 1 ? "s" : ""}
                        </span>
                        <span className="text-sm md:text-base font-semibold">
                            {totalPrice.toFixed(2)} SR (Include Tax)
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}

function MenuItem({ item, onAdd, onRemove, quantity }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 overflow-hidden">
            <div className="relative aspect-square">
                <Image 
                    src={item.image || "/images/sabafood/default.jpg"} 
                    alt={item.name} 
                    fill 
                    className="object-cover" />
                {quantity > 0 ? (
                    <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2 bg-white rounded-full px-2 py-1 shadow-md ring-1 ring-black/5">
                        <button
                            onClick={onRemove}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                            <Minus className="w-4 h-4 text-black" />
                        </button>
                        <span className="text-sm font-medium text-black">{quantity}</span>
                        <button
                            onClick={onAdd}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                            <Plus className="w-4 h-4 text-black" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onAdd}
                        className="absolute bottom-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md ring-1 ring-black/5"
                        aria-label={`Add ${item.name}`}
                    >
                        <Plus className="w-4 h-4 text-black" />
                    </button>
                )}
            </div>

            <div className="px-3.5 py-3">
                <h3 className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2">
                    {item.name}
                </h3>
                <p className="mt-1 text-[13px] font-bold text-[#F59E0B]">
                    {item.price.toFixed(2)} SR
                </p>
            </div>
        </div>
    )
}
