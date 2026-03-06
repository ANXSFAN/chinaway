import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
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
  founded: {
    es: 'Fundada en Madrid',
    en: 'Founded in Madrid',
    zh: '成立于马德里',
  },
  statsLabels: {
    travelers: { es: 'Viajeros', en: 'Travelers', zh: '旅客' },
    destinations: { es: 'Destinos', en: 'Destinations', zh: '目的地' },
    years: { es: 'Años', en: 'Years', zh: '年' },
  },
}

function ValueIcon({ type }: { type: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#D0021B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {type === 'globe' && (
        <>
          <circle cx="13" cy="13" r="10" />
          <path d="M13 3c0 5.523-4.477 10-10 10" />
          <path d="M13 3c0 5.523 4.477 10 10 10" />
          <path d="M3 13c5.523 0 10 4.477 10 10" />
          <path d="M23 13c-5.523 0-10 4.477-10 10" />
        </>
      )}
      {type === 'shield' && (
        <>
          <path d="M13 3L3 8v5c0 5.25 4.25 10.15 10 11.35C19.75 23.15 24 18.25 24 13V8L13 3z" />
          <polyline points="9,13 12,16 17,11" />
        </>
      )}
      {type === 'people' && (
        <>
          <circle cx="9" cy="9" r="3.5" />
          <circle cx="18" cy="9" r="3.5" />
          <path d="M2 22c0-3.866 3.134-7 7-7" />
          <path d="M24 22c0-3.866-3.134-7-7-7" />
          <path d="M9 15c1.1-.64 2.42-1 3.8-1 1.38 0 2.7.36 3.8 1" />
        </>
      )}
      {type === 'card' && (
        <>
          <rect x="2" y="6" width="22" height="14" rx="1.5" />
          <line x1="2" y1="11" x2="24" y2="11" />
          <line x1="6" y1="16" x2="11" y2="16" />
          <line x1="6" y1="19" x2="9" y2="19" />
        </>
      )}
    </svg>
  )
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  const payload = await getPayload({ config })

  const [aboutPage, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'about-page', locale: loc }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  // Hero image: prefer upload, fall back to URL field, then default
  const heroImageUrl =
    (aboutPage.heroImage as { url?: string } | null)?.url ||
    aboutPage.heroImageUrl ||
    'https://picsum.photos/id/1029/1800/900'

  // Story image
  const storyImageUrl =
    (aboutPage.storyImage as { url?: string } | null)?.url ||
    aboutPage.storyImageUrl ||
    'https://picsum.photos/id/1036/800/1000'

  // Story paragraphs from CMS (localized fields returned as direct values)
  const storyParagraphs: string[] = (aboutPage.storyParagraphs || []).map(
    (item: { paragraph: string }) => item.paragraph,
  )

  // Values from CMS
  const values: { iconType: string; title: string; description: string }[] = (aboutPage.values || []).map(
    (item: { iconType: string; title: string; description: string }) => ({
      iconType: item.iconType,
      title: item.title,
      description: item.description,
    }),
  )

  // Stats from SiteSettings
  const stats = {
    travelers: siteSettings.stats?.travelers || '500+',
    destinations: siteSettings.stats?.destinations || '20+',
    years: siteSettings.stats?.years || '8',
  }

  // Founded year
  const foundedYear = siteSettings.company?.foundedYear || 2018

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <Image
          src={heroImageUrl}
          alt="About ChinaWay"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{pageText.label[loc]}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {pageText.title[loc]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3">{pageText.subtitle[loc]}</p>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>{pageText.storyLabel[loc]}</SectionLabel>
            <h2 className="font-playfair text-[clamp(24px,3.5vw,40px)] font-bold mb-8 leading-tight">
              {pageText.storyTitle[loc]}
            </h2>
            <div className="space-y-5">
              {storyParagraphs.map((para, i) => (
                <p key={i} className="font-dm text-[15px] text-black/70 leading-[1.85]">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="relative">
            <Image
              src={storyImageUrl}
              alt="ChinaWay team"
              width={600}
              height={500}
              className="w-full h-[500px] object-cover rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute -bottom-6 -left-6 bg-red text-white px-8 py-5 rounded-sm hidden lg:block">
              <div className="font-playfair text-[40px] font-black leading-none">{foundedYear}</div>
              <div className="font-dm text-xs tracking-[.1em] uppercase mt-1">
                {pageText.founded[loc]}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-[6%] bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <SectionLabel>{pageText.valuesLabel[loc]}</SectionLabel>
          <h2 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold mb-12">
            {pageText.valuesTitle[loc]}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => (
              <div
                key={i}
                className="p-7 bg-white border-[1.5px] border-[#ebebeb] transition-all duration-300 hover:border-red hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(208,2,27,.08)]"
              >
                <div className="mb-5">
                  <ValueIcon type={value.iconType} />
                </div>
                <div className="font-playfair text-lg font-bold mb-2.5 leading-tight">
                  {value.title}
                </div>
                <div className="font-dm text-[13px] text-gray font-light leading-relaxed">
                  {value.description}
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
              [stats.travelers, pageText.statsLabels.travelers[loc]],
              [stats.destinations, pageText.statsLabels.destinations[loc]],
              [stats.years, pageText.statsLabels.years[loc]],
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
            {pageText.ctaTitle[loc]}
          </h2>
          <p className="font-dm text-base text-gray mb-10 max-w-[520px] mx-auto">
            {pageText.ctaSubtitle[loc]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block font-dm text-xs font-medium tracking-[.12em] uppercase px-10 py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250"
            >
              {pageText.ctaButton[loc]}
            </Link>
            <Link
              href="/tours"
              className="inline-block font-dm text-xs font-medium tracking-[.12em] uppercase px-10 py-4 border-[1.5px] border-black text-black hover:bg-black hover:text-white hover:-translate-y-px transition-all duration-250"
            >
              {pageText.ctaButton2[loc]}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
