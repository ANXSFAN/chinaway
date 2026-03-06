import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeSecretKey || !stripeWebhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    const stripe = new Stripe(stripeSecretKey)
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const { tourId, departureDate, customerName, customerPhone } = session.metadata || {}

      if (tourId) {
        const payload = await getPayload({ config })

        // Create booking record
        const tourIdNum = Number(tourId)
        await payload.create({
          collection: 'bookings',
          data: {
            tour: tourIdNum,
            departureDate: departureDate || new Date().toISOString(),
            customerName: customerName || '',
            customerEmail: session.customer_email || '',
            customerPhone: customerPhone || '',
            stripeSessionId: session.id,
            stripeInvoiceId:
              typeof session.invoice === 'string'
                ? session.invoice
                : (session.invoice as Stripe.Invoice)?.id || '',
            paymentStatus: 'paid',
            amount: (session.amount_total || 0) / 100,
            paidAt: new Date().toISOString(),
          },
        })

        // Update spots booked on the tour departure
        if (departureDate) {
          const tour = await payload.findByID({ collection: 'tours', id: tourIdNum })
          if (tour?.departures) {
            const departures = (tour.departures as any[]).map((dep: any) => {
              if (dep.date === departureDate) {
                return { ...dep, spotsBooked: (dep.spotsBooked || 0) + 1 }
              }
              return dep
            })
            await payload.update({
              collection: 'tours',
              id: tourIdNum,
              data: { departures },
            })
          }
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
