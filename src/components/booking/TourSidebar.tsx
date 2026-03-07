'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { BookingButton } from './BookingButton'

type Departure = {
  date: string
  spotsTotal: number
  spotsBooked: number
}

type TourSidebarProps = {
  tourId: string
  tourTitle: string
  price: string
  days: number
  cities: string
  depositAmount: number
  departures: Departure[]
  locale: string
}

export function TourSidebar({
  tourId,
  tourTitle,
  price,
  days,
  cities,
  depositAmount,
  departures,
  locale,
}: TourSidebarProps) {
  const t = useTranslations()
  const [selectedDate, setSelectedDate] = useState(departures[0]?.date || '')

  const localeCode = locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-GB' : 'es-ES'

  return (
    <div>
      <div className="sticky top-28 bg-cream p-8 rounded-sm">
        <div className="font-dm text-[10px] text-gray uppercase tracking-[.08em]">{t('tours.from')}</div>
        <div className="font-playfair text-[42px] font-bold text-red leading-none mb-1">
          {price}€
        </div>
        <div className="font-dm text-sm text-gray mb-6">
          {t('tourDetail.perPerson')}
        </div>

        <div className="space-y-3 mb-6 pb-6 border-b border-[#ddd]">
          <div className="flex justify-between font-dm text-sm">
            <span className="text-gray">{t('tourDetail.duration')}</span>
            <span className="font-medium">{days} {t('tours.days')}</span>
          </div>
          {cities && (
            <div className="flex justify-between font-dm text-sm">
              <span className="text-gray">{t('tourDetail.route')}</span>
              <span className="font-medium text-right max-w-[160px]">{cities}</span>
            </div>
          )}
          <div className="flex justify-between font-dm text-sm">
            <span className="text-gray">{t('tourDetail.deposit')}</span>
            <span className="font-medium">{depositAmount}€</span>
          </div>
        </div>

        {/* Departures with selection */}
        {departures.length > 0 && (
          <div className="mb-6">
            <h4 className="font-dm text-xs font-medium text-gray uppercase tracking-[.08em] mb-3">
              {t('tourDetail.departures')}
            </h4>
            <div className="space-y-2">
              {departures.map((dep) => {
                const spotsLeft = dep.spotsTotal - dep.spotsBooked
                const dateDisplay = new Date(dep.date).toLocaleDateString(localeCode, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                const isSelected = selectedDate === dep.date
                const isSoldOut = spotsLeft <= 0

                return (
                  <button
                    key={dep.date}
                    type="button"
                    disabled={isSoldOut}
                    onClick={() => setSelectedDate(dep.date)}
                    className={`w-full flex justify-between font-dm text-sm px-3 py-2.5 rounded-sm border transition-all duration-200 text-left ${
                      isSoldOut
                        ? 'border-[#eee] text-gray/40 cursor-not-allowed'
                        : isSelected
                          ? 'border-red bg-red/5'
                          : 'border-[#e8e8e8] hover:border-red/40'
                    }`}
                  >
                    <span className={isSelected ? 'font-medium' : ''}>{dateDisplay}</span>
                    <span className={spotsLeft <= 5 ? 'text-red font-medium' : 'text-gray'}>
                      {isSoldOut
                        ? (locale === 'es' ? 'Agotado' : locale === 'en' ? 'Sold out' : '已满')
                        : `${spotsLeft} ${t('tourDetail.spots')}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <BookingButton
          tourId={tourId}
          tourTitle={tourTitle}
          departureDate={selectedDate}
          depositAmount={depositAmount}
          locale={locale}
          className="w-full font-dm text-xs font-medium tracking-[.12em] uppercase py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250"
        >
          {t('tourDetail.bookNow')}
        </BookingButton>
        <Link
          href="/contact"
          className="block w-full mt-3 font-dm text-xs font-medium tracking-[.1em] uppercase py-3 bg-transparent text-black text-center border-[1.5px] border-[#ccc] hover:border-black transition-all duration-250"
        >
          {t('hero.cta2')}
        </Link>
      </div>
    </div>
  )
}
