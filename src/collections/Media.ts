import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media', zh: '媒体', es: 'Medio' },
    plural: { en: 'Media', zh: '媒体', es: 'Medios' },
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  upload: {
    staticDir: '../media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      label: { en: 'Alt Text', zh: '替代文本', es: 'Texto alternativo' },
      type: 'text',
      localized: true,
    },
  ],
}
