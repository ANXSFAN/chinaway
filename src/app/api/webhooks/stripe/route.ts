import { NextRequest, NextResponse } from 'next/server'

// Stripe webhook handler
// Listens for checkout.session.completed events
export async function POST(req: NextRequest) {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeWebhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Production: verify and handle webhook
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    // const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret)
    //
    // if (event.type === 'checkout.session.completed') {
    //   const session = event.data.object
    //   const { tourId, departureDate, customerName, customerPhone } = session.metadata
    //
    //   // Update booking in Payload CMS
    //   const payload = await getPayload({ config })
    //   await payload.create({
    //     collection: 'bookings',
    //     data: {
    //       tour: tourId,
    //       departureDate,
    //       customerName,
    //       customerEmail: session.customer_email,
    //       customerPhone,
    //       stripeSessionId: session.id,
    //       stripeInvoiceId: session.invoice,
    //       paymentStatus: 'paid',
    //       amount: session.amount_total / 100,
    //       paidAt: new Date().toISOString(),
    //     },
    //   })
    //
    //   // Update spots booked on the tour departure
    //   // ... increment spotsBooked for matching departure date
    // }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
