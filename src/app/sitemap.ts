import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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

  return entries
}
