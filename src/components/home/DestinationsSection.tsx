'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SectionLabel } from '@/components/ui/SectionLabel'

type DestinationItem = {
  slug: string
  name: string
  shortDescription: string
  theme: string
  imageUrl: string
  coverImage?: { url: string } | null
  featured: boolean
}

type Props = {
  destinations: DestinationItem[]
}

export function DestinationsSection({ destinations }: Props) {
  const t = useTranslations('destinations')

  return (
    <section className="py-24 px-[6%]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-11">
          <div>
            <SectionLabel>{t('label')}</SectionLabel>
            <h2 className="font-playfair text-[clamp(30px,4vw,50px)] font-bold leading-tight">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/destinations"
            className="font-dm text-[11px] font-medium tracking-[.1em] uppercase px-[22px] py-[11px] bg-transparent text-black border-[1.5px] border-[#ccc] hover:border-black transition-all duration-250"
          >
            {t('seeAll')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-3">
          {destinations.map((d, i) => {
            const isWide = i === 0 || i === destinations.length - 1
            const imgSrc = d.coverImage?.url || d.imageUrl || '/placeholder.jpg'
            const themeLabel = d.theme ? d.theme.charAt(0).toUpperCase() + d.theme.slice(1) : ''

            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className={`cursor-pointer overflow-hidden relative rounded-sm group ${
                  isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <Image
                  src={imgSrc}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.07]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[10px] font-medium tracking-[.12em] uppercase z-[2]">
                  {themeLabel}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-[2]">
                  <div className="font-playfair text-2xl font-bold mb-0.5">{d.name}</div>
                  <div className="font-dm text-xs opacity-70">{d.shortDescription}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
