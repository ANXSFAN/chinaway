import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { en: 'Site Settings', zh: '网站设置', es: 'Configuración del sitio' },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'company',
      label: { en: 'Company Info', zh: '公司信息', es: 'Información de la empresa' },
      fields: [
        { name: 'name', label: { en: 'Company Name', zh: '公司名称', es: 'Nombre de la empresa' }, type: 'text', defaultValue: 'ChinaWay Travel S.L.' },
        { name: 'cif', label: { en: 'CIF', zh: '税号', es: 'CIF' }, type: 'text' },
        { name: 'address', label: { en: 'Address', zh: '地址', es: 'Dirección' }, type: 'text' },
        { name: 'foundedYear', label: { en: 'Founded Year', zh: '成立年份', es: 'Año de fundación' }, type: 'number', defaultValue: 2018 },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: { en: 'Contact Info', zh: '联系方式', es: 'Información de contacto' },
      fields: [
        { name: 'whatsapp', label: { en: 'WhatsApp', zh: 'WhatsApp', es: 'WhatsApp' }, type: 'text' },
        { name: 'wechat', label: { en: 'WeChat ID', zh: '微信号', es: 'WeChat ID' }, type: 'text' },
        { name: 'email', label: { en: 'Email', zh: '邮箱', es: 'Email' }, type: 'email', defaultValue: 'info@chinaway.es' },
        { name: 'privacyEmail', label: { en: 'Privacy Email', zh: '隐私邮箱', es: 'Email de privacidad' }, type: 'email', defaultValue: 'privacy@chinaway.es' },
      ],
    },
    {
      type: 'group',
      name: 'stats',
      label: { en: 'Statistics', zh: '统计数据', es: 'Estadísticas' },
      fields: [
        { name: 'travelers', label: { en: 'Travelers Count', zh: '旅客数', es: 'Número de viajeros' }, type: 'text', defaultValue: '500+' },
        { name: 'destinations', label: { en: 'Destinations Count', zh: '目的地数', es: 'Número de destinos' }, type: 'text', defaultValue: '20+' },
        { name: 'years', label: { en: 'Years of Experience', zh: '经验年数', es: 'Años de experiencia' }, type: 'text', defaultValue: '8' },
      ],
    },
    {
      type: 'group',
      name: 'social',
      label: { en: 'Social Media', zh: '社交媒体', es: 'Redes sociales' },
      fields: [
        { name: 'instagram', label: { en: 'Instagram', zh: 'Instagram', es: 'Instagram' }, type: 'text' },
      ],
    },
  ],
}
