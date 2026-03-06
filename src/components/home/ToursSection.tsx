'use client'

import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const tours = [
  { title: { es: 'Ruta de la Seda', en: 'Silk Road', zh: '丝绸之路' }, days: 15, price: '3.490', cities: { es: "Xi'an · Dunhuang · Turpán · Kashgar", en: "Xi'an · Dunhuang · Turpan · Kashgar", zh: '西安 · 敦煌 · 吐鲁番 · 喀什' }, badge: { es: 'Más Vendido', en: 'Best Seller', zh: '最受欢迎' }, imgKey: 'https://picsum.photos/id/1043/900/600' },
  { title: { es: 'China Clásica', en: 'Classic China', zh: '经典中国' }, days: 10, price: '2.290', cities: { es: 'Pekín · Xi\'an · Shanghái', en: 'Beijing · Xi\'an · Shanghai', zh: '北京 · 西安 · 上海' }, badge: { es: 'Para Principiantes', en: 'First Trip', zh: '首次旅华' }, imgKey: 'https://picsum.photos/id/1040/900/600' },
  { title: { es: 'China Natural', en: 'Natural China', zh: '自然中国' }, days: 12, price: '2.890', cities: { es: 'Guilin · Zhangjiajie · Yunnan', en: 'Guilin · Zhangjiajie · Yunnan', zh: '桂林 · 张家界 · 云南' }, badge: { es: 'Naturaleza', en: 'Nature', zh: '自然之旅' }, imgKey: 'https://picsum.photos/id/1003/900/600' },
]

export function ToursSection() {
  const t = useTranslations('tours')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <section className="py-20 px-[6%] bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>{t('label')}</SectionLabel>
        <div className="flex justify-between items-end mb-10 gap-5">
          <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold">{t('title')}</h2>
          <p className="font-dm text-[13px] text-gray max-w-[280px] text-right font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tours.map((tour, i) => (
            <div
              key={i}
              className="cursor-pointer overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.15)] group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.imgKey}
                  alt={tour.title.en}
                  className="w-full h-[220px] object-cover block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" style={{ backgroundSize: '100% 60%', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }} />
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                  {tour.badge[locale]}
                </div>
                <div className="absolute bottom-3.5 left-3.5">
                  <div className="font-playfair text-[22px] font-bold text-white">{tour.title[locale]}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="font-dm text-xs text-gray mb-4">{tour.cities[locale]}</div>
                <div className="flex justify-between items-end pt-4 border-t border-[#f0f0f0]">
                  <div>
                    <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('from')}</div>
                    <div className="font-playfair text-[26px] font-bold text-red leading-none">{tour.price}€</div>
                    <div className="font-dm text-[11px] text-gray">{tour.days} {t('days')}</div>
                  </div>
                  <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                    {t('viewItinerary')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
