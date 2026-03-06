'use client'

import { useTranslations } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

type ReviewItem = {
  customerName: string
  customerLocation: string
  rating: number
  content: string
}

type Props = {
  reviews: ReviewItem[]
}

export function ReviewsSection({ reviews }: Props) {
  const t = useTranslations('reviews')

  if (!reviews || reviews.length === 0) return null

  return (
    <section className="py-20 px-[6%] bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>{t('label')}</SectionLabel>
        <h2 className="font-playfair text-[clamp(26px,3.5vw,44px)] font-bold mb-10">{t('title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 bg-cream border-l-[3px] border-red">
              <div className="text-red text-base tracking-[4px] mb-4">
                {'★'.repeat(r.rating)}
              </div>
              <p className="font-playfair text-base italic leading-relaxed text-black mb-5">
                &ldquo;{r.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] bg-black flex items-center justify-center text-white font-playfair font-bold text-[15px] flex-shrink-0">
                  {r.customerName[0]}
                </div>
                <div>
                  <div className="font-dm text-[13px] font-medium">{r.customerName}</div>
                  <div className="font-dm text-[11px] text-gray">{r.customerLocation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
