import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: { en: 'Home Page', zh: '首页设置', es: 'Página de inicio' },
  access: {
    read: () => true,
  },
  fields: [
    // Hero section
    {
      type: 'group',
      name: 'hero',
      label: { en: 'Hero Section', zh: 'Hero 大图', es: 'Sección Hero' },
      fields: [
        { name: 'imageUrl', label: { en: 'Image URL', zh: '图片链接', es: 'URL de imagen' }, type: 'text', defaultValue: 'https://picsum.photos/id/1015/1800/900' },
        { name: 'image', label: { en: 'Image Upload', zh: '上传图片', es: 'Subir imagen' }, type: 'upload', relationTo: 'media' },
      ],
    },
    // Marquee cities
    {
      name: 'marqueeCities',
      label: { en: 'Marquee Cities', zh: '滚动城市列表', es: 'Ciudades del marquee' },
      type: 'array',
      fields: [
        { name: 'city', label: { en: 'City', zh: '城市', es: 'Ciudad' }, type: 'text', required: true },
      ],
    },
    // Photo strip
    {
      name: 'photoStrip',
      label: { en: 'Photo Strip', zh: '图片条', es: 'Tira de fotos' },
      type: 'array',
      fields: [
        { name: 'imageUrl', label: { en: 'Image URL', zh: '图片链接', es: 'URL de imagen' }, type: 'text' },
        { name: 'image', label: { en: 'Image Upload', zh: '上传图片', es: 'Subir imagen' }, type: 'upload', relationTo: 'media' },
      ],
    },
    // Banner section
    {
      type: 'group',
      name: 'banner',
      label: { en: 'Banner Section', zh: '横幅板块', es: 'Sección Banner' },
      fields: [
        { name: 'imageUrl', label: { en: 'Image URL', zh: '图片链接', es: 'URL de imagen' }, type: 'text', defaultValue: 'https://picsum.photos/id/1022/1800/900' },
        { name: 'image', label: { en: 'Image Upload', zh: '上传图片', es: 'Subir imagen' }, type: 'upload', relationTo: 'media' },
        { name: 'location', label: { en: 'Location', zh: '地点', es: 'Ubicación' }, type: 'text', defaultValue: 'Zhangjiajie · 张家界' },
        { name: 'quote', label: { en: 'Quote', zh: '引言', es: 'Cita' }, type: 'text', localized: true },
      ],
    },
    // Why Us cards
    {
      name: 'whyUsCards',
      label: { en: 'Why Choose Us', zh: '为什么选择我们', es: 'Por qué elegirnos' },
      type: 'array',
      fields: [
        {
          name: 'iconType',
          label: { en: 'Icon Type', zh: '图标类型', es: 'Tipo de icono' },
          type: 'select',
          options: [
            { label: 'Visa', value: 'visa' },
            { label: 'Guide', value: 'guide' },
            { label: 'Team', value: 'team' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        { name: 'title', label: { en: 'Title', zh: '标题', es: 'Título' }, type: 'text', required: true, localized: true },
        { name: 'description', label: { en: 'Description', zh: '描述', es: 'Descripción' }, type: 'textarea', localized: true },
      ],
    },
    // Map section intro text
    {
      type: 'group',
      name: 'mapSection',
      label: { en: 'Map Section Text', zh: '地图板块文案', es: 'Texto sección mapa' },
      fields: [
        { name: 'intro', label: { en: 'Intro Text', zh: '介绍文案', es: 'Texto de introducción' }, type: 'textarea', localized: true },
        { name: 'tagline', label: { en: 'Tagline', zh: '标语', es: 'Eslogan' }, type: 'text', localized: true },
      ],
    },
  ],
}
