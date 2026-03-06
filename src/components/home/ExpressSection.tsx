'use client'

import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SectionLabel } from '@/components/ui/SectionLabel'

type ExpressDeal = {
  slug: string
  title: string
  days: number
  cities: string
  price: number
  discountPrice: number
  discountPercent: number
  imageUrl: string
  coverImage?: { url: string } | null
  departures: { date: string; spotsTotal: number; spotsBooked: number }[]
}

type Props = {
  deals: ExpressDeal[]
}

function formatPrice(n: number) {
  return n.toLocaleString('de-DE')
}

export function ExpressSection({ deals }: Props) {
  const t = useTranslations('express')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  if (!deals || deals.length === 0) return null

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
          {deals.map((deal) => {
            const imgSrc = deal.imageUrl || deal.coverImage?.url || '/placeholder.jpg'
            const spotsLeft = deal.departures?.[0]
              ? deal.departures[0].spotsTotal - deal.departures[0].spotsBooked
              : 0
            const departureDate = deal.departures?.[0]?.date

            return (
              <Link
                key={deal.slug}
                href={`/tours/${deal.slug}`}
                className="min-w-[300px] max-w-[300px] snap-start cursor-pointer overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.15)] group flex-shrink-0"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={deal.title}
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover block transition-transform duration-500 group-hover:scale-105"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[10px] font-bold tracking-[.08em]">
                    -{deal.discountPercent}%
                  </div>
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-black/70 text-white font-dm text-[10px] tracking-[.05em]">
                    {spotsLeft} {t('spotsLeft')}
                  </div>
                  <div className="absolute bottom-3.5 left-3.5">
                    <div className="font-playfair text-[20px] font-bold text-white leading-tight">{deal.title}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-dm text-xs text-gray mb-1">{deal.cities}</div>
                  <div className="font-dm text-xs text-gray mb-4">
                    {deal.days} {t('days')}
                    {departureDate && (
                      <> · {t('departure')}: {new Date(departureDate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'short' })}</>
                    )}
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
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
