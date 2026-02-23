"use client"

import { useEffect, useRef, useCallback } from "react"
import type { BlogPost } from "@/lib/types"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface TravelMapProps {
  posts: BlogPost[]
  activePostId: string | null
  onPinClick: (postId: string) => void
}

function createPinIcon(isActive: boolean) {
  const color = isActive ? "#8B6914" : "#3d2e0a"
  const size = isActive ? 32 : 24
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="${isActive ? "#fff" : color}" stroke-width="${isActive ? 2 : 0}">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3" fill="${isActive ? "#fff" : "#f5e6c8"}"/>
  </svg>`

  return L.divIcon({
    html: svg,
    className: "leaflet-pin-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
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

export default function TravelMap({
  posts,
  activePostId,
  onPinClick,
}: TravelMapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const mapReadyRef = useRef(false)
  const onPinClickRef = useRef(onPinClick)

  useEffect(() => {
    onPinClickRef.current = onPinClick
  }, [onPinClick])

  const initMap = useCallback(() => {
    if (!containerRef.current || mapRef.current) return

    const { offsetWidth, offsetHeight } = containerRef.current
    if (offsetWidth === 0 || offsetHeight === 0) return

    const map = L.map(containerRef.current, {
      center: [30, 20],
      zoom: 2,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: false,
    })

    L.control.zoom({ position: "bottomright" }).addTo(map)

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map)

    L.control
      .attribution({ position: "bottomleft", prefix: false })
      .addTo(map)

    posts.forEach((post) => {
      const lat = post.location?.lat
      const lng = post.location?.lng
      if (!isValidLatLng(lat, lng)) return

      const marker = L.marker([Number(lat), Number(lng)], {
        icon: createPinIcon(false),
      })
        .addTo(map)
        .on("click", () => {
          onPinClickRef.current(post._id)
        })

      marker.bindTooltip(
        `<div style="font-family: var(--font-sans); padding: 2px 4px;">
          <strong>${post.location?.name ?? ""}</strong><br/>
          <span style="opacity: 0.7; font-size: 12px;">${post.title ?? ""}</span>
        </div>`,
        { direction: "top", offset: [0, -20] }
      )

      markersRef.current.set(post._id, marker)
    })

    mapRef.current = map

    // Mark ready after the map has finished initializing its view
    map.whenReady(() => {
      mapReadyRef.current = true
    })
  }, [posts])

  useEffect(() => {
    initMap()

    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      if (!mapRef.current) {
        initMap()
      } else {
        mapRef.current.invalidateSize()
      }
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        mapReadyRef.current = false
        markersRef.current.clear()
      }
    }
  }, [initMap])

  useEffect(() => {
    if (!mapRef.current || !mapReadyRef.current) return

    markersRef.current.forEach((marker, id) => {
      marker.setIcon(createPinIcon(id === activePostId))
      if (id === activePostId) {
        marker.setZIndexOffset(1000)
      } else {
        marker.setZIndexOffset(0)
      }
    })

    if (activePostId) {
      const activePost = posts.find((p) => p._id === activePostId)
      const lat = activePost?.location?.lat
      const lng = activePost?.location?.lng
      if (activePost && isValidLatLng(lat, lng)) {
        const zoom = mapRef.current.getZoom()
        const targetZoom = Number.isFinite(zoom) ? Math.max(zoom, 5) : 5
        try {
          mapRef.current.flyTo(
            [Number(lat), Number(lng)],
            targetZoom,
            { duration: 1.2 }
          )
        } catch {
          // Silently ignore if map is in a transitional state
        }
      }
    }
  }, [activePostId, posts])

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      <style jsx global>{`
        .leaflet-pin-icon {
          background: transparent !important;
          border: none !important;
          transition: transform 0.2s ease;
        }
        .leaflet-pin-icon:hover {
          transform: scale(1.2);
        }
        .leaflet-tooltip {
          border-radius: 6px !important;
          border: 1px solid var(--border) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
          background: var(--card) !important;
          color: var(--card-foreground) !important;
        }
        .leaflet-control-zoom a {
          background: var(--card) !important;
          color: var(--card-foreground) !important;
          border-color: var(--border) !important;
        }
        .leaflet-control-zoom a:hover {
          background: var(--secondary) !important;
        }
      `}</style>
    </div>
  )
}
