'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const ChinaMap = dynamic(() => import('@/components/map/ChinaMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#e8e4de]">
      <div className="font-dm text-gray text-sm tracking-wide animate-pulse">Loading...</div>
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
  img: string
  highlights: Record<string, string>
}> = {
  beijing: { desc: { es: 'Capital milenaria del imperio chino', en: 'Ancient capital of the Chinese empire', zh: '千年帝都' }, tours: 5, img: 'https://picsum.photos/id/1059/400/250', highlights: { es: 'Gran Muralla · Ciudad Prohibida · Templo del Cielo', en: 'Great Wall · Forbidden City · Temple of Heaven', zh: '长城 · 故宫 · 天坛' } },
  shanghai: { desc: { es: 'La metrópoli donde el futuro y el pasado conviven', en: 'The metropolis where future meets past', zh: '过去与未来交汇的大都市' }, tours: 3, img: 'https://picsum.photos/id/1040/400/250', highlights: { es: 'El Bund · Pudong · Jardín Yuyuan', en: 'The Bund · Pudong · Yu Garden', zh: '外滩 · 浦东 · 豫园' } },
  guangxi: { desc: { es: 'Paisajes kársticos eternos y ríos de jade', en: 'Eternal karst landscapes and jade rivers', zh: '千古喀斯特与碧玉江河' }, tours: 4, img: 'https://picsum.photos/id/1003/400/250', highlights: { es: 'Guilin · Río Li · Arrozales de Longji', en: 'Guilin · Li River · Longji Rice Terraces', zh: '桂林 · 漓江 · 龙脊梯田' } },
  yunnan: { desc: { es: 'Terrazas de arroz, té y culturas fascinantes', en: 'Rice terraces, tea and vibrant cultures', zh: '梯田茶园与缤纷民族' }, tours: 6, img: 'https://picsum.photos/id/1080/400/250', highlights: { es: 'Lijiang · Dali · Shangri-La', en: 'Lijiang · Dali · Shangri-La', zh: '丽江 · 大理 · 香格里拉' } },
  sichuan: { desc: { es: 'Pandas gigantes y cocina de fuego', en: 'Giant pandas and fiery cuisine', zh: '大熊猫与火辣美食' }, tours: 4, img: 'https://picsum.photos/id/1036/400/250', highlights: { es: 'Chengdu · Jiuzhaigou · Leshan', en: 'Chengdu · Jiuzhaigou · Leshan', zh: '成都 · 九寨沟 · 乐山' } },
  tibet: { desc: { es: 'El techo del mundo, espiritualidad pura', en: 'Roof of the world, pure spirituality', zh: '世界屋脊，心灵净土' }, tours: 3, img: 'https://picsum.photos/id/1018/400/250', highlights: { es: 'Lhasa · Potala · Everest', en: 'Lhasa · Potala · Everest', zh: '拉萨 · 布达拉宫 · 珠峰' } },
  shaanxi: { desc: { es: 'Guerreros de terracota y la Ruta de la Seda', en: 'Terracotta warriors and the Silk Road', zh: '兵马俑与丝绸之路' }, tours: 3, img: 'https://picsum.photos/id/1043/400/250', highlights: { es: "Xi'an · Ejército de Terracota · Muralla", en: "Xi'an · Terracotta Army · City Wall", zh: '西安 · 兵马俑 · 古城墙' } },
  hunan: { desc: { es: 'Las montañas que inspiraron Avatar', en: 'The mountains that inspired Avatar', zh: '阿凡达取景地' }, tours: 2, img: 'https://picsum.photos/id/1022/400/250', highlights: { es: 'Zhangjiajie · Fenghuang', en: 'Zhangjiajie · Fenghuang', zh: '张家界 · 凤凰古城' } },
  gansu: { desc: { es: 'Grutas de Mogao y desierto de Gobi', en: 'Mogao Caves and Gobi Desert', zh: '莫高窟与戈壁沙漠' }, tours: 2, img: 'https://picsum.photos/id/1047/400/250', highlights: { es: 'Dunhuang · Mogao · Zhangye Danxia', en: 'Dunhuang · Mogao · Zhangye Danxia', zh: '敦煌 · 莫高窟 · 张掖丹霞' } },
  xinjiang: { desc: { es: 'La nueva frontera y la Ruta de la Seda', en: 'The new frontier and the Silk Road', zh: '新边疆与丝绸之路' }, tours: 2, img: 'https://picsum.photos/id/1055/400/250', highlights: { es: 'Kashgar · Turpán · Lago Kanas', en: 'Kashgar · Turpan · Kanas Lake', zh: '喀什 · 吐鲁番 · 喀纳斯' } },
}

const labels = {
  title: { es: 'Explora China', en: 'Explore China', zh: '探索中国' },
  subtitle: { es: 'Haz clic en una provincia para descubrir sus destinos y viajes.', en: 'Click on a province to discover its destinations and tours.', zh: '点击省份，探索目的地与可用行程。' },
  label: { es: 'MAPA INTERACTIVO', en: 'INTERACTIVE MAP', zh: '互动地图' },
  selectPrompt: { es: 'Selecciona una provincia en el mapa', en: 'Select a province on the map', zh: '在地图上选择一个省份' },
  selectSub: { es: 'Pasa el cursor o haz clic para ver información', en: 'Hover or click to see details', zh: '悬停或点击查看详情' },
  tours: { es: 'itinerarios', en: 'tours', zh: '条行程' },
  highlights: { es: 'Destacados', en: 'Highlights', zh: '亮点' },
  explore: { es: 'Explorar destino →', en: 'Explore destination →', zh: '探索目的地 →' },
  customCta: { es: '¿No encuentras lo que buscas?', en: "Can't find what you're looking for?", zh: '没找到想去的地方？' },
  customBtn: { es: 'Diseña tu viaje', en: 'Design your trip', zh: '定制您的旅程' },
}

export default function MapPage() {
  const locale = useLocale() as Locale
  const [activeProvince, setActiveProvince] = useState<ProvinceInfo | null>(null)

  const detail = activeProvince ? provinceDetails[activeProvince.id] : null

  return (
    <div className="pt-[72px] min-h-screen bg-[#e8e4de]">
      {/* Header */}
      <div className="bg-black py-12 px-[6%]">
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel>{labels.label[locale]}</SectionLabel>
          <h1 className="font-playfair text-[clamp(32px,4vw,52px)] font-bold text-white leading-tight">
            {labels.title[locale]}
          </h1>
          <p className="font-dm text-sm text-white/60 mt-2 max-w-[480px]">
            {labels.subtitle[locale]}
          </p>
        </div>
      </div>

      {/* Map + Sidebar */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* Map area */}
        <div className="flex-1 min-h-[500px] lg:min-h-0 relative">
          <ChinaMap
            locale={locale}
            onProvinceClick={(id) => {
              setActiveProvince({ id, name: id })
            }}
            onProvinceHover={(id, name) => {
              if (id) setActiveProvince({ id, name })
            }}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[380px] bg-white flex-shrink-0 flex flex-col">
          {detail && activeProvince ? (
            <div className="flex flex-col h-full">
              {/* Province image */}
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={detail.img}
                  alt={activeProvince.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="font-playfair text-2xl font-bold text-white">{activeProvince.name}</div>
                </div>
              </div>

              {/* Province info */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="font-dm text-sm text-gray leading-relaxed mb-5">
                  {detail.desc[locale]}
                </p>

                {/* Tour count */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#f0f0f0]">
                  <div className="w-10 h-10 bg-red flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair text-lg font-bold text-white">{detail.tours}</span>
                  </div>
                  <span className="font-dm text-sm text-black">
                    {labels.tours[locale]}
                  </span>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="font-dm text-[10px] text-gray uppercase tracking-[.12em] mb-2">
                    {labels.highlights[locale]}
                  </div>
                  <div className="font-dm text-sm text-black/80 leading-relaxed">
                    {detail.highlights[locale]}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Link
                    href={`/destinations/${activeProvince.id === 'guangxi' ? 'guilin' : activeProvince.id === 'hunan' ? 'zhangjiajie' : activeProvince.id === 'shaanxi' ? 'xian' : activeProvince.id}`}
                    className="block w-full text-center font-dm text-[11px] font-medium tracking-[.1em] uppercase py-3.5 bg-red text-white hover:bg-red-dark transition-colors"
                  >
                    {labels.explore[locale]}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 border-2 border-[#ddd] rounded-full flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
              <div className="font-playfair text-lg font-bold mb-2">{labels.selectPrompt[locale]}</div>
              <div className="font-dm text-sm text-gray">{labels.selectSub[locale]}</div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="border-t border-[#f0f0f0] p-5 bg-cream">
            <div className="font-dm text-xs text-gray mb-2">{labels.customCta[locale]}</div>
            <Link
              href="/custom"
              className="inline-block font-dm text-[11px] font-medium tracking-[.08em] uppercase text-red hover:underline"
            >
              {labels.customBtn[locale]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
