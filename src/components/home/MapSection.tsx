'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'

const ChinaMap = dynamic(() => import('@/components/map/ChinaMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

type Locale = 'es' | 'en' | 'zh'

type ProvinceInfo = {
  id: string
  name: string
}

type MapProvince = {
  provinceId: string
  description: string
  tours: number
  highlights: string
}

type Props = {
  provinces: MapProvince[]
  provinceSlugMap: Record<string, string>
  intro: string
  tagline: string
}

export function MapSection({ provinces, provinceSlugMap, intro, tagline }: Props) {
  const locale = useLocale() as Locale
  const t = useTranslations('mapSection')
  const router = useRouter()
  const [activeProvince, setActiveProvince] = useState<ProvinceInfo | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect touch device / narrow screen
  useEffect(() => {
    const check = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Build lookup from props
  const provinceDetailsMap: Record<string, { description: string; tours: number; highlights: string }> = {}
  for (const p of provinces) {
    provinceDetailsMap[p.provinceId] = {
      description: p.description,
      tours: p.tours,
      highlights: p.highlights,
    }
  }

  const detail = activeProvince ? provinceDetailsMap[activeProvince.id] : null

  const handleProvinceClick = useCallback((id: string, name: string) => {
    if (isMobile) {
      // On mobile: first tap shows bottom sheet card
      setActiveProvince((prev) => (prev?.id === id ? prev : { id, name }))
      return
    }
    const slug = provinceSlugMap[id]
    if (slug) {
      router.push(`/destinations/${slug}`)
    } else {
      router.push('/custom')
    }
  }, [isMobile, router, provinceSlugMap])

  const handleNavigate = useCallback(() => {
    if (!activeProvince) return
    const slug = provinceSlugMap[activeProvince.id]
    if (slug) {
      router.push(`/destinations/${slug}`)
    } else {
      router.push('/custom')
    }
  }, [activeProvince, router, provinceSlugMap])

  const handleProvinceHover = useCallback((id: string | null, name: string) => {
    if (isMobile) return // no hover behavior on mobile
    if (id) {
      setActiveProvince({ id, name })
    } else {
      setActiveProvince(null)
    }
  }, [isMobile])

  const handleDeselect = useCallback(() => {
    setActiveProvince(null)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return
    setActiveProvince(null)
    setMousePos(null)
  }, [isMobile])

  const featuredProvinceIds = provinces.map((p) => p.provinceId)

  return (
    <section className="bg-white pt-20 pb-8">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      {/* Intro text — centered, like the reference */}
      <div className="max-w-[780px] mx-auto text-center px-[6%] mb-6">
        {intro && (
          <p className="font-dm text-[15px] text-[#555] leading-relaxed mb-6">
            {intro}
          </p>
        )}
        {tagline && (
          <p className="font-playfair text-[clamp(18px,2.5vw,22px)] italic text-gray leading-snug">
            {tagline}
          </p>
        )}
      </div>

      {/* Map — full width */}
      <div
        ref={containerRef}
        className="relative max-w-[1102px] mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Map inner — clips the map itself; shorter on mobile so full China is visible */}
        <div className="overflow-hidden aspect-[1/1] sm:aspect-[1.3/1]" style={{ contain: 'layout paint', willChange: 'transform' }}>
          <ChinaMap
            locale={locale}
            featuredProvinces={featuredProvinceIds}
            onProvinceClick={handleProvinceClick}
            onProvinceHover={handleProvinceHover}
            onDeselect={handleDeselect}
          />
        </div>

        {/* Desktop: Floating province card — follows mouse, outside overflow-hidden */}
        {!isMobile && activeProvince && mousePos && (() => {
          const hasDestination = !!provinceSlugMap[activeProvince.id]
          return (
            <div
              className="absolute z-[500] w-[340px] bg-white/95 backdrop-blur-md rounded-xl shadow-[0_12px_40px_rgba(0,0,0,.15)] overflow-hidden pointer-events-none border border-white/60"
              style={{
                left: mousePos.x > (containerRef.current?.offsetWidth ?? 0) - 370 ? mousePos.x - 356 : mousePos.x + 20,
                top: mousePos.y > (containerRef.current?.offsetHeight ?? 0) - 320 ? mousePos.y - 300 : mousePos.y + 20,
              }}
            >
              {/* Accent bar */}
              <div className={`h-1 bg-gradient-to-r ${hasDestination ? 'from-red to-red/60' : 'from-[#111] to-[#111]/60'}`} />

              {detail && hasDestination ? (
                <>
                  <div className="p-5 pb-4">
                    <div className="flex items-baseline gap-2.5 mb-1.5">
                      <h3 className="font-playfair text-xl font-bold leading-tight">{activeProvince.name}</h3>
                      <span className="font-dm text-[12px] text-gray">{detail.tours} {t('tours')}</span>
                    </div>
                    <p className="font-dm text-[13px] text-[#666] leading-relaxed">{detail.description}</p>
                  </div>
                  <div className="px-5 pb-4">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {detail.highlights.split(' · ').map((item) => (
                        <span
                          key={item}
                          className="font-dm text-[11px] text-black/65 bg-[#f0eeeb] px-3 py-1.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 font-dm text-[11px] text-gray/70 italic">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      {t('clickHint')}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5">
                  <h3 className="font-playfair text-xl font-bold leading-tight mb-2">{activeProvince.name}</h3>
                  {detail && (
                    <p className="font-dm text-[13px] text-[#666] leading-relaxed mb-2">{detail.description}</p>
                  )}
                  <p className="font-dm text-[12px] text-gray mb-1">{t('noTours')}</p>
                  <p className="font-dm text-[13px] text-red font-medium">{t('customSuggestion')}</p>
                  <div className="flex items-center gap-1.5 font-dm text-[11px] text-gray/70 italic mt-3">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    {t('clickHintCustom')}
                  </div>
                </div>
              )}
            </div>
          )
        })()}
      </div>

      {/* Mobile: Bottom sheet province card */}
      {isMobile && activeProvince && (() => {
        const hasDestination = !!provinceSlugMap[activeProvince.id]
        return (
          <>
            {/* Backdrop — tap to dismiss */}
            <div
              className="fixed inset-0 z-[999] bg-black/30"
              onClick={handleDeselect}
            />
            {/* Bottom sheet */}
            <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-2xl shadow-[0_-8px_40px_rgba(0,0,0,.18)] animate-[slideUp_0.25s_ease-out]">
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[#ddd]" />
              </div>
              {/* Accent bar */}
              <div className={`h-1 mx-5 rounded-full bg-gradient-to-r ${hasDestination ? 'from-red to-red/60' : 'from-[#111] to-[#111]/60'}`} />

              {detail && hasDestination ? (
                <>
                  <div className="p-5 pb-3">
                    <div className="flex items-baseline gap-2.5 mb-1.5">
                      <h3 className="font-playfair text-xl font-bold leading-tight">{activeProvince.name}</h3>
                      <span className="font-dm text-[12px] text-gray">{detail.tours} {t('tours')}</span>
                    </div>
                    <p className="font-dm text-[13px] text-[#666] leading-relaxed">{detail.description}</p>
                  </div>
                  <div className="px-5 pb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {detail.highlights.split(' · ').map((item) => (
                        <span
                          key={item}
                          className="font-dm text-[11px] text-black/65 bg-[#f0eeeb] px-3 py-1.5 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 pb-3">
                  <h3 className="font-playfair text-xl font-bold leading-tight mb-2">{activeProvince.name}</h3>
                  {detail && (
                    <p className="font-dm text-[13px] text-[#666] leading-relaxed mb-2">{detail.description}</p>
                  )}
                  <p className="font-dm text-[12px] text-gray mb-1">{t('noTours')}</p>
                  <p className="font-dm text-[13px] text-red font-medium">{t('customSuggestion')}</p>
                </div>
              )}

              {/* Navigate button */}
              <div className="px-5 pb-6 pt-2">
                <button
                  onClick={handleNavigate}
                  className="w-full py-3.5 bg-red text-white font-dm text-sm font-medium tracking-[.06em] rounded-lg hover:bg-red-dark transition-colors flex items-center justify-center gap-2"
                >
                  {hasDestination ? t('clickHint') : t('clickHintCustom')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )
      })()}

      {/* Custom trip CTA below map */}
      <div className="text-center mt-8">
        <Link
          href="/custom"
          className="inline-flex items-center gap-2 font-dm text-[12px] font-medium tracking-[.1em] uppercase text-red hover:underline"
        >
          {t('customCta')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
