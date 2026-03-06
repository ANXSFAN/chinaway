import { getPayload } from 'payload'
import config from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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

function renderRichText(content: any): string[] {
  if (!content?.root?.children) return []
  return content.root.children
    .filter((node: any) => node.type === 'paragraph')
    .map((node: any) => {
      return node.children?.map((child: any) => child.text || '').join('') || ''
    })
    .filter((text: string) => text.length > 0)
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale: locale as 'es' | 'en' | 'zh',
    limit: 1,
  })
  const post = docs[0] as any
  if (!post) return {}
  const imgSrc = post.imageUrl || post.coverImage?.url || ''
  return {
    title: post.title,
    description: post.excerpt || '',
    openGraph: { images: imgSrc ? [imgSrc] : [] },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const loc = locale as 'es' | 'en' | 'zh'
  const payload = await getPayload({ config })
  const t = await getTranslations({ locale, namespace: 'blog' })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    locale: loc,
    limit: 1,
  })

  const post = docs[0] as any
  if (!post) notFound()

  const imgSrc = post.imageUrl || post.coverImage?.url || '/placeholder.jpg'
  const catLabel = post.category && categoryLabels[post.category]
    ? categoryLabels[post.category][locale] || post.category
    : ''
  const dateStr = post.publishedAt || post.createdAt

  // Extract content paragraphs from richText
  const paragraphs = renderRichText(post.content)

  // Related posts (relationship field)
  const relatedPosts: any[] = []
  if (post.relatedPosts && Array.isArray(post.relatedPosts)) {
    for (const rp of post.relatedPosts) {
      if (typeof rp === 'object' && rp !== null) {
        relatedPosts.push(rp)
      } else if (typeof rp === 'string' || typeof rp === 'number') {
        // If not populated, fetch individually
        try {
          const fetched = await payload.findByID({
            collection: 'posts',
            id: String(rp),
            locale: loc,
          })
          if (fetched) relatedPosts.push(fetched)
        } catch {}
      }
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-end">
        <img
          src={imgSrc}
          alt={post.title || ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="relative w-full max-w-[800px] mx-auto px-[6%] pb-12">
          <div className="flex items-center gap-3 mb-4">
            {catLabel && (
              <span className="px-2.5 py-1 bg-red text-white font-dm text-[9px] font-medium tracking-[.12em] uppercase">
                {catLabel}
              </span>
            )}
            {dateStr && (
              <span className="font-dm text-[11px] text-white/60">
                {formatDate(dateStr, locale)}
              </span>
            )}
          </div>
          <h1 className="font-playfair text-[clamp(28px,4vw,48px)] font-bold text-white leading-tight">
            {post.title}
          </h1>
          {post.author && (
            <div className="font-dm text-sm text-white/50 mt-3">{t('by')} {post.author}</div>
          )}
        </div>
      </section>

      {/* Article content */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center font-dm text-sm text-gray hover:text-red transition-colors mb-10"
          >
            &larr;&nbsp;&nbsp;{t('backToBlog')}
          </Link>

          <article className="space-y-6">
            {paragraphs.length > 0 ? (
              paragraphs.map((paragraph, i) => (
                <p key={i} className="font-dm text-base text-black/80 leading-[1.85]">
                  {paragraph}
                </p>
              ))
            ) : post.excerpt ? (
              <p className="font-dm text-base text-black/80 leading-[1.85]">
                {post.excerpt}
              </p>
            ) : null}
          </article>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-[6%] bg-cream">
          <div className="max-w-[1200px] mx-auto">
            <SectionLabel>{t('relatedPosts').toUpperCase()}</SectionLabel>
            <h2 className="font-playfair text-[clamp(24px,3vw,36px)] font-bold mb-10">
              {t('relatedPosts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp: any) => {
                const rpImg = rp.imageUrl || rp.coverImage?.url || '/placeholder.jpg'
                const rpCat = rp.category && categoryLabels[rp.category]
                  ? categoryLabels[rp.category][locale] || rp.category
                  : ''
                return (
                  <Link
                    key={rp.id}
                    href={`/blog/${rp.slug}`}
                    className="group flex gap-5 bg-white rounded-sm overflow-hidden border border-[#eee] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,.1)]"
                  >
                    <img
                      src={rpImg}
                      alt={rp.title || ''}
                      className="w-[180px] h-[140px] object-cover flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="py-4 pr-4 flex flex-col justify-center">
                      {rpCat && (
                        <span className="font-dm text-[9px] text-red font-medium tracking-[.12em] uppercase mb-1">
                          {rpCat}
                        </span>
                      )}
                      <h3 className="font-playfair text-base font-bold leading-snug group-hover:text-red transition-colors">
                        {rp.title}
                      </h3>
                      <span className="font-dm text-xs text-gray mt-2">
                        {t('readMore')} &rarr;
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
