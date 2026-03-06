'use client'

import { useTranslations } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const photos = [
  'https://picsum.photos/id/1036/600/400',
  'https://picsum.photos/id/1047/600/400',
  'https://picsum.photos/id/1055/600/400',
  'https://picsum.photos/id/1059/600/400',
  'https://picsum.photos/id/1038/600/400',
  'https://picsum.photos/id/1003/600/400',
  'https://picsum.photos/id/1080/600/400',
]

export function PhotoStrip() {
  const t = useTranslations('gallery')

  return (
    <section className="pb-20 pl-[6%]">
      <div className="max-w-[1200px] mb-7 pr-[6%]">
        <SectionLabel>{t('label')}</SectionLabel>
        <h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold">{t('title')}</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-hide pb-1">
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="flex-none w-[280px] h-[200px] rounded-sm object-cover hover:scale-[1.02] transition-transform duration-400"
          />
        ))}
      </div>
    </section>
  )
}
