import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: { en: 'Booking', zh: '预订', es: 'Reserva' },
    plural: { en: 'Bookings', zh: '预订', es: 'Reservas' },
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'tour', 'paymentStatus', 'amount', 'paidAt'],
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
  },
  fields: [
    {
      name: 'tour',
      label: { en: 'Tour', zh: '行程', es: 'Tour' },
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'departureDate',
      label: { en: 'Departure Date', zh: '出发日期', es: 'Fecha de salida' },
      type: 'date',
      required: true,
    },
    {
      name: 'customerName',
      label: { en: 'Customer Name', zh: '客户姓名', es: 'Nombre del cliente' },
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      label: { en: 'Customer Email', zh: '客户邮箱', es: 'Email del cliente' },
      type: 'email',
      required: true,
    },
    {
      name: 'customerPhone',
      label: { en: 'Customer Phone', zh: '客户电话', es: 'Teléfono del cliente' },
      type: 'text',
    },
    {
      name: 'stripeSessionId',
      label: { en: 'Stripe Session ID', zh: 'Stripe 会话 ID', es: 'ID de sesión Stripe' },
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stripeInvoiceId',
      label: { en: 'Stripe Invoice ID', zh: 'Stripe 发票 ID', es: 'ID de factura Stripe' },
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentStatus',
      label: { en: 'Payment Status', zh: '支付状态', es: 'Estado de pago' },
      type: 'select',
      options: [
        { label: { en: 'Pending', zh: '待支付', es: 'Pendiente' }, value: 'pending' },
        { label: { en: 'Paid', zh: '已支付', es: 'Pagado' }, value: 'paid' },
        { label: { en: 'Failed', zh: '失败', es: 'Fallido' }, value: 'failed' },
        { label: { en: 'Refunded', zh: '已退款', es: 'Reembolsado' }, value: 'refunded' },
      ],
      defaultValue: 'pending',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'amount',
      label: { en: 'Amount (€)', zh: '金额 (€)', es: 'Importe (€)' },
      type: 'number',
      required: true,
    },
    {
      name: 'paidAt',
      label: { en: 'Paid At', zh: '支付时间', es: 'Fecha de pago' },
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
