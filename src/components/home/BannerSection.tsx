'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type Props = {
  imageUrl: string
  location: string
  quote: string
}

export function BannerSection({ imageUrl, location, quote }: Props) {
  const t = useTranslations('hero')

  return (
    <section className="relative h-[420px] overflow-hidden">
      <img
        src={imageUrl}
        alt={location}
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%]">
        <div className="font-dm text-[11px] tracking-[.22em] uppercase text-white/65 mb-4">
          {location}
        </div>
        <h3 className="font-playfair text-[clamp(32px,5vw,64px)] font-bold text-white leading-tight mb-7 italic">
          &ldquo;{quote}&rdquo;
        </h3>
        <Link href="/tours" className="font-dm text-xs font-medium tracking-[.12em] uppercase px-[38px] py-[15px] bg-red text-white border-none hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250 inline-block">
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}
