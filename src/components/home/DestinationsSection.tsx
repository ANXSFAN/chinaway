'use client'

import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const destinations = [
  { key: 'guilin', photo: 'https://picsum.photos/id/1003/900/600', name: { es: 'Guilin', en: 'Guilin', zh: '桂林' }, tag: { es: 'Naturaleza', en: 'Nature', zh: '自然' }, desc: { es: 'Karst eterno y ríos esmeralda', en: 'Eternal karst and emerald rivers', zh: '千古喀斯特与碧玉江河' }, wide: true },
  { key: 'shanghai', photo: 'https://picsum.photos/id/1040/900/600', name: { es: 'Shanghái', en: 'Shanghai', zh: '上海' }, tag: { es: 'Metrópoli', en: 'City', zh: '都市' }, desc: { es: 'Donde el futuro y el pasado conviven', en: 'Where future meets past', zh: '过去与未来交汇之城' }, wide: false },
  { key: 'tibet', photo: 'https://picsum.photos/id/1018/900/600', name: { es: 'Tíbet', en: 'Tibet', zh: '西藏' }, tag: { es: 'Espiritual', en: 'Spiritual', zh: '心灵' }, desc: { es: 'El techo del mundo te llama', en: 'The roof of the world calls', zh: '世界屋脊的心灵召唤' }, wide: false },
  { key: 'yunnan', photo: 'https://picsum.photos/id/1080/900/600', name: { es: 'Yunnan', en: 'Yunnan', zh: '云南' }, tag: { es: 'Cultura', en: 'Culture', zh: '文化' }, desc: { es: 'Terrazas, té y etnias fascinantes', en: 'Terraces, tea and vibrant cultures', zh: '梯田茶园与缤纷民族' }, wide: false },
  { key: 'xian', photo: 'https://picsum.photos/id/1043/900/600', name: { es: "Xi'an", en: "Xi'an", zh: '西安' }, tag: { es: 'Historia', en: 'History', zh: '历史' }, desc: { es: 'Guerreros de terracota y Ruta de la Seda', en: 'Terracotta warriors and the Silk Road', zh: '兵马俑与丝绸之路起点' }, wide: false },
  { key: 'zhangjiajie', photo: 'https://picsum.photos/id/1022/900/600', name: { es: 'Zhangjiajie', en: 'Zhangjiajie', zh: '张家界' }, tag: { es: 'Aventura', en: 'Adventure', zh: '探险' }, desc: { es: 'Las montañas que inspiraron Avatar', en: 'The mountains that inspired Avatar', zh: '《阿凡达》取景地' }, wide: true },
]

export function DestinationsSection() {
  const t = useTranslations('destinations')
  const locale = useLocale() as 'es' | 'en' | 'zh'

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
          <button className="font-dm text-[11px] font-medium tracking-[.1em] uppercase px-[22px] py-[11px] bg-transparent text-black border-[1.5px] border-[#ccc] hover:border-black transition-all duration-250">
            {t('seeAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-3">
          {destinations.map((d) => (
            <div
              key={d.key}
              className={`cursor-pointer overflow-hidden relative rounded-sm group ${
                d.wide ? 'md:col-span-2' : 'col-span-1'
              }`}
            >
              <img
                src={d.photo}
                alt={d.name.en}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
              <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[10px] font-medium tracking-[.12em] uppercase z-[2]">
                {d.tag[locale]}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-[2]">
                <div className="font-playfair text-2xl font-bold mb-0.5">{d.name[locale]}</div>
                <div className="font-dm text-xs opacity-70">{d.desc[locale]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
