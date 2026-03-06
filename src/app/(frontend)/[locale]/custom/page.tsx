'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { SectionLabel } from '@/components/ui/SectionLabel'

const provinces = [
  { id: 'beijing', name: { es: 'Pekín', en: 'Beijing', zh: '北京' } },
  { id: 'shanghai', name: { es: 'Shanghái', en: 'Shanghai', zh: '上海' } },
  { id: 'guangxi', name: { es: 'Guangxi (Guilin)', en: 'Guangxi (Guilin)', zh: '广西（桂林）' } },
  { id: 'yunnan', name: { es: 'Yunnan', en: 'Yunnan', zh: '云南' } },
  { id: 'sichuan', name: { es: 'Sichuan (Chengdu)', en: 'Sichuan (Chengdu)', zh: '四川（成都）' } },
  { id: 'tibet', name: { es: 'Tíbet', en: 'Tibet', zh: '西藏' } },
  { id: 'shaanxi', name: { es: "Shaanxi (Xi'an)", en: "Shaanxi (Xi'an)", zh: '陕西（西安）' } },
  { id: 'hunan', name: { es: 'Hunan (Zhangjiajie)', en: 'Hunan (Zhangjiajie)', zh: '湖南（张家界）' } },
  { id: 'gansu', name: { es: 'Gansu (Dunhuang)', en: 'Gansu (Dunhuang)', zh: '甘肃（敦煌）' } },
  { id: 'xinjiang', name: { es: 'Xinjiang (Kashgar)', en: 'Xinjiang (Kashgar)', zh: '新疆（喀什）' } },
  { id: 'zhejiang', name: { es: 'Zhejiang (Hangzhou)', en: 'Zhejiang (Hangzhou)', zh: '浙江（杭州）' } },
  { id: 'fujian', name: { es: 'Fujian', en: 'Fujian', zh: '福建' } },
]

const budgetOptions = [
  { value: '<2000', label: '< 2.000€' },
  { value: '2000-4000', label: '2.000€ - 4.000€' },
  { value: '4000-6000', label: '4.000€ - 6.000€' },
  { value: '>6000', label: '> 6.000€' },
]

const interestOptions = [
  { value: 'nature', label: { es: 'Naturaleza', en: 'Nature', zh: '自然' } },
  { value: 'culture', label: { es: 'Cultura', en: 'Culture', zh: '文化' } },
  { value: 'history', label: { es: 'Historia', en: 'History', zh: '历史' } },
  { value: 'adventure', label: { es: 'Aventura', en: 'Adventure', zh: '探险' } },
  { value: 'gastronomy', label: { es: 'Gastronomía', en: 'Gastronomy', zh: '美食' } },
  { value: 'spiritual', label: { es: 'Espiritual', en: 'Spiritual', zh: '心灵' } },
]

export default function CustomTravelPage() {
  const t = useTranslations()
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const [step, setStep] = useState(1)
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const labels = {
    pageTitle: { es: 'Viaje a tu Medida', en: 'Tailor-Made Travel', zh: '私人定制行程' },
    pageSubtitle: { es: 'Diseñamos tu viaje perfecto a China. Selecciona tus destinos, cuéntanos tus preferencias y nosotros hacemos el resto.', en: 'We design your perfect China trip. Select your destinations, tell us your preferences and we do the rest.', zh: '为您量身定制完美的中国之旅。选择目的地，告诉我们您的偏好，其余交给我们。' },
    step1: { es: '1. Elige tus destinos', en: '1. Choose your destinations', zh: '1. 选择目的地' },
    step2: { es: '2. Tus preferencias', en: '2. Your preferences', zh: '2. 旅行偏好' },
    step3: { es: '3. Datos de contacto', en: '3. Contact details', zh: '3. 联系方式' },
    travelers: { es: 'Número de viajeros', en: 'Number of travelers', zh: '旅行人数' },
    dates: { es: 'Fechas aproximadas', en: 'Approximate dates', zh: '大致日期' },
    budget: { es: 'Presupuesto por persona', en: 'Budget per person', zh: '每人预算' },
    interests: { es: 'Temas de interés', en: 'Interests', zh: '兴趣主题' },
    message: { es: 'Cuéntanos más sobre tu viaje ideal...', en: 'Tell us more about your ideal trip...', zh: '告诉我们更多关于您理想旅程的信息...' },
    next: { es: 'Siguiente', en: 'Next', zh: '下一步' },
    back: { es: 'Atrás', en: 'Back', zh: '上一步' },
    submit: { es: 'Enviar solicitud', en: 'Submit request', zh: '提交请求' },
    phone: { es: 'Teléfono / WhatsApp', en: 'Phone / WhatsApp', zh: '电话 / WhatsApp' },
  }

  const toggleProvince = (id: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

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
                    {p.name[locale]}
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
                      defaultValue={2}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-dm text-xs text-gray uppercase tracking-[.08em] mb-2 block">
                      {labels.dates[locale]}
                    </label>
                    <input
                      type="text"
                      placeholder={locale === 'es' ? 'Ej: Abril 2026' : locale === 'en' ? 'E.g. April 2026' : '如：2026年4月'}
                      className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-dm text-xs text-gray uppercase tracking-[.08em] mb-2 block">
                    {labels.budget[locale]}
                  </label>
                  <select className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors">
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
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t('contact.name')}
                  className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                />
                <input
                  type="email"
                  placeholder={t('contact.email')}
                  className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                />
                <input
                  type="tel"
                  placeholder={labels.phone[locale]}
                  className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
                />
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="font-dm text-xs font-medium tracking-[.1em] uppercase px-6 py-3 border-[1.5px] border-[#ccc] hover:border-black transition-colors"
                >
                  {labels.back[locale]}
                </button>
                <button className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors">
                  {labels.submit[locale]}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
