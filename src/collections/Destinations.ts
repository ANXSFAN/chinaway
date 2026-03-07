import type { CollectionConfig } from 'payload'

const themeOptions = [
  { label: { en: 'Nature', zh: '自然', es: 'Naturaleza' }, value: 'nature' },
  { label: { en: 'Culture', zh: '文化', es: 'Cultura' }, value: 'culture' },
  { label: { en: 'History', zh: '历史', es: 'Historia' }, value: 'history' },
  { label: { en: 'Adventure', zh: '探险', es: 'Aventura' }, value: 'adventure' },
  { label: { en: 'City', zh: '都市', es: 'Metrópoli' }, value: 'city' },
  { label: { en: 'Spiritual', zh: '心灵', es: 'Espiritual' }, value: 'spiritual' },
]

const provinceOptions = [
  { label: { en: 'Guangxi', zh: '广西', es: 'Guangxi' }, value: 'guangxi' },
  { label: { en: 'Shanghai', zh: '上海', es: 'Shanghái' }, value: 'shanghai' },
  { label: { en: 'Tibet', zh: '西藏', es: 'Tíbet' }, value: 'tibet' },
  { label: { en: 'Yunnan', zh: '云南', es: 'Yunnan' }, value: 'yunnan' },
  { label: { en: 'Shaanxi', zh: '陕西', es: 'Shaanxi' }, value: 'shaanxi' },
  { label: { en: 'Hunan', zh: '湖南', es: 'Hunan' }, value: 'hunan' },
  { label: { en: 'Beijing', zh: '北京', es: 'Pekín' }, value: 'beijing' },
  { label: { en: 'Sichuan', zh: '四川', es: 'Sichuan' }, value: 'sichuan' },
  { label: { en: 'Gansu', zh: '甘肃', es: 'Gansu' }, value: 'gansu' },
  { label: { en: 'Jiangsu', zh: '江苏', es: 'Jiangsu' }, value: 'jiangsu' },
  { label: { en: 'Zhejiang', zh: '浙江', es: 'Zhejiang' }, value: 'zhejiang' },
  { label: { en: 'Anhui', zh: '安徽', es: 'Anhui' }, value: 'anhui' },
  { label: { en: 'Fujian', zh: '福建', es: 'Fujian' }, value: 'fujian' },
  { label: { en: 'Guangdong', zh: '广东', es: 'Guangdong' }, value: 'guangdong' },
  { label: { en: 'Guizhou', zh: '贵州', es: 'Guizhou' }, value: 'guizhou' },
  { label: { en: 'Hebei', zh: '河北', es: 'Hebei' }, value: 'hebei' },
  { label: { en: 'Heilongjiang', zh: '黑龙江', es: 'Heilongjiang' }, value: 'heilongjiang' },
  { label: { en: 'Henan', zh: '河南', es: 'Henan' }, value: 'henan' },
  { label: { en: 'Hubei', zh: '湖北', es: 'Hubei' }, value: 'hubei' },
  { label: { en: 'Jiangxi', zh: '江西', es: 'Jiangxi' }, value: 'jiangxi' },
  { label: { en: 'Jilin', zh: '吉林', es: 'Jilin' }, value: 'jilin' },
  { label: { en: 'Liaoning', zh: '辽宁', es: 'Liaoning' }, value: 'liaoning' },
  { label: { en: 'Inner Mongolia', zh: '内蒙古', es: 'Mongolia Interior' }, value: 'inner-mongolia' },
  { label: { en: 'Ningxia', zh: '宁夏', es: 'Ningxia' }, value: 'ningxia' },
  { label: { en: 'Qinghai', zh: '青海', es: 'Qinghai' }, value: 'qinghai' },
  { label: { en: 'Shandong', zh: '山东', es: 'Shandong' }, value: 'shandong' },
  { label: { en: 'Shanxi', zh: '山西', es: 'Shanxi' }, value: 'shanxi' },
  { label: { en: 'Xinjiang', zh: '新疆', es: 'Xinjiang' }, value: 'xinjiang' },
  { label: { en: 'Hainan', zh: '海南', es: 'Hainan' }, value: 'hainan' },
  { label: { en: 'Chongqing', zh: '重庆', es: 'Chongqing' }, value: 'chongqing' },
  { label: { en: 'Tianjin', zh: '天津', es: 'Tianjin' }, value: 'tianjin' },
]

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: { en: 'Destination', zh: '目的地', es: 'Destino' },
    plural: { en: 'Destinations', zh: '目的地', es: 'Destinos' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'province', 'theme', 'status'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      label: { en: 'Name', zh: '名称', es: 'Nombre' },
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
      name: 'description',
      label: { en: 'Description', zh: '描述', es: 'Descripción' },
      type: 'richText',
      localized: true,
    },
    {
      name: 'shortDescription',
      label: { en: 'Short Description', zh: '简短描述', es: 'Descripción corta' },
      type: 'textarea',
      localized: true,
    },
    {
      name: 'province',
      label: { en: 'Province', zh: '省份', es: 'Provincia' },
      type: 'select',
      options: provinceOptions,
      required: true,
    },
    {
      name: 'theme',
      label: { en: 'Theme', zh: '主题', es: 'Tema' },
      type: 'select',
      options: themeOptions,
      required: true,
    },
    {
      name: 'coverImage',
      label: { en: 'Cover Image', zh: '封面图', es: 'Imagen de portada' },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: { en: 'Gallery', zh: '图库', es: 'Galería' },
      type: 'array',
      fields: [
        {
          name: 'image',
          label: { en: 'Image', zh: '图片', es: 'Imagen' },
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
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
      name: 'longDescription',
      label: { en: 'Long Description', zh: '详细描述', es: 'Descripción larga' },
      type: 'textarea',
      localized: true,
    },
    {
      name: 'highlights',
      label: { en: 'Highlights', zh: '亮点景点', es: 'Destacados' },
      type: 'text',
      localized: true,
      admin: {
        description: { en: 'Key highlights separated by " · "', zh: '主要景点，用 " · " 分隔', es: 'Destacados separados por " · "' },
      },
    },
    {
      name: 'featured',
      label: { en: 'Featured', zh: '推荐', es: 'Destacado' },
      type: 'checkbox',
      defaultValue: false,
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
