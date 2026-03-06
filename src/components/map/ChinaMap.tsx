'use client'

import { useEffect, useState, useCallback, useRef, memo } from 'react'
import { MapContainer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection } from 'geojson'
import 'leaflet/dist/leaflet.css'

type ProvinceProperties = {
  id: string
  name_en: string
  name_zh: string
  name_es: string
  centroid?: [number, number]
}

type Locale = 'es' | 'en' | 'zh'

const nameKey: Record<Locale, keyof ProvinceProperties> = {
  es: 'name_es',
  en: 'name_en',
  zh: 'name_zh',
}

const featuredProvinces = new Set([
  'beijing', 'shanghai', 'guangxi', 'yunnan', 'sichuan',
  'tibet', 'shaanxi', 'hunan', 'gansu', 'xinjiang',
])

function getDefaultStyle(provinceId: string): L.PathOptions {
  const isFeatured = featuredProvinces.has(provinceId)
  return {
    fillColor: isFeatured ? '#e8e3dc' : '#e0ddd8',
    fillOpacity: 1,
    color: '#fff',
    weight: 1.5,
    opacity: 1,
  }
}

const hoverStyle: L.PathOptions = {
  fillColor: '#D0021B',
  fillOpacity: 0.45,
  color: '#a5001b',
  weight: 2,
  opacity: 1,
}

const activeStyle: L.PathOptions = {
  fillColor: '#D0021B',
  fillOpacity: 0.65,
  color: '#8a0016',
  weight: 2.5,
  opacity: 1,
}

// Stable style function — defined outside component to avoid new references
function geoJsonStyleFn(feature: Feature | undefined): L.PathOptions {
  const id = (feature?.properties as ProvinceProperties)?.id ?? ''
  return getDefaultStyle(id)
}

const canvasRenderer = typeof window !== 'undefined' ? L.canvas({ padding: 0.5 }) : undefined

// Restrict panning to around China
const maxBounds: L.LatLngBoundsExpression = [
  [0, 60],
  [60, 145],
]

// Fit map so China fills the container, and lock that zoom as minZoom.
// Also re-fit on container resize so changing container size works.
function FitBounds({ data }: { data: FeatureCollection }) {
  const map = useMap()
  useEffect(() => {
    if (data.features.length === 0) return
    const bounds = L.geoJSON(data).getBounds()
    const fit = () => {
      map.invalidateSize()
      map.setMinZoom(1) // temporarily unlock
      map.fitBounds(bounds, { padding: [0, 0] })
      const fitZoom = map.getZoom()
      const targetZoom = fitZoom + 0.14
      map.setView(map.getCenter(), targetZoom, { animate: false })
      map.setMinZoom(targetZoom)
    }

    // ResizeObserver fires once immediately on observe, no need for setTimeout
    let debounceTimer: ReturnType<typeof setTimeout>
    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(fit, 100)
    })
    if (map.getContainer()) {
      observer.observe(map.getContainer())
    }

    return () => {
      clearTimeout(debounceTimer)
      observer.disconnect()
    }
  }, [data, map])
  return null
}


// Click handler for map background (deselect)
function MapClickHandler({ onMapClick }: { onMapClick: () => void }) {
  const map = useMap()
  useEffect(() => {
    map.on('click', onMapClick)
    return () => {
      map.off('click', onMapClick)
    }
  }, [map, onMapClick])
  return null
}

type ChinaMapProps = {
  locale: Locale
  onProvinceClick?: (provinceId: string, provinceName: string) => void
  onProvinceHover?: (provinceId: string | null, provinceName: string) => void
  onDeselect?: () => void
}

function ChinaMap({ locale, onProvinceClick, onProvinceHover, onDeselect }: ChinaMapProps) {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const geoJsonRef = useRef<L.GeoJSON | null>(null)
  const activeLayerRef = useRef<L.Path | null>(null)
  const activeIdRef = useRef<string | null>(null)

  // Store callbacks in refs so GeoJSON event handlers always use the latest
  // without needing to re-bind
  const onClickRef = useRef(onProvinceClick)
  const onHoverRef = useRef(onProvinceHover)
  const onDeselectRef = useRef(onDeselect)
  useEffect(() => { onClickRef.current = onProvinceClick }, [onProvinceClick])
  useEffect(() => { onHoverRef.current = onProvinceHover }, [onProvinceHover])
  useEffect(() => { onDeselectRef.current = onDeselect }, [onDeselect])

  useEffect(() => {
    fetch('/geojson/china-provinces.json')
      .then((res) => res.json())
      .then((data: FeatureCollection) => setGeojson(data))
      .catch((err) => console.error('Failed to load GeoJSON:', err))
  }, [])

  const resetSelection = useCallback(() => {
    if (activeLayerRef.current && activeIdRef.current) {
      activeLayerRef.current.setStyle(getDefaultStyle(activeIdRef.current))
    }
    activeLayerRef.current = null
    activeIdRef.current = null
    onDeselectRef.current?.()
  }, [])

  // onEachFeature only depends on locale — callbacks accessed via refs
  const onEachFeature = useCallback(
    (feature: Feature, layer: L.Layer) => {
      const props = feature.properties as ProvinceProperties
      if (!props?.id) return
      const name = props[nameKey[locale]] as string
      const pathLayer = layer as L.Path

      layer.bindTooltip(name, {
        sticky: true,
        direction: 'top',
        offset: [0, -10],
        className: 'chinaway-tooltip',
      })

      layer.on({
        mouseover: () => {
          if (activeIdRef.current !== props.id) {
            pathLayer.setStyle(hoverStyle)
            pathLayer.bringToFront()
          }
          onHoverRef.current?.(props.id, name)
        },
        mouseout: () => {
          if (activeIdRef.current !== props.id) {
            pathLayer.setStyle(getDefaultStyle(props.id))
          }
          if (activeLayerRef.current) {
            activeLayerRef.current.bringToFront()
          }
          onHoverRef.current?.(null, '')
        },
        click: (e: L.LeafletEvent) => {
          L.DomEvent.stopPropagation(e as L.LeafletMouseEvent)

          if (activeIdRef.current === props.id) {
            resetSelection()
            return
          }

          if (activeLayerRef.current && activeIdRef.current) {
            activeLayerRef.current.setStyle(getDefaultStyle(activeIdRef.current))
          }
          pathLayer.setStyle(activeStyle)
          pathLayer.bringToFront()
          activeLayerRef.current = pathLayer
          activeIdRef.current = props.id
          onClickRef.current?.(props.id, name)
        },
      })
    },
    [locale, resetSelection],
  )

  if (!geojson) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
          <div className="font-dm text-gray text-sm tracking-wide">
            {locale === 'zh' ? '加载地图中...' : locale === 'es' ? 'Cargando mapa...' : 'Loading map...'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .china-map-container .leaflet-control-zoom {
          border: none;
          box-shadow: 0 2px 12px rgba(0,0,0,.1);
          margin: 16px;
          border-radius: 8px;
          overflow: hidden;
        }
        .china-map-container .leaflet-control-zoom a {
          color: #111;
          border-color: #e8e8e8;
          width: 36px;
          height: 36px;
          line-height: 36px;
          font-size: 18px;
          transition: background .15s;
        }
        .china-map-container .leaflet-control-zoom a:hover {
          background: #f5f5f5;
        }
        .china-map-container .leaflet-control-attribution { display: none; }
        .china-map-container,
        .china-map-container *,
        .china-map-container *:focus,
        .china-map-container *:active,
        .china-map-container *:focus-visible {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent;
        }
        .china-map-container .leaflet-control-zoom {
          box-shadow: 0 2px 12px rgba(0,0,0,.1) !important;
        }
        .chinaway-tooltip {
          background: #111;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 5px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 12px rgba(0,0,0,.25);
        }
        .chinaway-tooltip::before {
          border-top-color: #111 !important;
        }
      `}</style>
      <MapContainer
        center={[35, 104]}
        zoom={4}
        minZoom={2}
        maxZoom={6}
        zoomSnap={0}
        zoomDelta={0.5}
        maxBounds={maxBounds}
        maxBoundsViscosity={0.8}
        scrollWheelZoom={true}
        wheelDebounceTime={150}
        wheelPxPerZoomLevel={180}
        zoomControl={true}
        dragging={true}
        renderer={canvasRenderer}
        className="w-full h-full z-0 china-map-container"
        style={{ background: '#fff' }}
      >
        <GeoJSON
          ref={geoJsonRef as React.Ref<L.GeoJSON>}
          data={geojson}
          style={geoJsonStyleFn}
          onEachFeature={onEachFeature}
        />
        <FitBounds data={geojson} />
        <MapClickHandler onMapClick={resetSelection} />
      </MapContainer>
    </>
  )
}

export default memo(ChinaMap)
