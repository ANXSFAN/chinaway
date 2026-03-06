import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, customerEmail, customerPhone, selectedProvinces, travelers, dateRange, budget, interests, message } = body

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        customerName,
        customerEmail,
        customerPhone: customerPhone || undefined,
        selectedProvinces: selectedProvinces || undefined,
        travelers: travelers || undefined,
        dateRange: dateRange || undefined,
        budget: budget || undefined,
        interests: interests || undefined,
        message: message || undefined,
        status: 'new',
      },
    })

    return NextResponse.json({ success: true, id: inquiry.id })
  } catch (error: any) {
    console.error('Failed to create inquiry:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
