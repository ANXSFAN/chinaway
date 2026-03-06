import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { en: 'Post', zh: '文章', es: 'Artículo' },
    plural: { en: 'Posts', zh: '文章', es: 'Artículos' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
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
      name: 'content',
      label: { en: 'Content', zh: '内容', es: 'Contenido' },
      type: 'richText',
      localized: true,
    },
    {
      name: 'excerpt',
      label: { en: 'Excerpt', zh: '摘要', es: 'Extracto' },
      type: 'textarea',
      localized: true,
    },
    {
      name: 'coverImage',
      label: { en: 'Cover Image', zh: '封面图', es: 'Imagen de portada' },
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      label: { en: 'Category', zh: '分类', es: 'Categoría' },
      type: 'select',
      options: [
        { label: { en: 'Travel Tips', zh: '旅行攻略', es: 'Consejos de viaje' }, value: 'tips' },
        { label: { en: 'Destinations', zh: '目的地', es: 'Destinos' }, value: 'destinations' },
        { label: { en: 'Culture', zh: '文化', es: 'Cultura' }, value: 'culture' },
        { label: { en: 'Food', zh: '美食', es: 'Gastronomía' }, value: 'food' },
        { label: { en: 'News', zh: '新闻', es: 'Noticias' }, value: 'news' },
      ],
    },
    {
      name: 'imageUrl',
      label: { en: 'Image URL (external)', zh: '外部图片链接', es: 'URL de imagen (externa)' },
      type: 'text',
    },
    {
      name: 'author',
      label: { en: 'Author', zh: '作者', es: 'Autor' },
      type: 'text',
      defaultValue: 'ChinaWay Team',
    },
    {
      name: 'relatedPosts',
      label: { en: 'Related Posts', zh: '相关文章', es: 'Artículos relacionados' },
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      label: { en: 'Published At', zh: '发布时间', es: 'Fecha de publicación' },
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: { en: 'Status', zh: '状态', es: 'Estado' },
      type: 'select',
      options: [
        { label: { en: 'Draft', zh: '草稿', es: 'Borrador' }, value: 'draft' },
        { label: { en: 'Published', zh: '已发布', es: 'Publicado' }, value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
