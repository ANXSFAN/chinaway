import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      tourId,
      departureDate,
      customerName,
      customerEmail,
      customerPhone,
      locale = 'es',
    } = body

    // --- Input validation ---
    if (!tourId || !departureDate || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: tourId, departureDate, customerName, customerEmail' },
        { status: 400 },
      )
    }
    if (typeof customerName !== 'string' || customerName.length > 200) {
      return NextResponse.json({ error: 'Invalid customerName' }, { status: 400 })
    }
    if (typeof customerEmail !== 'string' || !EMAIL_RE.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    if (customerPhone && (typeof customerPhone !== 'string' || customerPhone.length > 30)) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    }

    // --- Fetch tour from DB to get trusted depositAmount & title ---
    const payload = await getPayload({ config })
    const tour = await payload.findByID({ collection: 'tours', id: Number(tourId) }).catch(() => null)

    if (!tour || (tour as any).status !== 'published') {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 })
    }

    const depositAmount: number = (tour as any).depositAmount || 100
    const tourTitle: string = (tour as any).title || `Tour ${tourId}`

    // Validate departure date exists on this tour
    const departures = ((tour as any).departures || []) as any[]
    const matchedDeparture = departures.find((dep: any) => dep.date === departureDate)
    if (!matchedDeparture) {
      return NextResponse.json({ error: 'Invalid departure date' }, { status: 400 })
    }
    const spotsLeft = (matchedDeparture.spotsTotal || 0) - (matchedDeparture.spotsBooked || 0)
    if (spotsLeft <= 0) {
      return NextResponse.json({ error: 'No spots available for this date' }, { status: 400 })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    if (!stripeSecretKey) {
      // Only allow mock payments in development
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Payment system not configured' }, { status: 503 })
      }

      const mockSessionId = `mock_session_${Date.now()}`
      try {
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
        const updatedDepartures = departures.map((dep: any) => {
          if (dep.date === departureDate) {
            return { ...dep, spotsBooked: (dep.spotsBooked || 0) + 1 }
          }
          return dep
        })
        await payload.update({ collection: 'tours', id: Number(tourId), data: { departures: updatedDepartures } })
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
              name: `${tourTitle} - Depósito / Deposit`,
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
        tourId: String(tourId),
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
