'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

type PhotoItem = {
  imageUrl?: string
  image?: { url: string } | null
}

type Props = {
  photos: PhotoItem[]
}

export function PhotoStrip({ photos }: Props) {
  const t = useTranslations('gallery')

  if (!photos || photos.length === 0) return null

  return (
    <section className="pb-20 pl-[6%]">
      <div className="max-w-[1200px] mb-7 pr-[6%]">
        <SectionLabel>{t('label')}</SectionLabel>
        <h2 className="font-playfair text-[clamp(28px,3.5vw,44px)] font-bold">{t('title')}</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-hide pb-1">
        {photos.map((photo, i) => {
          const src = photo.image?.url || photo.imageUrl || '/placeholder.jpg'
          return (
            <Image
              key={i}
              src={src}
              alt=""
              width={280}
              height={200}
              className="flex-none w-[280px] h-[200px] rounded-sm object-cover hover:scale-[1.02] transition-transform duration-400"
              sizes="280px"
            />
          )
        })}
      </div>
    </section>
  )
}
