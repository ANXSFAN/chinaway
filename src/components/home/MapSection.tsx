'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'
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

const provinceDetails: Record<string, {
  desc: Record<string, string>
  tours: number
  highlights: Record<string, string>
}> = {
  beijing: { desc: { es: 'Capital milenaria del imperio chino', en: 'Ancient capital of the Chinese empire', zh: '千年帝都' }, tours: 5, highlights: { es: 'Gran Muralla · Ciudad Prohibida · Templo del Cielo', en: 'Great Wall · Forbidden City · Temple of Heaven', zh: '长城 · 故宫 · 天坛' } },
  shanghai: { desc: { es: 'La metrópoli donde el futuro y el pasado conviven', en: 'The metropolis where future meets past', zh: '过去与未来交汇的大都市' }, tours: 3, highlights: { es: 'El Bund · Pudong · Jardín Yuyuan', en: 'The Bund · Pudong · Yu Garden', zh: '外滩 · 浦东 · 豫园' } },
  guangxi: { desc: { es: 'Paisajes kársticos eternos y ríos de jade', en: 'Eternal karst landscapes and jade rivers', zh: '千古喀斯特与碧玉江河' }, tours: 4, highlights: { es: 'Guilin · Río Li · Arrozales de Longji', en: 'Guilin · Li River · Longji Rice Terraces', zh: '桂林 · 漓江 · 龙脊梯田' } },
  yunnan: { desc: { es: 'Terrazas de arroz, té y culturas fascinantes', en: 'Rice terraces, tea and vibrant cultures', zh: '梯田茶园与缤纷民族' }, tours: 6, highlights: { es: 'Lijiang · Dali · Shangri-La', en: 'Lijiang · Dali · Shangri-La', zh: '丽江 · 大理 · 香格里拉' } },
  sichuan: { desc: { es: 'Pandas gigantes y cocina de fuego', en: 'Giant pandas and fiery cuisine', zh: '大熊猫与火辣美食' }, tours: 4, highlights: { es: 'Chengdu · Jiuzhaigou · Leshan', en: 'Chengdu · Jiuzhaigou · Leshan', zh: '成都 · 九寨沟 · 乐山' } },
  tibet: { desc: { es: 'El techo del mundo, espiritualidad pura', en: 'Roof of the world, pure spirituality', zh: '世界屋脊，心灵净土' }, tours: 3, highlights: { es: 'Lhasa · Potala · Everest', en: 'Lhasa · Potala · Everest', zh: '拉萨 · 布达拉宫 · 珠峰' } },
  shaanxi: { desc: { es: 'Guerreros de terracota y la Ruta de la Seda', en: 'Terracotta warriors and the Silk Road', zh: '兵马俑与丝绸之路' }, tours: 3, highlights: { es: "Xi'an · Ejército de Terracota · Muralla", en: "Xi'an · Terracotta Army · City Wall", zh: '西安 · 兵马俑 · 古城墙' } },
  hunan: { desc: { es: 'Las montañas que inspiraron Avatar', en: 'The mountains that inspired Avatar', zh: '阿凡达取景地' }, tours: 2, highlights: { es: 'Zhangjiajie · Fenghuang', en: 'Zhangjiajie · Fenghuang', zh: '张家界 · 凤凰古城' } },
  gansu: { desc: { es: 'Grutas de Mogao y desierto de Gobi', en: 'Mogao Caves and Gobi Desert', zh: '莫高窟与戈壁沙漠' }, tours: 2, highlights: { es: 'Dunhuang · Mogao · Zhangye Danxia', en: 'Dunhuang · Mogao · Zhangye Danxia', zh: '敦煌 · 莫高窟 · 张掖丹霞' } },
  xinjiang: { desc: { es: 'La nueva frontera y la Ruta de la Seda', en: 'The new frontier and the Silk Road', zh: '新边疆与丝绸之路' }, tours: 2, highlights: { es: 'Kashgar · Turpán · Lago Kanas', en: 'Kashgar · Turpan · Kanas Lake', zh: '喀什 · 吐鲁番 · 喀纳斯' } },
}

const labels = {
  tagline: {
    es: 'Acompáñanos a descubrir experiencias de viaje exclusivas por China',
    en: 'Come with us and enjoy exclusive luxury travel experiences in China',
    zh: '与我们一起，畅享中国奢华旅行体验',
  },
  intro: {
    es: 'Somos la agencia que va más allá del turismo convencional. Te ayudamos a descubrir la China auténtica entre mercados callejeros, aldeas remotas y, sobre todo, a través de la gente que conocerás en el camino.',
    en: 'We are the travel company that punches through the tourist bubble to get to the real stories. We empower you to discover the China that lives amid the aromatic sizzle of street-side woks, in bustling city markets and far-flung mountain villages.',
    zh: '我们是一家突破传统旅游泡沫的旅行社。我们带您深入街头巷尾的烟火气，走进繁华都市与偏远山村，感受真实的中国故事。',
  },
  tours: { es: 'itinerarios', en: 'tours', zh: '条行程' },
  explore: { es: 'Explorar destino', en: 'Explore destination', zh: '探索目的地' },
  custom: { es: 'Diseña tu viaje a medida', en: 'Design your custom trip', zh: '定制您的旅程' },
}

function getDestinationSlug(id: string) {
  const mapping: Record<string, string> = {
    guangxi: 'guilin',
    hunan: 'zhangjiajie',
    shaanxi: 'xian',
  }
  return mapping[id] || id
}

export function MapSection() {
  const locale = useLocale() as Locale
  const [activeProvince, setActiveProvince] = useState<ProvinceInfo | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const detail = activeProvince ? provinceDetails[activeProvince.id] : null

  const handleProvinceClick = useCallback((id: string, name: string) => {
    setActiveProvince({ id, name })
  }, [])

  const handleProvinceHover = useCallback((id: string | null, name: string) => {
    if (id) {
      setActiveProvince({ id, name })
    } else {
      setActiveProvince(null)
    }
  }, [])

  const handleDeselect = useCallback(() => {
    setActiveProvince(null)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveProvince(null)
    setMousePos(null)
  }, [])

  return (
    <section className="bg-white pt-20 pb-8">
      {/* Intro text — centered, like the reference */}
      <div className="max-w-[780px] mx-auto text-center px-[6%] mb-6">
        <p className="font-dm text-[15px] text-[#555] leading-relaxed mb-6">
          {labels.intro[locale]}
        </p>
        <p className="font-playfair text-[clamp(18px,2.5vw,22px)] italic text-gray leading-snug">
          {labels.tagline[locale]}
        </p>
      </div>

      {/* Map — full width */}
      <div
        ref={containerRef}
        className="relative max-w-[1102px] mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Map inner — clips the map itself */}
        <div className="overflow-hidden" style={{ aspectRatio: '1.3 / 1', contain: 'layout paint', willChange: 'transform' }}>
          <ChinaMap
            locale={locale}
            onProvinceClick={handleProvinceClick}
            onProvinceHover={handleProvinceHover}
            onDeselect={handleDeselect}
          />
        </div>

        {/* Floating province card — follows mouse, outside overflow-hidden */}
        {detail && activeProvince && mousePos && (
          <div
            className="absolute z-[500] w-[340px] bg-white/95 backdrop-blur-md rounded-xl shadow-[0_12px_40px_rgba(0,0,0,.15)] overflow-hidden pointer-events-none border border-white/60"
            style={{
              left: mousePos.x > (containerRef.current?.offsetWidth ?? 0) - 370 ? mousePos.x - 356 : mousePos.x + 20,
              top: mousePos.y > (containerRef.current?.offsetHeight ?? 0) - 320 ? mousePos.y - 300 : mousePos.y + 20,
            }}
          >
            {/* Red accent bar */}
            <div className="h-1 bg-gradient-to-r from-red to-red/60" />

            <div className="p-5 pb-4">
              <div className="flex items-baseline gap-2.5 mb-1.5">
                <h3 className="font-playfair text-xl font-bold leading-tight">{activeProvince.name}</h3>
                <span className="font-dm text-[12px] text-gray">{detail.tours} {labels.tours[locale]}</span>
              </div>
              <p className="font-dm text-[13px] text-[#666] leading-relaxed">{detail.desc[locale]}</p>
            </div>

            <div className="px-5 pb-5">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {detail.highlights[locale].split(' · ').map((item) => (
                  <span
                    key={item}
                    className="font-dm text-[11px] text-black/65 bg-[#f0eeeb] px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 w-full font-dm text-[12px] font-medium tracking-[.06em] uppercase py-3 bg-black text-white rounded-lg">
                {labels.explore[locale]}
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom trip CTA below map */}
      <div className="text-center mt-8">
        <Link
          href="/custom"
          className="inline-flex items-center gap-2 font-dm text-[12px] font-medium tracking-[.1em] uppercase text-red hover:underline"
        >
          {labels.custom[locale]}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
