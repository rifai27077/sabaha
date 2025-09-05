"use client";

import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const SabawashProvider = ({ children }) => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("sabawash_order");
        if (saved) setOrder(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (order) localStorage.setItem("sabawash_order", JSON.stringify(order));
    }, [order]);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
        {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
