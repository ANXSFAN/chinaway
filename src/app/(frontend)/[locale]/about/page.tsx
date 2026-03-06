import { useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

type Locale = 'es' | 'en' | 'zh'

const pageText = {
  label: { es: 'NOSOTROS', en: 'ABOUT US', zh: '关于我们' },
  title: { es: 'Sobre ChinaWay', en: 'About ChinaWay', zh: '关于ChinaWay' },
  subtitle: {
    es: 'Tu puente entre Europa y China desde 2018.',
    en: 'Your bridge between Europe and China since 2018.',
    zh: '自2018年起，您连接欧洲与中国的桥梁。',
  },
  storyLabel: { es: 'NUESTRA HISTORIA', en: 'OUR STORY', zh: '我们的故事' },
  storyTitle: {
    es: 'Nacimos para acercar China a los viajeros europeos',
    en: 'We were born to bring China closer to European travelers',
    zh: '我们的使命是让欧洲旅行者更加了解中国',
  },
  storyParagraphs: {
    es: [
      'ChinaWay nació en 2018 de una idea sencilla: que viajar a China no debería ser complicado ni generar incertidumbre. Fundada por un equipo con raíces en España y profundos lazos con China, nuestra empresa se construyó sobre la convicción de que la mejor forma de conocer un país es a través de experiencias auténticas, no de itinerarios genéricos.',
      'Empezamos organizando viajes para amigos y familiares que querían descubrir China más allá de las guías turísticas. Lo que comenzó como un proyecto personal se convirtió rápidamente en una agencia de viajes especializada, gracias a las recomendaciones de viajeros satisfechos que regresaban con historias increíbles.',
      'Hoy, con más de 500 viajeros atendidos y presencia en Madrid y colaboradores en toda China, seguimos manteniendo el mismo espíritu: cada viaje es único, cada viajero merece una atención personalizada, y China tiene mucho más que ofrecer de lo que la mayoría imagina.',
    ],
    en: [
      'ChinaWay was born in 2018 from a simple idea: that traveling to China should not be complicated or generate uncertainty. Founded by a team with roots in Spain and deep ties to China, our company was built on the conviction that the best way to know a country is through authentic experiences, not generic itineraries.',
      'We started by organizing trips for friends and family who wanted to discover China beyond the travel guides. What began as a personal project quickly became a specialized travel agency, thanks to recommendations from satisfied travelers who returned with incredible stories.',
      'Today, with more than 500 travelers served and a presence in Madrid with collaborators across China, we continue to maintain the same spirit: each trip is unique, each traveler deserves personalized attention, and China has much more to offer than most people imagine.',
    ],
    zh: [
      'ChinaWay成立于2018年，源于一个简单的想法：去中国旅行不应该复杂或充满不确定性。我们的团队扎根于西班牙，与中国有着深厚的联系，公司建立在一个信念之上——了解一个国家最好的方式是通过真实的体验，而非千篇一律的行程。',
      '我们最初是为想要深度探索中国的亲友组织旅行。这个个人项目很快发展成了一家专业旅行社，这要归功于那些带着精彩故事归来的满意旅客的口碑推荐。',
      '如今，我们已服务超过500位旅客，在马德里设有办公室，在中国各地都有合作伙伴。我们始终秉持同样的理念：每次旅行都是独一无二的，每位旅客都值得获得个性化的关注，而中国能提供的远超大多数人的想象。',
    ],
  },
  valuesLabel: { es: 'NUESTROS VALORES', en: 'OUR VALUES', zh: '我们的价值观' },
  valuesTitle: {
    es: 'Lo que nos define',
    en: 'What defines us',
    zh: '我们的核心理念',
  },
  ctaTitle: {
    es: '¿Listo para descubrir China con nosotros?',
    en: 'Ready to discover China with us?',
    zh: '准备好与我们一起探索中国了吗？',
  },
  ctaSubtitle: {
    es: 'Hablemos de tu próximo viaje. Sin compromiso, sin prisas, a tu medida.',
    en: 'Let\'s talk about your next trip. No obligation, no rush, tailored to you.',
    zh: '让我们聊聊您的下一次旅行。无需承诺，不急不躁，为您量身定制。',
  },
  ctaButton: {
    es: 'Contáctanos',
    en: 'Contact us',
    zh: '联系我们',
  },
  ctaButton2: {
    es: 'Ver itinerarios',
    en: 'View itineraries',
    zh: '查看行程',
  },
}

const values = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#D0021B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="13" r="10" />
        <path d="M13 3c0 5.523-4.477 10-10 10" />
        <path d="M13 3c0 5.523 4.477 10 10 10" />
        <path d="M3 13c5.523 0 10 4.477 10 10" />
        <path d="M23 13c-5.523 0-10 4.477-10 10" />
      </svg>
    ),
    title: {
      es: 'Autenticidad',
      en: 'Authenticity',
      zh: '真实',
    },
    description: {
      es: 'Te mostramos la China real, más allá de los tópicos y las rutas masificadas. Cada experiencia que ofrecemos es genuina.',
      en: 'We show you the real China, beyond clichés and mass routes. Every experience we offer is genuine.',
      zh: '我们展示真实的中国，超越刻板印象和大众路线。我们提供的每一次体验都是真实的。',
    },
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#D0021B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3L3 8v5c0 5.25 4.25 10.15 10 11.35C19.75 23.15 24 18.25 24 13V8L13 3z" />
        <polyline points="9,13 12,16 17,11" />
      </svg>
    ),
    title: {
      es: 'Confianza',
      en: 'Trust',
      zh: '信任',
    },
    description: {
      es: 'Transparencia en precios, atención cercana y un equipo siempre disponible. Tu tranquilidad es nuestra prioridad.',
      en: 'Price transparency, close attention, and a team always available. Your peace of mind is our priority.',
      zh: '价格透明、贴心服务、团队随时待命。您的安心是我们的首要目标。',
    },
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#D0021B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="3.5" />
        <circle cx="18" cy="9" r="3.5" />
        <path d="M2 22c0-3.866 3.134-7 7-7" />
        <path d="M24 22c0-3.866-3.134-7-7-7" />
        <path d="M9 15c1.1-.64 2.42-1 3.8-1 1.38 0 2.7.36 3.8 1" />
      </svg>
    ),
    title: {
      es: 'Cercanía',
      en: 'Closeness',
      zh: '亲近',
    },
    description: {
      es: 'Somos un equipo pequeño y eso es una ventaja. Conocemos a cada viajero por su nombre y adaptamos cada detalle.',
      en: 'We are a small team and that is an advantage. We know each traveler by name and adapt every detail.',
      zh: '我们是一个小团队，这正是我们的优势。我们了解每位旅客，精心调整每个细节。',
    },
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#D0021B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="22" height="14" rx="1.5" />
        <line x1="2" y1="11" x2="24" y2="11" />
        <line x1="6" y1="16" x2="11" y2="16" />
        <line x1="6" y1="19" x2="9" y2="19" />
      </svg>
    ),
    title: {
      es: 'Expertise',
      en: 'Expertise',
      zh: '专业',
    },
    description: {
      es: '8 años de experiencia, más de 500 viajeros y un conocimiento profundo de China que solo se consigue viviendo allí.',
      en: '8 years of experience, over 500 travelers, and a deep knowledge of China that can only come from living there.',
      zh: '8年经验、500多位旅客，以及只有在中国生活过才能获得的深刻了解。',
    },
  },
]

const stats = {
  travelers: { es: 'Viajeros', en: 'Travelers', zh: '旅客' },
  destinations: { es: 'Destinos', en: 'Destinations', zh: '目的地' },
  years: { es: 'Años', en: 'Years', zh: '年' },
}

export default function AboutPage() {
  const locale = useLocale() as Locale

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1029/1800/900"
          alt="About ChinaWay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{pageText.label[locale]}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageText.title[locale]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3">{pageText.subtitle[locale]}</p>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>{pageText.storyLabel[locale]}</SectionLabel>
            <h2 className="font-playfair text-[clamp(24px,3.5vw,40px)] font-bold mb-8 leading-tight">
              {pageText.storyTitle[locale]}
            </h2>
            <div className="space-y-5">
              {pageText.storyParagraphs[locale].map((para, i) => (
                <p key={i} className="font-dm text-[15px] text-black/70 leading-[1.85]">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://picsum.photos/id/1036/800/1000"
              alt="ChinaWay team"
              className="w-full h-[500px] object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -left-6 bg-red text-white px-8 py-5 rounded-sm hidden lg:block">
              <div className="font-playfair text-[40px] font-black leading-none">2018</div>
              <div className="font-dm text-xs tracking-[.1em] uppercase mt-1">
                {locale === 'es' ? 'Fundada en Madrid' : locale === 'en' ? 'Founded in Madrid' : '成立于马德里'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-[6%] bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>{pageText.valuesLabel[locale]}</SectionLabel>
          <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold mb-12">
            {pageText.valuesTitle[locale]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => (
              <div
                key={i}
                className="p-7 bg-white border-[1.5px] border-[#ebebeb] transition-all duration-300 hover:border-red hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(208,2,27,.08)]"
              >
                <div className="mb-5">{value.icon}</div>
                <div className="font-playfair text-lg font-bold mb-2.5 leading-tight">
                  {value.title[locale]}
                </div>
                <div className="font-dm text-[13px] text-gray font-light leading-relaxed">
                  {value.description[locale]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-[6%]">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-black grid grid-cols-3">
            {[
              ['500+', stats.travelers[locale]],
              ['20+', stats.destinations[locale]],
              ['8', stats.years[locale]],
            ].map(([num, label], i) => (
              <div
                key={i}
                className={`py-9 px-10 text-center ${i < 2 ? 'border-r border-[#222]' : ''}`}
              >
                <div className="font-playfair text-[clamp(32px,5vw,52px)] font-black text-red leading-none">{num}</div>
                <div className="font-dm text-xs text-white mt-2 font-normal tracking-[.08em] uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-[6%]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-playfair text-[clamp(28px,4vw,44px)] font-bold mb-4 leading-tight">
            {pageText.ctaTitle[locale]}
          </h2>
          <p className="font-dm text-base text-gray mb-10 max-w-[520px] mx-auto">
            {pageText.ctaSubtitle[locale]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block font-dm text-xs font-medium tracking-[.12em] uppercase px-10 py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250"
            >
              {pageText.ctaButton[locale]}
            </Link>
            <Link
              href="/tours"
              className="inline-block font-dm text-xs font-medium tracking-[.12em] uppercase px-10 py-4 border-[1.5px] border-black text-black hover:bg-black hover:text-white hover:-translate-y-px transition-all duration-250"
            >
              {pageText.ctaButton2[locale]}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
