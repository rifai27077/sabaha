"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Dynamic import React-Leaflet supaya aman dari SSR
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export default function MapWithMarker() {
  const [customIcon, setCustomIcon] = useState(null);

  // Import Leaflet hanya di client
  useEffect(() => {
    import("leaflet").then(L => {
      const icon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      setCustomIcon(icon);
    });
  }, []);

  if (!customIcon) return null; // jangan render sebelum icon siap

  return (
    <MapContainer
      center={[21.4225, 39.8262]} // Masjidil Haram
      zoom={16}
      className="absolute inset-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[21.4225, 39.8262]} icon={customIcon}>
        <Popup>Masjidil Haram</Popup>
      </Marker>
    </MapContainer>
  );
}
