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

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <MapSection />
      <DestinationsSection />
      <PhotoStrip />
      <ExpressSection />
      <ToursSection />
      <WhyUsSection />
      <BannerSection />
      <ReviewsSection />
      <ContactSection />
    </>
  )
}
