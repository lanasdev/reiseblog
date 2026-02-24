"use client"

import { Box, Card, Stack, Text } from "@sanity/ui"
import { PatchEvent, set, setIfMissing, unset } from "sanity"
import type { GeopointValue, ObjectInputProps } from "sanity"
import { useCallback } from "react"
import dynamic from "next/dynamic"

const GeopointMap = dynamic(() => import("./GeopointMap").then((mod) => mod.GeopointMap), {
  ssr: false,
  loading: () => (
    <Card padding={3} radius={2} tone="transparent">
      <Text muted size={1}>
        Loading map…
      </Text>
    </Card>
  ),
})

const DEFAULT_CENTER: [number, number] = [51.1657, 10.4515] // Germany
const DEFAULT_ZOOM = 6

export function GeopointInput(props: ObjectInputProps<GeopointValue>) {
  const { value, onChange, schemaType, readOnly } = props

  const center: [number, number] =
    value?.lat != null ? [value.lat, value.lng ?? 0] : DEFAULT_CENTER
  const zoom = value?.lat != null ? 10 : DEFAULT_ZOOM

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (readOnly) return
      onChange(
        PatchEvent.from([
          setIfMissing({ _type: schemaType.name }),
          set(lat, ["lat"]),
          set(lng, ["lng"]),
        ])
      )
    },
    [onChange, readOnly, schemaType.name]
  )

  const handleMarkerDrag = useCallback(
    (lat: number, lng: number) => {
      if (readOnly) return
      onChange(
        PatchEvent.from([set(lat, ["lat"]), set(lng, ["lng"])])
      )
    },
    [onChange, readOnly]
  )

  const handleRemovePoint = useCallback(() => {
    if (readOnly) return
    onChange(PatchEvent.from([unset()]))
  }, [onChange, readOnly])

  return (
    <Stack space={3}>
      <Card padding={0} radius={2} overflow="hidden" style={{ minHeight: 300 }}>
        <Box style={{ height: 300, position: "relative" }}>
          <GeopointMap
            center={center}
            zoom={zoom}
            value={value}
            readOnly={readOnly ?? false}
            onMapClick={handleMapClick}
            onMarkerDrag={handleMarkerDrag}
            onRemovePoint={handleRemovePoint}
          />
        </Box>
      </Card>
      <Text muted size={1}>
        {value?.lat != null
          ? "Click and drag the marker to change location. Click marker to remove."
          : "Click on the map to set a location."}
      </Text>
    </Stack>
  )
}
