'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'

type BookingButtonProps = {
  tourId: string
  tourTitle: string
  departureDate?: string
  depositAmount: number
  locale: string
  children: React.ReactNode
  className?: string
}

const labels = {
  es: {
    title: 'Reservar',
    name: 'Tu nombre',
    email: 'Tu email',
    phone: 'Teléfono (opcional)',
    submit: 'Pagar depósito',
    cancel: 'Cancelar',
    deposit: 'Depósito',
    error: 'Error al procesar. Inténtalo de nuevo.',
    privacy: 'Al continuar, aceptas nuestra',
    privacyLink: 'política de privacidad',
    close: 'Cerrar',
  },
  en: {
    title: 'Book Now',
    name: 'Your name',
    email: 'Your email',
    phone: 'Phone (optional)',
    submit: 'Pay deposit',
    cancel: 'Cancel',
    deposit: 'Deposit',
    error: 'Processing error. Please try again.',
    privacy: 'By continuing, you accept our',
    privacyLink: 'privacy policy',
    close: 'Close',
  },
  zh: {
    title: '预订',
    name: '您的姓名',
    email: '您的邮箱',
    phone: '电话（可选）',
    submit: '支付定金',
    cancel: '取消',
    deposit: '定金',
    error: '处理出错，请重试。',
    privacy: '继续即表示您接受我们的',
    privacyLink: '隐私政策',
    close: '关闭',
  },
}

export function BookingButton({
  tourId,
  tourTitle,
  departureDate,
  depositAmount,
  locale,
  children,
  className,
}: BookingButtonProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const t = labels[locale as keyof typeof labels] || labels.en

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId,
          departureDate,
          customerName: name,
          customerEmail: email,
          customerPhone: phone || undefined,
          locale,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || t.error)
      }
    } catch {
      setError(t.error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-dialog-title"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white w-full max-w-[440px] p-8 rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="absolute top-4 right-4 text-gray hover:text-black transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 id="booking-dialog-title" className="font-playfair text-2xl font-bold mb-2">{t.title}</h3>
            <p className="font-dm text-sm text-gray mb-6">
              {tourTitle} · {t.deposit}: {depositAmount}€
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                aria-required="true"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.name}
                aria-label={t.name}
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
              />
              <input
                type="email"
                required
                aria-required="true"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                aria-label={t.email}
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phone}
                aria-label={t.phone}
                className="w-full py-3 px-4 border-[1.5px] border-[#e0e0e0] rounded-sm font-dm text-sm outline-none focus:border-red transition-colors"
              />

              {error && <p role="alert" className="font-dm text-sm text-red">{error}</p>}

              <p className="font-dm text-[11px] text-gray">
                {t.privacy}{' '}
                <Link href="/legal/privacy" className="text-red underline underline-offset-2">
                  {t.privacyLink}
                </Link>
                .
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 font-dm text-xs font-medium tracking-[.1em] uppercase py-3.5 border-[1.5px] border-[#ccc] hover:border-black transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting || !name || !email}
                  className="flex-1 font-dm text-xs font-medium tracking-[.12em] uppercase py-3.5 bg-red text-white hover:bg-red-dark transition-colors disabled:opacity-50"
                >
                  {submitting ? '...' : t.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
