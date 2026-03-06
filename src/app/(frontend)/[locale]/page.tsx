import { getPayload } from 'payload'
import config from '@payload-config'

import { Hero } from '@/components/home/Hero'
import { Marquee } from '@/components/home/Marquee'
import { MapSection } from '@/components/home/MapSection'
import { DestinationsSection } from '@/components/home/DestinationsSection'
import { PhotoStrip } from '@/components/home/PhotoStrip'
import { ExpressSection } from '@/components/home/ExpressSection'
import { ToursSection } from '@/components/home/ToursSection'
import { WhyUsSection } from '@/components/home/WhyUsSection'
import { BannerSection } from '@/components/home/BannerSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { ContactSection } from '@/components/home/ContactSection'

export const revalidate = 3600

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const payload = await getPayload({ config })

  // Fetch all data in parallel
  const [
    destinationsResult,
    toursResult,
    expressResult,
    reviewsResult,
    homePage,
    siteSettings,
  ] = await Promise.all([
    payload.find({
      collection: 'destinations',
      where: { status: { equals: 'published' }, featured: { equals: true } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 6,
    }),
    payload.find({
      collection: 'tours',
      where: { status: { equals: 'published' }, isExpress: { not_equals: true } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 3,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'tours',
      where: { status: { equals: 'published' }, isExpress: { equals: true } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 10,
    }),
    payload.find({
      collection: 'reviews',
      where: { status: { equals: 'published' } },
      locale: locale as 'es' | 'en' | 'zh',
      limit: 10,
    }),
    payload.findGlobal({ slug: 'home-page', locale: locale as 'es' | 'en' | 'zh' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  // Extract stats from site settings
  const stats = {
    travelers: siteSettings.stats?.travelers || '500+',
    destinations: siteSettings.stats?.destinations || '20+',
    years: siteSettings.stats?.years || '8',
  }

  // Hero image
  const heroImageUrl =
    (homePage.hero?.image as { url?: string } | null)?.url ||
    homePage.hero?.imageUrl ||
    'https://picsum.photos/id/1015/1800/900'

  // Marquee cities
  const marqueeCities = (homePage.marqueeCities || []).map(
    (c: { city: string }) => c.city,
  )

  // Photo strip
  const photoStrip = (homePage.photoStrip || []).map((p: any) => ({
    imageUrl: p.imageUrl,
    image: p.image,
  }))

  // Banner
  const banner = {
    imageUrl:
      (homePage.banner?.image as { url?: string } | null)?.url ||
      homePage.banner?.imageUrl ||
      'https://picsum.photos/id/1022/1800/900',
    location: homePage.banner?.location || 'Zhangjiajie · 张家界',
    quote: homePage.banner?.quote || 'Las montañas que inspiraron Avatar',
  }

  // Why us cards
  const whyUsCards = (homePage.whyUsCards || []).map((c: any) => ({
    iconType: c.iconType || '',
    title: c.title || '',
    description: c.description || '',
  }))

  // Map provinces
  const mapProvinces = (homePage.mapProvinces || []).map((p: any) => ({
    provinceId: p.provinceId || '',
    description: p.description || '',
    tours: p.tours || 0,
    highlights: p.highlights || '',
  }))

  const mapIntro = homePage.mapSection?.intro || ''
  const mapTagline = homePage.mapSection?.tagline || ''

  // Destinations for contact section dropdown
  const contactDestinations = destinationsResult.docs.map((d: any) => ({
    slug: d.slug,
    name: d.name,
  }))

  return (
    <>
      <Hero imageUrl={heroImageUrl} stats={stats} />
      <Marquee cities={marqueeCities} />
      <MapSection provinces={mapProvinces} intro={mapIntro} tagline={mapTagline} />
      <DestinationsSection destinations={destinationsResult.docs as any[]} />
      <PhotoStrip photos={photoStrip} />
      <ExpressSection deals={expressResult.docs as any[]} />
      <ToursSection tours={toursResult.docs as any[]} />
      <WhyUsSection cards={whyUsCards} stats={stats} />
      <BannerSection imageUrl={banner.imageUrl} location={banner.location} quote={banner.quote} />
      <ReviewsSection reviews={reviewsResult.docs as any[]} />
      <ContactSection destinations={contactDestinations} />
    </>
  )
}
