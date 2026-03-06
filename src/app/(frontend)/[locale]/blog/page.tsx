import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'

const categoryLabels: Record<string, Record<string, string>> = {
  tips: { es: 'Consejos de Viaje', en: 'Travel Tips', zh: '旅行贴士' },
  destinations: { es: 'Destinos', en: 'Destinations', zh: '目的地' },
  culture: { es: 'Cultura', en: 'Culture', zh: '文化' },
  food: { es: 'Gastronomía', en: 'Food', zh: '美食' },
  news: { es: 'Noticias', en: 'News', zh: '新闻' },
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

export const revalidate = 3600

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale, namespace: 'blog' })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 100,
    sort: '-publishedAt',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden flex items-end">
        <Image
          src="https://picsum.photos/id/1068/1800/900"
          alt="Blog"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('label')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {t('title')}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3 max-w-[480px]">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => {
            const imgSrc = post.imageUrl || post.coverImage?.url || '/placeholder.jpg'
            const catLabel = post.category && categoryLabels[post.category]
              ? categoryLabels[post.category][locale] || post.category
              : ''
            const dateStr = post.publishedAt || post.createdAt

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-sm bg-white border border-[#eee] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,.12)]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={post.title || ''}
                    width={400}
                    height={220}
                    className="w-full h-[220px] object-cover block transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {catLabel && (
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                      {catLabel}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {dateStr && (
                    <div className="font-dm text-[11px] text-gray uppercase tracking-[.08em] mb-2">
                      {formatDate(dateStr, locale)}
                    </div>
                  )}
                  <h2 className="font-playfair text-lg font-bold leading-snug mb-2 group-hover:text-red transition-colors duration-200">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="font-dm text-[13px] text-gray font-light leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="font-dm text-xs font-medium text-red tracking-[.08em] uppercase">
                    {t('readMore')} &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
        {posts.length === 0 && (
          <p className="text-center font-dm text-gray py-12">{t('noPosts')}</p>
        )}
      </section>
    </>
  )
}
