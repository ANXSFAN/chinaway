import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const categories = {
  tips: { es: 'Consejos de Viaje', en: 'Travel Tips', zh: '旅行贴士' },
  destinations: { es: 'Destinos', en: 'Destinations', zh: '目的地' },
  culture: { es: 'Cultura', en: 'Culture', zh: '文化' },
  food: { es: 'Gastronomía', en: 'Food', zh: '美食' },
}

const posts = [
  {
    slug: 'visa-guide-spanish-citizens',
    img: 'https://picsum.photos/id/1015/800/500',
    category: 'tips' as const,
    title: {
      es: 'Guía completa de visado para ciudadanos españoles',
      en: 'Complete visa guide for Spanish citizens',
      zh: '西班牙公民签证完整指南',
    },
    excerpt: {
      es: 'Todo lo que necesitas saber sobre el proceso de solicitud de visado para China, desde los documentos necesarios hasta los tiempos de tramitación.',
      en: 'Everything you need to know about the China visa application process, from required documents to processing times.',
      zh: '关于中国签证申请流程的所有信息，从所需文件到处理时间。',
    },
    date: '2026-02-20',
  },
  {
    slug: 'hidden-gems-yunnan',
    img: 'https://picsum.photos/id/1039/800/500',
    category: 'destinations' as const,
    title: {
      es: 'Joyas ocultas de Yunnan que no puedes perderte',
      en: 'Hidden gems of Yunnan you cannot miss',
      zh: '云南不可错过的隐秘宝藏',
    },
    excerpt: {
      es: 'Más allá de Lijiang y Dali, Yunnan esconde pueblos ancestrales, mercados vibrantes y paisajes que te dejarán sin aliento.',
      en: 'Beyond Lijiang and Dali, Yunnan hides ancestral villages, vibrant markets, and landscapes that will take your breath away.',
      zh: '在丽江和大理之外，云南还隐藏着古老的村落、充满活力的集市和令人叹为观止的风景。',
    },
    date: '2026-02-10',
  },
  {
    slug: 'chinese-tea-culture',
    img: 'https://picsum.photos/id/1060/800/500',
    category: 'culture' as const,
    title: {
      es: 'La cultura del té en China: una tradición milenaria',
      en: 'Tea culture in China: a millenary tradition',
      zh: '中国茶文化：千年传承',
    },
    excerpt: {
      es: 'Descubre los rituales, las variedades y los lugares donde podrás vivir una auténtica ceremonia del té durante tu viaje.',
      en: 'Discover the rituals, varieties, and places where you can experience an authentic tea ceremony during your trip.',
      zh: '探索茶道仪式、茶叶品种以及旅途中体验正宗茶道的好去处。',
    },
    date: '2026-01-28',
  },
  {
    slug: 'best-street-food-beijing',
    img: 'https://picsum.photos/id/1080/800/500',
    category: 'food' as const,
    title: {
      es: 'La mejor comida callejera de Pekín',
      en: 'The best street food in Beijing',
      zh: '北京最佳街头美食',
    },
    excerpt: {
      es: 'Desde jianbing hasta baozi, te llevamos por los mejores puestos callejeros de la capital china para comer como un local.',
      en: 'From jianbing to baozi, we take you through the best street food stalls in the Chinese capital to eat like a local.',
      zh: '从煎饼到包子，带您走遍北京最好的街头小吃摊，像当地人一样品尝美食。',
    },
    date: '2026-01-15',
  },
  {
    slug: 'great-wall-sections',
    img: 'https://picsum.photos/id/1047/800/500',
    category: 'destinations' as const,
    title: {
      es: 'Los mejores tramos de la Gran Muralla para visitar',
      en: 'The best Great Wall sections to visit',
      zh: '长城最值得游览的段落',
    },
    excerpt: {
      es: 'Badaling, Mutianyu o Jinshanling: cada tramo tiene su encanto. Te ayudamos a elegir el que mejor se adapta a tu viaje.',
      en: 'Badaling, Mutianyu or Jinshanling: each section has its charm. We help you choose the one that best fits your trip.',
      zh: '八达岭、慕田峪还是金山岭：每一段都有独特魅力。我们帮您选择最适合的段落。',
    },
    date: '2026-01-05',
  },
  {
    slug: 'traveling-china-with-kids',
    img: 'https://picsum.photos/id/1024/800/500',
    category: 'tips' as const,
    title: {
      es: 'Viajar a China con niños: consejos prácticos',
      en: 'Traveling to China with kids: practical tips',
      zh: '带孩子去中国旅行：实用建议',
    },
    excerpt: {
      es: 'China es un destino fantástico para familias. Te contamos cómo planificar un viaje inolvidable con los más pequeños.',
      en: 'China is a fantastic destination for families. We tell you how to plan an unforgettable trip with the little ones.',
      zh: '中国是家庭旅行的绝佳目的地。我们告诉您如何与孩子一起规划一次难忘的旅程。',
    },
    date: '2025-12-20',
  },
]

const pageText = {
  label: { es: 'BLOG', en: 'BLOG', zh: '博客' },
  title: { es: 'Blog', en: 'Blog', zh: '博客' },
  subtitle: {
    es: 'Historias, consejos y descubrimientos para tu próximo viaje a China.',
    en: 'Stories, tips and discoveries for your next trip to China.',
    zh: '为您的下一次中国之旅提供故事、建议和发现。',
  },
  readMore: { es: 'Leer más', en: 'Read more', zh: '阅读更多' },
}

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr)
  const localeMap: Record<string, string> = { es: 'es-ES', en: 'en-US', zh: 'zh-CN' }
  return date.toLocaleDateString(localeMap[locale] || 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const locale = useLocale() as 'es' | 'en' | 'zh'

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1068/1800/900"
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{pageText.label[locale]}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageText.title[locale]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3 max-w-[480px]">
            {pageText.subtitle[locale]}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.12)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.img}
                  alt={post.title.en}
                  className="w-full h-[220px] object-cover block transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                  {categories[post.category][locale]}
                </div>
              </div>
              <div className="p-5">
                <div className="font-dm text-[11px] text-gray uppercase tracking-[.08em] mb-2">
                  {formatDate(post.date, locale)}
                </div>
                <h2 className="font-playfair text-lg font-bold leading-snug mb-2 group-hover:text-red transition-colors duration-200">
                  {post.title[locale]}
                </h2>
                <p className="font-dm text-[13px] text-gray font-light leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt[locale]}
                </p>
                <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                  {pageText.readMore[locale]} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
