import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'customerEmail', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
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
      name: 'selectedProvinces',
      type: 'json',
    },
    {
      name: 'travelers',
      type: 'number',
      min: 1,
    },
    {
      name: 'dateRange',
      type: 'text',
    },
    {
      name: 'budget',
      type: 'select',
      options: [
        { label: '< 2.000€', value: '<2000' },
        { label: '2.000€ - 4.000€', value: '2000-4000' },
        { label: '4.000€ - 6.000€', value: '4000-6000' },
        { label: '> 6.000€', value: '>6000' },
      ],
    },
    {
      name: 'interests',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Nature', value: 'nature' },
        { label: 'Culture', value: 'culture' },
        { label: 'History', value: 'history' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'City', value: 'city' },
        { label: 'Spiritual', value: 'spiritual' },
        { label: 'Gastronomy', value: 'gastronomy' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'new',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
