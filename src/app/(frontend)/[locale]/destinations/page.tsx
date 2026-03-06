import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const destinations = [
  { slug: 'guilin', photo: 'https://picsum.photos/id/1003/900/600', name: { es: 'Guilin', en: 'Guilin', zh: '桂林' }, tag: { es: 'Naturaleza', en: 'Nature', zh: '自然' }, desc: { es: 'Karst eterno y ríos esmeralda', en: 'Eternal karst and emerald rivers', zh: '千古喀斯特与碧玉江河' }, province: 'guangxi' },
  { slug: 'shanghai', photo: 'https://picsum.photos/id/1040/900/600', name: { es: 'Shanghái', en: 'Shanghai', zh: '上海' }, tag: { es: 'Metrópoli', en: 'City', zh: '都市' }, desc: { es: 'Donde el futuro y el pasado conviven', en: 'Where future meets past', zh: '过去与未来交汇之城' }, province: 'shanghai' },
  { slug: 'tibet', photo: 'https://picsum.photos/id/1018/900/600', name: { es: 'Tíbet', en: 'Tibet', zh: '西藏' }, tag: { es: 'Espiritual', en: 'Spiritual', zh: '心灵' }, desc: { es: 'El techo del mundo te llama', en: 'The roof of the world calls', zh: '世界屋脊的心灵召唤' }, province: 'tibet' },
  { slug: 'yunnan', photo: 'https://picsum.photos/id/1080/900/600', name: { es: 'Yunnan', en: 'Yunnan', zh: '云南' }, tag: { es: 'Cultura', en: 'Culture', zh: '文化' }, desc: { es: 'Terrazas, té y etnias fascinantes', en: 'Terraces, tea and vibrant cultures', zh: '梯田茶园与缤纷民族' }, province: 'yunnan' },
  { slug: 'xian', photo: 'https://picsum.photos/id/1043/900/600', name: { es: "Xi'an", en: "Xi'an", zh: '西安' }, tag: { es: 'Historia', en: 'History', zh: '历史' }, desc: { es: 'Guerreros de terracota y Ruta de la Seda', en: 'Terracotta warriors and the Silk Road', zh: '兵马俑与丝绸之路起点' }, province: 'shaanxi' },
  { slug: 'zhangjiajie', photo: 'https://picsum.photos/id/1022/900/600', name: { es: 'Zhangjiajie', en: 'Zhangjiajie', zh: '张家界' }, tag: { es: 'Aventura', en: 'Adventure', zh: '探险' }, desc: { es: 'Las montañas que inspiraron Avatar', en: 'The mountains that inspired Avatar', zh: '《阿凡达》取景地' }, province: 'hunan' },
  { slug: 'beijing', photo: 'https://picsum.photos/id/1059/900/600', name: { es: 'Pekín', en: 'Beijing', zh: '北京' }, tag: { es: 'Historia', en: 'History', zh: '历史' }, desc: { es: 'La capital milenaria del imperio', en: 'The ancient imperial capital', zh: '千年帝都' }, province: 'beijing' },
  { slug: 'chengdu', photo: 'https://picsum.photos/id/1036/900/600', name: { es: 'Chengdu', en: 'Chengdu', zh: '成都' }, tag: { es: 'Cultura', en: 'Culture', zh: '文化' }, desc: { es: 'Pandas, té y la vida tranquila', en: 'Pandas, tea and the laid-back life', zh: '熊猫、茶馆与悠闲生活' }, province: 'sichuan' },
  { slug: 'dunhuang', photo: 'https://picsum.photos/id/1047/900/600', name: { es: 'Dunhuang', en: 'Dunhuang', zh: '敦煌' }, tag: { es: 'Historia', en: 'History', zh: '历史' }, desc: { es: 'Las grutas de Mogao y el desierto', en: 'Mogao Caves and the desert', zh: '莫高窟与大漠' }, province: 'gansu' },
]

export default function DestinationsPage() {
  const t = useTranslations('destinations')
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1018/1800/900"
          alt="China destinations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('label')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/destinations/${d.slug}`}
              className="cursor-pointer overflow-hidden relative rounded-sm group h-[280px] block"
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
                <div className="font-playfair text-2xl font-bold mb-1">{d.name[locale]}</div>
                <div className="font-dm text-xs opacity-70">{d.desc[locale]}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
