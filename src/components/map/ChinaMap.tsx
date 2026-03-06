'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { MapContainer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Feature, FeatureCollection } from 'geojson'
import 'leaflet/dist/leaflet.css'

type ProvinceProperties = {
  id: string
  name_en: string
  name_zh: string
  name_es: string
}

type Locale = 'es' | 'en' | 'zh'

const nameKey: Record<Locale, keyof ProvinceProperties> = {
  es: 'name_es',
  en: 'name_en',
  zh: 'name_zh',
}

// Provinces with tour content get a slightly warmer fill
const featuredProvinces = new Set([
  'beijing', 'shanghai', 'guangxi', 'yunnan', 'sichuan',
  'tibet', 'shaanxi', 'hunan', 'gansu', 'xinjiang',
])

function getDefaultStyle(provinceId: string): L.PathOptions {
  const isFeatured = featuredProvinces.has(provinceId)
  return {
    fillColor: isFeatured ? '#f0e8df' : '#F7F4F0',
    fillOpacity: 1,
    color: '#c8c0b8',
    weight: 1,
    opacity: 1,
  }
}

const hoverStyle: L.PathOptions = {
  fillColor: '#D0021B',
  fillOpacity: 0.55,
  color: '#a5001b',
  weight: 2,
  opacity: 1,
}

const activeStyle: L.PathOptions = {
  fillColor: '#D0021B',
  fillOpacity: 0.7,
  color: '#a5001b',
  weight: 2.5,
  opacity: 1,
}

function FitBounds({ data }: { data: FeatureCollection }) {
  const map = useMap()
  useEffect(() => {
    if (data.features.length > 0) {
      const geoJsonLayer = L.geoJSON(data)
      map.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] })
    }
  }, [data, map])
  return null
}

type ChinaMapProps = {
  locale: Locale
  onProvinceClick?: (provinceId: string) => void
  onProvinceHover?: (provinceId: string | null, provinceName: string) => void
}

export default function ChinaMap({ locale, onProvinceClick, onProvinceHover }: ChinaMapProps) {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const geoJsonRef = useRef<L.GeoJSON | null>(null)
  const activeLayerRef = useRef<L.Path | null>(null)
  const activeIdRef = useRef<string | null>(null)

  useEffect(() => {
    fetch('/geojson/china-provinces.json')
      .then((res) => res.json())
      .then((data: FeatureCollection) => setGeojson(data))
      .catch((err) => console.error('Failed to load GeoJSON:', err))
  }, [])

  const onEachFeature = useCallback(
    (feature: Feature, layer: L.Layer) => {
      const props = feature.properties as ProvinceProperties
      if (!props?.id) return
      const name = props[nameKey[locale]] as string
      const pathLayer = layer as L.Path

      // Tooltip with province name on hover
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
          onProvinceHover?.(props.id, name)
        },
        mouseout: () => {
          if (activeIdRef.current !== props.id) {
            pathLayer.setStyle(getDefaultStyle(props.id))
          }
        },
        click: () => {
          // Reset previous active province
          if (activeLayerRef.current && activeIdRef.current) {
            activeLayerRef.current.setStyle(getDefaultStyle(activeIdRef.current))
          }
          // Set new active
          pathLayer.setStyle(activeStyle)
          pathLayer.bringToFront()
          activeLayerRef.current = pathLayer
          activeIdRef.current = props.id
          onProvinceClick?.(props.id)
          onProvinceHover?.(props.id, name)
        },
      })
    },
    [locale, onProvinceClick, onProvinceHover],
  )

  if (!geojson) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#e8e4de]">
        <div className="font-dm text-gray text-sm tracking-wide animate-pulse">
          {locale === 'zh' ? '加载地图中...' : locale === 'es' ? 'Cargando mapa...' : 'Loading map...'}
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
        }
        .china-map-container .leaflet-control-zoom a {
          color: #111;
          border-color: #e8e8e8;
          width: 32px;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
        }
        .china-map-container .leaflet-control-attribution { display: none; }
        .chinaway-tooltip {
          background: #111;
          color: #fff;
          border: none;
          border-radius: 2px;
          padding: 4px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(0,0,0,.2);
        }
        .chinaway-tooltip::before {
          border-top-color: #111;
        }
      `}</style>
      <MapContainer
        center={[35, 104]}
        zoom={4}
        minZoom={3}
        maxZoom={8}
        scrollWheelZoom={true}
        zoomControl={true}
        dragging={true}
        className="w-full h-full z-0 china-map-container"
        style={{ background: '#e8e4de' }}
      >
        <GeoJSON
          ref={geoJsonRef as React.Ref<L.GeoJSON>}
          data={geojson}
          style={(feature) => {
            const id = (feature?.properties as ProvinceProperties)?.id ?? ''
            return getDefaultStyle(id)
          }}
          onEachFeature={onEachFeature}
        />
        <FitBounds data={geojson} />
      </MapContainer>
    </>
  )
}
