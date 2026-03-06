'use client'

import { useTranslations } from 'next-intl'

export function BannerSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative h-[420px] overflow-hidden">
      <img
        src="https://picsum.photos/id/1022/1800/900"
        alt="Zhangjiajie"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[6%]">
        <div className="font-dm text-[11px] tracking-[.22em] uppercase text-white/65 mb-4">
          Zhangjiajie · 张家界
        </div>
        <h3 className="font-playfair text-[clamp(32px,5vw,64px)] font-bold text-white leading-tight mb-7 italic">
          &ldquo;Las montañas que inspiraron Avatar&rdquo;
        </h3>
        <button className="font-dm text-xs font-medium tracking-[.12em] uppercase px-[38px] py-[15px] bg-red text-white border-none hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250">
          {t('cta')}
        </button>
      </div>
    </section>
  )
}
