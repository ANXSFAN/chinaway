'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const ChinaMap = dynamic(() => import('@/components/map/ChinaMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#f5f3ef]">
      <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

type Locale = 'es' | 'en' | 'zh'

interface Province {
  id: string
  name: string
}

const budgetOptions = [
  { value: '<2000', label: '< 2.000\u20AC' },
  { value: '2000-4000', label: '2.000\u20AC - 4.000\u20AC' },
  { value: '4000-6000', label: '4.000\u20AC - 6.000\u20AC' },
  { value: '>6000', label: '> 6.000\u20AC' },
]

const interestOptions = [
  { value: 'nature', label: { es: 'Naturaleza', en: 'Nature', zh: '\u81EA\u7136' } },
  { value: 'culture', label: { es: 'Cultura', en: 'Culture', zh: '\u6587\u5316' } },
  { value: 'history', label: { es: 'Historia', en: 'History', zh: '\u5386\u53F2' } },
  { value: 'adventure', label: { es: 'Aventura', en: 'Adventure', zh: '\u63A2\u9669' } },
  { value: 'gastronomy', label: { es: 'Gastronom\u00EDa', en: 'Gastronomy', zh: '\u7F8E\u98DF' } },
  { value: 'spiritual', label: { es: 'Espiritual', en: 'Spiritual', zh: '\u5FC3\u7075' } },
]

export function CustomTravelClient({ provinces }: { provinces: Province[] }) {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const [step, setStep] = useState(1)
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [travelers, setTravelers] = useState(2)
  const [dateRange, setDateRange] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const labels = {
    pageTitle: { es: 'Viaje a tu Medida', en: 'Tailor-Made Travel', zh: '\u79C1\u4EBA\u5B9A\u5236\u884C\u7A0B' },
    pageSubtitle: { es: 'Dise\u00F1amos tu viaje perfecto a China. Selecciona tus destinos, cu\u00E9ntanos tus preferencias y nosotros hacemos el resto.', en: 'We design your perfect China trip. Select your destinations, tell us your preferences and we do the rest.', zh: '\u4E3A\u60A8\u91CF\u8EAB\u5B9A\u5236\u5B8C\u7F8E\u7684\u4E2D\u56FD\u4E4B\u65C5\u3002\u9009\u62E9\u76EE\u7684\u5730\uFF0C\u544A\u8BC9\u6211\u4EEC\u60A8\u7684\u504F\u597D\uFF0C\u5176\u4F59\u4EA4\u7ED9\u6211\u4EEC\u3002' },
    step1: { es: '1. Elige tus destinos', en: '1. Choose your destinations', zh: '1. \u9009\u62E9\u76EE\u7684\u5730' },
    step2: { es: '2. Tus preferencias', en: '2. Your preferences', zh: '2. \u65C5\u884C\u504F\u597D' },
    step3: { es: '3. Datos de contacto', en: '3. Contact details', zh: '3. \u8054\u7CFB\u65B9\u5F0F' },
    travelers: { es: 'N\u00FAmero de viajeros', en: 'Number of travelers', zh: '\u65C5\u884C\u4EBA\u6570' },
    dates: { es: 'Fechas aproximadas', en: 'Approximate dates', zh: '\u5927\u81F4\u65E5\u671F' },
    budget: { es: 'Presupuesto por persona', en: 'Budget per person', zh: '\u6BCF\u4EBA\u9884\u7B97' },
    interests: { es: 'Temas de inter\u00E9s', en: 'Interests', zh: '\u5174\u8DA3\u4E3B\u9898' },
    message: { es: 'Cu\u00E9ntanos m\u00E1s sobre tu viaje ideal...', en: 'Tell us more about your ideal trip...', zh: '\u544A\u8BC9\u6211\u4EEC\u66F4\u591A\u5173\u4E8E\u60A8\u7406\u60F3\u65C5\u7A0B\u7684\u4FE1\u606F...' },
    next: { es: 'Siguiente', en: 'Next', zh: '\u4E0B\u4E00\u6B65' },
    back: { es: 'Atr\u00E1s', en: 'Back', zh: '\u4E0A\u4E00\u6B65' },
    submit: { es: 'Enviar solicitud', en: 'Submit request', zh: '\u63D0\u4EA4\u8BF7\u6C42' },
    phone: { es: 'Tel\u00E9fono / WhatsApp', en: 'Phone / WhatsApp', zh: '\u7535\u8BDD / WhatsApp' },
    datePlaceholder: { es: 'Ej: Abril 2026', en: 'E.g. April 2026', zh: '\u5982\uFF1A2026\u5E744\u6708' },
    success: { es: 'Solicitud enviada con \u00E9xito. Nos pondremos en contacto contigo pronto.', en: 'Request submitted successfully. We will contact you soon.', zh: '\u8BF7\u6C42\u63D0\u4EA4\u6210\u529F\uFF0C\u6211\u4EEC\u4F1A\u5C3D\u5FEB\u8054\u7CFB\u60A8\u3002' },
    error: { es: 'Error al enviar. Int\u00E9ntalo de nuevo.', en: 'Error submitting. Please try again.', zh: '\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002' },
  }

  const isValidEmail = (value: string) =>
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)

  const handleSubmit = async () => {
    if (!name || !email) return
    if (!isValidEmail(email)) {
      setSubmitError(true)
      return
    }
    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          customerPhone: phone || undefined,
          selectedProvinces,
          travelers,
          dateRange: dateRange || undefined,
          budget: budget || undefined,
          interests: selectedInterests.length > 0 ? selectedInterests : undefined,
          message: message || undefined,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleProvince = (id: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const mapClickRef = useCallback(
    (provinceId: string) => {
      setSelectedProvinces((prev) =>
        prev.includes(provinceId)
          ? prev.filter((p) => p !== provinceId)
          : [...prev, provinceId]
      )
    },
    []
  )

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden flex items-end">
        <img
          src="https://picsum.photos/id/1080/1800/900"
          alt="Custom travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-[6%] pb-12">
          <SectionLabel>{t('whyUs.custom.title')}</SectionLabel>
          <h1 className="font-playfair text-[clamp(36px,5vw,64px)] font-bold text-white leading-tight">
            {labels.pageTitle[locale]}
          </h1>
          <p className="font-dm text-base text-white/70 mt-3 max-w-[520px]">{labels.pageSubtitle[locale]}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-[6%]">
        <div className="max-w-[800px] mx-auto">
          {/* Step indicator */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-red' : 'bg-[#e8e8e8]'}`}
              />
            ))}
          </div>

          {/* Step 1: Province selection */}
          {step === 1 && (
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6">{labels.step1[locale]}</h2>

              {/* Interactive map */}
              <div className="w-full h-[300px] sm:h-[400px] mb-6 rounded-sm overflow-hidden border border-[#e0e0e0]">
                <ChinaMap
                  locale={locale}
                  selectedProvinces={selectedProvinces}
                  onProvinceClick={mapClickRef}
                />
              </div>

              {/* Selected provinces display */}
              {selectedProvinces.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProvinces.map((id) => {
                    const province = provinces.find((p) => p.id === id)
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red/10 text-red border border-red/20 rounded-full font-dm text-xs font-medium"
                      >
                        {province?.name || id}
                        <button
                          onClick={() => toggleProvince(id)}
                          className="hover:text-red-dark"
                        >
                          &times;
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Province buttons (also selectable) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {provinces.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggleProvince(p.id)}
                    className={`py-4 px-4 border-[1.5px] rounded-sm font-dm text-sm text-left transition-all duration-200 ${
                      selectedProvinces.includes(p.id)
                        ? 'border-red bg-red/5 text-red'
                        : 'border-[#e0e0e0] hover:border-black/30'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedProvinces.length === 0}
                  className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {labels.next[locale]}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6">{labels.step2[locale]}</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-dm text-xs text-gray uppercase tracking-[.08em] mb-2 block">
                      {labels.travelers[locale]}
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value) || 1)}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-dm text-xs text-gray uppercase tracking-[.08em] mb-2 block">
                      {labels.dates[locale]}
                    </label>
                    <input
                      type="text"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      placeholder={labels.datePlaceholder[locale]}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-dm text-xs text-gray uppercase tracking-[.08em] mb-2 block">
                    {labels.budget[locale]}
                  </label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors">
                    <option value="">—</option>
                    {budgetOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-dm text-xs text-gray uppercase tracking-[.08em] mb-2 block">
                    {labels.interests[locale]}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => toggleInterest(o.value)}
                        className={`py-2 px-4 border-[1.5px] rounded-full font-dm text-xs transition-all duration-200 ${
                          selectedInterests.includes(o.value)
                            ? 'border-red bg-red/5 text-red'
                            : 'border-[#e0e0e0] hover:border-black/30'
                        }`}
                      >
                        {o.label[locale]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={labels.message[locale]}
                    className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="font-dm text-xs font-medium tracking-[.1em] uppercase px-6 py-3 border-[1.5px] border-[#ccc] hover:border-black transition-colors"
                >
                  {labels.back[locale]}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors"
                >
                  {labels.next[locale]}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact info */}
          {step === 3 && (
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-6">{labels.step3[locale]}</h2>
              {submitted ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-sm">
                  <p className="font-dm text-sm text-green-800">{labels.success[locale]}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact.name')}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact.email')}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={labels.phone[locale]}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                  </div>
                  {submitError && (
                    <p className="font-dm text-sm text-red mt-3">{labels.error[locale]}</p>
                  )}
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="font-dm text-xs font-medium tracking-[.1em] uppercase px-6 py-3 border-[1.5px] border-[#ccc] hover:border-black transition-colors"
                    >
                      {labels.back[locale]}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !name || !email}
                      className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors disabled:opacity-50"
                    >
                      {submitting ? '...' : labels.submit[locale]}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
