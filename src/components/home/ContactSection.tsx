'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

type Props = {
  destinations: { slug: string; name: string }[]
}

const resultText = {
  success: {
    es: 'Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.',
    en: 'Message sent successfully. We will contact you soon.',
    zh: '消息发送成功，我们会尽快联系您。',
  },
  error: {
    es: 'Error al enviar. Inténtalo de nuevo.',
    en: 'Error sending. Please try again.',
    zh: '发送失败，请重试。',
  },
} as const

export function ContactSection({ destinations }: Props) {
  const t = useTranslations('contact')
  const locale = useLocale() as 'es' | 'en' | 'zh'
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<'success' | 'error' | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.get('name'),
          customerEmail: formData.get('email'),
          selectedProvinces: formData.get('destination') ? [formData.get('destination')] : undefined,
        }),
      })

      if (res.ok) {
        setResult('success')
        form.reset()
      } else {
        setResult('error')
      }
    } catch {
      setResult('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="px-[6%] pb-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-black p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left side */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-block w-7 h-0.5 bg-red" />
              <span className="font-dm text-[10px] text-red tracking-[.2em] font-medium uppercase">
                {t('label')}
              </span>
            </div>
            <h2 className="font-playfair text-[clamp(28px,3.5vw,46px)] font-bold text-white leading-tight mb-5">
              {t('title')}
            </h2>
            <p className="font-dm text-sm text-[#aaa] leading-relaxed font-light mb-10">
              {t('subtitle')}
            </p>
            <div className="flex gap-7">
              {[
                { label: 'WhatsApp', icon: 'W' },
                { label: 'WeChat', icon: '微' },
                { label: 'Email', icon: '@' },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center gap-2 cursor-pointer opacity-45 hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="w-10 h-10 border border-[#333] flex items-center justify-center text-white font-playfair text-[15px]">
                    {c.icon}
                  </div>
                  <span className="font-dm text-[10px] tracking-[.1em] uppercase text-white">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          {result === 'success' ? (
            <div className="p-6 bg-green-900/30 border border-green-700/50 rounded-sm">
              <p className="font-dm text-sm text-green-300">{resultText.success[locale]}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                name="name"
                type="text"
                required
                placeholder={t('name')}
                className="w-full py-3 border-b-2 border-[#333] bg-transparent text-white font-dm text-sm outline-none placeholder-[#555] focus:border-red transition-colors duration-250"
              />
              <input
                name="email"
                type="email"
                required
                placeholder={t('email')}
                className="w-full py-3 border-b-2 border-[#333] bg-transparent text-white font-dm text-sm outline-none placeholder-[#555] focus:border-red transition-colors duration-250"
              />
              <select
                name="destination"
                defaultValue=""
                className="w-full py-3 border-b-2 border-[#333] bg-transparent text-white font-dm text-sm outline-none focus:border-red transition-colors duration-250 [&>option]:bg-[#111]"
              >
                <option value="" disabled className="text-[#555]">
                  {t('destination')}
                </option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>{d.name}</option>
                ))}
              </select>
              {result === 'error' && (
                <p className="font-dm text-xs text-red-400">{resultText.error[locale]}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 font-dm text-xs font-medium tracking-[.12em] uppercase py-4 bg-red text-white border-none hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250 disabled:opacity-50"
              >
                {submitting ? '...' : t('cta')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
