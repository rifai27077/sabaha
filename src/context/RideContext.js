"use client"

import { createContext, useContext, useState } from "react"

const RideContext = createContext()

export function RideProvider({ children }) {
  const [rideData, setRideDataState] = useState({})

  const setRideData = (data) => {
    setRideDataState((prev) => ({ ...prev, ...data }))
  }

  const clearRideData = () => setRideDataState({})

  return (
    <RideContext.Provider value={{ rideData, setRideData, clearRideData }}>
      {children}
    </RideContext.Provider>
  )
}

export function useRide() {
  const context = useContext(RideContext)
  if (!context) throw new Error("useRide must be used within RideProvider")
  return context
}
