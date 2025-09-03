"use client"

import { createContext, useContext, useState } from "react"

const BasketContext = createContext()

export function BasketProvider({ children }) {
    const [basket, setBasket] = useState([])

    const addToBasket = (item) => {
        setBasket((prev) => {
            const exist = prev.find((i) => i.id === item.id)
            if (exist) {
                return prev.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromBasket = (id) => {
        setBasket((prev) =>
        prev
            .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
        )
    }

    const clearBasket = () => setBasket([])

    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = basket.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <BasketContext.Provider
            value={{ basket, addToBasket, removeFromBasket, clearBasket, totalItems, totalPrice }}
        >
        {children}
        </BasketContext.Provider>
    )
}

export const useBasket = () => useContext(BasketContext)
