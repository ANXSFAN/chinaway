import type { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  labels: {
    singular: { en: 'Tour', zh: '行程', es: 'Tour' },
    plural: { en: 'Tours', zh: '行程', es: 'Tours' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'days', 'price', 'status'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.departures) {
          for (const dep of data.departures) {
            if (dep.spotsBooked !== undefined && dep.spotsTotal !== undefined) {
              if (dep.spotsBooked > dep.spotsTotal) {
                throw new Error('spotsBooked cannot exceed spotsTotal')
              }
            }
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: { en: 'Title', zh: '标题', es: 'Título' },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: { en: 'Slug', zh: 'URL 别名', es: 'Slug' },
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'days',
      label: { en: 'Days', zh: '天数', es: 'Días' },
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'cities',
      label: { en: 'Cities', zh: '途经城市', es: 'Ciudades' },
      type: 'text',
      localized: true,
    },
    {
      name: 'price',
      label: { en: 'Price (€)', zh: '价格 (€)', es: 'Precio (€)' },
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'discountPrice',
      label: { en: 'Discount Price (€)', zh: '折扣价 (€)', es: 'Precio con descuento (€)' },
      type: 'number',
      min: 0,
    },
    {
      name: 'discountPercent',
      label: { en: 'Discount %', zh: '折扣百分比', es: 'Descuento %' },
      type: 'number',
      min: 0,
      max: 100,
    },
    {
      name: 'badge',
      label: { en: 'Badge', zh: '标签', es: 'Etiqueta' },
      type: 'text',
      localized: true,
    },
    {
      name: 'destinations',
      label: { en: 'Destinations', zh: '目的地', es: 'Destinos' },
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
    },
    {
      name: 'coverImage',
      label: { en: 'Cover Image', zh: '封面图', es: 'Imagen de portada' },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'itinerary',
      label: { en: 'Itinerary', zh: '每日行程', es: 'Itinerario' },
      type: 'array',
      fields: [
        {
          name: 'day',
          label: { en: 'Day', zh: '第几天', es: 'Día' },
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          label: { en: 'Title', zh: '标题', es: 'Título' },
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          label: { en: 'Description', zh: '描述', es: 'Descripción' },
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
      name: 'included',
      label: { en: 'Included', zh: '包含项目', es: 'Incluido' },
      type: 'richText',
      localized: true,
    },
    {
      name: 'excluded',
      label: { en: 'Excluded', zh: '不包含项目', es: 'No incluido' },
      type: 'richText',
      localized: true,
    },
    {
      name: 'isUpcoming',
      label: { en: 'Upcoming Departure', zh: '即将出发', es: 'Próxima salida' },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: { en: 'Show in Upcoming Departures page', zh: '在即将出发页面显示', es: 'Mostrar en la página de próximas salidas' },
      },
    },
    {
      name: 'isExpress',
      label: { en: 'Express Deal', zh: '限时优惠', es: 'Oferta express' },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: { en: 'Show in homepage Express/discount section', zh: '在首页限时优惠专区显示', es: 'Mostrar en la sección de ofertas express de la página principal' },
      },
    },
    {
      name: 'departures',
      label: { en: 'Departures', zh: '出发日期', es: 'Salidas' },
      type: 'array',
      admin: {
        description: { en: 'Scheduled departure dates', zh: '计划出发日期', es: 'Fechas de salida programadas' },
      },
      fields: [
        {
          name: 'date',
          label: { en: 'Date', zh: '日期', es: 'Fecha' },
          type: 'date',
          required: true,
        },
        {
          name: 'spotsTotal',
          label: { en: 'Total Spots', zh: '总名额', es: 'Plazas totales' },
          type: 'number',
          required: true,
          defaultValue: 20,
        },
        {
          name: 'spotsBooked',
          label: { en: 'Spots Booked', zh: '已预订名额', es: 'Plazas reservadas' },
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'depositAmount',
      label: { en: 'Deposit (€)', zh: '定金 (€)', es: 'Depósito (€)' },
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: { en: 'Deposit amount in EUR', zh: '定金金额（欧元）', es: 'Importe del depósito en EUR' },
      },
    },
    {
      name: 'imageUrl',
      label: { en: 'Image URL (external)', zh: '外部图片链接', es: 'URL de imagen (externa)' },
      type: 'text',
      admin: {
        description: { en: 'External image URL (fallback if no upload)', zh: '外部图片链接（无上传图片时使用）', es: 'URL de imagen externa (alternativa si no hay subida)' },
      },
    },
    {
      name: 'status',
      label: { en: 'Status', zh: '状态', es: 'Estado' },
      type: 'select',
      options: [
        { label: { en: 'Draft', zh: '草稿', es: 'Borrador' }, value: 'draft' },
        { label: { en: 'Published', zh: '已发布', es: 'Publicado' }, value: 'published' },
        { label: { en: 'Archived', zh: '已归档', es: 'Archivado' }, value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
