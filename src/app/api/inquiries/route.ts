import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_BUDGETS = ['<2000', '2000-4000', '4000-6000', '>6000']

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { customerName, customerEmail, customerPhone, selectedProvinces, travelers, dateRange, budget, interests, message } = body

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }
    if (typeof customerName !== 'string' || customerName.length > 200) {
      return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
    }
    if (typeof customerEmail !== 'string' || !EMAIL_RE.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }
    if (customerPhone && (typeof customerPhone !== 'string' || customerPhone.length > 30)) {
      return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
    }
    if (travelers !== undefined && (typeof travelers !== 'number' || travelers < 1 || travelers > 100)) {
      return NextResponse.json({ error: 'Invalid travelers count' }, { status: 400 })
    }
    if (budget && !VALID_BUDGETS.includes(budget)) {
      return NextResponse.json({ error: 'Invalid budget option' }, { status: 400 })
    }
    if (message && (typeof message !== 'string' || message.length > 5000)) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })
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
