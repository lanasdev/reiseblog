"use client"

import type { GeopointValue } from "sanity"
import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click: (e) => onMapClick(e.latlng.lat, e.latlng.lng),
  })
  return null
}

interface GeopointMapProps {
  center: [number, number]
  zoom: number
  value: GeopointValue | null | undefined
  readOnly: boolean
  onMapClick: (lat: number, lng: number) => void
  onMarkerDrag: (lat: number, lng: number) => void
  onRemovePoint: () => void
}

export function GeopointMap({
  center,
  zoom,
  value,
  readOnly,
  onMapClick,
  onMarkerDrag,
  onRemovePoint,
}: GeopointMapProps) {
  const hasMarker = value?.lat != null && value?.lng != null

  useEffect(() => {
    // Fix Leaflet default icon in webpack/Next.js
    if (typeof window !== "undefined") {
      const L = require("leaflet")
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })
    }
  }, [])

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      {hasMarker && value?.lat != null && value?.lng != null && (
        <Marker
          position={[value.lat, value.lng]}
          draggable={!readOnly}
          eventHandlers={
            !readOnly
              ? {
                  dragend: (e) => {
                    const { lat, lng } = e.target.getLatLng()
                    onMarkerDrag(lat, lng)
                  },
                }
              : undefined
          }
        >
          {!readOnly && (
            <Popup>
              <button
                type="button"
                onClick={onRemovePoint}
                style={{
                  padding: "4px 8px",
                  cursor: "pointer",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              >
                Remove point
              </button>
            </Popup>
          )}
        </Marker>
      )}
      <ZoomControl position="topright" />
    </MapContainer>
  )
}
