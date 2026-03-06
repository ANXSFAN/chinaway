'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type HeroProps = {
  imageUrl: string
  stats: { travelers: string; destinations: string; years: string }
}

export function Hero({ imageUrl, stats }: HeroProps) {
  const t = useTranslations()
  const [heroIn, setHeroIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroIn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const titleLines = [t('hero.title1'), t('hero.title2'), t('hero.title3')]

  return (
    <section className="relative h-screen min-h-[680px] overflow-hidden">
      {/* Background image */}
      <img
        src={imageUrl}
        alt="China landscape"
        className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" style={{ backgroundSize: '100% 40%', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-[8%]">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-6 transition-all duration-750 ${
            heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[22px]'
          }`}
          style={{ transitionDelay: '50ms' }}
        >
          <span className="inline-block w-7 h-0.5 bg-red" />
          <span className="font-dm text-[11px] tracking-[.2em] text-white/80 font-medium uppercase">
            {t('hero.eyebrow')}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-playfair font-black text-[clamp(56px,8vw,120px)] leading-none text-white mb-7">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className={`block transition-transform duration-900 ${
                  heroIn ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{
                  transitionDelay: `${200 + i * 150}ms`,
                  transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)',
                }}
              >
                {i === 2 ? <em className="text-red">{line}</em> : line}
              </span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className={`font-dm text-base leading-relaxed text-white/75 max-w-[420px] mb-10 font-light transition-all duration-750 ${
            heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[22px]'
          }`}
          style={{ transitionDelay: '650ms' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div
          className={`flex gap-3.5 flex-wrap transition-all duration-750 ${
            heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[22px]'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Link href="/tours" className="font-dm text-xs font-medium tracking-[.12em] uppercase px-[38px] py-[15px] bg-red text-white border-none hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250 inline-block">
            {t('hero.cta')}
          </Link>
          <Link href="/contact" className="font-dm text-xs font-medium tracking-[.12em] uppercase px-[38px] py-[14px] bg-transparent text-white border-[1.5px] border-white/60 hover:bg-white/12 hover:border-white transition-all duration-250 inline-block">
            {t('hero.cta2')}
          </Link>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-black/55 backdrop-blur-md flex justify-center transition-all duration-750 ${
          heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[22px]'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        {[
          [stats.travelers, t('stats.travelers')],
          [stats.destinations, t('stats.destinations')],
          [stats.years, t('stats.years')],
        ].map(([num, label], i) => (
          <div
            key={i}
            className={`py-[22px] px-8 md:px-16 text-center ${
              i < 2 ? 'border-r border-white/10' : ''
            }`}
          >
            <div className="font-playfair text-[32px] font-bold text-white leading-none">{num}</div>
            <div className="font-dm text-[11px] text-white/55 tracking-[.1em] uppercase mt-1.5">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
