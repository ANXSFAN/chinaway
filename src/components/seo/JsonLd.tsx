export function TravelAgencyJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'ChinaWay',
    description: 'Viajes exclusivos a China desde Europa con guías en español, asistencia de visado y experiencias únicas.',
    url: 'https://chinaway.es',
    logo: 'https://chinaway.es/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Madrid',
      addressCountry: 'ES',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@chinaway.es',
      availableLanguage: ['Spanish', 'English', 'Chinese'],
    },
    sameAs: [],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 35.0,
        longitude: 104.0,
      },
      geoRadius: '3000',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function TourJsonLd({
  name,
  description,
  price,
  duration,
  image,
  url,
}: {
  name: string
  description: string
  price: string
  duration: number
  image: string
  url: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image,
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: duration,
    },
    touristType: 'Cultural tourism',
    provider: {
      '@type': 'TravelAgency',
      name: 'ChinaWay',
      url: 'https://chinaway.es',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
