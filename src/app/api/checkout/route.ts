import { NextRequest, NextResponse } from 'next/server'

// Stripe checkout session creation endpoint
// Real Stripe integration will be added when STRIPE_SECRET_KEY is configured
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tourId, departureDate, customerName, customerEmail, customerPhone, depositAmount = 100 } = body

    if (!tourId || !departureDate || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: tourId, departureDate, customerName, customerEmail' },
        { status: 400 }
      )
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      // Development mode: return mock response
      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id=mock_session_${Date.now()}`,
        sessionId: `mock_session_${Date.now()}`,
        mode: 'development',
        message: 'Stripe not configured. This is a mock checkout session.',
      })
    }

    // Production: create real Stripe Checkout Session
    // const stripe = new Stripe(stripeSecretKey)
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   line_items: [{
    //     price_data: {
    //       currency: 'eur',
    //       product_data: { name: `Tour Deposit - ${tourId}` },
    //       unit_amount: depositAmount * 100,
    //     },
    //     quantity: 1,
    //   }],
    //   automatic_tax: { enabled: true },
    //   invoice_creation: { enabled: true },
    //   customer_email: customerEmail,
    //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/cancel`,
    //   metadata: { tourId, departureDate, customerName, customerPhone },
    // })
    // return NextResponse.json({ url: session.url, sessionId: session.id })

    return NextResponse.json({ error: 'Stripe integration pending' }, { status: 501 })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
