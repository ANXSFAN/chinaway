import type { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'days', 'price', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'days',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'cities',
      type: 'text',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'discountPrice',
      type: 'number',
      min: 0,
    },
    {
      name: 'discountPercent',
      type: 'number',
      min: 0,
      max: 100,
    },
    {
      name: 'badge',
      type: 'text',
      localized: true,
    },
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'itinerary',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
      name: 'included',
      type: 'richText',
      localized: true,
    },
    {
      name: 'excluded',
      type: 'richText',
      localized: true,
    },
    {
      name: 'isUpcoming',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in Upcoming Departures page',
      },
    },
    {
      name: 'isExpress',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in homepage Express/discount section',
      },
    },
    {
      name: 'departures',
      type: 'array',
      admin: {
        description: 'Scheduled departure dates',
      },
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'spotsTotal',
          type: 'number',
          required: true,
          defaultValue: 20,
        },
        {
          name: 'spotsBooked',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'depositAmount',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Deposit amount in EUR',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
