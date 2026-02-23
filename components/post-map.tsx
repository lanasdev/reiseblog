"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface PostMapProps {
  lat: number
  lng: number
  name: string
}

export default function PostMap({ lat, lng, name }: PostMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map)

    const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#8B6914" stroke="#fff" stroke-width="2">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="#fff"/>
    </svg>`

    const icon = L.divIcon({
      html: pinSvg,
      className: "leaflet-pin-icon",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    })

    L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${name}</strong>`)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [lat, lng, name])

  return <div ref={containerRef} className="h-full w-full" />
}
