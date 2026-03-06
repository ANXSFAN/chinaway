'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'

type Locale = 'es' | 'en' | 'zh'

type Destination = { id: string; name: string }

const privacyText = {
  es: 'Acepto la política de privacidad y el tratamiento de mis datos personales.',
  en: 'I accept the privacy policy and the processing of my personal data.',
  zh: '我接受隐私政策和个人数据处理条款。',
}

const messageText = {
  es: 'Tu mensaje...',
  en: 'Your message...',
  zh: '您的留言...',
}

const successText = {
  es: 'Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.',
  en: 'Message sent successfully. We will contact you soon.',
  zh: '消息发送成功，我们会尽快联系您。',
}

const errorText = {
  es: 'Error al enviar. Inténtalo de nuevo.',
  en: 'Error sending. Please try again.',
  zh: '发送失败，请重试。',
}

export function ContactForm({
  destinations,
  labels,
}: {
  destinations: Destination[]
  labels: { title: string; subtitle: string; name: string; email: string; destination: string; send: string }
}) {
  const locale = useLocale() as Locale
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
          message: formData.get('message'),
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
    <div>
      <h2 className="font-playfair text-2xl font-bold mb-6">{labels.title}</h2>
      <p className="font-dm text-sm text-gray leading-relaxed mb-8">{labels.subtitle}</p>

      {result === 'success' ? (
        <div className="p-6 bg-green-50 border border-green-200 rounded-sm">
          <p className="font-dm text-sm text-green-800">{successText[locale]}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder={labels.name}
            className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
          />
          <input
            name="email"
            type="email"
            required
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            title={locale === 'es' ? 'Introduce un email válido' : locale === 'zh' ? '请输入有效的电子邮箱' : 'Enter a valid email address'}
            placeholder={labels.email}
            className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
          />
          <select
            name="destination"
            defaultValue=""
            className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
          >
            <option value="" disabled>{labels.destination}</option>
            {destinations.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
          <textarea
            name="message"
            rows={5}
            placeholder={messageText[locale]}
            className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors resize-none"
          />
          <div className="flex items-start gap-2">
            <input type="checkbox" id="privacy" required className="mt-1" />
            <label htmlFor="privacy" className="font-dm text-xs text-gray leading-relaxed">
              {privacyText[locale]}
            </label>
          </div>
          {result === 'error' && (
            <p className="font-dm text-sm text-red">{errorText[locale]}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-dm text-xs font-medium tracking-[.12em] uppercase py-4 bg-red text-white hover:bg-red-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(208,2,27,.3)] transition-all duration-250 disabled:opacity-50"
          >
            {submitting ? '...' : labels.send}
          </button>
        </form>
      )}
    </div>
  )
}
