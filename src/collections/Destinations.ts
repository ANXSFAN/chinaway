import type { CollectionConfig } from 'payload'

const themeOptions = [
  { label: 'Naturaleza / Nature', value: 'nature' },
  { label: 'Cultura / Culture', value: 'culture' },
  { label: 'Historia / History', value: 'history' },
  { label: 'Aventura / Adventure', value: 'adventure' },
  { label: 'Metrópoli / City', value: 'city' },
  { label: 'Espiritual / Spiritual', value: 'spiritual' },
]

const provinceOptions = [
  'guangxi', 'shanghai', 'tibet', 'yunnan', 'shaanxi', 'hunan',
  'beijing', 'sichuan', 'gansu', 'jiangsu', 'zhejiang', 'anhui',
  'fujian', 'guangdong', 'guizhou', 'hebei', 'heilongjiang',
  'henan', 'hubei', 'jiangxi', 'jilin', 'liaoning', 'inner-mongolia',
  'ningxia', 'qinghai', 'shandong', 'shanxi', 'xinjiang', 'hainan',
  'chongqing', 'tianjin',
].map((p) => ({ label: p.charAt(0).toUpperCase() + p.slice(1), value: p }))

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'province', 'theme', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
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
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'province',
      type: 'select',
      options: provinceOptions,
      required: true,
    },
    {
      name: 'theme',
      type: 'select',
      options: themeOptions,
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
