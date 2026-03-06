'use client'

import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const reviews = [
  { name: 'María G.', origin: 'Madrid', text: { es: 'Una experiencia que cambió mi forma de ver el mundo. Todo perfecto, guías en español en todo momento.', en: 'An experience that changed how I see the world. Everything perfect, Spanish-speaking guides throughout.', zh: '一次改变我世界观的旅程，一切都很完美，全程西班牙语服务。' }, stars: 5 },
  { name: 'Thomas K.', origin: 'Berlin', text: { es: 'Viajé con mi familia a Yunnan y Guilin. Los niños quedaron fascinados. Organización impecable.', en: 'Travelled with my family to Yunnan and Guilin. The kids were amazed. Flawless organisation.', zh: '带家人游了云南和桂林，孩子们惊叹不已，组织安排无懈可击。' }, stars: 5 },
  { name: '林小红', origin: 'Barcelona', text: { es: 'Como china viviendo en España, este viaje me devolvió mis raíces. El servicio en chino fue impecable.', en: 'As a Chinese living in Spain, this trip gave me back my roots. Chinese-language service was impeccable.', zh: '作为旅居西班牙的华人，这次旅行让我重新找到了根，中文服务无可挑剔。' }, stars: 5 },
]

export function ReviewsSection() {
  const t = useTranslations('reviews')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <section className="py-20 px-[6%] bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <SectionLabel>{t('label')}</SectionLabel>
        <h2 className="font-playfair text-[clamp(26px,3.5vw,44px)] font-bold mb-10">{t('title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 bg-cream border-l-[3px] border-red">
              <div className="text-red text-base tracking-[4px] mb-4">
                {'★'.repeat(r.stars)}
              </div>
              <p className="font-playfair text-base italic leading-relaxed text-black mb-5">
                &ldquo;{r.text[locale]}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] bg-black flex items-center justify-center text-white font-playfair font-bold text-[15px] flex-shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-dm text-[13px] font-medium">{r.name}</div>
                  <div className="font-dm text-[11px] text-gray">{r.origin}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
