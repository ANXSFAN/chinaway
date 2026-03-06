import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: { en: 'Review', zh: '评价', es: 'Reseña' },
    plural: { en: 'Reviews', zh: '评价', es: 'Reseñas' },
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'customerLocation', 'rating', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'customerName',
      label: { en: 'Customer Name', zh: '客户姓名', es: 'Nombre del cliente' },
      type: 'text',
      required: true,
    },
    {
      name: 'customerLocation',
      label: { en: 'Location', zh: '所在地', es: 'Ubicación' },
      type: 'text',
    },
    {
      name: 'rating',
      label: { en: 'Rating', zh: '评分', es: 'Puntuación' },
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'content',
      label: { en: 'Review Content', zh: '评价内容', es: 'Contenido de la reseña' },
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'tour',
      label: { en: 'Related Tour', zh: '关联行程', es: 'Viaje relacionado' },
      type: 'relationship',
      relationTo: 'tours',
    },
    {
      name: 'tourName',
      label: { en: 'Tour Name', zh: '行程名称', es: 'Nombre del tour' },
      type: 'text',
      localized: true,
    },
    {
      name: 'status',
      label: { en: 'Status', zh: '状态', es: 'Estado' },
      type: 'select',
      options: [
        { label: { en: 'Draft', zh: '草稿', es: 'Borrador' }, value: 'draft' },
        { label: { en: 'Published', zh: '已发布', es: 'Publicado' }, value: 'published' },
      ],
      defaultValue: 'published',
      required: true,
      admin: { position: 'sidebar' },
    },
  ],
}
