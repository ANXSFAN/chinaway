'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SectionLabel } from '@/components/ui/SectionLabel'

type TourItem = {
  slug: string
  title: string
  days: number
  price: number
  cities: string
  badge: string
  imageUrl: string
  coverImage?: { url: string } | null
}

type Props = {
  tours: TourItem[]
}

export function ToursSection({ tours }: Props) {
  const t = useTranslations('tours')

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
          {tours.map((tour) => {
            const imgSrc = tour.coverImage?.url || tour.imageUrl || '/placeholder.jpg'
            const formattedPrice = tour.price.toLocaleString('de-DE')

            return (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="cursor-pointer overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.15)] group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={tour.title}
                    width={400}
                    height={220}
                    className="w-full h-[220px] object-cover block transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" style={{ backgroundSize: '100% 60%', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }} />
                  <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                    {tour.badge}
                  </div>
                  <div className="absolute bottom-3.5 left-3.5">
                    <div className="font-playfair text-[22px] font-bold text-white">{tour.title}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-dm text-xs text-gray mb-4">{tour.cities}</div>
                  <div className="flex justify-between items-end pt-4 border-t border-[#f0f0f0]">
                    <div>
                      <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('from')}</div>
                      <div className="font-playfair text-[26px] font-bold text-red leading-none">{formattedPrice}€</div>
                      <div className="font-dm text-[11px] text-gray">{tour.days} {t('days')}</div>
                    </div>
                    <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                      {t('viewItinerary')}
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
