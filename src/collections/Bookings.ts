import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'tour', 'paymentStatus', 'amount', 'paidAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'departureDate',
      type: 'date',
      required: true,
    },
    {
      name: 'customerName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stripeInvoiceId',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      defaultValue: 'pending',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'paidAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
