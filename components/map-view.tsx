"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Minus, RotateCcw, MapPin, X, ArrowRight, ExternalLink } from "lucide-react"
import type { PropertyData } from "@/lib/data"

interface MapViewProps {
  properties: PropertyData[]
  hoveredId?: number | null
  selectedId?: number | null
  onHoverProperty?: (id: number | null) => void
  onSelectProperty?: (id: number) => void
}

// Convert WGS84 lat/lng to Web Mercator pixel coordinates at zoom level z
function project(lat: number, lng: number, zoom: number): { x: number; y: number } {
  const sin = Math.sin((lat * Math.PI) / 180)
  const scale = 256 * Math.pow(2, zoom)
  const x = ((lng + 180) / 360) * scale
  const y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale
  return { x, y }
}

// Convert Web Mercator pixel coordinates back to WGS84 lat/lng
function unproject(x: number, y: number, zoom: number): { lat: number; lng: number } {
  const scale = 256 * Math.pow(2, zoom)
  const lng = (x / scale) * 360 - 180
  const n = Math.PI - (2 * Math.PI * y) / scale
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
  return { lat, lng }
}

// Format clean marker label: price if available, otherwise concise project name
function getMarkerLabel(property: PropertyData): string {
  if (property.price && property.price !== "Contact for Price") {
    // Return concise price: e.g. "₹45 L", "₹72 L", "₹1.2 Cr"
    return property.price.replace(" Lakh", " L").replace(" Crore", " Cr")
  }
  // Otherwise concise project name
  return property.address.replace(" Residency", "").replace(" Heights", "").replace(" Centrum", "").replace(" Homes", "")
}

export function MapView({
  properties,
  hoveredId,
  selectedId,
  onHoverProperty,
  onSelectProperty,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 600 })

  // Filter properties with valid coordinates
  const validProperties = useMemo(() => {
    return properties.filter(
      (p) => typeof p.lat === "number" && typeof p.lng === "number" && !isNaN(p.lat) && !isNaN(p.lng)
    )
  }, [properties])

  // Compute default center from valid properties (Ambernath / Kalyan / Badlapur corridor)
  const defaultCenter = useMemo(() => {
    if (validProperties.length === 0) return { lat: 19.198, lng: 73.195 }
    const sumLat = validProperties.reduce((acc, p) => acc + (p.lat ?? 0), 0)
    const sumLng = validProperties.reduce((acc, p) => acc + (p.lng ?? 0), 0)
    return {
      lat: sumLat / validProperties.length,
      lng: sumLng / validProperties.length,
    }
  }, [validProperties])

  const [center, setCenter] = useState<{ lat: number; lng: number }>(defaultCenter)
  const [zoom, setZoom] = useState<number>(12)
  const [activePopupProperty, setActivePopupProperty] = useState<PropertyData | null>(null)

  // Dragging state
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startCenter: { lat: number; lng: number } }>({
    mouseX: 0,
    mouseY: 0,
    startCenter: defaultCenter,
  })

  // Measure container size
  useEffect(() => {
    if (!containerRef.current) return
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }
    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Update center when defaultCenter meaningfully shifts (e.g., location filter applied)
  useEffect(() => {
    setCenter(defaultCenter)
    // If only 1 property, zoom in slightly
    if (validProperties.length === 1) {
      setZoom(13.5)
    } else {
      setZoom(12)
    }
  }, [defaultCenter, validProperties.length])

  // Keep active popup in sync with selectedId
  useEffect(() => {
    if (selectedId) {
      const match = validProperties.find((p) => p.id === selectedId)
      if (match) {
        setActivePopupProperty(match)
        if (typeof match.lat === "number" && typeof match.lng === "number") {
          setCenter({ lat: match.lat, lng: match.lng })
        }
      }
    }
  }, [selectedId, validProperties])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    isDraggingRef.current = true
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startCenter: center,
    }
  }

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - dragStartRef.current.mouseX
    const dy = e.clientY - dragStartRef.current.mouseY

    const startPixel = project(dragStartRef.current.startCenter.lat, dragStartRef.current.startCenter.lng, zoom)
    const newCenterPixel = {
      x: startPixel.x - dx,
      y: startPixel.y - dy,
    }
    const newCoord = unproject(newCenterPixel.x, newCenterPixel.y, zoom)
    setCenter(newCoord)
  }, [zoom])

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const zoomDelta = e.deltaY > 0 ? -0.5 : 0.5
    setZoom((z) => Math.min(16, Math.max(10, Math.round((z + zoomDelta) * 2) / 2)))
  }

  const handleZoomIn = () => setZoom((z) => Math.min(16, z + 1))
  const handleZoomOut = () => setZoom((z) => Math.max(10, z - 1))
  const handleReset = () => {
    setCenter(defaultCenter)
    setZoom(12)
    setActivePopupProperty(null)
  }

  // Calculate visible raster tiles
  const tiles = useMemo(() => {
    const tileZoom = Math.floor(zoom)
    const centerPixel = project(center.lat, center.lng, tileZoom)
    const halfWidth = dimensions.width / 2
    const halfHeight = dimensions.height / 2

    const minX = Math.floor((centerPixel.x - halfWidth) / 256)
    const maxX = Math.floor((centerPixel.x + halfWidth) / 256)
    const minY = Math.floor((centerPixel.y - halfHeight) / 256)
    const maxY = Math.floor((centerPixel.y + halfHeight) / 256)

    const maxTile = Math.pow(2, tileZoom)
    const list: { key: string; x: number; y: number; z: number; left: number; top: number; url: string }[] = []

    for (let tx = minX; tx <= maxX; tx++) {
      for (let ty = minY; ty <= maxY; ty++) {
        if (ty < 0 || ty >= maxTile) continue
        const wrappedX = ((tx % maxTile) + maxTile) % maxTile

        // Position on screen relative to center
        const tileLeft = tx * 256 - centerPixel.x + halfWidth
        const tileTop = ty * 256 - centerPixel.y + halfHeight

        // Use CartoDB Positron for clean real-estate styling
        const sub = ["a", "b", "c", "d"][(tx + ty) % 4]
        const url = `https://${sub}.basemaps.cartocdn.com/light_all/${tileZoom}/${wrappedX}/${ty}.png`

        list.push({
          key: `${tileZoom}-${tx}-${ty}`,
          x: wrappedX,
          y: ty,
          z: tileZoom,
          left: tileLeft,
          top: tileTop,
          url,
        })
      }
    }
    return list
  }, [center, zoom, dimensions])

  // Center pixel for marker projections
  const centerPixel = project(center.lat, center.lng, zoom)
  const halfWidth = dimensions.width / 2
  const halfHeight = dimensions.height / 2

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-[#f4f3ef] select-none cursor-grab active:cursor-grabbing font-sans"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* ── Raster Tile Canvas ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {tiles.map((tile) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={tile.key}
            src={tile.url}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute w-[256px] h-[256px] object-cover pointer-events-none"
            style={{
              left: `${tile.left}px`,
              top: `${tile.top}px`,
            }}
          />
        ))}
      </div>

      {/* ── Property Markers Layer ─────────────────────── */}
      <div className="absolute inset-0">
        {validProperties.map((property) => {
          if (typeof property.lat !== "number" || typeof property.lng !== "number") return null

          const markerPixel = project(property.lat, property.lng, zoom)
          const screenX = markerPixel.x - centerPixel.x + halfWidth
          const screenY = markerPixel.y - centerPixel.y + halfHeight

          // Skip markers far off-screen
          if (screenX < -60 || screenX > dimensions.width + 60 || screenY < -60 || screenY > dimensions.height + 60) {
            return null
          }

          const isHovered = hoveredId === property.id
          const isSelected = selectedId === property.id || activePopupProperty?.id === property.id
          const label = getMarkerLabel(property)

          return (
            <div
              key={property.id}
              className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 cursor-pointer ${
                isSelected ? "z-40 scale-105" : isHovered ? "z-30 scale-105" : "z-20 hover:scale-105"
              }`}
              style={{ left: `${screenX}px`, top: `${screenY}px` }}
              onMouseEnter={() => onHoverProperty?.(property.id)}
              onMouseLeave={() => onHoverProperty?.(null)}
              onClick={(e) => {
                e.stopPropagation()
                setActivePopupProperty(property)
                onSelectProperty?.(property.id)
              }}
            >
              {/* Marker Pin Chip */}
              <div
                className={`px-2.5 py-1 text-xs font-semibold rounded-md shadow-md border flex items-center gap-1 transition-all ${
                  isSelected
                    ? "bg-foreground text-background border-foreground shadow-lg"
                    : isHovered
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-white text-neutral-900 border-neutral-300/80 hover:border-neutral-500"
                }`}
              >
                <MapPin className={`h-3 w-3 shrink-0 ${isSelected || isHovered ? "opacity-100" : "text-primary"}`} />
                <span className="whitespace-nowrap tracking-tight">{label}</span>
              </div>

              {/* Pin pointer tip */}
              <div
                className={`w-2 h-2 mx-auto rotate-45 -mt-1 border-r border-b ${
                  isSelected
                    ? "bg-foreground border-foreground"
                    : isHovered
                    ? "bg-primary border-primary"
                    : "bg-white border-neutral-300/80"
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* ── Active Property Popup Card ──────────────────── */}
      {activePopupProperty && (
        <div
          className="absolute bottom-6 left-6 z-50 w-72 bg-card rounded-lg shadow-xl border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-[16/10] w-full bg-muted">
            <Image
              src={activePopupProperty.images?.[0] || activePopupProperty.image}
              alt={activePopupProperty.address}
              fill
              className="object-cover"
              sizes="288px"
            />
            <button
              type="button"
              onClick={() => setActivePopupProperty(null)}
              aria-label="Close property popup"
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-white/95 text-neutral-900 backdrop-blur-xs">
              {activePopupProperty.price === "Contact for Price" ? "Price on Request" : activePopupProperty.price}
            </div>
          </div>
          <div className="p-3">
            <h4 className="text-sm font-semibold text-foreground line-clamp-1">{activePopupProperty.address}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activePopupProperty.city}, Maharashtra
              {activePopupProperty.beds > 0 ? ` · ${activePopupProperty.beds} BHK` : ""}
            </p>
            <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-medium">
                {activePopupProperty.type || "Residential"}
              </span>
              <Link
                href={`/buy/${activePopupProperty.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Map Zoom & Control Buttons ──────────────────── */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-1 shadow-sm">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom in"
          aria-label="Zoom in"
          className="w-8 h-8 rounded-t bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/80 flex items-center justify-center transition-colors text-sm"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom out"
          aria-label="Zoom out"
          className="w-8 h-8 rounded-b -mt-[1px] bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/80 flex items-center justify-center transition-colors text-sm"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          title="Recenter map"
          aria-label="Recenter map"
          className="w-8 h-8 rounded bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300/80 mt-1 flex items-center justify-center transition-colors"
        >
          <RotateCcw className="h-3 w-3 text-neutral-600" />
        </button>
      </div>

      {/* ── Official OpenStreetMap / CARTO Attribution ──── */}
      <div className="absolute bottom-1.5 right-2 z-30 text-[10px] text-neutral-500 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 pointer-events-auto">
        <span>© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline hover:text-neutral-800">OpenStreetMap</a> contributors, © <a href="https://carto.com/attributions" target="_blank" rel="noreferrer" className="underline hover:text-neutral-800">CARTO</a></span>
      </div>
    </div>
  )
}
