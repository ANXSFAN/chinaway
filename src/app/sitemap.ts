import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const locales = ['es', 'en', 'zh']
  const now = new Date()

  const staticPages = [
    '',
    '/destinations',
    '/tours',
    '/upcoming',
    '/custom',
    '/contact',
    '/blog',
    '/info',
    '/about',
    '/legal/privacy',
    '/legal/cookies',
    '/legal/terms',
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page.startsWith('/legal') ? 0.3 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    }
  }

  // Dynamic pages from CMS
  try {
    const payload = await getPayload({ config })

    const [destinations, tours, posts] = await Promise.all([
      payload.find({ collection: 'destinations', where: { status: { equals: 'published' } }, limit: 500, select: { slug: true } }),
      payload.find({ collection: 'tours', where: { status: { equals: 'published' } }, limit: 500, select: { slug: true } }),
      payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, limit: 500, select: { slug: true } }),
    ])

    for (const doc of destinations.docs) {
      if (!doc.slug) continue
      for (const locale of locales) {
        entries.push({
          url: `${baseUrl}/${locale}/destinations/${doc.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/destinations/${doc.slug}`])
            ),
          },
        })
      }
    }

    for (const doc of tours.docs) {
      if (!doc.slug) continue
      for (const locale of locales) {
        entries.push({
          url: `${baseUrl}/${locale}/tours/${doc.slug}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/tours/${doc.slug}`])
            ),
          },
        })
      }
    }

    for (const doc of posts.docs) {
      if (!doc.slug) continue
      for (const locale of locales) {
        entries.push({
          url: `${baseUrl}/${locale}/blog/${doc.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/blog/${doc.slug}`])
            ),
          },
        })
      }
    }
  } catch (e) {
    console.error('Sitemap: failed to fetch dynamic pages', e)
  }

  return entries
}
