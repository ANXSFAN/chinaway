import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: { en: 'About Page', zh: '关于我们页面', es: 'Página Sobre Nosotros' },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'heroImageUrl', label: { en: 'Hero Image URL', zh: 'Hero图片链接', es: 'URL imagen Hero' }, type: 'text', defaultValue: 'https://picsum.photos/id/1029/1800/900' },
    { name: 'heroImage', label: { en: 'Hero Image Upload', zh: 'Hero上传图片', es: 'Subir imagen Hero' }, type: 'upload', relationTo: 'media' },
    { name: 'storyImageUrl', label: { en: 'Story Image URL', zh: '故事图片链接', es: 'URL imagen historia' }, type: 'text', defaultValue: 'https://picsum.photos/id/1036/800/1000' },
    { name: 'storyImage', label: { en: 'Story Image Upload', zh: '故事上传图片', es: 'Subir imagen historia' }, type: 'upload', relationTo: 'media' },
    {
      name: 'storyParagraphs',
      label: { en: 'Our Story', zh: '我们的故事', es: 'Nuestra historia' },
      type: 'array',
      fields: [
        { name: 'paragraph', label: { en: 'Paragraph', zh: '段落', es: 'Párrafo' }, type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'values',
      label: { en: 'Our Values', zh: '价值观', es: 'Valores' },
      type: 'array',
      fields: [
        {
          name: 'iconType',
          label: { en: 'Icon', zh: '图标', es: 'Icono' },
          type: 'select',
          options: [
            { label: 'Globe', value: 'globe' },
            { label: 'Shield', value: 'shield' },
            { label: 'People', value: 'people' },
            { label: 'Card', value: 'card' },
          ],
        },
        { name: 'title', label: { en: 'Title', zh: '标题', es: 'Título' }, type: 'text', required: true, localized: true },
        { name: 'description', label: { en: 'Description', zh: '描述', es: 'Descripción' }, type: 'textarea', localized: true },
      ],
    },
  ],
}
