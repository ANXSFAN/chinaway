'use client'

import { useTranslations } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const iconKeys = ['visa', 'guide', 'team', 'custom'] as const

function TrustIcon({ type }: { type: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#D0021B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {type === 'visa' && (
        <>
          <rect x="2" y="6" width="22" height="14" rx="1.5" />
          <line x1="2" y1="11" x2="24" y2="11" />
          <line x1="6" y1="16" x2="11" y2="16" />
          <line x1="6" y1="19" x2="9" y2="19" />
        </>
      )}
      {type === 'guide' && (
        <>
          <circle cx="13" cy="8" r="4" />
          <path d="M5 23c0-4.418 3.582-8 8-8s8 3.582 8 8" />
          <path d="M17 11.5l2.5 2.5M19.5 11.5L17 14" />
        </>
      )}
      {type === 'team' && (
        <>
          <circle cx="9" cy="9" r="3.5" />
          <circle cx="18" cy="9" r="3.5" />
          <path d="M2 22c0-3.866 3.134-7 7-7" />
          <path d="M24 22c0-3.866-3.134-7-7-7" />
          <path d="M9 15c1.1-.64 2.42-1 3.8-1 1.38 0 2.7.36 3.8 1" />
        </>
      )}
      {type === 'custom' && (
        <>
          <path d="M13 3L3 8v5c0 5.25 4.25 10.15 10 11.35C19.75 23.15 24 18.25 24 13V8L13 3z" />
          <polyline points="9,13 12,16 17,11" />
        </>
      )}
    </svg>
  )
}

export function WhyUsSection() {
  const t = useTranslations()

  return (
    <section className="py-24 px-[6%]">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>{t('whyUs.label')}</SectionLabel>
        <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold mb-12">{t('whyUs.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {iconKeys.map((key) => (
            <div
              key={key}
              className="p-7 border-[1.5px] border-[#ebebeb] transition-all duration-300 hover:border-red hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(208,2,27,.08)]"
            >
              <div className="mb-5">
                <TrustIcon type={key} />
              </div>
              <div className="font-playfair text-lg font-bold mb-2.5 leading-tight">
                {t(`whyUs.${key}.title`)}
              </div>
              <div className="font-dm text-[13px] text-gray font-light leading-relaxed">
                {t(`whyUs.${key}.description`)}
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-14 bg-black grid grid-cols-3">
          {[
            ['500+', t('stats.travelers')],
            ['20+', t('stats.destinations')],
            ['8', t('stats.years')],
          ].map(([num, label], i) => (
            <div
              key={i}
              className={`py-9 px-10 text-center ${i < 2 ? 'border-r border-[#222]' : ''}`}
            >
              <div className="font-playfair text-[52px] font-black text-red leading-none">{num}</div>
              <div className="font-dm text-xs text-white mt-2 font-normal tracking-[.08em] uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
