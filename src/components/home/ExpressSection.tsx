'use client'

import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const expressDeals = [
  {
    title: { es: 'Ruta de la Seda Express', en: 'Silk Road Express', zh: '丝绸之路特快' },
    days: 12,
    cities: { es: "Xi'an · Dunhuang · Kashgar", en: "Xi'an · Dunhuang · Kashgar", zh: '西安 · 敦煌 · 喀什' },
    price: 3490,
    discountPrice: 2790,
    discountPercent: 20,
    departureDate: '2026-04-15',
    spotsLeft: 6,
    imgKey: 'https://picsum.photos/id/1036/900/600',
  },
  {
    title: { es: 'Yunnan Exprés', en: 'Yunnan Express', zh: '云南特快' },
    days: 8,
    cities: { es: 'Kunming · Dali · Lijiang', en: 'Kunming · Dali · Lijiang', zh: '昆明 · 大理 · 丽江' },
    price: 2290,
    discountPrice: 1830,
    discountPercent: 20,
    departureDate: '2026-04-22',
    spotsLeft: 4,
    imgKey: 'https://picsum.photos/id/1015/900/600',
  },
  {
    title: { es: 'Pekín & Shanghái', en: 'Beijing & Shanghai', zh: '北京 & 上海' },
    days: 7,
    cities: { es: 'Pekín · Shanghái', en: 'Beijing · Shanghai', zh: '北京 · 上海' },
    price: 1890,
    discountPrice: 1510,
    discountPercent: 20,
    departureDate: '2026-05-01',
    spotsLeft: 8,
    imgKey: 'https://picsum.photos/id/1040/900/600',
  },
  {
    title: { es: 'Tíbet Místico', en: 'Mystic Tibet', zh: '神秘西藏' },
    days: 10,
    cities: { es: 'Lhasa · Shigatse · Everest BC', en: 'Lhasa · Shigatse · Everest BC', zh: '拉萨 · 日喀则 · 珠峰大本营' },
    price: 3190,
    discountPrice: 2550,
    discountPercent: 20,
    departureDate: '2026-05-10',
    spotsLeft: 3,
    imgKey: 'https://picsum.photos/id/1047/900/600',
  },
]

function formatPrice(n: number) {
  return n.toLocaleString('de-DE')
}

export function ExpressSection() {
  const t = useTranslations('express')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <section className="py-20 px-[6%] bg-white">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>{t('label')}</SectionLabel>
        <div className="flex justify-between items-end mb-10 gap-5 flex-wrap">
          <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold">{t('title')}</h2>
          <p className="font-dm text-[13px] text-gray max-w-[320px] text-right font-light leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-hide">
          {expressDeals.map((deal, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-[300px] snap-start cursor-pointer overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.15)] group flex-shrink-0"
            >
              <div className="relative overflow-hidden">
                <img
                  src={deal.imgKey}
                  alt={deal.title.en}
                  className="w-full h-[200px] object-cover block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[10px] font-bold tracking-[.08em]">
                  -{deal.discountPercent}%
                </div>
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-black/70 text-white font-dm text-[10px] tracking-[.05em]">
                  {deal.spotsLeft} {t('spotsLeft')}
                </div>
                <div className="absolute bottom-3.5 left-3.5">
                  <div className="font-playfair text-[20px] font-bold text-white leading-tight">{deal.title[locale]}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="font-dm text-xs text-gray mb-1">{deal.cities[locale]}</div>
                <div className="font-dm text-xs text-gray mb-4">
                  {deal.days} {t('days')} · {t('departure')}: {new Date(deal.departureDate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'short' })}
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-[#f0f0f0]">
                  <div>
                    <div className="font-dm text-[13px] text-gray line-through">{formatPrice(deal.price)}€</div>
                    <div className="font-playfair text-[26px] font-bold text-red leading-none">{formatPrice(deal.discountPrice)}€</div>
                  </div>
                  <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                    {t('book')}
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
