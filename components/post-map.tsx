"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface PostMapProps {
  lat: number
  lng: number
  name: string
}

function isValidLatLng(lat: unknown, lng: unknown): boolean {
  const latNum = Number(lat)
  const lngNum = Number(lng)
  return (
    !Number.isNaN(latNum) &&
    !Number.isNaN(lngNum) &&
    Number.isFinite(latNum) &&
    Number.isFinite(lngNum) &&
    latNum >= -90 &&
    latNum <= 90 &&
    lngNum >= -180 &&
    lngNum <= 180
  )
}

export default function PostMap({ lat, lng, name }: PostMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  const valid = isValidLatLng(lat, lng)
  const safeLat = valid ? Number(lat) : 0
  const safeLng = valid ? Number(lng) : 0

  useEffect(() => {
    if (!valid || !containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [safeLat, safeLng],
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

    L.marker([safeLat, safeLng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${name}</strong>`)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [valid, safeLat, safeLng, name])

  if (!valid) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg border border-border bg-muted/30 text-sm text-muted-foreground">
        Keine Koordinaten verfügbar
      </div>
    )
  }

  return <div ref={containerRef} className="h-full w-full" />
}
