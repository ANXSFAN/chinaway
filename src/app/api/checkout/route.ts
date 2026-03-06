import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      tourId,
      tourTitle,
      departureDate,
      customerName,
      customerEmail,
      customerPhone,
      depositAmount = 100,
      locale = 'es',
    } = body

    if (!tourId || !departureDate || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: tourId, departureDate, customerName, customerEmail' },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    if (!stripeSecretKey) {
      // Development mode: create booking directly and return mock response
      const mockSessionId = `mock_session_${Date.now()}`
      try {
        const payload = await getPayload({ config })
        await payload.create({
          collection: 'bookings',
          data: {
            tour: Number(tourId),
            departureDate,
            customerName,
            customerEmail,
            customerPhone: customerPhone || '',
            stripeSessionId: mockSessionId,
            paymentStatus: 'paid',
            amount: depositAmount,
            paidAt: new Date().toISOString(),
          },
        })

        // Update spots booked
        const tour = await payload.findByID({ collection: 'tours', id: Number(tourId) })
        if (tour?.departures) {
          const departures = (tour.departures as any[]).map((dep: any) => {
            if (dep.date === departureDate) {
              return { ...dep, spotsBooked: (dep.spotsBooked || 0) + 1 }
            }
            return dep
          })
          await payload.update({ collection: 'tours', id: Number(tourId), data: { departures } })
        }
      } catch (e) {
        console.error('Dev booking creation error:', e)
      }

      return NextResponse.json({
        url: `${baseUrl}/${locale}/booking/success?session_id=${mockSessionId}`,
        sessionId: mockSessionId,
        mode: 'development',
      })
    }

    const stripe = new Stripe(stripeSecretKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: tourTitle || `Tour Deposit - ${tourId}`,
            },
            unit_amount: depositAmount * 100,
          },
          quantity: 1,
        },
      ],
      automatic_tax: { enabled: true },
      invoice_creation: { enabled: true },
      customer_email: customerEmail,
      success_url: `${baseUrl}/${locale}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/booking/cancel`,
      metadata: {
        tourId,
        departureDate,
        customerName,
        customerPhone: customerPhone || '',
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
